const API_URL = 'http://localhost:3000/pessoas';

// Função para carregar pessoas do servidor
async function carregarPessoas() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erro ao carregar dados');
        pessoas = await response.json();
        atualizarLista();
    } catch (error) {
        console.error('Erro:', error);
        alert('Falha ao carregar dados do servidor');
    }
}

// Função para adicionar pessoa no servidor
async function adicionarPessoa(nome, funcao) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, funcao })
        });
        
        if (!response.ok) throw new Error('Erro ao salvar');
        
        const novaPessoa = await response.json();
        pessoas.push(novaPessoa);
        atualizarLista();
    } catch (error) {
        console.error('Erro:', error);
        alert('Falha ao salvar dados no servidor');
    }
}

// Função para remover pessoa do servidor
async function removerPessoa(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Erro ao remover');
        
        pessoas = pessoas.filter(pessoa => pessoa.id !== id);
        atualizarLista();
    } catch (error) {
        console.error('Erro:', error);
        alert('Falha ao remover dados do servidor');
    }
}

// Modifique os event listeners para usar as funções assíncronas
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const funcao = document.getElementById('funcao').value;
    
    await adicionarPessoa(nome, funcao);
    form.reset();
});

// Carregar dados ao iniciar
carregarPessoas();

// Remova os botões de salvar/carregar do localStorage
document.querySelector('.acoes').innerHTML = '';