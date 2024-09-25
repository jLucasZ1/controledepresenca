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
        { nome: "RAPHAEL", sobrenome: "CHAGAS TRINDADE" },
        { nome: "LILIANE", sobrenome: "DOS SANTOS PAULA CAMARGO" },
        { nome: "LETÍCIA", sobrenome: "LEAL COSTA" },
        { nome: "ADRIAN", sobrenome: "ALMEIDA DA SILVA NASCIMENTO" },
        { nome: "DEIVISON", sobrenome: "LUIZ GONÇALVES MARTINS" },
        { nome: "MARIA EDUARDA", sobrenome: "SANTIAGO MORGADO" },
        { nome: "ARTUR", sobrenome: "MILLER SANTOS" },
        { nome: "GABRIELA", sobrenome: "LIMA CAETANO" },
        { nome: "ANA LUISA", sobrenome: "SANTIAGO MORGADO" },
        { nome: "ISABELA", sobrenome: "LIMA CAETANO" },
        { nome: "HENRIQUE", sobrenome: "VEDIA OST" },
        { nome: "MARIANA", sobrenome: "PRADO ROCHA DE ANDRADE" },
        { nome: "MANUELA", sobrenome: "PRADO ROCHA DE ANDRADE" },
        { nome: "WAGNER", sobrenome: "DA COSTA CAMARGO" },
        { nome: "MANUELA", sobrenome: "MOREIRA NUNES SA" },
        { nome: "ESTHER", sobrenome: "HORMUNDO DE OLIVEIRA" },
        { nome: "BRUNA", sobrenome: "LUIZA E SOUZA" },
        { nome: "MARIA EDUARDA", sobrenome: "EVANGELISTA SOARES" },
        { nome: "GUSTAVO MIGUEL", sobrenome: "EVANGELISTA SOARES" },
        { nome: "PEDRO", sobrenome: "PIMENTEL FERRAZ" },
        { nome: "LETICIA", sobrenome: "MORAES TAVARES" },
        { nome: "ALANA", sobrenome: "FERNANDES MILLER" },
        { nome: "ERIC", sobrenome: "HERMAN OST" },
        { nome: "JOÃO MURILO", sobrenome: "DE CARVALHO MACIEL" },
        { nome: "MELISSA", sobrenome: "VEDIA OST" },
        { nome: "LUCCAS", sobrenome: "TRINDADE DIAS" },
        { nome: "INGRID GABRIELLY", sobrenome: "SILVA" },
        { nome: "ENZO", sobrenome: "HORMUNDO GOES" },
        { nome: "RICKSON", sobrenome: "PASTOR DOS SANTOS" },
        { nome: "ISABELLY", sobrenome: "VIDAL DATRINO" },
        { nome: "PETER GABRIEL", sobrenome: "AMARAL MACEDO" },
        { nome: "LUÍSA", sobrenome: "CARVALHO DE SOUZA" },
        { nome: "SOPHIA", sobrenome: "RODRIGUES DA SILVA" },
        { nome: "DANIEL", sobrenome: "HONORIO MENDONÇA" },
        { nome: "LUIZ HENRIQUE", sobrenome: "CUSTODIO CAVALHEIRO" },
        { nome: "DARLAN", sobrenome: "LOPES LUIZ" },
        { nome: "ISAAC", sobrenome: "ALMEIDA SALDANHA" },
        { nome: "CLARA", sobrenome: "DINIZ SILVA" },
        { nome: "DAVI", sobrenome: "BOTELHO GOMES" },
        { nome: "JAIR RODRIGO", sobrenome: "ANDRADE GUIMARAES COSTA" },
        { nome: "RAFAEL", sobrenome: "MOREIRA BOTELHO" },
        { nome: "MIGUEL LUIS", sobrenome: "DA FONSECA" },
        { nome: "MARIA LUISA", sobrenome: "AUGUSTO DINIZ" },
        { nome: "REBECA", sobrenome: "VIDAL DE JESUS" },
        { nome: "MIGUEL ÂNGELO", sobrenome: "VIDAL DE JESUS" },
        { nome: "LARA VITORIA", sobrenome: "CARLOS NASCIMENTO" },
        { nome: "LAIS GABRIELY", sobrenome: "CARLOS NASCIMENTO" },
        { nome: "SAMUEL", sobrenome: "VAZ NEMY" },
        { nome: "JOÃO PEDRO", sobrenome: "BERNARDO LUIZ" },
        { nome: "ESTHER", sobrenome: "CECIM ALVES" },
        { nome: "FILIPE", sobrenome: "GOMES MOREIRA" },
        { nome: "MARIA EDUARDA", sobrenome: "CAMPOS OLIVEIRA GUIMARÃES" },
        { nome: "GABRIEL", sobrenome: "GOMES DA SILVA LIMA" },
        { nome: "DAVI", sobrenome: "DE PAULA VILLARINHO" },
        { nome: "ANTHONY", sobrenome: "DOMINGOS REIS" },
        { nome: "JOÃO LUCAS", sobrenome: "MARTINS ESPERANÇA" }
    ];

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
        const url = 'https://script.google.com/macros/s/AKfycby-GYlR--X-eMDT9OVkIyrp2m0um_eee2OO5dScIYW4L7PtwfzAxmrubFpuPr8FqotiyQ/exec';
        
        fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, sobrenome, status, data })
        })
        .then(response => {
            console.log("Requisição enviada com sucesso");
            proximoParticipante();
        })
        .catch(error => console.error("Erro ao enviar dados:", error));
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
