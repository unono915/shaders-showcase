import { useState } from 'react'
import { ImageTexture, CursorRipples, Liquify, GridDistortion, PixelThrow } from 'shaders/react'
import Stage from '../components/Stage.jsx'
import Section from '../components/Section.jsx'

const EFFECTS = {
  CursorRipples: { label: '물결', el: <CursorRipples intensity={14} radius={0.6} /> },
  Liquify: { label: '액체 밀기', el: <Liquify /> },
  GridDistortion: { label: '그리드 왜곡', el: <GridDistortion /> },
  PixelThrow: { label: '픽셀 흩뿌리기', el: <PixelThrow /> },
}

/**
 * 활용 3 — 이미지 위 커서 인터랙션
 * 이미지 다음에 인터랙티브 이펙트를 형제로 두면, 이펙트가 이미지를 입력으로 받아 변형한다.
 */
export default function CursorEffects() {
  const [effect, setEffect] = useState('CursorRipples')

  return (
    <Section
      id="cursor"
      index={3}
      tag="Interactive · Image"
      title="커서에 반응하는 이미지"
      description="제품 상세·포트폴리오 썸네일에 마우스를 올리면 물결이 퍼지거나 액체처럼 밀리는 효과. 이펙트는 앞에 그려진 레이어(이미지)를 입력으로 받습니다."
      points={['ImageTexture → 이펙트 순서로 배치', '이펙트 컴포넌트 하나만 교체', '별도 이벤트 코드 불필요']}
      code={`
<Shader className="h-96">
  <ImageTexture url="/images/city.jpg" objectFit="cover" />
  <${effect} />
</Shader>`}
    >
      <div className="controls">
        <div className="segmented">
          {Object.entries(EFFECTS).map(([k, v]) => (
            <button key={k} className={k === effect ? 'active' : ''} onClick={() => setEffect(k)}>
              {v.label}
            </button>
          ))}
        </div>
        <span className="hint">← 이미지 위에서 마우스를 움직여 보세요</span>
      </div>
      <Stage className="demo demo--wide" key={effect}>
        <ImageTexture url="/images/city.jpg" objectFit="cover" />
        {EFFECTS[effect].el}
      </Stage>
    </Section>
  )
}
