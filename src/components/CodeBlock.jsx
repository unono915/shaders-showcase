import { useState } from 'react'

export default function CodeBlock({ code, title = 'JSX' }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      /* clipboard 권한이 없으면 무시 */
    }
  }

  return (
    <div className="code">
      <div className="code__bar">
        <span>{title}</span>
        <button type="button" onClick={copy}>
          {copied ? '복사됨' : '복사'}
        </button>
      </div>
      <pre>
        <code>{code.trim()}</code>
      </pre>
    </div>
  )
}
