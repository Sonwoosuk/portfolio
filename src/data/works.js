// 작품 세부 페이지 데이터 — 각 프로젝트 README에서 발췌
// (landing은 자료 확보 후 채울 것 — 임의 콘텐츠 금지)
export const WORKS = [
  {
    slug: 'rakkojae',
    index: '01',
    title: 'RAKKOJAE REDESIGN',
    tags: ['UX/UI', 'Responsive', 'Firebase', 'Kakao Maps'],
    hero: '/works/rakkojae/hero.jpg',
    fullpage: '/works/rakkojae/fullpage.jpg',
    live: 'https://sonwoosuk.github.io/rakk/',
    github: 'https://github.com/Sonwoosuk/rakk',
    plan: 'https://www.figma.com/slides/1NylLlTlIcuFgOj9VoevWz',
    design:
      'https://www.figma.com/design/Q3ifWTeKsUM1ELJ7IjdjtW/%EB%9D%BD%EA%B3%A0%EC%9E%AC-%EB%A6%AC%EB%89%B4%EC%96%BC-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=0-1&t=duVyfbbO8axc1eQW-1',
    intro:
      '빌드 도구 없이 HTML / CSS / Vanilla JS만으로 제작한 락고재 한옥 스테이 공식 웹사이트 리뉴얼입니다. 전통 한옥의 감성을 현대적인 UI로 표현하고, Firebase와 Kakao Maps API를 연동해 실제 서비스 수준의 기능을 구현했습니다.',
    overview: [
      { k: 'GOAL', v: '전통과 현대의 조화를 담은 브랜드 사이트 리뉴얼' },
      { k: 'TARGET', v: '전통 문화 체험에 관심 있는 국내외 여행객' },
      { k: 'VALUE', v: '고급스러움 · 전통 · 접근성' },
    ],
    meta: [
      { k: 'ROLE', v: '기획 / 디자인 / 퍼블리싱 / 기능 구현' },
      { k: 'TYPE', v: '개인 프로젝트 (기여도 100%)' },
      { k: 'STACK', v: 'HTML5 · CSS3 · Vanilla JS · Firebase · Kakao Maps' },
      { k: 'DEPLOY', v: 'GitHub Pages' },
    ],
    features: [
      { img: '/works/rakkojae/feat-main.png', caption: 'MAIN — 메인화면' },
      { img: '/works/rakkojae/feat-slide.png', caption: 'HERO — 이미지 자동 슬라이드' },
      { img: '/works/rakkojae/feat-search.png', caption: 'SEARCH — 헤더 키워드 검색' },
      { img: '/works/rakkojae/feat-login.png', caption: 'AUTH — Google 로그인' },
      { img: '/works/rakkojae/feat-map.png', caption: 'MAP — 카카오맵 지점 안내' },
      { img: '/works/rakkojae/feat-lang.png', caption: 'I18N — 한/영 언어 전환' },
    ],
    highlights: [
      {
        t: '카카오맵 지점 안내',
        d: 'Kakao Maps API를 연동해 락고재의 실제 위치를 지도로 표시. 방문객이 지점 위치를 웹에서 바로 확인할 수 있도록 지도 기반 안내를 구현했습니다.',
      },
      {
        t: '자동 슬라이더',
        d: '히어로 섹션 이미지가 4초 간격으로 순환하는 커스텀 슬라이더. 모바일 터치(touchstart/touchend) 대응.',
      },
      {
        t: '한/영 언어 전환',
        d: 'data-ko / data-en 속성으로 텍스트를 관리하고 translate.js에서 일괄 교체. localStorage로 선택 언어 유지.',
      },
      {
        t: 'Firebase 예약 저장',
        d: 'Firestore reservations/{uid}/bookings 구조로 예약 내역 저장. 로그인 상태에서만 저장 허용, 마이페이지에서 조회.',
      },
    ],
  },
  {
    slug: 'gyeol',
    index: '02',
    title: 'GYEOL BRAND IDENTITY',
    tags: ['Branding', 'E-Commerce', 'React', 'GSAP'],
    hero: '/works/gyeol/hero.jpg',
    fullpage: '/works/gyeol/fullpage.jpg',
    live: 'https://my-app-three-eosin-90.vercel.app',
    github: 'https://github.com/Sonwoosuk/GYEOL',
    plan: 'https://github.com/Sonwoosuk/GYEOL/blob/main/my-app/docs/GYEOL_%EA%B8%B0%ED%9A%8D%EC%84%9C_%EC%86%90%EC%9A%B0%EC%84%9D.pdf',
    design:
      'https://www.figma.com/design/Zx3emy4MkmigNbELYRtJje/%EC%9D%BC%EC%B2%B4%ED%98%95%ED%8E%98%EC%9D%B4%EC%A7%80%EB%94%94%EC%9E%90%EC%9D%B8_%EC%86%90%EC%9A%B0%EC%84%9D?node-id=0-1',
    intro:
      'React + Vite로 제작한 자연 영감 주얼리 브랜드 GYEOL(결)의 이커머스 웹앱입니다. Water / Earth / Forest / Light 4개의 자연 테마 컬렉션을 GSAP · Motion 인터랙션으로 표현하고, Firebase 인증과 Polar 결제를 연동해 실제 쇼핑몰 수준의 구매 흐름을 구현했습니다.',
    overview: [
      { k: 'GOAL', v: '브랜드 감성과 실제 구매 흐름(장바구니 → 결제)을 모두 갖춘 이커머스 구현' },
      { k: 'TARGET', v: '자연주의 감성의 주얼리에 관심 있는 2030 고객' },
      { k: 'VALUE', v: '자연 · 절제된 아름다움 · 몰입감' },
    ],
    meta: [
      { k: 'ROLE', v: '기획 / 디자인 / 퍼블리싱 / 기능 구현' },
      { k: 'TYPE', v: '개인 프로젝트 (기여도 100%)' },
      { k: 'STACK', v: 'React 19 · React Router 7 · GSAP · Firebase · Polar' },
      { k: 'DEPLOY', v: 'Vite 8 · Vercel' },
    ],
    features: [
      { img: '/works/gyeol/screenshot-hero.png', caption: 'HERO — 메인 히어로 인터랙션' },
      { img: '/works/gyeol/screenshot-water.png', caption: 'COLLECTION — Water' },
      { img: '/works/gyeol/screenshot-forest.png', caption: 'COLLECTION — Forest' },
      { img: '/works/gyeol/screenshot-detail.png', caption: 'PRODUCT — 메탈·사이즈 옵션' },
      { img: '/works/gyeol/screenshot-cart.png', caption: 'CART — 장바구니 & Polar 결제' },
      { img: '/works/gyeol/screenshot-search.png', caption: 'SEARCH — 전체 상품 검색' },
    ],
    highlights: [
      {
        t: '게스트 장바구니 → Firestore 병합',
        d: '비로그인 시 localStorage에 담고, 로그인하면 writeBatch로 일괄 병합 후 onSnapshot 실시간 동기화.',
      },
      {
        t: 'Polar 결제 연동 (Serverless)',
        d: 'api/checkout.js에서 서버 측 금액 재계산 후 체크아웃 세션 생성 — 클라이언트 금액 조작 방지.',
      },
      {
        t: '모바일 two-tap hover',
        d: 'useTouchHover 커스텀 훅으로 터치 기기에서 첫 탭은 hover, 두 번째 탭은 이동으로 동작.',
      },
    ],
  },
  {
    slug: 'landing',
    index: '03',
    title: 'LANDING PAGE DESIGN',
    tags: ['Interaction', 'GSAP ScrollTrigger', 'React', 'Motion'],
    hero: '/works/landing/hero.jpg',
    live: 'https://facade-beryl.vercel.app',
    intro:
      '인터랙션과 스크롤 모션을 빠르게 검증하기 위해 제작한 실험형 랜딩페이지입니다. 파사드 엔지니어링 기업 컨셉의 원페이지로, GSAP ScrollTrigger를 활용해 사용자의 스크롤에 따라 건축 과정이 순차적으로 진행되는 경험을 구현했습니다. 영상을 프레임 단위로 추출해 스크롤 위치와 동기화한 시퀀스 인터랙션이 핵심입니다.',
    overview: [
      { k: 'GOAL', v: '인터랙션과 스크롤 모션을 빠르게 실험·검증하는 랜딩페이지 제작' },
      { k: 'CONCEPT', v: '파사드 엔지니어링 기업 원페이지 (Hero · About · Service · Project · Value)' },
      { k: 'FOCUS', v: '영상 프레임 시퀀스와 스크롤 동기화 · 부드러운 스크롤 모션' },
    ],
    meta: [
      { k: 'ROLE', v: '기획 / 디자인 / 퍼블리싱 / 인터랙션 구현' },
      { k: 'TYPE', v: '개인 실험 프로젝트 (기여도 100%)' },
      { k: 'STACK', v: 'React 19 · Vite · GSAP ScrollTrigger · Lenis' },
      { k: 'DEPLOY', v: 'Vercel' },
    ],
    features: [
      { img: '/works/landing/sequence.gif', caption: 'SEQUENCE — 스크롤 연동 프레임 시퀀스' },
      { img: '/works/landing/hero.gif', caption: 'HERO — 타이틀 마스크 리빌' },
      { img: '/works/landing/orbit.gif', caption: 'ORBIT — 이미지 궤도 인터랙션' },
      { img: '/works/landing/services.gif', caption: 'SERVICE — 사업 분야 호버 아코디언' },
      { img: '/works/landing/precision.gif', caption: 'DETAIL — 핀 고정 라인 드로잉' },
      { img: '/works/landing/works.gif', caption: 'PROJECT — 프로젝트 그리드 리빌' },
    ],
    highlights: [
      {
        t: '프레임 단위 스크롤 시퀀스',
        d: '영상을 240장의 JPG 프레임으로 추출하고, ScrollTrigger pin + scrub로 고정한 5200px 구간에서 스크롤 진행도를 프레임 인덱스에 매핑해 캔버스에 그립니다. 스크롤을 멈추면 영상도 그 프레임에서 멈추는, 프레임 단위로 끊어지는 제어가 핵심입니다.',
      },
      {
        t: 'Lenis × ScrollTrigger 동기화',
        d: 'Lenis 부드러운 스크롤을 scrollerProxy로 ScrollTrigger에 연결하고 gsap.ticker로 raf를 구동해, 관성 스크롤 중에도 핀·스크럽 애니메이션이 어긋나지 않도록 동기화했습니다.',
      },
      {
        t: '스크롤 연동 챕터 전환',
        d: '시퀀스 진행도에 따라 대지 분석 → 공간 구조 → 외피 로직 → 전달 단계 4개 챕터의 카피가 전환되어, 스크롤만으로 건축 과정의 서사가 진행됩니다.',
      },
      {
        t: '핀 고정 SVG 라인 드로잉',
        d: 'Detail 섹션은 화면을 고정한 채 SVG path의 strokeDashoffset을 스크럽 타임라인으로 재생해, 다이어그램의 지시선이 뻗어나오며 항목이 순차 등장합니다.',
      },
    ],
  },
  {
    slug: 'social',
    index: '04',
    title: 'SOCIAL CONTENT DESIGN',
    tags: ['Content Design', 'Video Editing', 'Marketing', 'Instagram'],
    hero: '/work-4.jpg',
    intro:
      '일상의 장면에서 디자인의 시선을 끌어내는 인스타그램 콘텐츠 채널(the.studio.wave)입니다. 비 오는 거리, 한낮의 여름, 이케아의 간판처럼 누구나 무심코 지나치는 순간을 소재로, 카드뉴스와 영상 편집으로 재구성해 "디자인 영감을 주는 정보"를 전합니다. 보는 사람이 저장하고 공유하고 싶어지는 콘텐츠 — 감각을 파는 마케팅을 실험하는 작업입니다.',
    overview: [
      { k: 'GOAL', v: '디자인 영감을 주는 정보성 콘텐츠로 채널의 톤을 만들고 도달을 넓히기' },
      { k: 'FORMAT', v: '카드뉴스(캐러셀) · 썸네일 영상(영상 편집·짜깁기)' },
      { k: 'CHANNEL', v: 'Instagram — the.studio.wave' },
    ],
    meta: [
      { k: 'ROLE', v: '기획 / 카피 / 그래픽 / 영상 편집' },
      { k: 'TYPE', v: '개인 채널 운영' },
      { k: 'TOOLS', v: 'Canva · CapCut · Figma' },
      { k: 'THEME', v: '일상 속 디자인 영감' },
    ],
    videos: ['/works/social/reel-1.mp4', '/works/social/reel-2.mp4'],
    features: [
      { img: '/works/social/img-4.png', caption: '비와 디자인' },
      { img: '/works/social/img-8.png', caption: '이케아의 철학' },
      { img: '/works/social/img-6.png', caption: '여름과 디자인' },
      { img: '/works/social/img-3.png', caption: '불을 끄면 시작되는 디자인' },
      { img: '/works/social/img-2.png', caption: '디자인이 안되는 날' },
      { img: '/works/social/img-10.png', caption: '케이티엑스 디자인' },
    ],
  },
  {
    slug: 'chungnam',
    index: '05',
    title: 'CHUNGNAM TOURISM FOUNDATION CLONE',
    tags: ['Clone Coding', 'HTML/CSS', 'JavaScript', 'Responsive'],
    hero: '/works/chungnam/hero.jpg',
    live: 'https://sonwoosuk.github.io/CHUNG/',
    github: 'https://github.com/Sonwoosuk/CHUNG',
    intro:
      '충남문화관광재단(cnctf.or.kr) 공공기관 웹사이트를 HTML · CSS · JavaScript만으로 따라 만든 클론 코딩 프로젝트입니다. 메인 페이지와 문화공간 서브페이지 4종을 직접 분석·구현하며, 구조 설계 · 레이아웃 · 인터랙션을 마크업과 스타일만으로 재현하는 데 집중했습니다.',
    overview: [
      { k: 'GOAL', v: '공공기관 웹사이트를 분석해 메인·서브페이지를 직접 구현' },
      { k: 'FOCUS', v: '구조 설계 · 레이아웃 · 인터랙션을 마크업/스타일로 재현' },
      { k: 'PERIOD', v: '3일' },
    ],
    meta: [
      { k: 'ROLE', v: '구조 설계 / 퍼블리싱 / 인터랙션 구현' },
      { k: 'TYPE', v: '개인 클론 코딩 (기여도 100%)' },
      { k: 'STACK', v: 'HTML5 · CSS3 · JavaScript' },
      { k: 'REFERENCE', v: 'cnctf.or.kr (충남문화관광재단)' },
    ],
    features: [
      { img: '/works/chungnam/header-gnb.gif', caption: 'HEADER — 반응형 GNB 드롭다운' },
      { img: '/works/chungnam/slider.gif', caption: 'HERO — 메인 자동 슬라이더' },
      { img: '/works/chungnam/news.gif', caption: 'NEWS — 탭별 카드 렌더링' },
      { img: '/works/chungnam/culture.gif', caption: 'CULTURE — 공연·축제·전시 슬라이더' },
      { img: '/works/chungnam/space.gif', caption: 'SPACE — 문화공간 서브페이지' },
      { img: '/works/chungnam/ticket.gif', caption: 'TICKET — 티켓예매 화면' },
    ],
    highlights: [
      {
        t: '반응형 헤더 / GNB',
        d: '데스크탑 드롭다운 메뉴와 모바일 햄버거 메가메뉴를 함께 구현하고, 스크롤 시 헤더를 상단에 고정. 좁은 화면에서는 서브 네비게이션을 가로 스크롤 대신 flex-wrap 줄바꿈으로 전환해 모든 메뉴가 보이도록 대응했습니다.',
      },
      {
        t: '메인 슬라이더 & 콘텐츠 섹션',
        d: '자동 재생·진행 바·일시정지·좌우 이동과 터치 스와이프를 지원하는 메인 슬라이더. 뉴스 섹션은 탭(공지·공모입찰·언론보도·채용)별 카드를 동적 렌더링하고, 문화 섹션은 공연·축제·전시 3종 카드 슬라이더와 유튜브·SNS 영역으로 구성했습니다.',
      },
      {
        t: '티켓예매 화면',
        d: '달력 UI와 공연 목록, 결제수단 안내, 그리고 rowspan으로 셀을 병합한 할인권종 표까지 재현. 표 기반 정보 설계를 마크업만으로 구현했습니다.',
      },
      {
        t: 'JavaScript 실행 시점 해결',
        d: '슬라이더·서브 네비·팝업이 동작하지 않던 문제의 원인이 DOM 준비 전 스크립트 실행임을 파악하고, 전체 로직을 DOMContentLoaded 안으로 옮겨 해결했습니다.',
      },
      {
        t: '팝업 & 스크롤 애니메이션',
        d: '자동 슬라이드·도트 인디케이터와 "오늘 하루 보지 않기"(localStorage)를 갖춘 팝업을 구현. 닫은 뒤 남던 클릭 잔상은 visibility·display 처리를 함께 적용해 제거했고, 스크롤에 맞춰 각 섹션이 아래에서 위로 등장하는 fadeInUp 효과를 더했습니다.',
      },
    ],
  },
  {
    slug: 'trip',
    index: '06',
    title: 'VISIT JAPAN LANDING PAGE',
    tags: ['Interaction', 'GSAP ScrollTrigger', 'React', 'i18n'],
    hero: '/works/trip/hero.jpg',
    live: 'https://trip-theta-two.vercel.app',
    intro:
      '일본 여행을 주제로 한 인터랙티브 원페이지입니다. 가와구치코 → 오사카 → 도쿄 → 마쓰야마 4개 도시를 스크롤을 따라 순서대로 여행하는 구성으로, 하늘에서 시작해 도시가 떠오르는 히어로, 영상 프레임 시퀀스, 도시마다 다른 테마 인터랙션을 GSAP ScrollTrigger로 구현했습니다. KO / EN / JP 3개 언어 전환을 지원합니다.',
    overview: [
      { k: 'GOAL', v: '스크롤 인터랙션만으로 여행의 설렘을 전달하는 비주얼 랜딩 제작' },
      { k: 'CONCEPT', v: '일본 4개 도시(가와구치코 · 오사카 · 도쿄 · 마쓰야마)를 순서대로 여행하는 원페이지' },
      { k: 'FOCUS', v: '도시별 테마 인터랙션 · 영상 프레임 시퀀스 · KO/EN/JP 언어 전환' },
    ],
    meta: [
      { k: 'ROLE', v: '디자인 / 퍼블리싱 / 인터랙션 구현' },
      { k: 'TYPE', v: '개인 실험 프로젝트 (기여도 100%)' },
      { k: 'STACK', v: 'React 18 · Vite · GSAP ScrollTrigger' },
      { k: 'DEPLOY', v: 'Vercel' },
    ],
    features: [
      { img: '/works/trip/hero.jpg', caption: 'HERO — 하늘 위로 떠오르는 타이틀' },
      { img: '/works/trip/feat-journey.jpg', caption: 'KAWAGUCHIKO — 富士河口湖 섹션' },
      { img: '/works/trip/feat-osaka.jpg', caption: 'OSAKA — 오사카성 배너와 도시 소개' },
      { img: '/works/trip/feat-tokyo.jpg', caption: 'TOKYO — 도쿄타워 배너' },
      { img: '/works/trip/feat-roulette.jpg', caption: 'TOKYO — 명소 룰렛 인터랙션' },
      { img: '/works/trip/feat-matsuyama.jpg', caption: 'MATSUYAMA — 시모나다역 배너' },
    ],
    highlights: [
      {
        t: '하늘 → 도시 히어로 리빌',
        d: '핀 고정 스크럽 구간에서 구름과 도시 이미지가 스크롤에 따라 차례로 떠오르고, 마지막에 Visit Japan! 타이틀이 이미지 뒤에서 올라옵니다. 첫 화면은 하늘만 보여주고 스크롤로 장면을 완성하는 구성입니다.',
      },
      {
        t: '런타임 영상 프레임 시퀀스',
        d: '영상을 브라우저에서 seek하며 100프레임으로 추출해 ImageBitmap으로 캐싱하고, 400% 핀 구간에서 스크롤 진행도를 프레임 인덱스에 매핑해 캔버스에 그립니다. 사전 추출 이미지 없이 영상 파일 하나로 시퀀스를 만드는 방식입니다.',
      },
      {
        t: '도시별 테마 인터랙션',
        d: '기차가 마퀴처럼 지나가며 ガタンゴトン 글자가 꼬리에서 튀어나오는 열차 씬, 도쿄 명소 이름이 돌다 멈추면 이미지가 함께 바뀌는 룰렛, 걷기 프레임으로 걸어 들어와 인사하는 마쓰야마 마스코트, 데구르르 굴러가는 귤까지 — 도시마다 다른 장면을 연출했습니다.',
      },
      {
        t: 'KO / EN / JP 언어 전환',
        d: 'React Context 기반 LangProvider로 전체 카피를 3개 언어로 관리하고, 헤더에서 즉시 전환됩니다.',
      },
    ],
  },
]
