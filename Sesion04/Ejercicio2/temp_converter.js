document.getElementById('tempForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const temperature = parseFloat(document.getElementById('temperature').value);
    const scale = document.getElementById('scale').value;

    if (isNaN(temperature)) {
        alert('Por favor, ingresa una temperatura válida.');
        return;
    }

    let convertedTemp;

    if (scale === 'celsius') {
        convertedTemp = (temperature * 9/5) + 32;
        document.getElementById('convertedTemp').textContent = `Temperatura convertida: ${convertedTemp.toFixed(2)} °F`;
    } else {
        convertedTemp = (temperature - 32) * 5/9;
        document.getElementById('convertedTemp').textContent = `Temperatura convertida: ${convertedTemp.toFixed(2)} °C`;
    }
});
