'use client';
import { useEffect, useState } from 'react';
import { supabase } from './supabase';

type EmptyLeg = {
  id: number;
  origen: string;
  destino: string;
  fecha: string;
  hora: string;
  precio_asiento: number;
  precio_cabina: number;
  aeronave: string;
  asientos: number;
  estado: string;
};

type Avion = {
  id: number;
  matricula: string;
  modelo: string;
  tipo: string;
  pasajeros: number;
  wc: boolean;
  cabina: string;
  horas_max: string;
  maletas: number;
  sobrecargo: boolean;
  foto_url: string;
  estado: string;
};

type Viaje = {
  id: number;
  usuario_id: string;
  origen: string;
  destino: string;
  fecha: string;
  tipo: string;
  estado: string;
  aeronave: string;
  precio: number;
};

export default function AdminPage() {
  const [tab, setTab] = useState('empty-legs');
  const [vuelos, setVuelos] = useState<EmptyLeg[]>([]);
  const [flota, setFlota] = useState<Avion[]>([]);
  const [viajes, setViajes] = useState<Viaje[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [vueloForm, setVueloForm] = useState({
    origen: '', destino: '', fecha: '', hora: '', precio_asiento: '', precio_cabina: '', aeronave: '', asientos: '8'
  });
  const [avionForm, setAvionForm] = useState({
    matricula: '', modelo: '', tipo: 'Mid-Size Jet', pasajeros: '8', wc: true, cabina: 'Alta', horas_max: '5h', maletas: '8', sobrecargo: false, foto_url: '', estado: 'disponible'
  });

  useEffect(() => {
    fetchVuelos();
    fetchFlota();
    fetchViajes();
  }, []);

  const fetchVuelos = async () => {
    const { data } = await supabase.from('empty_legs').select('*').order('fecha', { ascending: true });
    if (data) setVuelos(data);
    setLoading(false);
  };

  const fetchFlota = async () => {
    const { data } = await supabase.from('flota').select('*').order('modelo', { ascending: true });
    if (data) setFlota(data);
  };

  const fetchViajes = async () => {
    const { data } = await supabase.from('viajes').select('*').order('fecha', { ascending: false });
    if (data) setViajes(data);
  };

  const handleVueloSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('empty_legs').insert([{
      ...vueloForm,
      precio_asiento: parseInt(vueloForm.precio_asiento),
      precio_cabina: parseInt(vueloForm.precio_cabina),
      asientos: parseInt(vueloForm.asientos),
      estado: 'disponible'
    }]);
    setVueloForm({ origen: '', destino: '', fecha: '', hora: '', precio_asiento: '', precio_cabina: '', aeronave: '', asientos: '8' });
    setShowForm(false);
    fetchVuelos();
  };

  const handleAvionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('flota').insert([{
      ...avionForm,
      pasajeros: parseInt(avionForm.pasajeros),
      maletas: parseInt(avionForm.maletas)
    }]);
    setAvionForm({ matricula: '', modelo: '', tipo: 'Mid-Size Jet', pasajeros: '8', wc: true, cabina: 'Alta', horas_max: '5h', maletas: '8', sobrecargo: false, foto_url: '', estado: 'disponible' });
    setShowForm(false);
    fetchFlota();
  };

  const handleDeleteVuelo = async (id: number) => {
    if (!confirm('¿Eliminar este vuelo?')) return;
    await supabase.from('empty_legs').delete().eq('id', id);
    fetchVuelos();
  };

  const handleDeleteAvion = async (id: number) => {
    if (!confirm('¿Eliminar esta aeronave?')) return;
    await supabase.from('flota').delete().eq('id', id);
    fetchFlota();
  };

  const handleEstadoVuelo = async (id: number, estado: string) => {
    await supabase.from('empty_legs').update({ estado }).eq('id', id);
    fetchVuelos();
  };

  const handleEstadoViaje = async (id: number, estado: string) => {
    await supabase.from('viajes').update({ estado }).eq('id', id);
    fetchViajes();
  };

  const inputStyle = {
    width: '100%', backgroundColor: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
    padding: '12px 14px', color: 'white', fontSize: 14,
    boxSizing: 'border-box' as const
  };
  const labelStyle = {
    display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.4)',
    marginBottom: 6, letterSpacing: 1
  };

  const estadoColor: Record<string, string> = {
    confirmado: '#4CAF50', en_proceso: '#C9A84C', completado: '#666', cancelado: '#f44336',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0D1B2A', color: 'white', fontFamily: 'Arial, sans-serif' }}>

      {/* HEADER */}
      <div style={{ backgroundColor: '#1B2A4A', padding: '20px 32px', borderBottom: '1px solid rgba(201,168,76,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 300, letterSpacing: 4 }}>PATRIOT</h1>
          <p style={{ margin: 0, fontSize: 10, color: '#C9A84C', letterSpacing: 6 }}>AVIATION ADMIN</p>
        </div>
        {tab !== 'viajes' && (
          <button onClick={() => setShowForm(!showForm)} style={{ backgroundColor: '#C9A84C', color: '#1B2A4A', border: 'none', padding: '12px 24px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
            {showForm ? 'Cancelar' : tab === 'empty-legs' ? '+ Nuevo Empty Leg' : '+ Nueva Aeronave'}
          </button>
        )}
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingLeft: 32 }}>
        {[{ key: 'empty-legs', label: 'Empty Legs' }, { key: 'flota', label: 'Nuestra Flota' }, { key: 'viajes', label: 'Viajes' }].map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setShowForm(false); }} style={{ padding: '16px 24px', border: 'none', backgroundColor: 'transparent', color: tab === t.key ? '#C9A84C' : 'rgba(255,255,255,0.4)', borderBottom: tab === t.key ? '2px solid #C9A84C' : '2px solid transparent', cursor: 'pointer', fontSize: 13, fontWeight: tab === t.key ? 700 : 400, letterSpacing: 1 }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '32px' }}>

        {/* FORM EMPTY LEG */}
        {showForm && tab === 'empty-legs' && (
          <form onSubmit={handleVueloSubmit} style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <h2 style={{ margin: '0 0 20px', fontSize: 18, color: '#C9A84C' }}>Nuevo Empty Leg</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Origen</label>
                <input type="text" placeholder="Ej: Toluca" value={vueloForm.origen} onChange={e => setVueloForm({ ...vueloForm, origen: e.target.value })} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Destino</label>
                <input type="text" placeholder="Ej: Cancún" value={vueloForm.destino} onChange={e => setVueloForm({ ...vueloForm, destino: e.target.value })} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Fecha</label>
                <input type="date" value={vueloForm.fecha} onChange={e => setVueloForm({ ...vueloForm, fecha: e.target.value })} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Hora (formato 07:00 o TBA)</label>
                <input type="text" placeholder="07:00 o TBA" value={vueloForm.hora} onChange={e => setVueloForm({ ...vueloForm, hora: e.target.value })} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Precio asiento (USD)</label>
                <input type="number" placeholder="350" value={vueloForm.precio_asiento} onChange={e => setVueloForm({ ...vueloForm, precio_asiento: e.target.value })} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Precio cabina (USD)</label>
                <input type="number" placeholder="2100" value={vueloForm.precio_cabina} onChange={e => setVueloForm({ ...vueloForm, precio_cabina: e.target.value })} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Aeronave</label>
                <input type="text" placeholder="Ej: Hawker 800" value={vueloForm.aeronave} onChange={e => setVueloForm({ ...vueloForm, aeronave: e.target.value })} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Asientos disponibles</label>
                <input type="number" placeholder="8" value={vueloForm.asientos} onChange={e => setVueloForm({ ...vueloForm, asientos: e.target.value })} required style={inputStyle} />
              </div>
            </div>
            <button type="submit" style={{ marginTop: 20, backgroundColor: '#C9A84C', color: '#1B2A4A', border: 'none', padding: '14px 32px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
              Publicar vuelo
            </button>
          </form>
        )}

        {/* FORM FLOTA */}
        {showForm && tab === 'flota' && (
          <form onSubmit={handleAvionSubmit} style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <h2 style={{ margin: '0 0 20px', fontSize: 18, color: '#C9A84C' }}>Nueva Aeronave</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { label: 'Matrícula', key: 'matricula', placeholder: 'XB-PAT' },
                { label: 'Modelo', key: 'modelo', placeholder: 'Learjet 35' },
                { label: 'Horas máx. vuelo', key: 'horas_max', placeholder: '5h' },
                { label: 'Pasajeros', key: 'pasajeros', type: 'number', placeholder: '8' },
                { label: 'Maletas', key: 'maletas', type: 'number', placeholder: '8' },
                { label: 'URL Foto', key: 'foto_url', placeholder: 'https://...' },
              ].map(({ label, key, placeholder, type }) => (
                <div key={key}>
                  <label style={labelStyle}>{label}</label>
                  <input type={type || 'text'} placeholder={placeholder} value={avionForm[key as keyof typeof avionForm] as string} onChange={e => setAvionForm({ ...avionForm, [key]: e.target.value })} style={inputStyle} />
                </div>
              ))}
              <div>
                <label style={labelStyle}>Tipo</label>
                <select value={avionForm.tipo} onChange={e => setAvionForm({ ...avionForm, tipo: e.target.value })} style={inputStyle}>
                  {['Light Jet', 'Mid-Size Jet', 'Heavy Jet'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Cabina</label>
                <select value={avionForm.cabina} onChange={e => setAvionForm({ ...avionForm, cabina: e.target.value })} style={inputStyle}>
                  {['Alta', 'Baja'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <input type="checkbox" checked={avionForm.wc} onChange={e => setAvionForm({ ...avionForm, wc: e.target.checked })} />
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>WC a bordo</label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <input type="checkbox" checked={avionForm.sobrecargo} onChange={e => setAvionForm({ ...avionForm, sobrecargo: e.target.checked })} />
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Sobrecargo disponible</label>
              </div>
            </div>
            <button type="submit" style={{ marginTop: 20, backgroundColor: '#C9A84C', color: '#1B2A4A', border: 'none', padding: '14px 32px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
              Agregar aeronave
            </button>
          </form>
        )}

        {/* TABLA EMPTY LEGS */}
        {tab === 'empty-legs' && (
          <>
            <h2 style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 16, fontWeight: 300 }}>Empty Legs ({vuelos.length})</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
                    {['Ruta', 'Fecha', 'Hora', 'Aeronave', 'Pax', 'Asiento', 'Cabina', 'Estado', 'Acciones'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 10, color: '#C9A84C', letterSpacing: 2 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vuelos.map(v => (
                    <tr key={v.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 500 }}>{v.origen} → {v.destino}</td>
                      <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{v.fecha}</td>
                      <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{v.hora}</td>
                      <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{v.aeronave}</td>
                      <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{v.asientos}</td>
                      <td style={{ padding: '14px 16px', color: '#C9A84C', fontSize: 13 }}>${v.precio_asiento} USD</td>
                      <td style={{ padding: '14px 16px', color: '#C9A84C', fontSize: 13 }}>${v.precio_cabina} USD</td>
                      <td style={{ padding: '14px 16px' }}>
                        <select value={v.estado} onChange={e => handleEstadoVuelo(v.id, e.target.value)} style={{ backgroundColor: '#1B2A4A', color: v.estado === 'disponible' ? '#4CAF50' : '#f44336', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '4px 8px', fontSize: 12, cursor: 'pointer' }}>
                          <option value="disponible">Disponible</option>
                          <option value="agotado">Agotado</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <button onClick={() => handleDeleteVuelo(v.id)} style={{ backgroundColor: 'rgba(244,67,54,0.1)', color: '#f44336', border: '1px solid rgba(244,67,54,0.3)', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', fontSize: 12 }}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* TABLA FLOTA */}
        {tab === 'flota' && (
          <>
            <h2 style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 16, fontWeight: 300 }}>Flota ({flota.length})</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
                    {['Matrícula', 'Modelo', 'Tipo', 'Pax', 'WC', 'Cabina', 'Horas', 'Maletas', 'Acciones'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 10, color: '#C9A84C', letterSpacing: 2 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {flota.map(a => (
                    <tr key={a.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '14px 16px', color: '#C9A84C', fontWeight: 600 }}>{a.matricula}</td>
                      <td style={{ padding: '14px 16px', fontWeight: 500 }}>{a.modelo}</td>
                      <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{a.tipo}</td>
                      <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{a.pasajeros}</td>
                      <td style={{ padding: '14px 16px', fontSize: 13 }}>{a.wc ? '✓' : '✗'}</td>
                      <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{a.cabina}</td>
                      <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{a.horas_max}</td>
                      <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{a.maletas}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <button onClick={() => handleDeleteAvion(a.id)} style={{ backgroundColor: 'rgba(244,67,54,0.1)', color: '#f44336', border: '1px solid rgba(244,67,54,0.3)', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', fontSize: 12 }}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* TABLA VIAJES */}
        {tab === 'viajes' && (
          <>
            <h2 style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 16, fontWeight: 300 }}>Viajes ({viajes.length})</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
                    {['Ruta', 'Fecha', 'Tipo', 'Aeronave', 'Precio', 'Estado', 'Usuario'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 10, color: '#C9A84C', letterSpacing: 2 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {viajes.length === 0 ? (
                    <tr><td colSpan={7} style={{ padding: '24px 16px', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>No hay viajes registrados</td></tr>
                  ) : viajes.map(v => (
                    <tr key={v.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 500 }}>{v.origen} → {v.destino}</td>
                      <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{v.fecha}</td>
                      <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{v.tipo}</td>
                      <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{v.aeronave}</td>
                      <td style={{ padding: '14px 16px', color: '#C9A84C', fontSize: 13 }}>{v.precio > 0 ? `$${v.precio} USD` : '-'}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <select value={v.estado} onChange={e => handleEstadoViaje(v.id, e.target.value)} style={{ backgroundColor: '#1B2A4A', color: estadoColor[v.estado] || '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '4px 8px', fontSize: 12, cursor: 'pointer' }}>
                          <option value="en_proceso">En proceso</option>
                          <option value="confirmado">Confirmado</option>
                          <option value="completado">Completado</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{v.usuario_id?.slice(0, 8)}...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      </div>
    </div>
  );
}