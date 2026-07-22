import { useId } from 'react'
import './RotatingBadge.css'

// 빙글빙글 도는 스티커 뱃지 (cyphr.studio의 스티커 요소 참고)
export default function RotatingBadge({ text = 'THE STUDIO WAVE * PORTFOLIO * ' }) {
  const pathId = useId()
  return (
    <div className="rotating-badge" aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <defs>
          <path
            id={pathId}
            d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0"
          />
        </defs>
        <circle cx="50" cy="50" r="49" />
        <text>
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </svg>
    </div>
  )
}
