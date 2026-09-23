
const supabaseUrl = 'https://ysuxnynwombpnouxoowx.supabase.co'; 
const supabaseKey = 'sb_publishable_1AgSqjihSfP_H8TUGBvUZw_9aMt9Zz7';

// 1. Configuración de Supabase (Asegúrate de que estas líneas existan)
const supabaseUrl = 'https://supabase.co';
const supabaseKey = 'tu-anon-key-de-supabase';

// 2. Creamos el cliente UNA SOLA VEZ y de forma global
let supabaseClient = null;

// 3. Esperamos a que el HTML esté cargado antes de buscar el botón
document.addEventListener('DOMContentLoaded', () => {
    const btnConectar = document.getElementById('btnConectar');
    if (btnConectar) {
        btnConectar.addEventListener('click', conectarSupabase);
    } else {
        console.error("No se encontró el botón btnConectar en el HTML");
    }

    const btnBuscar = document.getElementById('btnBuscar');
    if (btnBuscar) {
        btnBuscar.addEventListener('click', buscarCategoria);
    } else {
        console.error("No se encontró el botón btnBuscar en el HTML");
    }
});

// 4. Función que se ejecuta al hacer clic en CONECTAR
function conectarSupabase() {
    try {
        // Validar si las variables existen antes de intentar conectar
        if (typeof supabaseUrl === 'undefined' || typeof supabaseKey === 'undefined') {
            throw new Error("Las variables 'supabaseUrl' o 'supabaseKey' no están definidas.");
        }

        // Si aún no se ha creado el cliente, lo creamos
        if (!supabaseClient) {
            supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
        }
        
        alert("CONEXIÓN EXITOSA 🔌");
        console.log("Cliente Supabase inicializado correctamente:", supabaseClient);
    } catch (error) {
        alert("ERROR DE CONEXIÓN ❌");
        console.error("Detalles del error al conectar:", error);
    }
}

// 5. Función para buscar la categoría
async function buscarCategoria() {
    // (Tu código de búsqueda que ya corregimos...)
}
