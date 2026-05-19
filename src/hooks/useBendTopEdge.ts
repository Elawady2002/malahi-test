import * as React from "react"
import { useMotionValue, useSpring } from "framer-motion"

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))

function svgMaskDataUri(w: number, h: number, bend: number) {
    const pad = Math.max(0, Math.ceil(Math.abs(bend)))
    const vbY = -pad
    const vbH = h + pad

    const c1x = w * 0.25
    const c2x = w * 0.75
    const cY = -bend

    const d = `M 0 0 C ${c1x} ${cY}, ${c2x} ${cY}, ${w} 0 L ${w} ${h} L 0 ${h} Z`

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 ${vbY} ${w} ${vbH}"><path d="${d}" fill="white"/></svg>`
    const encoded = encodeURIComponent(svg)
        .replace(/'/g, "%27")
        .replace(/"/g, "%22")

    return `data:image/svg+xml,${encoded}`
}

export function useBendTopEdge() {
    const ref = React.useRef<HTMLElement | null>(null)

    const sizeRef = React.useRef({ w: 1, h: 1 })
    const lastUrlRef = React.useRef("")
    const lastQuantRef = React.useRef<number>(999999)
    const lastPaintRef = React.useRef(0)

    const MAX_BEND = 220
    const GAIN_SCROLL = 1.2
    const GAIN_WHEEL = 0.55
    const QUANT_STEP = 3
    const FPS_CAP = 30
    const FRAME_MS = 1000 / FPS_CAP
    const DEADZONE = 0.2

    const kick = useMotionValue(0)
    const bendSpring = useSpring(kick, {
        stiffness: 850,
        damping: 70,
        mass: 0.55,
    })

    React.useLayoutEffect(() => {
        const el = ref.current
        if (!el) return

        const measure = () => {
            sizeRef.current = {
                w: Math.max(1, Math.round(el.offsetWidth || 1)),
                h: Math.max(1, Math.round(el.offsetHeight || 1)),
            }
        }

        measure()
        const ro = new ResizeObserver(measure)
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    React.useEffect(() => {
        let raf: number | null = null
        let lastY = window.scrollY || 0

        const loop = () => {
            const y = window.scrollY || 0
            const dy = y - lastY
            lastY = y

            if (Math.abs(dy) > DEADZONE) {
                const impulse = clamp(dy * GAIN_SCROLL, -MAX_BEND, MAX_BEND)
                kick.set(impulse)
                requestAnimationFrame(() => kick.set(0))
            }

            raf = requestAnimationFrame(loop)
        }

        raf = requestAnimationFrame(loop)
        return () => {
            if (raf != null) cancelAnimationFrame(raf)
        }
    }, [])

    React.useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            const dy = e.deltaY || 0
            if (!Number.isFinite(dy) || Math.abs(dy) <= DEADZONE) return

            const impulse = clamp(dy * GAIN_WHEEL, -MAX_BEND, MAX_BEND)
            kick.set(impulse)
            requestAnimationFrame(() => kick.set(0))
        }

        window.addEventListener("wheel", onWheel, {
            passive: false,
            capture: true,
        })

        return () =>
            window.removeEventListener("wheel", onWheel as any, true as any)
    }, [])

    React.useEffect(() => {
        let raf: number | null = null

        const paint = () => {
            raf = null
            const el = ref.current
            if (!el) return

            const now = performance.now()
            if (now - lastPaintRef.current < FRAME_MS) return
            lastPaintRef.current = now

            const { w, h } = sizeRef.current
            const bend = clamp(bendSpring.get(), -MAX_BEND, MAX_BEND)

            const q = Math.round(bend / QUANT_STEP) * QUANT_STEP
            if (q === lastQuantRef.current) return
            lastQuantRef.current = q

            const url = svgMaskDataUri(w, h, q)
            if (url === lastUrlRef.current) return
            lastUrlRef.current = url

            el.style.webkitMaskImage = `url("${url}")`
            el.style.maskImage = `url("${url}")`
            el.style.webkitMaskRepeat = "no-repeat"
            el.style.maskRepeat = "no-repeat"
            el.style.webkitMaskSize = "100% 100%"
            el.style.maskSize = "100% 100%"
            el.style.webkitMaskPosition = "center"
            el.style.maskPosition = "center"
            el.style.overflow = "hidden"
            el.style.willChange = "mask-image"
        }

        const unsub = bendSpring.on("change", () => {
            if (raf != null) return
            raf = requestAnimationFrame(paint)
        })

        requestAnimationFrame(paint)

        return () => {
            unsub?.()
            if (raf != null) cancelAnimationFrame(raf)
        }
    }, [])

    return {
        ref: ref as any,
    }
}
