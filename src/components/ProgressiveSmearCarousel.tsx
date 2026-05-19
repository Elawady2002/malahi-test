import * as React from "react";
import { useRef, useMemo } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";

export default function ProgressiveSmearCarousel(props: any) {
    const {
        images = [],
        itemWidth = 700,
        itemHeight = 500,
        sideItemWidth = 320,
        sideItemHeight = 400,
        gap = 60,
        maxRotation = 50,
        perspective = 896,
        borderRadius = 24,
        scrollDamping = 10,
        edgeColor = "#000000",
        edgeWidth = 1,
        overlayIndex = -1,
        overlayImage = null
    } = props;

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.PointerEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        mouseX.set(nx);
        mouseY.set(ny);
    };

    const defaultColors = [
        "linear-gradient(135deg, #1E3A8A, #3B82F6)",
        "linear-gradient(135deg, #064E3B, #10B981)",
        "linear-gradient(135deg, #b91c1c, #ef4444)",
        "linear-gradient(135deg, #c2410c, #f97316)",
        "linear-gradient(135deg, #4C1D95, #8B5CF6)",
        "linear-gradient(135deg, #164e63, #06b6d4)",
    ];

    const renderItems = useMemo(() => {
        return images && images.length > 0 ? images : defaultColors;
    }, [images]);

    const totalItems = renderItems.length;
    // We want the initial target to be centered on the overlayIndex if it's provided.
    // The original code starts at 0.
    // Let's set it so the overlayIndex is the initial item (0 offset).
    // Or we just start at overlayIndex.
    const initialTarget = overlayIndex !== -1 ? overlayIndex : 0;
    
    const scrollTarget = useRef(initialTarget);
    const rawScroll = useMotionValue(scrollTarget.current);
    const snapTimeout = useRef<any>(null);

    const smoothScroll = useSpring(rawScroll, {
        stiffness: 100,
        damping: scrollDamping,
        mass: 1.2,
        restDelta: 0.001,
    });

    const handleWheel = (e: React.WheelEvent) => {
        const delta =
            Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        scrollTarget.current += delta / 250; // Smooth normalized delta
        scrollTarget.current = Math.max(0, Math.min(scrollTarget.current, totalItems - 1));
        rawScroll.set(scrollTarget.current);

        clearTimeout(snapTimeout.current);
        snapTimeout.current = setTimeout(() => {
            scrollTarget.current = Math.round(scrollTarget.current);
            rawScroll.set(scrollTarget.current);
        }, 150);
    };

    const handlePan = (e: any, info: any) => {
        const delta = -info.delta.x / 250;
        scrollTarget.current += delta;
        // Don't clamp strictly here to allow edge bounce, but keep close
        scrollTarget.current = Math.max(-0.5, Math.min(scrollTarget.current, totalItems - 0.5));
        rawScroll.set(scrollTarget.current);
        clearTimeout(snapTimeout.current);
    };

    const handlePanEnd = (e: any, info: any) => {
        const velocityOffset = -info.velocity.x / 1000;
        let target = scrollTarget.current + velocityOffset;
        target = Math.max(0, Math.min(Math.round(target), totalItems - 1));
        scrollTarget.current = target;
        rawScroll.set(scrollTarget.current);
    };

    return (
        <motion.div
            className="w-full h-full relative cursor-grab active:cursor-grabbing"
            onPointerMove={handleMouseMove}
            onMouseLeave={() => {
                // Not used globally anymore since we track per card
            }}
            onWheel={handleWheel}
            onPan={handlePan}
            onPanEnd={handlePanEnd}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                perspective: Math.max(perspective, 1),
                overflow: "visible",
                touchAction: "none",
            }}
        >
            {/* Carousel Container */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    zIndex: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {renderItems.map((src, i) => (
                    <MemoizedPremiumSmearCard
                        key={`card-${i}`}
                        src={src}
                        index={i}
                        total={totalItems}
                        smoothScroll={smoothScroll}
                        itemWidth={itemWidth}
                        itemHeight={itemHeight}
                        sideItemWidth={sideItemWidth}
                        sideItemHeight={sideItemHeight}
                        gap={gap}
                        maxRotation={maxRotation}
                        borderRadius={borderRadius}
                        hasOverlay={overlayIndex !== -1 && i % (images.length || 1) === overlayIndex}
                        overlayImage={overlayImage}
                    />
                ))}
            </div>

            {edgeWidth > 0 && (
                <>
                    <div
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: `${edgeWidth}%`,
                            background: `linear-gradient(to right, ${edgeColor} 0%, transparent 100%)`,
                            pointerEvents: "none",
                            zIndex: 10000,
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: `${edgeWidth}%`,
                            background: `linear-gradient(to left, ${edgeColor} 0%, transparent 100%)`,
                            pointerEvents: "none",
                            zIndex: 10000,
                        }}
                    />
                </>
            )}
        </motion.div>
    );
}

