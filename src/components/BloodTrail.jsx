import { useEffect, useRef } from 'react';

export default function BloodTrail() {
    const canvasRef = useRef(null);
    const particles = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Resize
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        // Logic
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 5 + 2;
                this.speedY = Math.random() * 2 + 1; // drip down
                this.life = 100;
                this.hue = 0; // FORCE RED (0)
            }
            update() {
                this.y += this.speedY;
                this.life -= 2;
                this.size *= 0.95;
            }
            draw(ctx) {
                ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this.life / 100})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const handleTouch = (e) => {
            const x = e.touches ? e.touches[0].clientX : e.clientX;
            const y = e.touches ? e.touches[0].clientY : e.clientY;
            for (let i = 0; i < 3; i++) {
                particles.current.push(new Particle(x, y));
            }
        };

        window.addEventListener('mousemove', handleTouch);
        window.addEventListener('touchmove', handleTouch);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.current.forEach((p, i) => {
                p.update();
                p.draw(ctx);
                if (p.life <= 0) particles.current.splice(i, 1);
            });
            requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleTouch);
            window.removeEventListener('touchmove', handleTouch);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }} />;
}
