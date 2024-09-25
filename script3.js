document.addEventListener('DOMContentLoaded', async function() {
    const sheetId = '1ZDtgIIbQBXcnBQQ0zyJ3xcBRgNrTjVLnCkGWfcN6EAk';  // Substitua pelo ID correto da sua planilha
    const apiKey = 'AIzaSyChChqJZ8APPB1_kCYGpgM2PmuPludgpyw';  // Substitua pela sua chave de API
    const sheetName = 'Chamada desbravadores';  // Verifique se o nome da aba está correto e substitua se necessário
    const range = 'A2:C';  // Inclua A2:C para nomes e status

    const listaParticipantesUl = document.getElementById('listaParticipantes');
    const totalPresencasBtn = document.getElementById('totalPresencas');
    const totalFaltasBtn = document.getElementById('totalFaltas');

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?key=${apiKey}`;

    try {
        const response = await fetch(url);

        // Verifique se a resposta está OK (status 200)
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        // Verifique se o retorno tem os valores esperados
        if (data && data.values) {
            const participantes = data.values; // 'values' contém as linhas da planilha

            let totalPresencas = 0;
            let totalFaltas = 0;

            // Exibir a lista de participantes com cores diferentes para presença e falta
            participantes.forEach(row => {
                const [nome, , status] = row; // Pega nome e status (colunas A e C)
                
                if (!nome || !status) return; // Ignorar linhas inválidas ou incompletas

                const li = document.createElement('li');
                li.textContent = nome;

                // Normaliza o status para evitar problemas com letras maiúsculas/minúsculas
                const statusNormalizado = status.trim().toLowerCase();

                if (statusNormalizado === 'presença') {
                    li.style.color = 'green';  // Presença em verde
                    totalPresencas++;
                } else if (statusNormalizado === 'falta') {
                    li.style.color = 'red';  // Falta em vermelho
                    totalFaltas++;
                }

                listaParticipantesUl.appendChild(li);
            });

            // Atualizar o número total de presenças e faltas
            totalPresencasBtn.textContent = `${totalPresencas} Presenças`;
            totalFaltasBtn.textContent = `${totalFaltas} Faltas`;
        } else {
            console.error("Nenhum dado encontrado na planilha ou estrutura inesperada.");
        }
    } catch (error) {
        console.error("Erro ao acessar a planilha ou dados mal formatados:", error);
    }

    // Botão para voltar à página anterior
    document.querySelector('.back-btn').addEventListener('click', function() {
        window.location.href = 'chamada.html';  // Verifique o nome do arquivo da página 2
    });

    // Botão para finalizar e voltar à página 1
    document.querySelector('.confirm-btn').addEventListener('click', function() {
        localStorage.setItem('mensagemConclusao', 'Chamada concluída com sucesso!');
        window.location.href = 'inicio.html';  // Verifique o nome do arquivo da página 1
    });
});
