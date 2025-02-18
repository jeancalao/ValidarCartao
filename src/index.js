const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Configuração para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Rota para servir o arquivo index.html na raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Função para validar o número do cartão de crédito
function validarCartao(numeroCartao) {
    // Remover espaços em branco
    numeroCartao = numeroCartao.replace(/\s+/g, '');

    // Verificação de dígitos: o número do cartão deve conter exatamente 16 dígitos numéricos
    if (!/^\d{16}$/.test(numeroCartao)) {
        return 'Número de cartão inválido. Deve conter exatamente 16 dígitos numéricos.';
    }

    // Identificação da bandeira do cartão
    if (/^4/.test(numeroCartao)) {
        return 'Cartão válido, bandeira: VISA';
    } else if (/^5[1-5]/.test(numeroCartao) || /^2(2[2-9][1-9]|[3-6]\d{2}|7[01]\d|720)/.test(numeroCartao)) {
        return 'Cartão válido, bandeira: Mastercard';
    } else if (/^4011|^4312|^4389/.test(numeroCartao)) {
        return 'Cartão válido, bandeira: ELO';
    } else if (/^3[47]/.test(numeroCartao)) {
        return 'Cartão válido, bandeira: American Express';
    } else if (/^6011|^65|^64[4-9]/.test(numeroCartao)) {
        return 'Cartão válido, bandeira: Discover';
    } else if (/^6062/.test(numeroCartao)) {
        return 'Cartão válido, bandeira: Hipercard';
    } else {
        return 'Cartão válido, bandeira: Bandeira desconhecida';
    }
}

// Rota para validar o número do cartão
app.post('/validar', (req, res) => {
    const { numeroCartao } = req.body;
    const resultado = validarCartao(numeroCartao);
    res.json({ resultado });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
