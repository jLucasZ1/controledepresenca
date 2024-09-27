document.addEventListener('DOMContentLoaded', function() {
    const listaParticipantesUl = document.getElementById('listaParticipantes');
    const totalPresencasBtn = document.getElementById('totalPresencas');
    const totalFaltasBtn = document.getElementById('totalFaltas');

    // Limpar a lista antes de carregar os novos dados
    listaParticipantesUl.innerHTML = '';

    // Buscar os dados de presença e falta armazenados no localStorage
    const chamada = JSON.parse(localStorage.getItem('chamada')) || [];

    let totalPresencas = 0;
    let totalFaltas = 0;

    // Exibir a lista de participantes com cores diferentes para presença e falta
    chamada.forEach(participante => {
        const { nome, sobrenome, status } = participante;

        const li = document.createElement('li');
        li.textContent = `${nome} ${sobrenome}`;

        // Verifica o status (presença ou falta) e aplica a cor correspondente
        if (status === 'Presença') {
            li.style.color = 'green';  // Presença em verde
            totalPresencas++;
        } else if (status === 'Falta') {
            li.style.color = 'red';  // Falta em vermelho
            totalFaltas++;
        }

        listaParticipantesUl.appendChild(li);
    });

    // Atualizar o número total de presenças e faltas
    totalPresencasBtn.textContent = `${totalPresencas} Presenças`;
    totalFaltasBtn.textContent = `${totalFaltas} Faltas`;

    // Botão para voltar à página anterior
    document.querySelector('.back-btn').addEventListener('click', function() {
        window.location.href = 'chamada.html';  // Verifique o nome do arquivo da página 2
    });

    // Botão para finalizar e voltar à página 1
    document.querySelector('.confirm-btn').addEventListener('click', function() {
        localStorage.setItem('mensagemConclusao', 'Chamada concluída com sucesso!');
        window.location.href = 'index.html';  // Verifique o nome do arquivo da página 1
    });
});
