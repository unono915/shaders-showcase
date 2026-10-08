import { useState } from 'react'
import { Shader } from 'shaders/react'

/**
 * <Shader> 래퍼.
 * - 캔버스 크기는 반드시 CSS로 지정 (Shader 자체에는 크기가 없음)
 * - WebGPU를 지원하지 않는 브라우저에서는 onUnavailable 로 대체 화면을 보여준다
 */
export default function Stage({ className = '', style, children, fallback, ...rest }) {
  const [unavailable, setUnavailable] = useState(null)

  return (
    <div className={`stage ${className}`} style={style}>
      <Shader
        className="stage__shader"
        onUnavailable={(reason) => setUnavailable(reason)}
        {...rest}
      >
        {children}
      </Shader>
      {unavailable && (
        <div className="stage__fallback">
          {fallback ?? (
            <>
              <strong>WebGPU를 사용할 수 없습니다</strong>
              <span>Chrome/Edge 최신 버전에서 열어주세요 ({String(unavailable)})</span>
            </>
          )}
        </div>
      )}
    </div>
  )
}
