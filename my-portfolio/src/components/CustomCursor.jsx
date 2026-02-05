import { useEffect, useRef, useState } from "react";

const lerp = (start, end, amt) => start + (end - start) * amt;

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const size = useRef(20); // initial small size
  const targetSize = useRef(20);

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = Math.min(scrollY / maxScroll, 1);

      // size grows with scroll
      targetSize.current = 20 + progress * 50; // 20px → 70px
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("scroll", onScroll);

    let rafId;
    const animate = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.05);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.05);

      size.current = lerp(size.current, targetSize.current, 0.08);

      if (cursorRef.current) {
        const finalSize = clicked ? size.current * 0.85 : size.current;

        cursorRef.current.style.width = `${finalSize}px`;
        cursorRef.current.style.height = `${finalSize}px`;
        cursorRef.current.style.transform = `translate3d(
          ${pos.current.x - finalSize / 2}px,
          ${pos.current.y - finalSize / 2}px,
          0
        )`;
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("scroll", onScroll);
    };
  }, [clicked]);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        background: clicked
          ? "radial-gradient(circle, #ff9a9e 0%, rgba(255,154,158,0.4) 40%, rgba(255,154,158,0.1) 70%, transparent 100%)"
          : "radial-gradient(circle, #d6b89c 0%, rgba(214,184,156,0.5) 40%, rgba(214,184,156,0.15) 70%, transparent 100%)",
      }}
    />
  );
};

export default CustomCursor;
