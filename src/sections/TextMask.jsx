import { useState } from 'react'
import { Text, Aurora, Plasma, Swirl, SolidColor, Glow } from 'shaders/react'
import Stage from '../components/Stage.jsx'
import Section from '../components/Section.jsx'

const FILLS = {
  Aurora: <Aurora colorA="#a533f8" colorB="#22ee88" colorC="#1694e8" speed={6} maskSource="headline" />,
  Plasma: <Plasma colorA="#ff2b6e" colorB="#1a0533" speed={1.5} maskSource="headline" />,
  Swirl: <Swirl colorA="#0368ff" colorB="#ffcf5c" speed={1.2} maskSource="headline" />,
}

/**
 * 활용 2 — 타이포그래피 마스킹
 * Text 레이어를 visible={false} 로 숨기고 id 를 부여 → 다른 레이어의 maskSource 로 사용.
 */
export default function TextMask() {
  const [fill, setFill] = useState('Aurora')
  const [word, setWord] = useState('SHADERS')

  return (
    <Section
      id="text-mask"
      index={2}
      tag="Masking · Typography"
      title="텍스트 모양으로 애니메이션 채우기"
      description="숨긴 Text 레이어를 마스크로 사용해 오로라·플라즈마 같은 움직이는 텍스처를 글자 안에만 그립니다. 브랜드 로고, 섹션 타이틀에 활용하기 좋습니다."
      points={['Text에 id + visible={false}', '채울 레이어에 maskSource="id"', 'Glow 이펙트로 번짐 추가']}
      code={`
<Shader className="h-64">
  <SolidColor color="#07060b" />
  <Text id="headline" visible={false} text="SHADERS"
        fontFamily="Space Grotesk" fontWeight={700} fontSize={0.42} />
  <Aurora speed={6} maskSource="headline" />
  <Glow intensity={0.6} />
</Shader>`}
    >
      <div className="controls">
        <div className="segmented">
          {Object.keys(FILLS).map((k) => (
            <button key={k} className={k === fill ? 'active' : ''} onClick={() => setFill(k)}>
              {k}
            </button>
          ))}
        </div>
        <input
          className="text-input"
          value={word}
          maxLength={12}
          onChange={(e) => setWord(e.target.value || ' ')}
          aria-label="표시할 단어"
        />
      </div>
      <Stage className="demo demo--wide">
        <SolidColor color="#07060b" />
        <Text
          id="headline"
          visible={false}
          text={word}
          fontFamily="Space Grotesk"
          fontWeight={700}
          fontSize={0.42}
          letterSpacing={-0.02}
        />
        {FILLS[fill]}
        <Glow intensity={0.6} />
      </Stage>
    </Section>
  )
}
