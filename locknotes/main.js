// static/js/main.js
document.addEventListener('DOMContentLoaded', function () {
    // Variables globales
    let currentDevice = null;
    let notes = [];

    // Elementos DOM
    const deviceSelect = document.getElementById('deviceSelect');
    const imageInput = document.getElementById('imageInput');
    const preview = document.getElementById('preview');
    const addNoteBtn = document.getElementById('addNote');
    const saveButton = document.getElementById('saveButton');

    // Manejador de selección de dispositivo
    deviceSelect.addEventListener('change', function (e) {
        const device = e.target.value;
        if (device === 'custom') {
            document.getElementById('customSize').classList.remove('hidden');
        } else {
            document.getElementById('customSize').classList.add('hidden');
            setDeviceDimensions(device);
        }
    });

    // Manejador de subida de imagen
    imageInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                preview.style.backgroundImage = `url(${e.target.result})`;
            }
            reader.readAsDataURL(file);
        }
    });

    // Añadir nota
    addNoteBtn.addEventListener('click', function () {
        const note = createNote();
        if (note) {  // Solo añadir la nota si se ingresó texto
            notes.push(note);
            preview.appendChild(note.element);
        }
    });

    // Crear nota
    function createNote() {
        const noteText = prompt('¿Qué texto deseas añadir en la nota?');

        // Si el usuario cancela o no ingresa texto, no crear la nota
        if (!noteText) {
            return null;
        }

        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.contentEditable = true;
        noteElement.innerHTML = noteText;

        // Hacer la nota arrastrable
        makeNoteDraggable(noteElement);

        return {
            element: noteElement,
            text: noteText,
            position: { x: 50, y: 50 }
        };
    }

    // Hacer nota arrastrable
    function makeNoteDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        element.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    // Guardar y descargar
    saveButton.addEventListener('click', async function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Configurar dimensiones del canvas
        canvas.width = preview.offsetWidth;
        canvas.height = preview.offsetHeight;

        // Dibujar fondo
        const img = new Image();
        img.src = preview.style.backgroundImage.slice(4, -1).replace(/"/g, "");

        img.onload = function () {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Dibujar notas
            notes.forEach(note => {
                const rect = note.element.getBoundingClientRect();
                const previewRect = preview.getBoundingClientRect();

                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fillRect(
                    rect.left - previewRect.left,
                    rect.top - previewRect.top,
                    rect.width,
                    rect.height
                );

                ctx.fillStyle = 'black';
                ctx.font = '14px Arial';
                ctx.fillText(
                    note.element.innerText,
                    rect.left - previewRect.left + 5,
                    rect.top - previewRect.top + 20
                );
            });

            // Descargar imagen
            const link = document.createElement('a');
            link.download = 'locknote-wallpaper.png';
            link.href = canvas.toDataURL();
            link.click();
        };
    });

    // Función para establecer dimensiones del dispositivo
    function setDeviceDimensions(device) {
        const dimensions = {
            'iphone13': { width: 375, height: 812 },
            's21': { width: 360, height: 800 },
        };

        if (dimensions[device]) {
            preview.style.width = dimensions[device].width + 'px';
            preview.style.height = dimensions[device].height + 'px';
        }
    }
});
