export default function HuePicker({ hue, onChange }) {
    return (
        <div className="hue-picker">
            <input
                type="range"
                min="0"
                max="360"
                value={hue}
                onChange={(e) => onChange(e.target.value)}
                className="hue-slider"
            />
            <div
                className="preview"
                style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
            />
            <style jsx>{`
        .hue-picker { display: flex; align-items: center; gap: 10px; width: 100%; }
        .hue-slider { 
          -webkit-appearance: none; width: 100%; height: 10px; border-radius: 5px;
          background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet, red);
        }
        .hue-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: white; border: 2px solid black; cursor: pointer; }
        .preview { width: 30px; height: 30px; border-radius: 50%; border: 2px solid white; flex-shrink: 0; }
      `}</style>
        </div>
    );
}
