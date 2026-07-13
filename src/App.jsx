import { useLayoutEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import WorkDetail from './pages/WorkDetail'

// 라우팅: / 랜딩(원페이지) · /works/:slug 작품 세부
function App() {
  const { pathname } = useLocation()

  // 페이지 이동 시 항상 맨 위에서 시작
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/works/:slug" element={<WorkDetail />} />
    </Routes>
  )
}

export default App
