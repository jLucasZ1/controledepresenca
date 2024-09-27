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
        { nome: "RAPHAEL", sobrenome: "TRINDADE" },
        { nome: "LILIANE", sobrenome: "CAMARGO" },
        { nome: "LETÍCIA", sobrenome: "COSTA" },
        { nome: "ADRIAN", sobrenome: "NASCIMENTO" },
        { nome: "DEIVISON", sobrenome: "MARTINS" },
        { nome: "MARIA EDUARDA", sobrenome: "MORGADO" },
        { nome: "ARTUR", sobrenome: "SANTOS" },
        { nome: "GABRIELA", sobrenome: "CAETANO" },
        { nome: "ANA LUISA", sobrenome: "MORGADO" },
        { nome: "ISABELA", sobrenome: "CAETANO" },
        { nome: "HENRIQUE", sobrenome: "OST" },
        { nome: "MARIANA", sobrenome: "ANDRADE" },
        { nome: "MANUELA", sobrenome: "ANDRADE" },
        { nome: "WAGNER", sobrenome: "CAMARGO" },
        { nome: "MANUELA", sobrenome: "MOREIRA" },
        { nome: "ESTHER", sobrenome: "OLIVEIRA" },
        { nome: "BRUNA", sobrenome: "SOUZA" },
        { nome: "MARIA EDUARDA", sobrenome: "SOARES" },
        { nome: "GUSTAVO MIGUEL", sobrenome: "SOARES" },
        { nome: "PEDRO", sobrenome: "FERRAZ" },
        { nome: "LETICIA", sobrenome: "TAVARES" },
        { nome: "ALANA", sobrenome: "MILLER" },
        { nome: "ERIC", sobrenome: "OST" },
        { nome: "JOÃO MURILO", sobrenome: "MACIEL" },
        { nome: "MELISSA", sobrenome: "OST" },
        { nome: "LUCCAS", sobrenome: "DIAS" },
        { nome: "INGRID GABRIELLY", sobrenome: "SILVA" },
        { nome: "ENZO", sobrenome: "GOES" },
        { nome: "RICKSON", sobrenome: "SANTOS" },
        { nome: "ISABELLY", sobrenome: "DATRINO" },
        { nome: "PETER GABRIEL", sobrenome: "MACEDO" },
        { nome: "LUÍSA", sobrenome: "SOUZA" },
        { nome: "SOPHIA", sobrenome: "SILVA" },
        { nome: "DANIEL", sobrenome: "MENDONÇA" },
        { nome: "LUIZ HENRIQUE", sobrenome: "CAVALHEIRO" },
        { nome: "DARLAN", sobrenome: "LUIZ" },
        { nome: "ISAAC", sobrenome: "SALDANHA" },
        { nome: "CLARA", sobrenome: "SILVA" },
        { nome: "DAVI", sobrenome: "GOMES" },
        { nome: "JAIR RODRIGO", sobrenome: "COSTA" },
        { nome: "RAFAEL", sobrenome: "BOTELHO" },
        { nome: "MIGUEL LUIS", sobrenome: "FONSECA" },
        { nome: "MARIA LUISA", sobrenome: "DINIZ" },
        { nome: "REBECA", sobrenome: "JESUS" },
        { nome: "MIGUEL ÂNGELO", sobrenome: "JESUS" },
        { nome: "LARA VITORIA", sobrenome: "NASCIMENTO" },
        { nome: "LAIS GABRIELY", sobrenome: "NASCIMENTO" },
        { nome: "SAMUEL", sobrenome: "NEMY" },
        { nome: "JOÃO PEDRO", sobrenome: "LUIZ" },
        { nome: "ESTHER", sobrenome: "ALVES" },
        { nome: "FILIPE", sobrenome: "MOREIRA" },
        { nome: "MARIA EDUARDA", sobrenome: "GUIMARÃES" },
        { nome: "GABRIEL", sobrenome: "LIMA" },
        { nome: "DAVI", sobrenome: "VILLARINHO" },
        { nome: "ANTHONY", sobrenome: " REIS" },
        { nome: "JOÃO LUCAS", sobrenome: " ESPERANÇA" }
        // Adicione mais participantes aqui...
    ];

    // Limpar dados de chamadas anteriores
    localStorage.removeItem('chamada');

    function mostrarParticipante(indice) {
        if (indice < 0 || indice >= participantes.length) return;
        const participante = participantes[indice];
        document.querySelector('.nome').textContent = participante.nome;
        document.querySelector('.sobrenome').textContent = participante.sobrenome;
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
        const sobrenomeAtual = document.querySelector('.sobrenome').textContent;
        registrarPresencaOuFalta(nomeAtual, sobrenomeAtual, 'Presença');
    });

    elements.btnFalta.addEventListener('click', () => {
        const nomeAtual = document.querySelector('.nome').textContent;
        const sobrenomeAtual = document.querySelector('.sobrenome').textContent;
        registrarPresencaOuFalta(nomeAtual, sobrenomeAtual, 'Falta');
    });

    function registrarPresencaOuFalta(nome, sobrenome, status) {
        const data = elements.dataSelecionada.textContent;

        // Armazena localmente as presenças e faltas
        let chamada = JSON.parse(localStorage.getItem('chamada')) || [];
        chamada.push({ nome, sobrenome, status, data });
        localStorage.setItem('chamada', JSON.stringify(chamada));

        // Se for presença, envia para o Google Sheets
        if (status === 'Presença') {
            const url = 'https://script.google.com/macros/s/AKfycbxhAzdYW-RQ6FlQwjO12xdRjf4h6igSsBlfkLLUIwbskElRqRRwDFQaMCcPlM5PUBesNg/exec';  // Substitua pela URL do Google Apps Script
            
            // Formatar os dados para envio
            const dadosEnvio = {
                nome: nome,
                sobrenome: sobrenome,
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
