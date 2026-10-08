import {
  ImageTexture, Halftone, Ascii, Dither, Duotone, Pixelate, CRTScreen, Glitch, Kaleidoscope,
} from 'shaders/react'
import Stage from '../components/Stage.jsx'
import Section from '../components/Section.jsx'

const FILTERS = [
  { name: 'Halftone', desc: '인쇄물 망점', el: <Halftone frequency={70} /> },
  { name: 'Ascii', desc: 'ASCII 아트', el: <Ascii cellSize={12} /> },
  { name: 'Dither', desc: '레트로 디더링', el: <Dither /> },
  { name: 'Duotone', desc: '브랜드 2색', el: <Duotone colorA="#1b1035" colorB="#ff7a59" /> },
  { name: 'Pixelate', desc: '픽셀화', el: <Pixelate /> },
  { name: 'CRTScreen', desc: '브라운관', el: <CRTScreen /> },
  { name: 'Glitch', desc: '글리치', el: <Glitch /> },
  { name: 'Kaleidoscope', desc: '만화경', el: <Kaleidoscope segments={8} /> },
]

/**
 * 활용 5 — 이미지 후처리 필터 갤러리
 * 같은 이미지에 서로 다른 Stylize/Adjustment 이펙트 하나씩만 붙인 예.
 */
export default function FilterGallery() {
  return (
    <Section
      id="filters"
      index={5}
      tag="Stylize · Adjustments"
      title="이미지 후처리 필터 갤러리"
      description="CSS filter로는 불가능한 스타일을 GPU에서 실시간으로. 사용자 업로드 이미지 미리보기, 아티스트 포트폴리오, 캠페인 페이지의 비주얼 톤 통일에 활용할 수 있습니다."
      points={['이미지 + 이펙트 1개 = 필터', '이펙트를 여러 개 쌓으면 체인', 'WebcamTexture / VideoTexture 에도 동일 적용']}
      code={`
<Shader className="aspect-square">
  <ImageTexture url="/images/portrait.jpg" objectFit="cover" />
  <Halftone frequency={70} />   {/* ← 이 줄만 바꾸면 다른 필터 */}
</Shader>`}
    >
      <div className="gallery">
        {FILTERS.map((f) => (
          <figure key={f.name} className="gallery__item">
            <Stage className="demo demo--square">
              <ImageTexture url="/images/portrait.jpg" objectFit="cover" />
              {f.el}
            </Stage>
            <figcaption>
              <code>{`<${f.name} />`}</code>
              <span>{f.desc}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
