document.getElementById('calculator-form').addEventListener('input', calculate);

function calculate() {
    const valueA = parseFloat(document.getElementById('value-a').value) || 0;
    const valueB = parseFloat(document.getElementById('value-b').value) || 0;
    const profits = parseFloat(document.getElementById('profits').value) || (valueA - valueB);
    const duration = document.getElementById('duration').value;
    const beforeSep2017 = document.getElementById('before-sep-2017').checked;
    const tmi = parseFloat(document.getElementById('tmi').value) || 0;

    let integrationResult, forfaitaireResult;

    if (beforeSep2017) {
        // Calculations for contracts started before September 27, 2017
        if (duration === '0-4') {
            integrationResult = profits * (tmi / 100 + 0.172);
            forfaitaireResult = profits * (0.35 + 0.172);
        } else if (duration === '4-8') {
            integrationResult = profits * (tmi / 100 + 0.172);
            forfaitaireResult = profits * (0.15 + 0.172);
        } else if (duration === '8+') {
            integrationResult = Math.max(0, profits - 4600) * (tmi / 100 + 0.172);
            forfaitaireResult = profits * (0.075 + 0.172);
        }
    } else {
        // Calculations for contracts started after September 27, 2017
        if (duration === '0-4') {
            integrationResult = profits * (tmi / 100 + 0.172);
            forfaitaireResult = profits * (0.128 + 0.172);
        } else if (duration === '4-8') {
            integrationResult = profits * (tmi / 100 + 0.172);
            forfaitaireResult = profits * (0.128 + 0.172);
        } else if (duration === '8+') {
            if (profits <= 150000) {
                integrationResult = Math.max(0, profits - 4600) * (tmi / 100 + 0.172);
                forfaitaireResult = profits * (0.075 + 0.172);
            } else {
                integrationResult = Math.max(0, profits - 4600) * (tmi / 100 + 0.172);
                forfaitaireResult = profits * (0.128 + 0.172);
            }
        }
    }

    document.getElementById('result-integration').innerText = `Intégration des produits à l'impôt sur le revenu: ${integrationResult.toFixed(2)} €`;
    document.getElementById('result-forfaitaire').innerText = `Prélèvement forfaitaire: ${forfaitaireResult.toFixed(2)} €`;
}
