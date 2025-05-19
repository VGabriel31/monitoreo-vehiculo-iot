const tableBody = document.getElementById('deviceTableBody');
const firstStatus = document.getElementById('firstStatus');
const API_URL = 'http://98.80.210.190/api/devices';

async function fetchData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        tableBody.innerHTML = ''; // Limpiar tabla

        // Mostrar status de la primera fila (si hay datos)
        if (data.devices[0].status != "") {
            firstStatus.innerText = `Estado actual: ${data.devices[0].status}`;
        } else {
            firstStatus.innerText = 'Estado actual: Sin datos disponibles';
        }

            console.table(data.devices);
        // Llenar tabla con los datos
        data.devices.forEach(device => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${device.id}</td>
                <td>${device.name}</td>
                <td>${device.ip}</td>
                <td>${device.status}</td>
                <td>${device.date}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        firstStatus.innerText = 'Estado actual: Error al obtener datos';
    }
}

// Ejecutar al inicio y cada 2 segundos
fetchData();
setInterval(fetchData, 2000);
