function toggleMenu() {
    const menu = document.querySelector('.menu-lateral');
    const leftValue = menu.style.left;

    // Si el menú está completamente cerrado o parcialmente abierto
    if (leftValue === '' || leftValue === '-250px') {
        menu.style.left = '0';
    } else {
        menu.style.left = '-250px';
    }
}

document.querySelector('.dropdown-toggle').addEventListener('click', function (event) {
    event.preventDefault();
    this.nextElementSibling.classList.toggle('show');
});

// Cerrar el dropdown si se hace clic fuera de él
window.onclick = function (event) {
    if (!event.target.matches('.dropdown-toggle')) {
        var dropdowns = document.getElementsByClassName("dropdown-menu");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
// // Función para actualizar el gráfico de barras con nuevos datos de costes y nombres de empresas
// function actualizarGraficoBarras(costes, nombresEmpresas) {
//     const graficoBarras = document.getElementById('graficoBarras');

//     // Limpiar el contenido existente del gráfico
//     graficoBarras.innerHTML = '';

//     // Iterar sobre los nuevos datos de costes y crear las barras correspondientes
//     costes.forEach((costo, index) => {
//         const barra = document.createElement('div');
//         barra.classList.add('barra');
//         barra.style.height = `${costo}px`; // Asignar la altura de la barra según el costo

//         // Agregar el atributo data-nombre-empresa con el nombre de la empresa
//         barra.setAttribute('data-nombre-empresa', nombresEmpresas[index]);

//         graficoBarras.appendChild(barra);
//     });
// }

// // Ejemplo de nuevos datos de costes y nombres de empresas
// const nuevosCostes = [40, 120, 90, 210];
// const nombresEmpresas = ["Empresa A", "Empresa B", "Empresa C", "Empresa D"];

// // Llamar a la función para actualizar el gráfico de barras con los nuevos datos de costes y nombres de empresas
// actualizarGraficoBarras(nuevosCostes, nombresEmpresas);
