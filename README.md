# 🗂️ SON WOOSUK — Portfolio One Page

> "Easy on the eyes, hard to forget." — 인터랙션으로 작업물을 보여주는 개인 포트폴리오 원페이지

[![Vercel](https://img.shields.io/badge/배포-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://new-chat-ruby-six.vercel.app)
[![React](https://img.shields.io/badge/React%2019-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite%208-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=black)](https://gsap.com)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white)](https://threejs.org)

---

## 📌 프로젝트 소개

**React + Vite**로 제작한 개인 포트폴리오 원페이지입니다.
자기소개부터 스킬, 작업 프로세스, 실제 작업물까지를 스크롤 하나로 훑어보는 흐름으로 구성했고, GSAP ScrollSmoother · ScrollTrigger와 Matter.js, Three.js(React Three Fiber)를 조합해 각 섹션마다 다른 인터랙션을 붙였습니다. 작업물을 클릭하면 각 프로젝트 README를 발췌한 세부 페이지로 이동해, 실제 작업 내용과 라이브 사이트를 함께 확인할 수 있습니다.

**→ [new-chat-ruby-six.vercel.app](https://new-chat-ruby-six.vercel.app)**

---

## 🖼️ 미리보기

| Hero | About Me |
|:---:|:---:|
| ![Hero](public/docs/readme/desktop-hero.jpg) | ![About Me](public/docs/readme/desktop-about.jpg) |

**Mobile**

<img src="public/docs/readme/mobile-hero.jpg" width="280">

---

## ⚠️ 주의사항

- 커서 트레일(Playground), 커스텀 커서 등 hover 기반 인터랙션은 데스크톱 전용이며, 터치 기기에서는 자동으로 제외되거나 two-tap 방식으로 대체됩니다.
- 포트폴리오 표(주요 기능) 섹션은 데스크톱에서 Matter.js 물리 낙하 연출이 있어 초기 로드 시 다소 무겁게 느껴질 수 있습니다. 모바일에서는 이 연출을 생략하고 완성된 표를 바로 보여줍니다.
- 작업물 상세 데이터(`src/data/works.js`)는 실제 각 프로젝트 README에서 발췌해 채운 내용이며, 임의로 지어낸 소개 문구는 없습니다.

---

## 📋 프로젝트 정보

| 항목 | 내용 |
|:---:|:---|
| 담당 역할 | 기획 / 디자인 / 퍼블리싱 / 인터랙션 구현 |
| 작업 기간 | 2026.07.13 ~ 2026.07.15 (3일) |
| 기여도 | 100% (개인 프로젝트) |

---

## 🛠️ 기술 스택

**Frontend**

![React](https://img.shields.io/badge/React%2019-61DAFB?style=flat-square&logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React%20Router%207-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js%20%2F%20R3F-000000?style=flat-square&logo=threedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

**빌드 / 배포**

![Vite](https://img.shields.io/badge/Vite%208-646CFF?style=flat-square&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

| 기술 | 용도 |
|:---|:---|
| GSAP ScrollSmoother · ScrollTrigger | 전체 관성 스크롤, 섹션 핀 고정, 스크럽 애니메이션 |
| React Three Fiber / OGL | 갤러리 3D 씬, WebGL 비주얼 |
| Matter.js | 포트폴리오 표 — 물리 낙하 후 재배열되는 연출 |
| React Router 7 | 랜딩(원페이지) ↔ 작품 세부(`/works/:slug`) 라우팅 |

---

## 🤖 AI 활용

### 사용한 AI 도구

- Claude Code (Anthropic)

### AI 활용 내용

- [x] 모바일 반응형 레이아웃 전면 적용 (`gsap.matchMedia`로 데스크톱/모바일 애니메이션 분리)
- [x] 터치 기기 two-tap hover 패턴 구현 (포트폴리오 표·매니페스토·웍스 갤러리)
- [x] 모바일에서 성립하지 않는 인터랙션(Playground 커서 트레일) 조건부 제외
- [x] 작품 세부 페이지 모바일 레이아웃 수정, 프로젝트 README 정리

### 직접 구현한 내용

- [ ] 전체 사이트 콘셉트·섹션 구성 기획 (인트로 → 어바웃미 → 매니페스토 → 스킬 → 프로세스 → 작업물)
- [ ] 실제 작업물 6종 기획·디자인·퍼블리싱 (락고재, GYEOL, 랜딩페이지 실험, 소셜 콘텐츠, 충남관광재단 클론, 여행 랜딩)
- [ ] 프리텐다드 타이포그래피, 사진·영상 소재 등 콘텐츠 확보

---

## 🔗 프로젝트 링크

| 구분 | 링크 |
|:---|:---|
| 배포 사이트 | [new-chat-ruby-six.vercel.app](https://new-chat-ruby-six.vercel.app) |
| GitHub | [github.com/Sonwoosuk/portfolio](https://github.com/Sonwoosuk/portfolio) |

---

## 📖 프로젝트 개요

보여주기식 갤러리가 아니라, 스크롤을 따라가는 동안 "누가 무엇을 어떻게 만들었는지"가 자연스럽게 읽히는 포트폴리오를 목표로 했습니다.

- **목표**: 자기소개 · 스킬 · 작업 프로세스 · 실제 작업물을 하나의 스크롤 흐름으로 연결
- **타겟**: 채용 담당자, 협업 파트너 등 포트폴리오를 처음 보는 사람
- **핵심 가치**: 절제된 톤 · 스크롤 인터랙션 · 실제 작업물 근거

---

## ✨ 주요 기능

섹션은 아래 순서로 이어집니다 (`src/pages/Landing.jsx` 기준).

| 섹션 | 설명 |
|:---|:---|
| Preloader → Hero | 로딩 후 collage 인트로, "Easy on the eyes, hard to forget." 태그라인 |
| 브랜드 마퀴 | 가로 스크롤 벨로시티 마퀴 |
| About Me | 워드필 리빌 — 스크롤에 따라 자기소개 문장이 한 단어씩 채워짐 |
| Manifesto | 글리치 텍스트 연출 |
| Skills | 룰렛 형태의 스킬 나열 |
| AI Capability | AI 도구 활용 역량을 톤온톤 타이포로 소개 |
| Process | 작업 프로세스 안내 |
| Services | 스택 카드형 서비스 소개 |
| Horizontal Works | 가로 스크롤 작업물 프리뷰 |
| Column Gallery | Three.js 기반 3D 그리드 티저 |
| Portfolio Chart | Matter.js 물리 낙하 → 조립되는 작업물 표, 클릭 시 상세 페이지 이동 |
| Playground | 커서 이미지 트레일 놀이 (데스크톱 전용) |
| Epilogue | 마무리 · Get in touch |
| Work Detail (`/works/:slug`) | 작업물별 세부 — 개요, 스택, 주요 기능 캡처, 핵심 구현, 라이브·GitHub 링크 |

---

## 🔧 핵심 구현 내용

**1. 전체 관성 스크롤**

- GSAP ScrollSmoother를 적용해 페이지 전체에 부드러운 관성 스크롤을 구현했습니다.
- 각 섹션의 핀 고정 애니메이션이 올바르게 동작하려면 스크롤러가 먼저 초기화되어야 하기 때문에, 준비 완료 이후 섹션을 렌더링하는 순서로 처리했습니다.

**2. Matter.js 물리 낙하 → 포트폴리오 표 조립**

- 포트폴리오 표 섹션에서 프로젝트 제목들이 화면 위로 흩어졌다가 스크롤에 맞춰 제자리로 조립되는 연출을 구현했습니다.
- 각 제목의 실제 화면 위치를 기준으로 물리 시뮬레이션을 실행하고, 완성 시점에 애니메이션으로 원위치로 복귀시켰습니다.
- 모바일에서는 물리 연출 없이 완성된 표를 바로 보여주어 성능과 터치 조작 모두 자연스럽게 유지했습니다.

**3. 작품 상세 → 목록 복귀 시 스크롤 위치 복원**

- 작품 세부 페이지에서 "목록으로" 돌아올 때, 포트폴리오 표가 이미 완성된 시점으로 자동 이동해 물리 낙하 애니메이션을 처음부터 다시 보지 않도록 처리했습니다.

**4. 터치 기기 대응**

- 모바일/터치 기기 여부를 감지해 hover 기반 인터랙션을 터치에 맞게 전환했습니다.
- 포트폴리오 표, 가로 스크롤 작업물 등에서 첫 탭은 hover 효과, 두 번째 탭은 페이지 이동으로 동작합니다.
- 커서 기반의 Playground 섹션은 터치 기기에서 항목째 제외했습니다.

---

## 🚧 Trouble Shooting

| 문제 | 원인 | 해결 |
|:---|:---|:---|
| 모바일에서 hover 인터랙션이 아예 동작하지 않음 | 터치 기기엔 마우스 hover 이벤트가 없음 | `matchMedia`로 터치 감지 후 two-tap 패턴(첫 탭 hover, 두 번째 탭 이동)으로 대체 |
| Playground 섹션이 모바일에서 의미 없이 빈 화면으로 표시 | 커서 기반 이미지 트레일이라 터치로는 재현 불가 | 모바일에서 섹션·메뉴 항목 자체를 조건부 렌더링에서 제외 |
| AI Capability 모바일에서 pill이 본문 텍스트를 가림 | 데스크톱 절대 위치 배치를 모바일에 그대로 사용 | 단일 좌측 정렬 기준선으로 재배치, pill을 노트 텍스트 아래로 스택 |
| Services 섹션 모바일에서 텍스트가 세로로 과하게 늘어남 | 데스크톱 레이아웃 비율을 그대로 상속 | 모바일 전용 CSS로 텍스트 높이를 제한하고 이미지를 바로 아래 배치 |
| 작품 상세 페이지 모바일 상단바가 잘림 | 데스크톱 라벨 텍스트 길이를 그대로 사용 | 모바일에서 한 줄 상단바로 축소, 개요 행을 세로로 스택 |

---

## 📁 프로젝트 구조

```
한다/
├── src/
│   ├── pages/
│   │   ├── Landing.jsx          # 원페이지 랜딩 — 전체 섹션 조립, ScrollSmoother
│   │   └── WorkDetail.jsx       # 작품 세부 페이지 (/works/:slug)
│   ├── components/              # 섹션별 컴포넌트 (Hero, AboutMe, Manifesto,
│   │                             #  Skills, AICapability, Process, Services,
│   │                             #  HorizontalWorks, ColumnGallery, PortfolioChart,
│   │                             #  Playground, Epilogue 등 각 CSS 동반)
│   ├── data/works.js            # 작품 세부 데이터 (각 프로젝트 README 발췌)
│   └── App.jsx                  # 라우팅 (/ , /works/:slug)
│
├── public/                      # 이미지·폰트·모델 등 정적 자산
├── vercel.json                  # SPA 라우팅 rewrite 설정
└── vite.config.js
```

---

## 🚀 실행 방법

```bash
# 1. 레포지토리 클론
git clone https://github.com/Sonwoosuk/portfolio.git

# 2. 의존성 설치
cd portfolio
npm install

# 3. 개발 서버 실행
npm run dev
```

---

## 📝 개선 예정

- [ ] SEO 메타태그(og:description, og:image 등) 보강
- [ ] 접근성(a11y) — 스크롤 기반 연출에 대한 `prefers-reduced-motion` 대응 확대
- [ ] 이미지 최적화(WebP 변환, lazy loading 범위 확대)

---

## 🪞 프로젝트 회고

**잘된 점**
- Matter.js 물리 낙하 + GSAP 조립 애니메이션 조합으로 포트폴리오 표에 독특한 인터랙션을 구현할 수 있었음
- `gsap.matchMedia`와 조건부 렌더링으로 모바일/데스크톱 분기를 깔끔하게 분리해 두 환경 모두 자연스러운 UX 제공

**아쉬운 점**
- 초기에 모바일을 고려하지 않고 데스크톱 우선으로 개발해, 후반에 반응형 수정 범위가 넓어짐
- SEO 메타태그(og:image, og:description 등)를 처음부터 챙기지 못함

**다음에 시도할 것**
- 모바일 퍼스트 설계로 시작해 데스크톱으로 확장하는 방식 적용
- WebP 변환 및 이미지 lazy loading으로 초기 로드 성능 개선

---

## 📄 License

This project is for portfolio purposes only.
