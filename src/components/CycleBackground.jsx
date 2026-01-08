export default function CycleBackground() {
    return (
        <div className="cycle-bg">
            <div className="ovum"></div>
            <div className="fallopian-tube"></div>

            <style jsx>{`
        .cycle-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1;
            overflow: hidden;
            background: radial-gradient(circle at 50% 50%, #1a0505, #000);
            pointer-events: none;
        }

        .ovum {
            position: absolute;
            width: 40px;
            height: 40px;
            background: radial-gradient(circle at 30% 30%, #ff9aa2, #e91e63);
            border-radius: 50%;
            box-shadow: 0 0 20px rgba(233, 30, 99, 0.6);
            animation: travel 10s infinite cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0.8;
        }

        /* Abstract Tube Path */
        .fallopian-tube {
            position: absolute;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            width: 300px;
            height: 600px;
            border: 2px dashed rgba(255,255,255,0.05);
            border-radius: 150px;
            opacity: 0.3;
        }

        @keyframes travel {
            0% { top: 10%; left: 50%; transform: translateX(-50%) scale(1); opacity: 0; }
            10% { opacity: 1; }
            40% { top: 40%; left: 60%; transform: translateX(-50%) scale(1.1); } /* Ovary area */
            70% { top: 60%; left: 40%; transform: translateX(-50%) scale(1); }
            100% { top: 90%; left: 50%; transform: translateX(-50%) scale(0.5); opacity: 0; } /* Uterus/End */
        }
      `}</style>
        </div>
    );
}
