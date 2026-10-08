import { RadialGradient, LiquidMetal, Neon, Crystal, Holographic, StudioBackground } from 'shaders/react'
import Stage from '../components/Stage.jsx'
import Section from '../components/Section.jsx'

const AUTO_SPIN = { type: 'auto-animate', mode: 'loop', outputMin: 0, outputMax: 360, speed: 0.15 }

const CARDS = [
  {
    name: 'LiquidMetal',
    desc: '흐르는 액체 크롬',
    code: "<LiquidMetal shape={{ type: 'torus3D' }} />",
    el: <LiquidMetal shape={{ type: 'torus3D', radius: 0.26, tube: 0.1 }} rotation={AUTO_SPIN} />,
  },
  {
    name: 'Neon',
    desc: '네온 튜브',
    code: "<Neon shape={{ type: 'starSDF', sides: 5 }} />",
    el: <Neon shape={{ type: 'starSDF', radius: 0.32, sides: 5, innerRatio: 0.5 }} color="#ff4fba" glowColor="#ff4fba" />,
  },
  {
    name: 'Crystal',
    desc: '보석 / 크리스탈',
    code: "<Crystal shape={{ type: 'gem3D' }} />",
    el: <Crystal shape={{ type: 'gem3D' }} rotation={AUTO_SPIN} />,
  },
  {
    name: 'Holographic',
    desc: '홀로그램 포일',
    code: "<Holographic shape={{ type: 'blob3D' }} />",
    el: <Holographic shape={{ type: 'blob3D' }} />,
  },
]

/**
 * 활용 7 — 3D 느낌의 오브젝트 / 아이콘
 * Shape Effect 는 shape prop(2D SDF 또는 3D 솔리드) 안에 재질을 그린다.
 */
export default function ShapeEffects() {
  return (
    <Section
      id="shapes"
      index={7}
      tag="Shape Effects · 3D"
      title="3D 재질 오브젝트"
      description="Three.js 없이도 크롬·네온·크리스탈·홀로그램 재질의 3D 오브젝트를 만들 수 있습니다. 피처 카드 아이콘, 제품 소개 섹션의 포인트 비주얼에 적합합니다."
      points={['shape: circleSDF, starSDF, roundedRectSDF …', 'shape: sphere3D, torus3D, gem3D, blob3D …', 'rotation 에 auto-animate 로 회전']}
      code={`
<Shader className="aspect-square">
  <StudioBackground />
  <LiquidMetal
    shape={{ type: 'torus3D', radius: 0.26, tube: 0.1 }}
    rotation={{ type: 'auto-animate', mode: 'loop', outputMin: 0, outputMax: 360, speed: 0.15 }}
  />
</Shader>`}
    >
      <div className="gallery gallery--4">
        {CARDS.map((c) => (
          <figure key={c.name} className="gallery__item">
            <Stage className="demo demo--square">
              {c.name === 'Neon' ? (
                <RadialGradient colorA="#1a0820" colorB="#050308" radius={0.9} />
              ) : (
                <StudioBackground />
              )}
              {c.el}
            </Stage>
            <figcaption>
              <code>{c.code}</code>
              <span>{c.desc}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
