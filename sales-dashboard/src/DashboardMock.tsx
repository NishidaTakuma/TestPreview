import { useEffect, useRef } from 'react'

export default function CanvasExample() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 簡単な描画
    ctx.fillStyle = 'red'
    ctx.fillRect(10, 10, 100, 100)
  }, [])

  return <canvas ref={canvasRef} width={300} height={150} />
}