import { useMemo, useState } from 'react'
import { MeshGradient, Plasma, Aurora, FilmGrain, Vignette, CursorTrail, ChromaticAberration } from 'shaders/react'
import Stage from '../components/Stage.jsx'
import Section from '../components/Section.jsx'

const BASES = ['MeshGradient', 'Plasma', 'Aurora']
const COLOR_SPACES = ['oklab', 'oklch', 'linear', 'hsl']

/**
 * 활용 8 — 상태 바인딩 플레이그라운드
 * 모든 prop 은 React state 로 바꿀 수 있고, 재컴파일 없이 다음 프레임에 반영된다.
 * 현재 설정을 그대로 JSX 코드로 출력 → 디자인 툴처럼 사용.
 */
export default function Playground() {
  const [base, setBase] = useState('MeshGradient')
  const [colorA, setColorA] = useState('#0b1d51')
  const [colorB, setColorB] = useState('#4fd1c5')
  const [speed, setSpeed] = useState(0.8)
  const [colorSpace, setColorSpace] = useState('oklab')
  const [grain, setGrain] = useState(true)
  const [vignette, setVignette] = useState(true)
  const [trail, setTrail] = useState(false)
  const [aberration, setAberration] = useState(false)

  const baseEl = {
    // MeshGradient 는 기본 5색 stops 를 쓰므로 stops={null} 로 colorA/colorB 를 사용하게 한다
    MeshGradient: <MeshGradient stops={null} colorA={colorA} colorB={colorB} speed={speed} colorSpace={colorSpace} />,
    Plasma: <Plasma colorA={colorA} colorB={colorB} speed={speed} colorSpace={colorSpace} />,
    Aurora: <Aurora colorA={colorA} colorB={colorB} speed={speed * 6} colorSpace={colorSpace} />,
  }[base]

  const code = useMemo(() => {
    const lines = [
      `<Shader className="w-full h-96">`,
      `  <${base}${base === 'MeshGradient' ? ' stops={null}' : ''} colorA="${colorA}" colorB="${colorB}" speed={${base === 'Aurora' ? +(speed * 6).toFixed(2) : speed}} colorSpace="${colorSpace}" />`,
      trail && `  <CursorTrail colorA="#ffffff" colorB="${colorB}" opacity={0.6} blendMode="screen" />`,
      aberration && `  <ChromaticAberration strength={0.4} />`,
      vignette && `  <Vignette intensity={0.6} />`,
      grain && `  <FilmGrain strength={0.35} />`,
      `</Shader>`,
    ]
    return lines.filter(Boolean).join('\n')
  }, [base, colorA, colorB, speed, colorSpace, grain, vignette, trail, aberration])

  return (
    <Section
      id="playground"
      index={8}
      tag="React State · Codegen"
      title="실시간 플레이그라운드"
      description="컬러 피커·슬라이더를 prop에 바인딩한 예. 사용자 테마 커스터마이저, 브랜드 컬러 미리보기, 내부 디자인 툴을 만들 때의 패턴입니다. 아래 코드가 실시간으로 갱신됩니다."
      code={code}
    >
      <div className="playground">
        <aside className="panel">
          <div className="panel__group">
            <span className="panel__label">베이스 레이어</span>
            <div className="segmented">
              {BASES.map((b) => (
                <button key={b} className={b === base ? 'active' : ''} onClick={() => setBase(b)}>{b}</button>
              ))}
            </div>
          </div>
          <div className="panel__group panel__row">
            <label className="color">
              colorA <input type="color" value={colorA} onChange={(e) => setColorA(e.target.value)} />
            </label>
            <label className="color">
              colorB <input type="color" value={colorB} onChange={(e) => setColorB(e.target.value)} />
            </label>
          </div>
          <label className="slider">
            speed {speed.toFixed(2)}
            <input type="range" min="0" max="3" step="0.05" value={speed} onChange={(e) => setSpeed(+e.target.value)} />
          </label>
          <div className="panel__group">
            <span className="panel__label">colorSpace</span>
            <div className="segmented">
              {COLOR_SPACES.map((c) => (
                <button key={c} className={c === colorSpace ? 'active' : ''} onClick={() => setColorSpace(c)}>{c}</button>
              ))}
            </div>
          </div>
          <div className="panel__group">
            <span className="panel__label">이펙트 레이어 (토글)</span>
            <label className="check"><input type="checkbox" checked={trail} onChange={(e) => setTrail(e.target.checked)} /> CursorTrail</label>
            <label className="check"><input type="checkbox" checked={aberration} onChange={(e) => setAberration(e.target.checked)} /> ChromaticAberration</label>
            <label className="check"><input type="checkbox" checked={vignette} onChange={(e) => setVignette(e.target.checked)} /> Vignette</label>
            <label className="check"><input type="checkbox" checked={grain} onChange={(e) => setGrain(e.target.checked)} /> FilmGrain</label>
          </div>
        </aside>

        <Stage className="demo demo--tall">
          {baseEl}
          <CursorTrail colorA="#ffffff" colorB={colorB} opacity={0.6} blendMode="screen" visible={trail} />
          <ChromaticAberration strength={0.4} visible={aberration} />
          <Vignette intensity={0.6} visible={vignette} />
          <FilmGrain strength={0.35} visible={grain} />
        </Stage>
      </div>
    </Section>
  )
}
