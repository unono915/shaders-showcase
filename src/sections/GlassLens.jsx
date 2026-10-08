import { useState } from 'react'
import { ImageTexture, Glass, Vignette } from 'shaders/react'
import Stage from '../components/Stage.jsx'
import Section from '../components/Section.jsx'

const SHAPES = {
  원형: { type: 'circleSDF', radius: 0.28 },
  사각형: { type: 'roundedRectSDF', radius: 0.32, height: 0.2 },
  별: { type: 'starSDF', radius: 0.34, sides: 5, innerRatio: 0.5 },
  구체3D: { type: 'sphere3D', radius: 0.3 },
}

/**
 * 활용 4 — 커서를 따라다니는 유리 렌즈
 * Glass 는 앞에 그려진 모든 것을 굴절시킨다. center 에 mouse-position 드라이버를 연결.
 */
export default function GlassLens() {
  const [shape, setShape] = useState('원형')
  const [aberration, setAberration] = useState(0.5)

  return (
    <Section
      id="glass"
      index={4}
      tag="Shape Effect · Dynamic Prop"
      title="커서를 따라다니는 유리 렌즈"
      description="Glass 셰이프 이펙트에 mouse-position 동적 prop을 연결하면 애니메이션 코드 없이 렌즈가 마우스를 부드럽게 따라옵니다. 이미지 돋보기, 히어로 장식에 활용."
      points={["center={{ type: 'mouse-position' }}", 'shape 에 2D SDF / 3D 솔리드 지정', 'aberration 으로 색수차']}
      code={`
<Shader className="h-96">
  <ImageTexture url="/images/nature.jpg" objectFit="cover" />
  <Glass
    shape={${JSON.stringify(SHAPES[shape])}}
    center={{ type: 'mouse-position', smoothing: 0.15, momentum: 0.2 }}
    refraction={1}
    thickness={0.6}
    innerZoom={1.4}      // 렌즈 안쪽 확대 (돋보기)
    fresnel={0.3}
    aberration={${aberration}}
  />
</Shader>`}
    >
      <div className="controls">
        <div className="segmented">
          {Object.keys(SHAPES).map((k) => (
            <button key={k} className={k === shape ? 'active' : ''} onClick={() => setShape(k)}>
              {k}
            </button>
          ))}
        </div>
        <label className="slider">
          색수차 {aberration.toFixed(2)}
          <input type="range" min="0" max="1" step="0.01" value={aberration}
            onChange={(e) => setAberration(+e.target.value)} />
        </label>
      </div>
      <Stage className="demo demo--wide">
        <ImageTexture url="/images/nature.jpg" objectFit="cover" />
        <Vignette intensity={0.4} />
        <Glass
          shape={SHAPES[shape]}
          center={{ type: 'mouse-position', smoothing: 0.15, momentum: 0.2 }}
          refraction={1}
          thickness={0.6}
          innerZoom={1.4}
          fresnel={0.3}
          highlight={0.25}
          aberration={aberration}
        />
      </Stage>
    </Section>
  )
}