function PremiumSmearCard({
    src,
    index,
    total,
    smoothScroll,
    itemWidth,
    itemHeight,
    sideItemWidth,
    sideItemHeight,
    gap,
    maxRotation,
    borderRadius,
    hasOverlay,
    overlayImage,
}: any) {
    const cardRef = useRef<HTMLDivElement>(null);
    
    // Local spring values for precise 3D hover tracking
    const mouseX = useSpring(0, { stiffness: 300, damping: 20 });
    const mouseY = useSpring(0, { stiffness: 300, damping: 20 });
    const isHovered = useSpring(0, { stiffness: 300, damping: 20 });

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        mouseX.set(nx);
        mouseY.set(ny);
    };

    const handlePointerEnter = () => isHovered.set(1);
    const handlePointerLeave = () => {
        isHovered.set(0);
        mouseX.set(0);
        mouseY.set(0);
    };
    const localOffset = useTransform(smoothScroll, (v: number) => {
        return index - v;
    });

    const absOffset = useTransform(localOffset, Math.abs);

    const cardWidth = useTransform(
        absOffset,
        [0, 1],
        [itemWidth, sideItemWidth],
        { clamp: true }
    );
    const cardHeight = useTransform(
        absOffset,
        [0, 1],
        [itemHeight, sideItemHeight],
        { clamp: true }
    );

    const xOffset = useTransform(localOffset, (o: number) => {
        const a = Math.abs(o);
        const s = Math.sign(o);
        const centerToNext = itemWidth / 2 + gap + sideItemWidth / 2;
        const sideToSide = sideItemWidth + gap;

        if (a === 0) return 0;
        if (a <= 1) {
            return s * centerToNext * a;
        } else {
            return s * (centerToNext + (a - 1) * sideToSide * 0.85);
        }
    });

    // Combine offset and centering into one x transform
    const x = useTransform([xOffset, cardWidth], ([off, w]) => (off as number) - (w as number) / 2);
    const y = useTransform(cardHeight, (h) => -(h as number) / 2);
    const z = useTransform(absOffset, (a: number) => -a * 200);

    const baseRotateY = useTransform(localOffset, (o: number) => {
        return Math.sign(o) * Math.min(Math.abs(o) * 35, maxRotation);
    });

    const rotateX = useTransform(
        [mouseY, isHovered],
        ([my, hover]) => `${(my as number) * -15 * (hover as number)}deg`
    );
    
    const rotateY = useTransform(
        [baseRotateY, mouseX, isHovered],
        ([by, mx, hover]) => `${(by as number) + ((mx as number) * 15 * (hover as number))}deg`
    );

    const scale = useTransform(
        [absOffset, isHovered],
        ([ao, hover]) => {
            // Apply scale only when centered
            const centeredBonus = Math.max(0, 1 - (ao as number));
            return 1 + (0.05 * (hover as number) * centeredBonus);
        }
    );

    const visibilityOpacity = useTransform(absOffset, [0, 5, 6], [1, 1, 0]);

    const isImage = typeof src === "string";
    const styleData = isImage
        ? {
              backgroundImage: `url("${src}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
          }
        : { background: src };

    const overlayOpacity = useTransform(absOffset, [0, 0.5], [1, 0]);

    const shineBg = useTransform(
        [mouseX, mouseY, isHovered],
        ([mx, my, hover]) => {
            if (hover === 0) return 'none';
            const opacity = 0.5 * (hover as number);
            const px = (((mx as number) + 1) / 2) * 100;
            const py = (((my as number) + 1) / 2) * 100;
            
            return `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,${opacity}) 0%, rgba(255,255,255,0) 60%)`;
        }
    );

    return (
        <motion.div
            ref={cardRef}
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: cardWidth,
                height: cardHeight,
                x,
                y,
                z,
                scale,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                willChange: "transform",
                pointerEvents: "auto",
            }}
        >
            <motion.div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: borderRadius, 
                    opacity: visibilityOpacity,
                    willChange: "opacity, transform",
                    overflow: "hidden",
                    border: '1px solid rgba(0,0,0,0.05)', // Subtle edge highlight
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4), 0 0 15px rgba(0,0,0,0.1)',
                    WebkitBoxReflect: "below 10px linear-gradient(transparent 60%, rgba(255,255,255,0.4))",
                }}
            >
                <div 
                    className="w-full h-full relative overflow-hidden bg-white"
                    style={styleData}
                >
                    {/* Placeholder content if no image */}
                    {!isImage && !src && (
                        <div className="absolute inset-0 flex items-center justify-center text-black/10 font-black text-6xl">
                            {index}
                        </div>
                    )}
                    
                    <motion.div
                        className="absolute inset-0 pointer-events-none mix-blend-screen z-10"
                        style={{
                            background: shineBg,
                        }}
                    />

                    {hasOverlay && (
                        <motion.div 
                            className="absolute inset-0 bg-[#FF659B]/10 z-0"
                            style={{ opacity: overlayOpacity }}
                        />
                    )}
                </div>
            </motion.div>
            
            {hasOverlay && (
                <motion.div 
                    className="absolute inset-0 pointer-events-none"
                    style={{ opacity: overlayOpacity, zIndex: 20 }}
                >
                    <img 
                        src={overlayImage} 
                        alt="Overlay Character" 
                        className="w-[110%] h-[120%] max-w-none object-contain absolute bottom-0 left-1/2 -translate-x-1/2" 
                    />
                </motion.div>
            )}
        </motion.div>
    );
}

const MemoizedPremiumSmearCard = React.memo(PremiumSmearCard);
