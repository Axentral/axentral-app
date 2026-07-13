// assets/js/supabase-client.js
// Cliente compartido de Supabase para todo el sitio Axentral.
// La anon key es publica por diseno (no es la clave secreta) -- se puede exponer en el frontend.
// La seguridad real la da Row Level Security (RLS) en las tablas de Supabase.
// Requiere el SDK de Supabase cargado ANTES que este archivo en el <head> o final del <body>:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>

const SUPABASE_URL = 'https://ttidobbtcrjzzqflxayb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0aWRvYmJ0Y3JqenpxZmx4YXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMDU2NjIsImV4cCI6MjA5MzY4MTY2Mn0.lQLUD2ali730xRXLmu6PeKEXGvN8ofQDFBccl0Nfs08';

window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helpers reutilizables en cualquier pagina del sitio

async function axGetSession() {
  const { data, error } = await window.supabaseClient.auth.getSession();
  if (error) {
    console.error('Error obteniendo sesion:', error.message);
    return null;
  }
  return data.session;
}

async function axLogout() {
  await window.supabaseClient.auth.signOut();
  window.location.href = '/portal/';
}

window.axGetSession = axGetSession;
window.axLogout = axLogout;
