import { useState } from 'react';

export default function SecurityPin({ mode, onSuccess, initialPin }) {
    // Mode: 'create' | 'verify' | 'change'
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState(''); // For creation
    const [error, setError] = useState('');

    const handleInput = (val) => {
        if (val.length > 6) return;
        setPin(val);
        setError('');
    };

    const handleConfirmInput = (val) => {
        if (val.length > 6) return;
        setConfirmPin(val);
        setError('');
    };

    const handleSubmit = () => {
        if (mode === 'create' || mode === 'change') {
            if (pin.length !== 6) { return setError('PIN must be 6 digits'); }
            if (pin !== confirmPin) { return setError('PINs do not match'); }
            onSuccess(pin);
        } else if (mode === 'verify') {
            if (pin === initialPin) {
                onSuccess();
            } else {
                setError('Incorrect PIN');
                setPin('');
            }
        }
    };

    return (
        <div className="pin-container glass">
            <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <img src="/icon-512x512.png" alt="Prodo" style={{ width: '80px', height: '80px', borderRadius: '20px', boxShadow: '0 8px 30px rgba(255, 64, 129, 0.4)' }} />
                <h1 style={{ fontSize: '2rem', margin: 0, background: 'linear-gradient(to right, #ff4081, #ff80ab)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Prodo</h1>
            </div>
            <h2>
                {mode === 'create' && 'Create Security PIN'}
                {mode === 'verify' && 'Enter Security PIN'}
                {mode === 'change' && 'Set New PIN'}
            </h2>
            <p style={{ marginBottom: '20px', opacity: 0.7 }}>
                {mode === 'create' ? 'Secure your health data' : 'Welcome back'}
            </p>

            <div className="input-group">
                <input
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="• • • • • •"
                    value={pin}
                    onChange={(e) => handleInput(e.target.value)}
                    className="pin-input"
                />
            </div>

            {(mode === 'create' || mode === 'change') && (
                <div className="input-group" style={{ marginTop: '10px' }}>
                    <input
                        type="password"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="Confirm PIN"
                        value={confirmPin}
                        onChange={(e) => handleConfirmInput(e.target.value)}
                        className="pin-input"
                    />
                </div>
            )}

            {error && <p className="error">{error}</p>}

            <button className="submit-btn" onClick={handleSubmit}>
                {mode === 'verify' ? 'Unlock' : 'Save PIN'}
            </button>

            <style jsx>{`
                .pin-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    width: 100%;
                    padding: 20px;
                    text-align: center;
                    background: black; /* Or inherit */
                }
                .pin-input {
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.2);
                    padding: 15px;
                    border-radius: 12px;
                    color: white;
                    font-size: 1.5rem;
                    text-align: center;
                    letter-spacing: 10px;
                    width: 250px;
                    outline: none;
                }
                .pin-input:focus {
                    border-color: var(--primary-color, #ff4081);
                }
                .error { color: #ff5252; margin-top: 10px; font-size: 0.9rem; }
                .submit-btn {
                    margin-top: 25px;
                    background: var(--primary-color, #ff4081);
                    color: white;
                    padding: 12px 40px;
                    border-radius: 25px;
                    font-size: 1rem;
                    font-weight: bold;
                    letter-spacing: 1px;
                    border: none;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}
