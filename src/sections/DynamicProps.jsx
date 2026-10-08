import { LinearGradient, Circle, RadialGradient, ImageTexture, Blur, SolidColor, Ring } from 'shaders/react'
import Stage from '../components/Stage.jsx'
import Section from '../components/Section.jsx'

/**
 * 활용 9 — 동적 Prop 드라이버
 * 숫자/좌표 prop 자리에 { type: ... } 객체를 넣으면 애니메이션/마우스 연동이 선언적으로 된다.
 */
export default function DynamicProps() {
  return (
    <Section
      id="dynamic"
      index={9}
      tag="Dynamic Props"
      title="코드 없는 애니메이션 · 마우스 연동"
      description="requestAnimationFrame이나 이벤트 리스너 없이 prop 값 자체에 드라이버를 지정합니다. 로딩 인디케이터, 스포트라이트, 스크롤/커서 기반 블러 등에 활용."
      code={`
// 1) auto-animate: 숨긴 원으로 마스크 → 반지름이 커졌다 작아짐
<Circle id="reveal" visible={false} softness={0.2}
  radius={{ type: 'auto-animate', mode: 'ping-pong', outputMin: 0.15, outputMax: 1.4, speed: 0.5 }} />
<LinearGradient colorA="#0f172a" colorB="#7c3aed" maskSource="reveal" />

// 2) mouse-position: 그라디언트 중심이 커서를 따라감
<RadialGradient center={{ type: 'mouse-position', smoothing: 0.1 }} />

// 3) mouse: 커서 X축 → 블러 강도 0~40
<Blur intensity={{ type: 'mouse', axis: 'x', outputMin: 0, outputMax: 40, smoothing: 0.1 }} />`}
    >
      <div className="gallery gallery--3">
        <figure className="gallery__item">
          <Stage className="demo demo--square">
            <SolidColor color="#07060b" />
            <Circle
              id="reveal"
              visible={false}
              softness={0.2}
              radius={{ type: 'auto-animate', mode: 'ping-pong', outputMin: 0.15, outputMax: 1.4, speed: 0.5 }}
            />
            <LinearGradient colorA="#0f172a" colorB="#7c3aed" angle={45} colorSpace="oklch" maskSource="reveal" />
            <Ring
              color="#ffffff"
              thickness={0.02}
              opacity={0.6}
              radius={{ type: 'auto-animate', mode: 'loop', outputMin: 0.1, outputMax: 1.6, speed: 0.6 }}
            />
          </Stage>
          <figcaption><code>auto-animate</code><span>자동 반복 애니메이션</span></figcaption>
        </figure>

        <figure className="gallery__item">
          <Stage className="demo demo--square">
            <RadialGradient
              colorA="#ffd166"
              colorB="#0b0a12"
              radius={0.9}
              colorSpace="oklab"
              center={{ type: 'mouse-position', smoothing: 0.1, momentum: 0.2 }}
            />
          </Stage>
          <figcaption><code>mouse-position</code><span>스포트라이트 (커서 추적)</span></figcaption>
        </figure>

        <figure className="gallery__item">
          <Stage className="demo demo--square">
            <ImageTexture url="/images/portrait.jpg" objectFit="cover" />
            <Blur intensity={{ type: 'mouse', axis: 'x', outputMin: 0, outputMax: 40, smoothing: 0.1 }} />
          </Stage>
          <figcaption><code>mouse (axis: x)</code><span>왼쪽 ↔ 오른쪽으로 블러 조절</span></figcaption>
        </figure>
      </div>
    </Section>
  )
}
