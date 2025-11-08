/**
 * Enhanced Confetti System
 * Multiple particle types and celebration effects
 */

export type ConfettiShape = 'circle' | 'square' | 'triangle' | 'star' | 'heart' | 'custom'
export type ConfettiType = 'standard' | 'fireworks' | 'rain' | 'explosion' | 'spiral'

export interface ConfettiParticle {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  size: number
  color: string
  shape: ConfettiShape
  opacity: number
}

export interface ConfettiConfig {
  count?: number
  colors?: string[]
  shapes?: ConfettiShape[]
  type?: ConfettiType
  duration?: number
  spread?: number
  velocity?: number
  gravity?: number
  origin?: { x: number; y: number }
}

export class ConfettiSystem {
  private particles: ConfettiParticle[] = []
  private animationId: number | null = null
  private canvas: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D | null = null
  private startTime: number = 0

  private defaultColors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
    '#B19CD9',
    '#FF85A1',
  ]

  constructor() {
    if (typeof window !== 'undefined') {
      this.initCanvas()
    }
  }

  private initCanvas() {
    this.canvas = document.createElement('canvas')
    this.canvas.style.position = 'fixed'
    this.canvas.style.top = '0'
    this.canvas.style.left = '0'
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    this.canvas.style.pointerEvents = 'none'
    this.canvas.style.zIndex = '9999'

    this.ctx = this.canvas.getContext('2d')
    this.updateCanvasSize()

    window.addEventListener('resize', () => this.updateCanvasSize())
  }

  private updateCanvasSize() {
    if (!this.canvas) return
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  // Launch confetti
  launch(config: ConfettiConfig = {}) {
    const {
      count = 50,
      colors = this.defaultColors,
      shapes = ['circle', 'square'],
      type = 'standard',
      duration = 3000,
      spread = 60,
      velocity = 20,
      origin = { x: 0.5, y: 0.5 },
    } = config

    if (!this.canvas || !this.ctx) return

    // Add canvas to DOM if not already there
    if (!document.body.contains(this.canvas)) {
      document.body.appendChild(this.canvas)
    }

    // Create particles based on type
    const newParticles = this.createParticles({
      count,
      colors,
      shapes,
      type,
      spread,
      velocity,
      origin,
    })

    this.particles.push(...newParticles)
    this.startTime = Date.now()

    // Start animation loop
    if (!this.animationId) {
      this.animate(duration)
    }
  }

  private createParticles(config: Required<Omit<ConfettiConfig, 'duration' | 'gravity'>>): ConfettiParticle[] {
    const particles: ConfettiParticle[] = []
    const { count, colors, shapes, type, spread, velocity, origin } = config

    for (let i = 0; i < count; i++) {
      const angle = this.getAngleForType(type, i, count, spread)
      const speed = velocity * (0.5 + Math.random() * 0.5)
      const size = 5 + Math.random() * 5

      particles.push({
        id: `${Date.now()}-${i}`,
        x: origin.x * window.innerWidth,
        y: origin.y * window.innerHeight,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        opacity: 1,
      })
    }

    return particles
  }

  private getAngleForType(type: ConfettiType, index: number, total: number, spread: number): number {
    const spreadRad = (spread * Math.PI) / 180

    switch (type) {
      case 'fireworks':
        return (index / total) * Math.PI * 2

      case 'rain':
        return Math.PI / 2 + (Math.random() - 0.5) * spreadRad

      case 'explosion':
        return (index / total) * Math.PI * 2 + (Math.random() - 0.5) * 0.2

      case 'spiral':
        return (index / total) * Math.PI * 4

      case 'standard':
      default:
        return -Math.PI / 2 + (Math.random() - 0.5) * spreadRad
    }
  }

  private animate(duration: number) {
    if (!this.ctx || !this.canvas) return

    const now = Date.now()
    const elapsed = now - this.startTime

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // Update and draw particles
    this.particles = this.particles.filter((particle) => {
      // Update physics
      particle.vy += 0.5 // gravity
      particle.x += particle.vx
      particle.y += particle.vy
      particle.rotation += particle.rotationSpeed
      particle.opacity = Math.max(0, 1 - elapsed / duration)

      // Check if particle is still visible
      if (
        particle.y > window.innerHeight + 50 ||
        particle.opacity <= 0
      ) {
        return false
      }

      // Draw particle
      this.drawParticle(particle)
      return true
    })

    // Continue animation if particles remain
    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.animate(duration))
    } else {
      this.stop()
    }
  }

  private drawParticle(particle: ConfettiParticle) {
    if (!this.ctx) return

    this.ctx.save()
    this.ctx.translate(particle.x, particle.y)
    this.ctx.rotate((particle.rotation * Math.PI) / 180)
    this.ctx.globalAlpha = particle.opacity
    this.ctx.fillStyle = particle.color

    switch (particle.shape) {
      case 'circle':
        this.ctx.beginPath()
        this.ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2)
        this.ctx.fill()
        break

      case 'square':
        this.ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
        break

      case 'triangle':
        this.ctx.beginPath()
        this.ctx.moveTo(0, -particle.size / 2)
        this.ctx.lineTo(particle.size / 2, particle.size / 2)
        this.ctx.lineTo(-particle.size / 2, particle.size / 2)
        this.ctx.closePath()
        this.ctx.fill()
        break

      case 'star':
        this.drawStar(particle.size / 2)
        break

      case 'heart':
        this.drawHeart(particle.size / 2)
        break
    }

    this.ctx.restore()
  }

  private drawStar(size: number) {
    if (!this.ctx) return

    this.ctx.beginPath()
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2
      const x = Math.cos(angle) * size
      const y = Math.sin(angle) * size
      if (i === 0) {
        this.ctx.moveTo(x, y)
      } else {
        this.ctx.lineTo(x, y)
      }
    }
    this.ctx.closePath()
    this.ctx.fill()
  }

  private drawHeart(size: number) {
    if (!this.ctx) return

    this.ctx.beginPath()
    this.ctx.moveTo(0, size / 4)
    this.ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, size / 4)
    this.ctx.bezierCurveTo(-size / 2, size / 2, 0, size, 0, size)
    this.ctx.bezierCurveTo(0, size, size / 2, size / 2, size / 2, size / 4)
    this.ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, size / 4)
    this.ctx.fill()
  }

  // Stop animation and cleanup
  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
    this.particles = []

    if (this.canvas && document.body.contains(this.canvas)) {
      setTimeout(() => {
        if (this.canvas && document.body.contains(this.canvas)) {
          document.body.removeChild(this.canvas)
        }
      }, 100)
    }
  }

  // Cleanup
  destroy() {
    this.stop()
    if (this.canvas) {
      window.removeEventListener('resize', () => this.updateCanvasSize())
    }
  }
}

// Singleton instance
export const confetti = new ConfettiSystem()

// Preset configurations
export const confettiPresets = {
  celebration: () =>
    confetti.launch({
      count: 100,
      type: 'explosion',
      spread: 360,
      velocity: 25,
      origin: { x: 0.5, y: 0.5 },
    }),

  fireworks: () =>
    confetti.launch({
      count: 80,
      type: 'fireworks',
      shapes: ['star', 'circle'],
      origin: { x: 0.5, y: 0.8 },
    }),

  rain: () =>
    confetti.launch({
      count: 150,
      type: 'rain',
      spread: 30,
      velocity: 15,
      origin: { x: 0.5, y: 0 },
      duration: 5000,
    }),

  hearts: () =>
    confetti.launch({
      count: 50,
      shapes: ['heart'],
      colors: ['#FF6B9D', '#C06C84', '#F67280', '#FF8C94'],
      type: 'explosion',
      origin: { x: 0.5, y: 0.6 },
    }),

  stars: () =>
    confetti.launch({
      count: 60,
      shapes: ['star'],
      colors: ['#FFD700', '#FFA500', '#FF6347', '#FFFF00'],
      type: 'spiral',
    }),
}
