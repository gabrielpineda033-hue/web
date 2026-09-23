
// 1. Configuración de Supabase (Tus credenciales reales)
const supabaseUrl = 'https://ysuxnynwombpnouxoowx.supabase.co'; 
const supabaseKey = 'sb_publishable_1AgSqjihSfP_H8TUGBvUZw_9aMt9Zz7';

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
    if (!supabaseClient) {
        alert("Primero debes conectarte 🔌");
        return;
    }

    const id = document.getElementById('id_categoria').value.trim();
    const nombre = document.getElementById('nombre_categoria').value.trim();

    if (!id && !nombre) {
        alert("Ingresa un ID o un Nombre para buscar ⚠️");
        return;
    }

    try {
        let query = supabaseClient.from('categorias').select('*');

        if (id) {
            query = query.eq('id_categoria', id);
        }
        if (nombre) {
            query = query.ilike('nombre', `%${nombre}%`); 
        }

        const { data, error } = await query;
        if (error) throw error;

        if (!data || data.length === 0) {
            alert("No se encontró ninguna categoría ❌");
            return;
        }

        // IMPORTANTE: Asegúrate de que data[0] se use aquí para acceder al primer registro de la lista
        document.getElementById('id_categoria').value = data[0].id_categoria;
        document.getElementById('nombre_categoria').value = data[0].nombre;
        document.getElementById('estado').value = data[0].estado;
        
        alert(`✅ Se encontraron ${data.length} resultado(s).`);

    } catch (error) {
        alert("Error al buscar ❌: " + error.message);
        console.error("Detalle del error:", error);
    }
}
