"use client"

import { useMemo } from 'react'
import katex from 'katex'

function renderInlineMath(text: string): string {
  return text.replace(/\$([^\$]+)\$/g, (_, math) => {
    try {
      return katex.renderToString(math, { displayMode: false, throwOnError: false })
    } catch {
      return `<span class="katex-error">${math}</span>`
    }
  })
}

function renderBlockMath(text: string): string {
  return text.replace(/\$\$([^\$]+)\$\$/g, (_, math) => {
    try {
      return katex.renderToString(math, { displayMode: true, throwOnError: false })
    } catch {
      return `<div class="katex-error">${math}</div>`
    }
  })
}

function unescapeUnicode(str: string): string {
  if (!str) return str;
  return str.replace(/\\u([\dA-Fa-f]{4})/gi, (match, grp) => {
    return String.fromCharCode(parseInt(grp, 16));
  });
}

export default function KatexContent({ text, as = 'span' }: { text: string; as?: 'span' | 'div' }) {
  const html = useMemo(() => {
    const unescaped = unescapeUnicode(text)
    const withBlocks = renderBlockMath(unescaped)
    const withInline = renderInlineMath(withBlocks)
    return withInline
  }, [text])

  if (as === 'div') {
    return <div dangerouslySetInnerHTML={{ __html: html }} />
  }
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}
