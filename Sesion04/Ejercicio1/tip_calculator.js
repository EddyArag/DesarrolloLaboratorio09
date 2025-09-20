document.getElementById('tipForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const tipPercentage = parseFloat(document.getElementById('tipPercentage').value);

    if (isNaN(billAmount) || isNaN(tipPercentage) || billAmount <= 0 || tipPercentage < 0) {
        alert('Por favor, ingresa valores válidos.');
        return;
    }

    const tipAmount = (billAmount * tipPercentage) / 100;
    const totalAmount = billAmount + tipAmount;

    document.getElementById('tipAmount').textContent = `Propina: $${tipAmount.toFixed(2)}`;
    document.getElementById('totalAmount').textContent = `Total a pagar: $${totalAmount.toFixed(2)}`;
});
