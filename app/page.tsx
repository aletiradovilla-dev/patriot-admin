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

export default function AdminPage() {
  const [vuelos, setVuelos] = useState<EmptyLeg[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    origen: '', destino: '', fecha: '', hora: '',
    precio_asiento: '', precio_cabina: '', aeronave: '', asientos: '8'
  });

  useEffect(() => { fetchVuelos(); }, []);

  const fetchVuelos = async () => {
    const { data } = await supabase.from('empty_legs').select('*').order('fecha', { ascending: true });
    if (data) setVuelos(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('empty_legs').insert([{
      ...form,
      precio_asiento: parseInt(form.precio_asiento),
      precio_cabina: parseInt(form.precio_cabina),
      asientos: parseInt(form.asientos),
      estado: 'disponible'
    }]);
    setForm({ origen: '', destino: '', fecha: '', hora: '', precio_asiento: '', precio_cabina: '', aeronave: '', asientos: '8' });
    setShowForm(false);
    fetchVuelos();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este vuelo?')) return;
    await supabase.from('empty_legs').delete().eq('id', id);
    fetchVuelos();
  };

  const handleEstado = async (id: number, estado: string) => {
    await supabase.from('empty_legs').update({ estado }).eq('id', id);
    fetchVuelos();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0D1B2A', color: 'white', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#1B2A4A', padding: '20px 32px', borderBottom: '1px solid rgba(201,168,76,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 300, letterSpacing: 4 }}>PATRIOT</h1>
          <p style={{ margin: 0, fontSize: 10, color: '#C9A84C', letterSpacing: 6 }}>AVIATION ADMIN</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ backgroundColor: '#C9A84C', color: '#1B2A4A', border: 'none', padding: '12px 24px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
          {showForm ? 'Cancelar' : '+ Nuevo Empty Leg'}
        </button>
      </div>

      <div style={{ padding: '32px' }}>
        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <h2 style={{ margin: '0 0 20px', fontSize: 18, color: '#C9A84C' }}>Nuevo Empty Leg</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { label: 'Origen', key: 'origen', placeholder: 'Ej: Toluca' },
                { label: 'Destino', key: 'destino', placeholder: 'Ej: Cancún' },
                { label: 'Fecha', key: 'fecha', placeholder: 'YYYY-MM-DD', type: 'date' },
                { label: 'Hora', key: 'hora', placeholder: 'HH:MM', type: 'time' },
                { label: 'Precio por asiento (USD)', key: 'precio_asiento', placeholder: '350', type: 'number' },
                { label: 'Precio cabina completa (USD)', key: 'precio_cabina', placeholder: '2100', type: 'number' },
                { label: 'Aeronave', key: 'aeronave', placeholder: 'Ej: Hawker 800' },
                { label: 'Asientos disponibles', key: 'asientos', placeholder: '8', type: 'number' },
              ].map(({ label, key, placeholder, type }) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 6, letterSpacing: 1 }}>{label}</label>
                  <input
                    type={type || 'text'}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    required
                    style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '12px 14px', color: 'white', fontSize: 14, boxSizing: 'border-box' }}
                  />
                </div>
              ))}
            </div>
            <button type="submit" style={{ marginTop: 20, backgroundColor: '#C9A84C', color: '#1B2A4A', border: 'none', padding: '14px 32px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
              Publicar vuelo
            </button>
          </form>
        )}

        {/* Table */}
        <h2 style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 16, fontWeight: 300 }}>Empty Legs ({vuelos.length})</h2>
        {loading ? (
          <p style={{ color: 'rgba(255,255,255,0.3)' }}>Cargando...</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
                  {['Ruta', 'Fecha', 'Hora', 'Aeronave', 'Pax', 'Asiento', 'Cabina', 'Estado', 'Acciones'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 10, color: '#C9A84C', letterSpacing: 2, fontWeight: 600 }}>{h}</th>
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
                      <select value={v.estado} onChange={e => handleEstado(v.id, e.target.value)} style={{ backgroundColor: '#1B2A4A', color: v.estado === 'disponible' ? '#4CAF50' : '#f44336', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '4px 8px', fontSize: 12, cursor: 'pointer' }}>
                        <option value="disponible">Disponible</option>
                        <option value="agotado">Agotado</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <button onClick={() => handleDelete(v.id)} style={{ backgroundColor: 'rgba(244,67,54,0.1)', color: '#f44336', border: '1px solid rgba(244,67,54,0.3)', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', fontSize: 12 }}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
