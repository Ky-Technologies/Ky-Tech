/**
 * KYTECH // SUPABASE CLIENT & DATA LAYER
 * Funciona de inmediato sin romper nada:
 * - Si configuras tus credenciales, guarda en Supabase en tiempo real.
 * - Si aún no las tienes a mano, funciona con datos locales seguros.
 */

window.KYTECH_CONFIG = {
  // Pega aquí los datos de tu proyecto de Supabase (Project Settings -> API):
  supabaseUrl: '',      // Ej: 'https://tu-proyecto.supabase.co'
  supabaseAnonKey: '',  // Tu clave pública 'anon' / 'public'
};

// Verifica si Supabase está activo
function isSupabaseConfigured() {
  const cfg = window.KYTECH_CONFIG;
  return cfg.supabaseUrl && cfg.supabaseAnonKey && cfg.supabaseUrl.startsWith('http');
}

/**
 * Guarda una nueva consulta / lead desde el formulario de contacto
 * @param {Object} leadData - { nombre, whatsapp, email, empresa, servicio, mensaje }
 */
async function sendLeadToDatabase(leadData) {
  if (!isSupabaseConfigured()) {
    console.info('Kytech: Supabase no configurado aún. Guardando lead en respaldo local.');
    // Respaldo seguro en localStorage
    const leadsBackup = JSON.parse(localStorage.getItem('kytech_leads_backup') || '[]');
    leadsBackup.push({ ...leadData, date: new Date().toISOString() });
    localStorage.setItem('kytech_leads_backup', JSON.stringify(leadsBackup));
    return { success: true, mode: 'local' };
  }

  try {
    const url = `${window.KYTECH_CONFIG.supabaseUrl}/rest/v1/leads`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': window.KYTECH_CONFIG.supabaseAnonKey,
        'Authorization': `Bearer ${window.KYTECH_CONFIG.supabaseAnonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(leadData)
    });

    if (!response.ok) {
      throw new Error(`Error en servidor: ${response.statusText}`);
    }

    return { success: true, mode: 'supabase' };
  } catch (err) {
    console.error('Error al enviar a Supabase:', err);
    // Si falla la red, guardamos en local para no perder la consulta
    const leadsBackup = JSON.parse(localStorage.getItem('kytech_leads_backup') || '[]');
    leadsBackup.push({ ...leadData, date: new Date().toISOString(), offline: true });
    localStorage.setItem('kytech_leads_backup', JSON.stringify(leadsBackup));
    return { success: true, mode: 'offline-backup' };
  }
}

/**
 * Obtiene el catálogo de equipos de la tienda
 */
async function fetchEquiposFromDatabase() {
  if (!isSupabaseConfigured()) {
    return null; // El frontend usará el catálogo HTML predeterminado
  }

  try {
    const url = `${window.KYTECH_CONFIG.supabaseUrl}/rest/v1/equipos?disponible=eq.true&order=orden.asc`;
    const response = await fetch(url, {
      headers: {
        'apikey': window.KYTECH_CONFIG.supabaseAnonKey,
        'Authorization': `Bearer ${window.KYTECH_CONFIG.supabaseAnonKey}`
      }
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (err) {
    console.warn('No se pudo conectar a Supabase, usando catálogo estándar:', err);
    return null;
  }
}

window.sendLeadToDatabase = sendLeadToDatabase;
window.fetchEquiposFromDatabase = fetchEquiposFromDatabase;
