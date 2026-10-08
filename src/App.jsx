import Hero from './sections/Hero.jsx'
import TextMask from './sections/TextMask.jsx'
import CursorEffects from './sections/CursorEffects.jsx'
import GlassLens from './sections/GlassLens.jsx'
import FilterGallery from './sections/FilterGallery.jsx'
import Transitions from './sections/Transitions.jsx'
import ShapeEffects from './sections/ShapeEffects.jsx'
import Playground from './sections/Playground.jsx'
import DynamicProps from './sections/DynamicProps.jsx'
import CustomShaderDemo from './sections/CustomShaderDemo.jsx'
import VanillaJs from './sections/VanillaJs.jsx'

const NAV = [
  ['text-mask', '텍스트'],
  ['cursor', '커서'],
  ['glass', '글래스'],
  ['filters', '필터'],
  ['transitions', '트랜지션'],
  ['shapes', '3D'],
  ['playground', '플레이그라운드'],
  ['dynamic', '동적 Prop'],
  ['custom', '커스텀'],
  ['vanilla', 'Vanilla JS'],
]

const CHEATSHEET = [
  ['레이어 순서', '첫 자식이 맨 아래, 마지막 자식이 맨 위에 그려진다'],
  ['이펙트', 'Blur·Glass·트랜지션 등은 "앞에 그려진 것"을 입력으로 받는다 (형제 배치가 기본)'],
  ['중첩', '특정 레이어에만 이펙트를 적용하고 싶을 때만 이펙트 안에 자식으로 넣는다'],
  ['크기', '<Shader> 에 CSS(className/style)로 크기 지정. 내부 <canvas> 는 건드리지 않기'],
  ['공통 prop', 'blendMode · opacity · visible · maskSource · boundingBox · id'],
  ['동적 prop', "{ type: 'auto-animate' | 'mouse-position' | 'mouse' | 'map' }"],
  ['성능', '숨길 땐 opacity={0} 대신 visible={false}, 중첩보다 평평한 스택'],
  ['SSR', 'WebGPU는 브라우저 전용 — Next.js는 "use client", Nuxt는 <ClientOnly>'],
]

export default function App() {
  return (
    <>
      <nav className="nav">
        <a href="#top" className="nav__logo">◐ Shaders Showcase</a>
        <div className="nav__links">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
        </div>
      </nav>

      <Hero />

      <main className="main">
        <section className="intro">
          <div className="intro__card">
            <span className="intro__num">01</span>
            <h3>히어로 배경 (맨 위)</h3>
            <p>
              MeshGradient + SimplexNoise + CursorTrail + FilmGrain. 제너레이터를 형제로 쌓고 텍스트는 일반 HTML로
              올리는 가장 기본적인 패턴입니다.
            </p>
          </div>
          <div className="intro__card">
            <h3>설치</h3>
            <pre><code>npm install shaders</code></pre>
            <p>React · Vue · Svelte · Solid · Vanilla JS 진입점이 하나의 패키지에 모두 포함 (MIT).</p>
          </div>
          <div className="intro__card">
            <h3>요구 사항</h3>
            <p>WebGPU 지원 브라우저 (Chrome / Edge 113+, Safari 26+, Firefox 141+ Windows). 미지원 시 각 데모에 안내가 표시됩니다.</p>
          </div>
        </section>

        <TextMask />
        <CursorEffects />
        <GlassLens />
        <FilterGallery />
        <Transitions />
        <ShapeEffects />
        <Playground />
        <DynamicProps />
        <CustomShaderDemo />
        <VanillaJs />

        <section className="section" id="cheatsheet">
          <header className="section__head">
            <span className="section__index">✓</span>
            <div>
              <span className="section__tag">Cheat sheet</span>
              <h2 className="section__title">핵심 규칙 요약</h2>
            </div>
          </header>
          <table className="cheatsheet">
            <tbody>
              {CHEATSHEET.map(([k, v]) => (
                <tr key={k}>
                  <th>{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <footer className="footer">
        Built with <a href="https://github.com/shader-effects-inc/shaders" target="_blank" rel="noreferrer">shaders</a> (MIT)
        · 샘플 이미지 © Unsplash via picsum.photos
      </footer>
    </>
  )
}
