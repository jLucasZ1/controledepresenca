document.addEventListener('DOMContentLoaded', function () {
    const elements = {
        participanteAtualDiv: document.querySelector('.profile'),
        btnProximo: document.querySelector('.next-btn'),
        btnAnterior: document.querySelector('.prev-btn'),
        btnVoltar: document.querySelector('.back-btn'),
        btnConfirmar: document.querySelector('.confirm-btn'), // Botão de confirmação
        btnPresenca: document.querySelector('.btn-p'),
        btnFalta: document.querySelector('.btn-f'),
        dataSelecionada: document.getElementById('dataSelecionada')
    };

    let indiceAtual = 0;

    const participantes = [
        { nome: "RAPHAEL TRINDADE", unidade: "Diretoria" },
        { nome: "LILIANE CAMARGO", unidade: "Diretoria" },
        { nome: "LETÍCIA LEAL", unidade: "Diretoria" },
        { nome: "DEIVISON MARTINS", unidade: "Diretoria" },
        { nome: "MARIA EDUARDA MORGADO", unidade: "Diretoria" },
        { nome: "ARTUR MILLER", unidade: "Diretoria" },
        { nome: "GABRIELA CAETANO", unidade: "Metsa" },
        { nome: "ANA LUISA MORGADO", unidade: "Diretoria" },
        { nome: "ISABELA CAETANO", unidade: "Diretoria" },
        { nome: "HENRIQUE OST", unidade: "Diretoria" },
        { nome: "MARIANA ANDRADE", unidade: "Virta" },
        { nome: "MANUELA ANDRADE", unidade: "Diretoria" },
        { nome: "MANUELA SÁ", unidade: "Metsa" },
        { nome: "ESTHER HORMUNDO", unidade: "Linna" },
        { nome: "BRUNA SOUZA", unidade: "Linna" },
        { nome: "PEDRO FERRAZ", unidade: "Soturi" },
        { nome: "LETICIA TAVARES", unidade: "Diretoria" },
        { nome: "ALANA MILLER", unidade: "Diretoria" },
        { nome: "JOÃO MURILO MACIEL", unidade: "Soturi" },
        { nome: "MELISSA OST", unidade: "Virta" },
        { nome: "LUCCAS DIAS", unidade: "Soturi" },
        { nome: "INGRID GABRIELLY", unidade: "Metsa" },
        { nome: "ENZO HORMUNDO", unidade: "Diretoria" },
        { nome: "RICKSON SANTOS", unidade: "Vuori" },
        { nome: "ISABELLY DATRINO", unidade: "Virta" },
        { nome: "PETER GABRIEL MACEDO", unidade: "Vuori" },
        { nome: "LUÍSA SOUZA", unidade: "Linna" },
        { nome: "LUIZ HENRIQUE CAVALHEIRO", unidade: "Soturi" },
        { nome: "ISAAC SALDANHA", unidade: "Vuori" },
        { nome: "CLARA SILVA", unidade: "Metsa" },
        { nome: "DAVI BOTELHO", unidade: "Vuori" },
        { nome: "RAFAEL BOTELHO", unidade: "Vuori" },
        { nome: "MIGUEL LUIS", unidade: "Soturi" },
        { nome: "MARIA LUISA DINIZ", unidade: "Linna" },
        { nome: "REBECA JESUS", unidade: "Virta" },
        { nome: "MIGUEL ÂNGELO", unidade: "Vuori" },
        { nome: "LARA VITORIA", unidade: "Virta" },
        { nome: "LAIS GABRIELY", unidade: "Linna" },
        { nome: "JOÃO PEDRO LUIZ", unidade: "Soturi" },
        { nome: "ESTHER CECIM", unidade: "Metsa" },
        { nome: "FILIPE MOREIRA", unidade: "Vuori" },
        { nome: "MARIA EDUARDA GUIMARÃES", unidade: "Metsa" },
        { nome: "GABRIEL GOMES", unidade: "Vuori" },
        { nome: "DAVI VILLARINHO", unidade: "Soturi" },
        { nome: "ANTHONY REIS", unidade: "Soturi" },
        { nome: "JOÃO LUCAS ESPERANÇA", unidade: "Diretoria" }
        // Adicione mais participantes aqui...
    ];

    // Limpar dados de chamadas anteriores
    localStorage.removeItem('chamada');

    function mostrarParticipante(indice) {
        if (indice < 0 || indice >= participantes.length) return;
        const participante = participantes[indice];
        document.querySelector('.nome').textContent = participante.nome;
        document.querySelector(' unidade').textContent = participante.unidade;
    }

    elements.btnProximo.addEventListener('click', () => {
        if (indiceAtual < participantes.length - 1) {
            indiceAtual++;
            mostrarParticipante(indiceAtual);
        } else {
            alert("Fim da lista de participantes.");
        }
    });

    elements.btnAnterior.addEventListener('click', () => {
        if (indiceAtual > 0) {
            indiceAtual--;
            mostrarParticipante(indiceAtual);
        } else {
            alert("Você está no primeiro participante.");
        }
    });

    elements.btnPresenca.addEventListener('click', () => {
        const nomeAtual = document.querySelector('.nome').textContent;
        const unidadeAtual = document.querySelector(' unidade').textContent;
        registrarPresencaOuFalta(nomeAtual, unidadeAtual, 'Presença');
    });

    elements.btnFalta.addEventListener('click', () => {
        const nomeAtual = document.querySelector('.nome').textContent;
        const unidadeAtual = document.querySelector(' unidade').textContent;
        registrarPresencaOuFalta(nomeAtual, unidadeAtual, 'Falta');
    });

    function registrarPresencaOuFalta(nome, unidade, status) {
        const data = elements.dataSelecionada.textContent;

        // Armazena localmente as presenças e faltas
        let chamada = JSON.parse(localStorage.getItem('chamada')) || [];
        chamada.push({ nome, unidade, status, data });
        localStorage.setItem('chamada', JSON.stringify(chamada));

        // Se for presença, envia para o Google Sheets
        if (status === 'Presença') {
            const url = 'https://script.google.com/macros/s/AKfycbxhAzdYW-RQ6FlQwjO12xdRjf4h6igSsBlfkLLUIwbskElRqRRwDFQaMCcPlM5PUBesNg/exec';  // Substitua pela URL do Google Apps Script
            
            // Formatar os dados para envio
            const dadosEnvio = {
                nome: nome,
             unidade: unidade,
                data: data,
                status: status
            };

            fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosEnvio)
            })
            .then(response => {
                console.log("Presença enviada com sucesso");
            })
            .catch(error => console.error("Erro ao enviar dados:", error));
        }

        proximoParticipante();
    }

    function proximoParticipante() {
        if (indiceAtual < participantes.length - 1) {
            indiceAtual++;
            mostrarParticipante(indiceAtual);
        } else {
            alert("Fim da lista de participantes.");
        }
    }

    const dataSelecionada = localStorage.getItem('selectedDate');
    if (dataSelecionada) elements.dataSelecionada.textContent = dataSelecionada;

    mostrarParticipante(indiceAtual);

    // Botão para voltar à página anterior
    elements.btnVoltar.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Botão de confirmação (superior direito) para ir para a página 3
    elements.btnConfirmar.addEventListener('click', () => {
        window.location.href = 'lista.html';  // Verifique se o nome do arquivo HTML está correto
    });
});
