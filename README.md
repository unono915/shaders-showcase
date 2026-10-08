# Shaders Showcase

[shader-effects-inc/shaders](https://github.com/shader-effects-inc/shaders) (npm `shaders`, MIT)를 활용한 예제 웹 페이지입니다.
WebGPU 이펙트를 React 컴포넌트로 조합하는 11가지 활용 패턴을 한 페이지에 모았습니다.

**Live demo:** https://shaders-showcase-kappa.vercel.app

## 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ 로 정적 빌드
```

> WebGPU 지원 브라우저가 필요합니다 (Chrome/Edge 113+ 권장). 미지원 환경에서는 각 데모에 안내 문구가 표시됩니다.

## 구성

| # | 섹션 | 파일 | 보여주는 패턴 |
|---|------|------|---------------|
| 01 | 히어로 배경 | `src/sections/Hero.jsx` | 제너레이터 형제 스택 + 블렌드 모드 + CursorTrail + FilmGrain, HTML 텍스트 오버레이 |
| 02 | 텍스트 마스킹 | `TextMask.jsx` | 숨긴 `Text` 레이어를 `maskSource`로 사용, Aurora/Plasma/Swirl로 글자 채우기 |
| 03 | 커서 인터랙션 | `CursorEffects.jsx` | 이미지 + CursorRipples / Liquify / GridDistortion / PixelThrow |
| 04 | 유리 렌즈 | `GlassLens.jsx` | `Glass` 셰이프 이펙트 + `mouse-position` 동적 prop, 2D SDF / 3D 셰이프 |
| 05 | 필터 갤러리 | `FilterGallery.jsx` | Halftone, Ascii, Dither, Duotone, Pixelate, CRT, Glitch, Kaleidoscope |
| 06 | 슬라이더 트랜지션 | `Transitions.jsx` | 트랜지션 이펙트 안에 현재 이미지를 중첩, `progress`를 React state로 구동 |
| 07 | 3D 재질 | `ShapeEffects.jsx` | LiquidMetal / Neon / Crystal / Holographic + `auto-animate` 회전 |
| 08 | 플레이그라운드 | `Playground.jsx` | 컬러 피커·슬라이더 → prop 바인딩, `visible` 토글, JSX 코드 실시간 생성 |
| 09 | 동적 Prop | `DynamicProps.jsx` | `auto-animate`, `mouse-position`, `mouse`(축 매핑) |
| 10 | 커스텀 셰이더 | `CustomShaderDemo.jsx` | `defineShader` + WGSL로 제너레이터(paint)·이펙트(effect) 직접 작성 |
| 11 | Vanilla JS | `VanillaJs.jsx` | `shaders/js`의 `createShader(canvas, preset)`, `update / pause / resume / resize` |

공통 컴포넌트

- `src/components/Stage.jsx` — `<Shader>` 래퍼. CSS로 크기 지정 + `onUnavailable`로 WebGPU 미지원 대체 화면
- `src/components/Section.jsx`, `CodeBlock.jsx` — 섹션 레이아웃과 복사 가능한 코드 블록

## 핵심 규칙 (작업하며 확인한 것)

- `<Shader>`의 첫 자식이 맨 아래 레이어. 이펙트(Blur, Glass, 트랜지션 등)는 **앞에 그려진 레이어**를 입력으로 받습니다.
- 특정 레이어에만 이펙트를 걸 때만 중첩합니다 (예: 트랜지션 안에 "사라질 이미지"만 넣기).
- `MeshGradient`는 기본값으로 5색 `stops` 팔레트를 씁니다. `colorA/colorB`만 쓰려면 `stops={null}`을 넘겨야 합니다.
- `Glass`는 `innerZoom`, `thickness`, `fresnel`, `highlight`를 함께 주면 렌즈가 훨씬 또렷하게 보입니다.
- `createShader`(vanilla)는 생성 시점의 캔버스 크기를 px로 고정하므로, 반응형이면 `ResizeObserver` + `resize()`가 필요합니다.
- 레이어를 끌 때는 `opacity={0}`보다 `visible={false}`가 저렴합니다.

## 더 보기

- 컴포넌트 전체 목록·prop: https://shaders.com/docs/components
- 디자인 에디터(시각적으로 만들고 코드 내보내기): https://shaders.com/design-editor
- 커스텀 셰이더 가이드: https://shaders.com/docs/guide/custom-shaders

샘플 이미지: Unsplash (picsum.photos 경유)
