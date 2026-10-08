import CodeBlock from './CodeBlock.jsx'

/** 각 활용 예제를 감싸는 공통 레이아웃: 번호/제목/설명 + 데모 + 코드 */
export default function Section({ id, index, tag, title, children, description, code, points = [] }) {
  return (
    <section id={id} className="section">
      <header className="section__head">
        <span className="section__index">{String(index).padStart(2, '0')}</span>
        <div>
          <span className="section__tag">{tag}</span>
          <h2 className="section__title">{title}</h2>
          <p className="section__desc">{description}</p>
          {points.length > 0 && (
            <ul className="section__points">
              {points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}
        </div>
      </header>
      <div className="section__demo">{children}</div>
      {code && <CodeBlock code={code} />}
    </section>
  )
}
