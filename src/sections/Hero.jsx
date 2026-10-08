import { MeshGradient, SimplexNoise, CursorTrail, FilmGrain } from 'shaders/react'
import Stage from '../components/Stage.jsx'

/**
 * 활용 1 — 랜딩 페이지 히어로 배경
 * 제너레이터(MeshGradient, SimplexNoise)를 형제로 쌓고, 커서 트레일을 맨 위에 올린다.
 * 텍스트는 일반 HTML이고 캔버스는 absolute 로 뒤에 깔린다.
 */
export default function Hero() {
  return (
    <header className="hero" id="top">
      <Stage className="hero__bg">
        <MeshGradient
          stops={[
            { color: '#12002b', position: 0 },
            { color: '#5b2bd6', position: 0.3 },
            { color: '#ff4fba', position: 0.55 },
            { color: '#ff8a5c', position: 0.8 },
            { color: '#ffe29a', position: 1 },
          ]}
          colorSpace="oklab"
          count={6}
          swirl={0.5}
          speed={0.5}
        />
        <SimplexNoise scale={3} speed={0.4} opacity={0.15} blendMode="softLight" />
        <CursorTrail colorA="#ffffff" colorB="#ff4fba" radius={0.35} length={0.45} opacity={0.55} blendMode="screen" />
        <FilmGrain strength={0.25} />
      </Stage>

      <div className="hero__content">
        <span className="hero__eyebrow">shader-effects-inc/shaders · WebGPU</span>
        <h1>
          웹을 위한 GPU 그래픽,
          <br />
          컴포넌트처럼 쌓아 올리기
        </h1>
        <p>
          <code>{'<Shader>'}</code> 안에 레이어를 넣으면 끝. 그라디언트·노이즈·글래스·왜곡·트랜지션·커서 효과 등
          200개 이상의 이펙트를 React 컴포넌트로 조합하는 11가지 활용 예제입니다. 마우스를 움직여 보세요.
        </p>
        <div className="hero__cta">
          <a href="#playground" className="btn btn--primary">플레이그라운드로 이동</a>
          <a href="https://github.com/shader-effects-inc/shaders" className="btn" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </header>
  )
}

