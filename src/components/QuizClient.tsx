"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { saveProgress } from '@/app/actions/progress'
import KatexContent from '@/components/KatexContent'

export default function QuizClient({ category, testIndex, questions }: any) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState({ correct: 0, wrong: 0, empty: 0 })
  const [userAnswers, setUserAnswers] = useState<any[]>(new Array(questions.length).fill(null))
  const [isAnswered, setIsAnswered] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [seconds, setSeconds] = useState(0)

  const q = questions[currentIndex]
  const currentAnswer = userAnswers[currentIndex]
  const labels = ['A', 'B', 'C', 'D', 'E']

  useEffect(() => {
    if (isFinished) return
    const interval = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(interval)
  }, [isFinished])

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60)
    const s = totalSeconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleOptionClick = (index: number) => {
    if (isAnswered) return
    setIsAnswered(true)

    const isCorrect = index === q.correctAnswer
    if (isCorrect) {
      setScore(s => ({ ...s, correct: s.correct + 1 }))
    } else {
      setScore(s => ({ ...s, wrong: s.wrong + 1 }))
    }

    const newAnswers = [...userAnswers]
    newAnswers[currentIndex] = { selectedOption: index, isCorrect }
    setUserAnswers(newAnswers)
  }

  const nextQuestion = async () => {
    if (currentIndex + 1 >= questions.length) {
      setIsFinished(true)
      const emptyCount = questions.length - score.correct - score.wrong
      await saveProgress(category.category_id, testIndex, score.correct, score.wrong, emptyCount, userAnswers)
    } else {
      setCurrentIndex(i => i + 1)
      setIsAnswered(userAnswers[currentIndex + 1] !== null)
    }
  }

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1)
      setIsAnswered(userAnswers[currentIndex - 1] !== null)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished) return
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const index = parseInt(e.key) - 1
        if (q?.options && index < q.options.length && !isAnswered) {
          handleOptionClick(index)
        }
      }
      if (e.key === 'Enter' && isAnswered) {
        nextQuestion()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFinished, isAnswered, currentIndex, q])

  if (isFinished) {
    const emptyCount = questions.length - score.correct - score.wrong
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-4 sm:p-8 flex flex-col items-center">
        <div className="max-w-3xl w-full bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-8 text-center">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-2">
            Test Tamamlandı!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">Çözüm Süresi: <span className="font-bold">{formatTime(seconds)}</span></p>

          <div className="flex justify-center mb-10">
            <div className="relative w-40 h-40 rounded-full border-8 border-indigo-100 dark:border-indigo-900 flex flex-col items-center justify-center bg-white dark:bg-slate-800 shadow-inner">
              <div className="text-5xl font-black text-indigo-600 dark:text-indigo-400">
                {Math.round((score.correct / questions.length) * 100)}
              </div>
              <div className="text-xs font-bold text-slate-400 tracking-widest mt-1">PUAN</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 rounded-2xl p-4">
              <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase mb-1">Doğru</h4>
              <p className="text-3xl font-black text-emerald-700 dark:text-emerald-300">{score.correct}</p>
            </div>
            <div className="bg-rose-50 dark:bg-rose-900/30 border border-rose-100 dark:border-rose-800 rounded-2xl p-4">
              <h4 className="text-sm font-bold text-rose-600 dark:text-rose-400 uppercase mb-1">Yanlış</h4>
              <p className="text-3xl font-black text-rose-700 dark:text-rose-300">{score.wrong}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
              <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Boş</h4>
              <p className="text-3xl font-black text-slate-700 dark:text-slate-300">{emptyCount}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => window.location.reload()} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md">
              ↻ Tekrar Çöz
            </button>
            <Link href={`/kategori/${category.category_id}`} className="px-6 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-all">
              Kategoriye Dön
            </Link>
          </div>
        </div>

        {/* Detailed Report */}
        <div className="max-w-3xl w-full mt-8">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center">
            <span className="w-2 h-6 bg-purple-500 rounded-full mr-3"></span>
            Detaylı Soru Analizi
          </h3>
          <div className="space-y-4">
            {questions.map((q: any, i: number) => {
              const ans = userAnswers[i];
              if (!ans) return null;
              const isCorrect = ans.isCorrect;
              return (
                <div key={i} className={`bg-white dark:bg-slate-800 p-6 rounded-2xl border-l-4 shadow-sm ${isCorrect ? 'border-l-emerald-500 dark:border-l-emerald-400' : 'border-l-rose-500 dark:border-l-rose-400'}`}>
                  <div className="flex justify-between items-center mb-3">
                    <strong className="text-lg text-slate-800 dark:text-slate-100">Soru {i + 1}</strong>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${isCorrect ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'}`}>
                      {isCorrect ? '✓ Doğru' : '✗ Yanlış'}
                    </span>
                  </div>
                  <div className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 mb-4 font-medium">
                    <KatexContent text={q.question} as="div" />
                  </div>
                  <div className="text-sm bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 mb-3 flex items-center flex-wrap gap-2">
                    <span className="text-slate-500">Senin Cevabın:</span>
                    <strong className={`px-2 py-0.5 rounded ${isCorrect ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300'}`}>
                      {labels[ans.selectedOption]}
                    </strong>
                    {!isCorrect && (
                      <>
                        <span className="text-slate-400 px-1">|</span>
                        <span className="text-slate-500">Doğru Cevap:</span>
                        <strong className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 px-2 py-0.5 rounded">
                          {labels[q.correctAnswer]}
                        </strong>
                      </>
                    )}
                  </div>
                  {q.explanation && (
                    <div className="mt-4 bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 p-4 rounded-xl text-sm text-slate-700 dark:text-slate-300">
                      <strong className="text-indigo-700 dark:text-indigo-400 block mb-2">Çözüm / Açıklama:</strong>
                      <div className="prose prose-sm dark:prose-invert max-w-none"><KatexContent text={q.explanation} /></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-4 sm:p-8 flex justify-center">
      <div className="max-w-4xl w-full flex flex-col">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Ana Sayfa</Link>
          <span>&gt;</span>
          <Link href={`/kategori/${category.category_id}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{category.title}</Link>
          <span>&gt;</span>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">Test {testIndex + 1}</span>
        </div>

        {/* Quiz Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
            {category.title} - <span className="text-indigo-600 dark:text-indigo-400">Test {testIndex + 1}</span>
          </h3>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 font-mono font-bold text-indigo-600 dark:text-indigo-400">
              <span className="text-lg">⏱</span>
              <span>{formatTime(seconds)}</span>
            </div>
            <div className="bg-slate-200 dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400">
              {currentIndex + 1} / {questions.length}
            </div>
            <Link href={`/kategori/${category.category_id}`} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 dark:hover:bg-rose-900/30 dark:hover:border-rose-800 dark:hover:text-rose-400 text-slate-600 dark:text-slate-300 font-semibold rounded-xl text-sm transition-colors">
              Çıkış
            </Link>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out" 
            style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex-1 flex flex-col">
          <div className="prose prose-lg dark:prose-invert max-w-none text-slate-800 dark:text-slate-100 font-medium mb-8">
            <KatexContent text={q.question} as="div" />
          </div>

          <div className="space-y-3 mt-auto">
            {q.options.map((opt: string, idx: number) => {
              const textParts = opt.split(') ')
              const letter = textParts.length > 1 ? textParts[0] : labels[idx]
              const text = textParts.length > 1 ? textParts.slice(1).join(') ') : opt

              let btnBg = 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:border-indigo-200 dark:hover:bg-indigo-900/30 dark:hover:border-indigo-800'
              let letterBg = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'

              if (isAnswered) {
                if (idx === q.correctAnswer) {
                  btnBg = 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-800 dark:text-emerald-200'
                  letterBg = 'bg-emerald-500 border-emerald-500 text-white'
                } else if (currentAnswer?.selectedOption === idx && !currentAnswer.isCorrect) {
                  btnBg = 'bg-rose-50 dark:bg-rose-900/20 border-rose-500 text-rose-800 dark:text-rose-200'
                  letterBg = 'bg-rose-500 border-rose-500 text-white'
                } else {
                  btnBg = 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-60'
                }
              }

              return (
                <button
                  key={idx}
                  className={`w-full flex items-center text-left p-4 rounded-2xl border-2 transition-all ${btnBg}`}
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(idx)}
                >
                  <span className={`w-8 h-8 rounded-lg border flex items-center justify-center font-bold mr-4 shrink-0 transition-colors ${letterBg}`}>
                    {letter}
                  </span> 
                  <span className="text-base sm:text-lg"><KatexContent text={text} /></span>
                </button>
              )
            })}
          </div>

          {/* Explanation Box */}
          <div className={`mt-8 overflow-hidden transition-all duration-500 ease-in-out ${isAnswered ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border-l-4 border-l-indigo-500 p-5 rounded-r-2xl">
              <strong className="text-indigo-700 dark:text-indigo-400 block mb-2 font-bold text-lg">Çözüm / Açıklama:</strong>
              <div className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                <KatexContent text={q.explanation || 'Bu soru için açıklama bulunmamaktadır.'} as="div" />
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
          <button 
            className={`px-6 py-3 rounded-xl font-bold transition-all ${currentIndex === 0 ? 'bg-transparent text-slate-300 dark:text-slate-700 cursor-not-allowed' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`} 
            disabled={currentIndex === 0} 
            onClick={prevQuestion}
          >
            ← Önceki
          </button>
          
          <div className="text-slate-400 dark:text-slate-500 text-sm font-medium hidden sm:block">
            {isAnswered ? 'Devam etmek için Enter\'a bas' : 'Şık seçmek için 1-5 arası tuşları kullan'}
          </div>
          
          <button 
            className={`px-8 py-3 rounded-xl font-bold text-white transition-all shadow-md ${!isAnswered ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-500 cursor-not-allowed shadow-none' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'}`} 
            disabled={!isAnswered} 
            onClick={nextQuestion}
          >
            {currentIndex + 1 === questions.length ? 'Testi Bitir 🏁' : 'Sonraki Soru →'}
          </button>
        </div>
      </div>
    </div>
  )
}
