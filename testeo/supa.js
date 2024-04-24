// Importar el SDK de Supabase
import { createClient } from '@supabase/supabase-js';

// Configurar el cliente de Supabase con tu URL y clave de API
const supabase = createClient('TU_URL_DE_SUPABASE', 'TU_CLAVE_DE_API');

// Función para registrar un nuevo usuario
async function signUp(email, password) {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.error('Error al registrar el usuario:', error.message);
    return null;
  }
  return user;
}

// Función para iniciar sesión
async function signIn(email, password) {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  });
  if (error) {
    console.error('Error al iniciar sesión:', error.message);
    return null;
  }
  return user;
}

// Función para cerrar sesión
async function signOut() {
  await supabase.auth.signOut();
}

// Función para cargar una canción al almacenamiento de archivos de Supabase
async function uploadSong(file) {
  const { data, error } = await supabase.storage.from('canciones').upload(`usuario/${supabase.auth.user().id}/${file.name}`, file);
  if (error) {
    console.error('Error al cargar la canción:', error.message);
    return null;
  }
  return data;
}

// Función para obtener todas las canciones de un usuario
async function getUserSongs() {
  const { data, error } = await supabase.storage.from('canciones').list(`usuario/${supabase.auth.user().id}`);
  if (error) {
    console.error('Error al obtener las canciones del usuario:', error.message);
    return null;
  }
  return data;
}

// Ejemplo de uso de las funciones
async function ejemplo() {
  // Registrar un nuevo usuario
  const newUser = await signUp('ejemplo@email.com', 'contraseña123');
  if (newUser) {
    console.log('Usuario registrado exitosamente:', newUser);
    
    // Iniciar sesión con el usuario registrado
    const loggedInUser = await signIn('ejemplo@email.com', 'contraseña123');
    if (loggedInUser) {
      console.log('Usuario inició sesión exitosamente:', loggedInUser);
      
      // Cargar una canción al almacenamiento
      const file = document.getElementById('inputFile').files[0];
      const uploadedSong = await uploadSong(file);
      if (uploadedSong) {
        console.log('Canción cargada exitosamente:', uploadedSong);
        
        // Obtener todas las canciones del usuario
        const userSongs = await getUserSongs();
        if (userSongs) {
          console.log('Canciones del usuario:', userSongs);
        }
      }
      
      // Cerrar sesión
      await signOut();
      console.log('Usuario cerró sesión');
    }
  }
}

// Llamar a la función de ejemplo
ejemplo();
