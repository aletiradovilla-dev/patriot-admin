export default function PrivacidadPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0D1B2A', color: 'white', fontFamily: 'Arial, sans-serif', padding: '40px 32px', maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 300, letterSpacing: 4, color: '#C9A84C', marginBottom: 8 }}>PATRIOT</h1>
      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: 6, marginBottom: 40 }}>AVIATION</p>
      <h2 style={{ fontSize: 22, fontWeight: 300, marginBottom: 8 }}>Aviso de Privacidad</h2>
      <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: 32, fontSize: 12 }}>Última actualización: Mayo 2026</p>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ color: '#C9A84C', fontSize: 13, letterSpacing: 2, marginBottom: 12 }}>1. RESPONSABLE DEL TRATAMIENTO</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, fontSize: 14 }}>
          Patriot Aviation S.A. de C.V., con domicilio en Toluca, Estado de México, México, es el responsable del tratamiento de sus datos personales, de conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ color: '#C9A84C', fontSize: 13, letterSpacing: 2, marginBottom: 12 }}>2. DATOS PERSONALES QUE RECOPILAMOS</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, fontSize: 14, marginBottom: 12 }}>
          A través de nuestra aplicación móvil Patriot Aviation recopilamos los siguientes datos personales:
        </p>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Datos de identificación:</p>
        <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, fontSize: 14, marginBottom: 12, paddingLeft: 16 }}>
          Nombre completo, correo electrónico, número de teléfono, nombre de empresa u organización.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Datos de uso del servicio:</p>
        <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, fontSize: 14, marginBottom: 12, paddingLeft: 16 }}>
          Historial de solicitudes de vuelos charter, reservas de empty legs, membresías contratadas, rutas solicitadas, fechas y destinos de viaje.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Datos de autenticación:</p>
        <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, fontSize: 14, paddingLeft: 16 }}>
          Correo electrónico y contraseña cifrada para acceso a la cuenta. Las contraseñas nunca son almacenadas en texto plano.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ color: '#C9A84C', fontSize: 13, letterSpacing: 2, marginBottom: 12 }}>3. FINALIDADES DEL TRATAMIENTO</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, fontSize: 14, marginBottom: 12 }}>Sus datos personales son tratados para las siguientes finalidades primarias:</p>
        <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, fontSize: 14, paddingLeft: 16, marginBottom: 12 }}>
          • Crear y gestionar su cuenta de usuario en la aplicación.<br/>
          • Procesar y dar seguimiento a sus solicitudes de vuelos charter.<br/>
          • Gestionar reservas de empty legs y membresías.<br/>
          • Facilitar la comunicación entre usted y nuestro equipo de ventas vía WhatsApp.<br/>
          • Brindar atención al cliente y soporte técnico.<br/>
          • Generar su historial de viajes y servicios contratados.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, fontSize: 14, marginBottom: 12 }}>Finalidades secundarias (puede oponerse):</p>
        <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, fontSize: 14, paddingLeft: 16 }}>
          • Envío de comunicaciones comerciales sobre nuevos vuelos y promociones.<br/>
          • Análisis estadístico para mejorar nuestros servicios.<br/>
          • Notificaciones sobre vuelos disponibles de su interés.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ color: '#C9A84C', fontSize: 13, letterSpacing: 2, marginBottom: 12 }}>4. TRANSFERENCIA DE DATOS</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, fontSize: 14 }}>
          Patriot Aviation no vende, renta ni transfiere sus datos personales a terceros con fines comerciales. Sus datos podrán ser compartidos únicamente con:
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, fontSize: 14, paddingLeft: 16, marginTop: 8 }}>
          • Autoridades competentes cuando sea requerido por ley.<br/>
          • Proveedores de servicios tecnológicos (almacenamiento en la nube, autenticación) bajo estrictos acuerdos de confidencialidad.<br/>
          • Operadores de vuelo cuando sea necesario para la prestación del servicio contratado.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ color: '#C9A84C', fontSize: 13, letterSpacing: 2, marginBottom: 12 }}>5. SEGURIDAD DE LA INFORMACIÓN</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, fontSize: 14 }}>
          Implementamos las siguientes medidas de seguridad para proteger sus datos personales:
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, fontSize: 14, paddingLeft: 16, marginTop: 8 }}>
          • Cifrado SSL/TLS en todas las transmisiones de datos.<br/>
          • Almacenamiento seguro en servidores con cifrado AES-256.<br/>
          • Autenticación segura mediante Supabase Auth.<br/>
          • Acceso restringido a datos personales solo para personal autorizado.<br/>
          • Contraseñas almacenadas con hash bcrypt, nunca en texto plano.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ color: '#C9A84C', fontSize: 13, letterSpacing: 2, marginBottom: 12 }}>6. DERECHOS ARCO</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, fontSize: 14, marginBottom: 12 }}>
          Usted tiene derecho a ejercer sus derechos ARCO en cualquier momento:
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, fontSize: 14, paddingLeft: 16, marginBottom: 12 }}>
          • <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Acceso:</strong> Conocer qué datos personales tenemos sobre usted.<br/>
          • <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Rectificación:</strong> Corregir datos inexactos o incompletos.<br/>
          • <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Cancelación:</strong> Solicitar la eliminación de sus datos.<br/>
          • <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Oposición:</strong> Oponerse al tratamiento de sus datos para finalidades específicas.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, fontSize: 14 }}>
          Para ejercer estos derechos, contáctenos por WhatsApp al +52 722 559 2758 indicando su nombre, correo registrado y el derecho que desea ejercer. Responderemos en un plazo máximo de 20 días hábiles.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ color: '#C9A84C', fontSize: 13, letterSpacing: 2, marginBottom: 12 }}>7. RETENCIÓN DE DATOS</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, fontSize: 14 }}>
          Sus datos personales serán conservados mientras mantenga una cuenta activa en nuestra aplicación o mientras sea necesario para cumplir con las finalidades descritas. Al solicitar la cancelación de su cuenta, sus datos serán eliminados en un plazo de 30 días hábiles, salvo obligación legal de conservarlos.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ color: '#C9A84C', fontSize: 13, letterSpacing: 2, marginBottom: 12 }}>8. USO DE COOKIES Y TECNOLOGÍAS SIMILARES</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, fontSize: 14 }}>
          Nuestra aplicación móvil no utiliza cookies. Sin embargo, utilizamos tokens de sesión seguros para mantener su sesión activa. Estos tokens son almacenados de forma segura en su dispositivo y pueden ser eliminados cerrando sesión en la aplicación.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ color: '#C9A84C', fontSize: 13, letterSpacing: 2, marginBottom: 12 }}>9. CAMBIOS AL AVISO DE PRIVACIDAD</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, fontSize: 14 }}>
          Patriot Aviation se reserva el derecho de modificar este aviso de privacidad en cualquier momento para adaptarse a cambios legislativos o en nuestros servicios. Las modificaciones serán notificadas a través de la aplicación móvil con al menos 30 días de anticipación.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ color: '#C9A84C', fontSize: 13, letterSpacing: 2, marginBottom: 12 }}>10. CONTACTO</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, fontSize: 14 }}>
          Para cualquier duda, comentario o solicitud relacionada con este aviso de privacidad:<br/><br/>
          <strong style={{ color: 'rgba(255,255,255,0.8)' }}>Patriot Aviation</strong><br/>
          WhatsApp: +52 722 559 2758<br/>
          Sitio web: patriotaviation.mx<br/>
          Ubicación: Toluca, Estado de México, México
        </p>
      </section>

      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 40, borderTop: '1px solid rgba(201,168,76,0.2)', paddingTop: 20, textAlign: 'center' }}>
        © 2026 Patriot Aviation. Todos los derechos reservados.
      </p>
    </div>
  );
}
