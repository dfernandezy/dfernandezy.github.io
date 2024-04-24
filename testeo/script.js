// document.getElementById('fileInput').addEventListener('change', function(event) {
//     var file = event.target.files[0];
//     var audioPlayer = document.getElementById('audioPlayer');
//     audioPlayer.src = URL.createObjectURL(file);
//   });

//   document.getElementById('playButton').addEventListener('click', function() {
//     var audioPlayer = document.getElementById('audioPlayer');
//     if (audioPlayer.paused) {
//       audioPlayer.play();
//       this.textContent = 'Pause';
//     } else {
//       audioPlayer.pause();
//       this.textContent = 'Play';
//     }
//   });


// Importar el SDK de Supabase
import { createClient } from '@supabase/supabase-js';

// Configurar el cliente de Supabase con tu URL y clave de API
const supabase = createClient('https://pthasczqlxqkuynfmlft.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0aGFzY3pxbHhxa3V5bmZtbGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM2NTQ1NzgsImV4cCI6MjAyOTIzMDU3OH0.KEPjXTn9bdKk7fw3tVik9vGoRbvlyZTtNkIrNpntKJk');

// Función para manejar el inicio de sesión
async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { user, error } = await supabase.auth.signIn({
        email,
        password,
    });
    if (error) {
        document.getElementById('errorMessage').textContent = error.message;
    } else {
        window.location.href = 'dashboard.html';
    }
}

// Escuchar el evento submit del formulario
document.getElementById('loginForm').addEventListener('submit', handleLogin);
