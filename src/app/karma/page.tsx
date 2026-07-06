import { sql } from '@/lib/db'
import { notFound } from 'next/navigation'
import QuizClient from '@/components/QuizClient'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const ratios: Record<string, Record<string, number>> = {
  tyt: { 'tyt-turkce': 40, 'tyt-sosyal': 20, 'tyt-matematik': 40, 'tyt-fen': 20 },
  ayt: { 'ayt-matematik': 40, 'ayt-fen': 40, 'ayt-edebiyat-sos1': 40, 'ayt-sos2': 40 },
  'tyt-ayt': {
    'tyt-turkce': 40, 'tyt-sosyal': 20, 'tyt-matematik': 40, 'tyt-fen': 20,
    'ayt-matematik': 40, 'ayt-fen': 40, 'ayt-edebiyat-sos1': 40, 'ayt-sos2': 40,
  },
}

function distribute(ratioMap: Record<string, number>, total: number): Record<string, number> {
  const sum = Object.values(ratioMap).reduce((a, b) => a + b, 0)
  const raw: Record<string, number> = {}
  let allocated = 0
  for (const [cat, ratio] of Object.entries(ratioMap)) {
    const count = Math.round((ratio / sum) * total)
    raw[cat] = count
    allocated += count
  }
  let diff = total - allocated
  const keys = Object.keys(ratioMap)
  let i = 0
  while (diff !== 0) {
    const cat = keys[i % keys.length]
    if (diff > 0) { raw[cat]++; diff-- }
    else if (raw[cat] > 1) { raw[cat]--; diff++ }
    i++
  }
  return raw
}

interface Question {
  id: number
  question: string
  options: string
  correct_answer: number
  explanation: string | null
}

export default async function KarmaPage({
  searchParams,
}: {
  searchParams: Promise<{ tur?: string; adet?: string }>
}) {
  const p = await searchParams
  const tur = p.tur || 'tyt'
  const adet = Math.min(Math.max(parseInt(p.adet || '40') || 40, 1), 200)

  const ratioMap = ratios[tur]
  if (!ratioMap) notFound()

  const distribution = distribute(ratioMap, adet)
  const allQuestions: any[] = []

  for (const [catId, count] of Object.entries(distribution)) {
    if (count <= 0) continue
    try {
      const rows = await sql`
        SELECT id, question, options, correct_answer as "correctAnswer", explanation
        FROM questions
        WHERE category_id = ${catId}
        ORDER BY RANDOM()
        LIMIT ${count}
      `
      allQuestions.push(
        ...rows.map((r: any) => ({
          ...r,
          options: typeof r.options === 'string' ? JSON.parse(r.options) : r.options,
        }))
      )
    } catch {
      // category might have no questions
    }
  }

  if (allQuestions.length === 0) notFound()

  allQuestions.sort(() => Math.random() - 0.5)

  const turLabel = tur === 'tyt' ? 'TYT' : tur === 'ayt' ? 'AYT' : 'TYT + AYT'

  return (
    <section className={`page-section theme-${tur === 'tyt' ? 'tyt-turkce' : 'ayt-matematik'}`}>
      <QuizClient
        category={{ category_id: `karma-${tur}`, title: `Karma ${turLabel} Deneme` }}
        testIndex={0}
        questions={allQuestions}
      />
    </section>
  )
}
