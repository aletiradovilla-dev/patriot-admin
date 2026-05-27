cat > ~/patriot-admin/app/layout.tsx << 'EOF'
'use client';
import { useState } from 'react';
import './globals.css';

export default function RootLayout({ children, params }: { children: React.ReactNode; params?: any }) {
  const [pass, setPass] = useState('');
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState(false);

  if (typeof window !== 'undefined' && window.location.pathname === '/privacidad') {
    return (
      <html lang="es">
        <body style={{ margin: 0 }}>{children}</body>
      </html>
    );
  }

  if (!auth) {
    return (
      <html lang="es">
        <body style={{ margin: 0 }}>
          <div style={{ minHeight: '100vh', backgroundColor: '#0D1B2A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ width: 360, padding: 40, backgroundColor: '#1B2A4A', borderRadius: 16, border: '1px solid rgba(201,168,76,0.2)' }}>
              <h1 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 300, letterSpacing: 4, color: '#fff' }}>PATRIOT</h1>
              <p style={{ margin: '0 0 32px', fontSize: 10, color: '#C9A84C', letterSpacing: 6 }}>AVIATION ADMIN</p>
              <input
                type="password"
                placeholder="Contraseña"
                value={pass}
                onChange={e => { setPass(e.target.value); setError(false); }}
                onKeyDown={e => e.key === 'Enter' && (() => { if (pass === 'Patriot2026') { setAuth(true); } else { setError(true); setPass(''); } })()}
                style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.06)', border: error ? '1px solid #f44336' : '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '14px 16px', color: 'white', fontSize: 14, boxSizing: 'border-box', marginBottom: 12, outline: 'none' }}
              />
              {error && <p style={{ color: '#f44336', fontSize: 12, margin: '0 0 12px' }}>Contraseña incorrecta</p>}
              <button onClick={() => { if (pass === 'Patriot2026') { setAuth(true); } else { setError(true); setPass(''); } }} style={{ width: '100%', backgroundColor: '#C9A84C', color: '#1B2A4A', border: 'none', padding: '14px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
                Entrar
              </button>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="es">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
EOF
