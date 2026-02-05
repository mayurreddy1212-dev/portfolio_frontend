import { useEffect, useRef } from "react";

export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // resize canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 60;
    const particles = [];

    // scroll factor (0 → 1)
    let scrollFactor = 0;

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseR: Math.random() * 2 + 1,
        r: 0,
        dx: (Math.random() - 0.5) * 1.2,
        dy: (Math.random() - 0.5) * 1.2,
      });
    }

    // listen to scroll
    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      scrollFactor = Math.min(
        window.scrollY / maxScroll || 0,
        1
      );
    };

    window.addEventListener("scroll", handleScroll);

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // size with scroll
        p.r = Math.max(0.7, p.baseR * (1 - scrollFactor));

        // speed with scroll
        const speedMultiplier = 1 + scrollFactor*2;

        p.x += p.dx * speedMultiplier;
        p.y += p.dy * speedMultiplier;

        // bounce
        if (p.x <= 0 || p.x >= canvas.width) p.dx *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
