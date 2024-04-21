// Configura la conexión con Supabase
const supabaseUrl = 'https://pthasczqlxqkuynfmlft.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0aGFzY3pxbHhxa3V5bmZtbGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM2NTQ1NzgsImV4cCI6MjAyOTIzMDU3OH0.KEPjXTn9bdKk7fw3tVik9vGoRbvlyZTtNkIrNpntKJk';
const cliente = supabase.createClient(supabaseUrl, supabaseKey);

// Consulta el número total de empresas en la tabla "empresas"
async function obtenerNumeroTotalEmpresas() {
    try {
        const { data, error } = await cliente.from('empresas').select('id');
        if (error) {
            throw error;
        }

        // El número total de empresas es igual al número total de IDs recuperados de la tabla "empresas"
        const numeroTotalEmpresas = data.length;
        console.log('Número total de empresas:', numeroTotalEmpresas);

        return numeroTotalEmpresas;
    } catch (error) {
        console.error('Error al obtener el número total de empresas:', error.message);
        return 0;
    }
}



// Uso de la función para obtener el número de empresas
obtenerNumeroTotalEmpresas().then(numeroEmpresas => {
    console.log('Número de empresas:', numeroEmpresas);
    // Actualizar el contenido del elemento HTML con el número de empresas
    document.getElementById('numeroTotalEmpresas').innerHTML = numeroEmpresas;
});



