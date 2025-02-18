const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function validarCartao(numeroCartao) {
    // Remover espaços em branco
    numeroCartao = numeroCartao.replace(/\s+/g, '');

    // Verificação de dígitos
    if (!/^\d{16}$/.test(numeroCartao)) {
        return 'Número de cartão inválido. Deve conter exatamente 16 dígitos numéricos.';
    }

    // Identificação da bandeira
    if (/^4/.test(numeroCartao)) {
        return 'Bandeira: VISA';
    } else if (/^5[1-5]/.test(numeroCartao) || /^2(2[2-9][1-9]|[3-6]\d{2}|7[01]\d|720)/.test(numeroCartao)) {
        return 'Bandeira: Mastercard';
    } else if (/^4011|^4312|^4389/.test(numeroCartao)) {
        return 'Bandeira: ELO';
    } else if (/^3[47]/.test(numeroCartao)) {
        return 'Bandeira: American Express';
    } else if (/^6011|^65|^64[4-9]/.test(numeroCartao)) {
        return 'Bandeira: Discover';
    } else if (/^6062/.test(numeroCartao)) {
        return 'Bandeira: Hipercard';
    } else {
        return 'Bandeira desconhecida';
    }
}

rl.question('Digite o número do cartão de crédito: ', (numeroCartao) => {
    const resultado = validarCartao(numeroCartao);
    console.log(resultado);
    rl.close();
});
