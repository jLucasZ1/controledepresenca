document.getElementById('btnChamada').addEventListener('click', function() {
    const calendarioDiv = document.getElementById('calendarioDiv');
    calendarioDiv.style.display = calendarioDiv.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('calendario').addEventListener('change', function() {
    const selectedDate = this.value;
    localStorage.setItem('selectedDate', selectedDate);  // Salva a data no LocalStorage
    window.location.href = 'pagina2.html';  // Redireciona para a página 2
});

// Conclusão
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se há uma mensagem de conclusão no LocalStorage
    const mensagemConclusao = localStorage.getItem('mensagemConclusao');
    
    if (mensagemConclusao) {
        // Exibir a mensagem de conclusão
        alert(mensagemConclusao);
        
        // Limpar a mensagem do LocalStorage para que não apareça de novo
        localStorage.removeItem('mensagemConclusao');
    }
});
// Conclusão