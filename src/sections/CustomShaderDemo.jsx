import { useState } from 'react'
import { CustomShader, ImageTexture, SolidColor } from 'shaders/react'
import { defineShader, wgsl, transformColor, transformPosition } from 'shaders/std'
import Stage from '../components/Stage.jsx'
import Section from '../components/Section.jsx'

/** 제너레이터: 시간에 따라 퍼져나가는 동심원 링 (공식 가이드 예제 기반) */
const Halo = defineShader({
  name: 'Halo',
  animatedTime: { speed: 'speed' },
  props: {
    color: { default: '#ffd166', transform: transformColor },
    center: { default: { x: 0.5, y: 0.5 }, transform: transformPosition },
    radius: { default: 0.6 },
    rings: { default: 24 },
    speed: { default: 1 },
  },
  paint: wgsl`
    let d = length((uv - center) * vec2f(aspect, 1.0)) / radius;
    let ring = 0.5 + 0.5 * cos(d * rings - time * 2.0);
    return vec4f(color.rgb, ring * (1.0 - smoothstep(0.7, 1.0, d)));
  `,
})

/** 이펙트: 앞 레이어(child)를 흑백으로 만들고, 지정한 원 안쪽만 원래 색을 남긴다 */
const ColorSpot = defineShader({
  name: 'ColorSpot',
  props: {
    center: { default: { x: 0.5, y: 0.5 }, transform: transformPosition },
    radius: { default: 0.25 },
  },
  effect: wgsl`
    let d = length((uv - center) * vec2f(aspect, 1.0));
    let gray = vec3f(dot(child.rgb, vec3f(0.2126, 0.7152, 0.0722)));
    let keep = 1.0 - smoothstep(radius * 0.7, radius, d);
    return vec4f(mix(gray, child.rgb, keep), child.a);
  `,
})

/**
 * 활용 10 — 직접 만든 WGSL 컴포넌트
 * defineShader 로 정의 → <CustomShader src={...}> 로 다른 컴포넌트와 똑같이 사용.
 * 커스텀 prop 에도 동적 드라이버(mouse-position 등)가 그대로 동작한다.
 */
export default function CustomShaderDemo() {
  const [rings, setRings] = useState(24)
  const [spot, setSpot] = useState(0.25)

  return (
    <Section
      id="custom"
      index={10}
      tag="defineShader · WGSL"
      title="나만의 셰이더 컴포넌트 만들기"
      description="200개로 부족하면 직접 작성합니다. 픽셀 하나의 색을 반환하는 WGSL 본문만 쓰면 되고, props·uv·time·aspect 가 자동으로 주입됩니다. 만든 컴포넌트에도 블렌딩·마스크·동적 prop이 모두 적용됩니다."
      points={['paint: 혼자 그리는 제너레이터', 'effect: child(앞 레이어 색)를 받아 변형', '<CustomShader src={Def} /> 로 마운트']}
      code={`
import { defineShader, wgsl, transformColor, transformPosition } from 'shaders/std'

const ColorSpot = defineShader({
  name: 'ColorSpot',
  props: {
    center: { default: { x: 0.5, y: 0.5 }, transform: transformPosition },
    radius: { default: 0.25 },
  },
  effect: wgsl\`
    let d = length((uv - center) * vec2f(aspect, 1.0));
    let gray = vec3f(dot(child.rgb, vec3f(0.2126, 0.7152, 0.0722)));
    let keep = 1.0 - smoothstep(radius * 0.7, radius, d);
    return vec4f(mix(gray, child.rgb, keep), child.a);
  \`,
})

<Shader>
  <ImageTexture url="/images/nature.jpg" />
  <CustomShader src={ColorSpot} radius={0.25}
    center={{ type: 'mouse-position', smoothing: 0.12 }} />
</Shader>`}
    >
      <div className="gallery gallery--2">
        <figure className="gallery__item">
          <div className="controls controls--tight">
            <label className="slider slider--grow">
              rings {rings}
              <input type="range" min="4" max="60" step="1" value={rings} onChange={(e) => setRings(+e.target.value)} />
            </label>
          </div>
          <Stage className="demo demo--wide">
            <SolidColor color="#0b0a12" />
            <CustomShader src={Halo} color="#ffd166" rings={rings} radius={0.8} />
            <CustomShader
              src={Halo}
              color="#ff4fba"
              rings={rings * 0.5}
              radius={0.45}
              speed={-1.5}
              blendMode="screen"
              center={{ type: 'mouse-position', smoothing: 0.08 }}
            />
          </Stage>
          <figcaption><code>Halo (paint)</code><span>제너레이터 2개 + screen 블렌딩, 분홍 링은 커서 추적</span></figcaption>
        </figure>

        <figure className="gallery__item">
          <div className="controls controls--tight">
            <label className="slider slider--grow">
              radius {spot.toFixed(2)}
              <input type="range" min="0.05" max="0.6" step="0.01" value={spot} onChange={(e) => setSpot(+e.target.value)} />
            </label>
          </div>
          <Stage className="demo demo--wide">
            <ImageTexture url="/images/nature.jpg" objectFit="cover" />
            <CustomShader src={ColorSpot} radius={spot} center={{ type: 'mouse-position', smoothing: 0.12 }} />
          </Stage>
          <figcaption><code>ColorSpot (effect)</code><span>커서 주변만 컬러로 남기는 이펙트</span></figcaption>
        </figure>
      </div>
    </Section>
  )
}
