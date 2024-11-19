// Función para convertir segundos a formato mm:ss
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Función para convertir mm:ss a segundos
function parseTime(timeString) {
  const [mins, secs] = timeString.split(':').map(Number);
  return mins * 60 + secs;
}

document.getElementById('save-timestamp').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action: 'saveTimestamp' }, (response) => {
      const timestamp = response.timestamp;

      const timestampDiv = document.getElementById('timestamps');
      const timestampLink = document.createElement('a');
      timestampLink.href = '#';
      timestampLink.textContent = `Timestamp: ${formatTime(timestamp)}`;

      const updateClickAction = (link, newTimestamp) => {
        link.onclick = (e) => {
          e.preventDefault();
          chrome.tabs.sendMessage(activeTab.id, { action: 'setTimestamp', timestamp: newTimestamp });
        };
      };

      updateClickAction(timestampLink, timestamp);

      // Input para editar el nombre
      const editNameInput = document.createElement('input');
      editNameInput.type = 'text';
      editNameInput.value = `Timestamp: ${formatTime(timestamp)}`;
      editNameInput.style.display = 'none';

      // Input para editar el tiempo
      const editTimeInput = document.createElement('input');
      editTimeInput.type = 'text';
      editTimeInput.value = formatTime(timestamp);
      editTimeInput.style.display = 'none';

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => {
        const isEditing = editNameInput.style.display === 'none';
        editNameInput.style.display = isEditing ? 'inline' : 'none';
        editTimeInput.style.display = isEditing ? 'inline' : 'none';
        timestampLink.style.display = isEditing ? 'none' : 'inline';
        editButton.textContent = isEditing ? 'Save' : 'Edit';

        if (!isEditing) {
          const updatedName = editNameInput.value;
          const updatedTimestamp = parseTime(editTimeInput.value);
          timestampLink.textContent = updatedName;

          // Actualizar el almacenamiento local
          chrome.storage.local.get('timestamps', (data) => {
            const timestamps = data.timestamps || [];
            const index = timestamps.findIndex((item) => item.timestamp === timestamp);
            if (index !== -1) {
              timestamps[index].link = updatedName;
              timestamps[index].timestamp = updatedTimestamp;
              chrome.storage.local.set({ timestamps: timestamps }, () => {
                console.log('Timestamp actualizado.');
              });

              // Actualizar el evento de clic con el nuevo tiempo
              updateClickAction(timestampLink, updatedTimestamp);
            }
          });
        }
      });

      chrome.storage.local.get('timestamps', (data) => {
        const timestamps = data.timestamps || [];
        timestamps.push({ timestamp: timestamp, link: timestampLink.textContent });
        chrome.storage.local.set({ timestamps: timestamps }, () => {
          console.log('Timestamp guardado.');
        });
      });

      timestampDiv.appendChild(timestampLink);
      timestampDiv.appendChild(editNameInput);
      timestampDiv.appendChild(editTimeInput);
      timestampDiv.appendChild(editButton);
      timestampDiv.appendChild(document.createElement('br'));
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('timestamps', (data) => {
    const timestamps = data.timestamps || [];
    const timestampDiv = document.getElementById('timestamps');

    timestamps.forEach((item) => {
      const timestampLink = document.createElement('a');
      timestampLink.href = '#';
      timestampLink.textContent = item.link;

      const updateClickAction = (link, newTimestamp) => {
        link.onclick = (e) => {
          e.preventDefault();
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { action: 'setTimestamp', timestamp: newTimestamp });
          });
        };
      };

      updateClickAction(timestampLink, item.timestamp);

      const editNameInput = document.createElement('input');
      editNameInput.type = 'text';
      editNameInput.value = item.link;
      editNameInput.style.display = 'none';

      const editTimeInput = document.createElement('input');
      editTimeInput.type = 'text';
      editTimeInput.value = formatTime(item.timestamp);
      editTimeInput.style.display = 'none';

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => {
        const isEditing = editNameInput.style.display === 'none';
        editNameInput.style.display = isEditing ? 'inline' : 'none';
        editTimeInput.style.display = isEditing ? 'inline' : 'none';
        timestampLink.style.display = isEditing ? 'none' : 'inline';
        editButton.textContent = isEditing ? 'Save' : 'Edit';

        if (!isEditing) {
          const updatedName = editNameInput.value;
          const updatedTimestamp = parseTime(editTimeInput.value);
          timestampLink.textContent = updatedName;

          // Actualizar el almacenamiento local
          chrome.storage.local.get('timestamps', (data) => {
            const timestamps = data.timestamps || [];
            const index = timestamps.findIndex((item) => item.timestamp === item.timestamp);
            if (index !== -1) {
              timestamps[index].link = updatedName;
              timestamps[index].timestamp = updatedTimestamp;
              chrome.storage.local.set({ timestamps: timestamps }, () => {
                console.log('Timestamp actualizado.');
              });

              // Actualizar el evento de clic con el nuevo tiempo
              updateClickAction(timestampLink, updatedTimestamp);
            }
          });
        }
      });

      timestampDiv.appendChild(timestampLink);
      timestampDiv.appendChild(editNameInput);
      timestampDiv.appendChild(editTimeInput);
      timestampDiv.appendChild(editButton);
      timestampDiv.appendChild(document.createElement('br'));
    });
  });
});

document.getElementById('delete-timestamps').addEventListener('click', () => {
  chrome.storage.local.set({ timestamps: [] }, () => {
    console.log('Timestamps borrados.');
    const timestampDiv = document.getElementById('timestamps');
    while (timestampDiv.firstChild) {
      timestampDiv.removeChild(timestampDiv.firstChild);
    }
  });
});

// Botones para export e import
const exportButton = document.createElement('button');
exportButton.textContent = 'Export Timestamps';
document.body.appendChild(exportButton);

const importButton = document.createElement('button');
importButton.textContent = 'Import Timestamps';
document.body.appendChild(importButton);

// Función para export timestamps
exportButton.addEventListener('click', () => {
  chrome.storage.local.get('timestamps', (data) => {
    const timestamps = data.timestamps || [];
    const jsonString = JSON.stringify(timestamps, null, 2); // Formato legible
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'timestamps.json';
    a.click();

    URL.revokeObjectURL(url);
    console.log('Timestamps exportados.');
  });
});

// Función para import timestamps
importButton.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const importedTimestamps = JSON.parse(reader.result);

        if (Array.isArray(importedTimestamps)) {
          chrome.storage.local.get('timestamps', (data) => {
            const currentTimestamps = data.timestamps || [];
            const mergedTimestamps = [...currentTimestamps, ...importedTimestamps];

            chrome.storage.local.set({ timestamps: mergedTimestamps }, () => {
              console.log('Timestamps  imported succesfuly.');
              alert('Timestamps imported succesfully.');
              location.reload(); // Refresca la interfaz para mostrar los nuevos timestamps
            });
          });
        } else {
          throw new Error('El archivo no contiene un formato válido.');
        }
      } catch (error) {
        alert('Error importing the file: ' + error.message);
      }
    };

    reader.readAsText(file);
  });

  input.click();
});
