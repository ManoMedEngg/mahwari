import { useEffect, useState } from 'react';

export default function LoadingSequence({ onComplete }) {
    const [phase, setPhase] = useState('drop'); // 'drop', 'splash', 'done'

    useEffect(() => {
        // Timeline:
        // 0s: Start Drop
        // 3s: Splash hits
        // 4.5s: Fade out / Done

        const t1 = setTimeout(() => setPhase('cinematic-container'), 3000);
        const t2 = setTimeout(() => {
            setPhase('done');
            setTimeout(onComplete, 500); // Allow fade out
        }, 4500);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [onComplete]);

    return (
        <div className="cinematic-container">
            {phase === 'drop' && (
                <div className="ovum-container">
                    <img src="/ovum_drop.png" alt="Ovum" className="ovum-img" />
                </div>
            )}


            <style jsx>{`
                .cinematic-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: #000;
                    z-index: 9999;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                }

                .ovum-container {
                    animation: fallDown 3s linear forwards;
                }

                .ovum-img {
                    width: 300px; /* Adjust based on mobile */
                    max-width: 80vw;
                    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.2));
                }

                @keyframes fallDown {
                    0% { transform: translateY(-120vh) scale(0.8); opacity: 0; }
                    10% { opacity: 1; }
                    100% { transform: translateY(20vh) scale(1.2); }
                }

                .splash-container {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .splash-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    mix-blend-mode: screen;
                    animation: burst 1.5s ease-out forwards;
                }

                @keyframes burst {
                    0% { transform: scale(0.5); opacity: 0; filter: blur(10px); }
                    10% { opacity: 1; filter: blur(0px); }
                    100% { transform: scale(3); opacity: 0; }
                }
            `}</style>
        </div>
    );
}
