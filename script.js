let cardContainer = document.querySelector(".card-container");
let inputBusca = document.querySelector('input[type="text"]');

let dados = [];
// Carrega os dados do JSON assim que a página é carregada
window.addEventListener('load', carregarDados);

// Adiciona um event listener para a tecla "Enter" no campo de busca
inputBusca.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        iniciarBusca();
    }
});
// O evento de busca por clique já é disparado pelo atributo 'onclick' no botão do HTML.

async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        // renderizarCards(dados); // Não renderiza mais os cards inicialmente
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

function iniciarBusca() {
    const termoBusca = inputBusca.value.toLowerCase().trim();

    // Se o campo de busca estiver vazio, limpa o container e não mostra nada.
    if (termoBusca === '') {
        cardContainer.innerHTML = '';
        return;
    }

    const dadosFiltrados = dados.filter(dado => {
        return dado.nome.toLowerCase().includes(termoBusca);
    });
    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ''; // Limpa o container antes de renderizar novos cards
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>Criado em ${dado["Data da criação"]}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
   }

}    