import { useState } from 'react';
import { Lock } from 'lucide-react';

interface LoginProps {
  onUnlock: () => void;
}

export function Login({ onUnlock }: LoginProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pin === '2233') {
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100dvh', backgroundColor: 'var(--bg-color)', textAlign: 'center', padding: '20px' }}>
      <div style={{ marginBottom: '32px', padding: '0 16px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px', letterSpacing: '-0.5px' }}>Engage and Achieve</h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.4 }}>Support Our Students Where They Are At</p>
      </div>
      
      <div style={{ backgroundColor: 'var(--card-bg)', padding: '32px 24px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', width: '100%', maxWidth: '340px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '16px', borderRadius: '50%' }}>
            <Lock size={32} />
          </div>
        </div>
        
        <h1 style={{ marginBottom: '24px', fontSize: '1.5rem', color: 'var(--text-main)' }}>Staff Portal</h1>
        
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <input 
              type="password" 
              placeholder="Enter PIN" 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '8px', padding: '16px', borderRadius: '12px', border: error ? '2px solid var(--danger)' : '2px solid var(--border-color)', width: '100%', boxSizing: 'border-box' }} 
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
          
          <button type="submit" className="primary-btn" style={{ fontSize: '18px', padding: '16px', borderRadius: '12px' }}>
            Unlock App
          </button>
          
          {error && <div style={{ color: 'var(--danger)', marginTop: '16px', fontWeight: 'bold' }}>Invalid PIN</div>}
        </form>
      </div>
    </div>
  );
}
