import { useEffect, useRef, useState } from 'react'
import {
  ImageTexture, NoiseDissolve, LinearWipe, IrisWipe, RippleWipe, BlockDissolve, VenetianBlinds, SliceWipe,
} from 'shaders/react'
import Stage from '../components/Stage.jsx'
import Section from '../components/Section.jsx'

const TRANSITIONS = { NoiseDissolve, LinearWipe, IrisWipe, RippleWipe, BlockDissolve, VenetianBlinds, SliceWipe }

/**
 * 활용 6 — 이미지 슬라이더 트랜지션
 * 다음 이미지(B)를 바닥에 두고, 현재 이미지(A)를 트랜지션 이펙트 '안에' 중첩한다.
 * → 트랜지션이 A만 지우고 B가 드러난다. progress 는 React state 로 구동.
 */
export default function Transitions() {
  const [name, setName] = useState('NoiseDissolve')
  const [progress, setProgress] = useState(0.35)
  const [playing, setPlaying] = useState(false)
  const raf = useRef(0)

  useEffect(() => {
    if (!playing) return
    const start = performance.now()
    const from = progress >= 1 ? 0 : progress
    const tick = (now) => {
      const p = Math.min(1, from + (now - start) / 1600)
      setProgress(p)
      if (p < 1) raf.current = requestAnimationFrame(tick)
      else setPlaying(false)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing])

  const Transition = TRANSITIONS[name]

  return (
    <Section
      id="transitions"
      index={6}
      tag="Transitions · State-driven"
      title="이미지 슬라이더 트랜지션"
      description="캐러셀·스토리·페이지 전환을 GPU 트랜지션으로. progress prop을 상태로 제어하면 스크롤, 타이머, 드래그 등 어떤 입력과도 연결할 수 있습니다."
      points={['바닥: 다음 이미지', '트랜지션 안에 중첩: 현재 이미지', 'progress 0 → 1 로 애니메이션']}
      code={`
const [progress, setProgress] = useState(0)

<Shader className="h-96">
  <ImageTexture url="/images/ocean.jpg" />           {/* 다음 장면 */}
  <${name} progress={progress}>
    <ImageTexture url="/images/city.jpg" />          {/* 현재 장면 (사라짐) */}
  </${name}>
</Shader>`}
    >
      <div className="controls">
        <div className="segmented segmented--wrap">
          {Object.keys(TRANSITIONS).map((k) => (
            <button key={k} className={k === name ? 'active' : ''} onClick={() => setName(k)}>
              {k}
            </button>
          ))}
        </div>
      </div>
      <div className="controls">
        <button className="btn btn--primary btn--sm" onClick={() => { setProgress(0); setPlaying(true) }}>
          ▶ 재생
        </button>
        <label className="slider slider--grow">
          progress {progress.toFixed(2)}
          <input type="range" min="0" max="1" step="0.001" value={progress}
            onChange={(e) => { setPlaying(false); setProgress(+e.target.value) }} />
        </label>
      </div>
      <Stage className="demo demo--wide">
        <ImageTexture url="/images/ocean.jpg" objectFit="cover" />
        <Transition progress={progress}>
          <ImageTexture url="/images/city.jpg" objectFit="cover" />
        </Transition>
      </Stage>
    </Section>
  )
}
