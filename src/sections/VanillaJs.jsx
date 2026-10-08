import { useEffect, useRef, useState } from 'react'
import { createShader } from 'shaders/js'
import Section from '../components/Section.jsx'

const PRESET = {
  components: [
    { type: 'Plasma', id: 'bg', props: { colorA: '#0368ff', colorB: '#0b0a12', speed: 1 } },
    { type: 'Pixelate', id: 'px', props: { scale: 40 } },
    { type: 'Vignette', props: { intensity: 0.6 } },
  ],
}

/**
 * 활용 11 — 프레임워크 없이 (shaders/js)
 * JSON 프리셋 → createShader(canvas) 로 마운트, update(id, props) 로 런타임 변경.
 * 정적 사이트, CMS, Web Component, 레거시 페이지에 붙일 때 사용.
 */
export default function VanillaJs() {
  const canvasRef = useRef(null)
  const shaderRef = useRef(null)
  const [error, setError] = useState(null)
  const [pixel, setPixel] = useState(40)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    let disposed = false
    const canvas = canvasRef.current
    const container = canvas.parentElement

    createShader(canvas, PRESET, { onError: (reason) => setError(String(reason)) })
      .then((instance) => {
        if (disposed) return instance.destroy()
        shaderRef.current = instance
        const { width, height } = container.getBoundingClientRect()
        instance.resize(width, height)
      })
      .catch((e) => setError(String(e?.message ?? e)))

    // createShader 는 생성 시점의 크기를 px 로 고정하므로, 반응형으로 쓰려면 컨테이너 크기를 따라 resize()
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      shaderRef.current?.resize(width, height)
    })
    observer.observe(container)

    return () => {
      disposed = true
      observer.disconnect()
      shaderRef.current?.destroy()
      shaderRef.current = null
    }
  }, [])

  const onPixel = (v) => {
    setPixel(v)
    shaderRef.current?.update('px', { scale: v })
  }

  const togglePause = () => {
    if (paused) shaderRef.current?.resume()
    else shaderRef.current?.pause()
    setPaused(!paused)
  }

  return (
    <Section
      id="vanilla"
      index={11}
      tag="shaders/js · JSON preset"
      title="프레임워크 없이 순수 JavaScript로"
      description="React/Vue 없이도 <canvas> 하나와 JSON 프리셋으로 동작합니다. 디자인 에디터(shaders.com)에서 내보낸 프리셋을 그대로 넣거나, CMS 데이터로 효과를 구성할 때 유용합니다."
      points={['createShader(canvas, preset)', "instance.update('px', { scale })", 'pause() / resume() / destroy()']}
      code={`
import { createShader } from 'shaders/js'

const shader = await createShader(document.querySelector('canvas'), {
  components: [
    { type: 'Plasma',   id: 'bg', props: { colorA: '#0368ff', colorB: '#0b0a12' } },
    { type: 'Pixelate', id: 'px', props: { scale: 40 } },
    { type: 'Vignette', props: { intensity: 0.6 } },
  ],
})

new ResizeObserver(([e]) => shader.resize(e.contentRect.width, e.contentRect.height))
  .observe(container)                  // 반응형 크기

shader.update('px', { scale: 20 })   // 런타임 prop 변경
shader.pause()                         // 애니메이션 정지
shader.destroy()                       // 정리`}
    >
      <div className="controls">
        <button className="btn btn--sm" onClick={togglePause}>{paused ? '▶ resume()' : '❚❚ pause()'}</button>
        <label className="slider slider--grow">
          update(&apos;px&apos;, {'{'} scale: {pixel} {'}'})
          <input type="range" min="1" max="120" step="1" value={pixel} onChange={(e) => onPixel(+e.target.value)} />
        </label>
      </div>
      <div className="stage demo demo--wide">
        <canvas ref={canvasRef} className="stage__shader" />
        {error && (
          <div className="stage__fallback">
            <strong>WebGPU를 사용할 수 없습니다</strong>
            <span>{error}</span>
          </div>
        )}
      </div>
    </Section>
  )
}
