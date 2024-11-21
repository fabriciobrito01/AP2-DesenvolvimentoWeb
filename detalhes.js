const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const pega_json = async (caminho) => {
    try {
        const resposta = await fetch(caminho);
        const dados = await resposta.json();
        return dados;
    } catch (err) {
        console.error("Erro ao buscar os dados:", err);
        alert("Erro ao carregar os detalhes do jogador.");
        return null;
    }
};

const montaPagina = (dados) => {
    if (!dados) {
        document.body.innerHTML = "<h1>Erro ao carregar os detalhes do jogador.</h1>";
        return;
    }

    const body = document.body;
    body.innerHTML = ""; // Limpa a página

    // Criando o container principal
    const container = document.createElement("div");
    container.classList.add("container");

    // Criando a imagem do jogador
    const imagem = document.createElement("img");
    imagem.alt = "Imagem do atleta";
    imagem.src = dados.imagem;
    imagem.classList.add("imagem-jogador");

    // Adicionando a imagem ao container
    container.appendChild(imagem);

    // Criando o container das informações
    const informacoesContainer = document.createElement("div");
    informacoesContainer.classList.add("informacoes-container");

    // Função para criar uma caixa de informação
    const criaInfoBox = (label, valor, classeExtra = "") => {
        const infoBox = document.createElement("div");

        // Verifica se a classeExtra está definida antes de adicionar
        if (classeExtra) {
            infoBox.classList.add("info-box", classeExtra); // Adiciona a classe extra se não estiver vazia
        } else {
            infoBox.classList.add("info-box"); // Caso contrário, apenas adiciona a classe base
        }

        infoBox.innerHTML = `<strong>${label}</strong>: ${valor}`;
        return infoBox;
    };

    // Adicionando informações ao container
    informacoesContainer.appendChild(criaInfoBox("Número de jogos", dados.n_jogos));
    informacoesContainer.appendChild(criaInfoBox("Elenco", dados.elenco.toLowerCase() === "masculino" ? "Masculino" : "Feminino"));
    informacoesContainer.appendChild(criaInfoBox("No time desde", dados.no_botafogo_desde));
    informacoesContainer.appendChild(criaInfoBox("Posição", dados.posicao));
    informacoesContainer.appendChild(criaInfoBox("Altura", dados.altura));

    // A "Naturalidade" permanece com o layout padrão sem centralização
    informacoesContainer.appendChild(criaInfoBox("Naturalidade", dados.naturalidade));

    // Aqui aplicamos a classe específica para a data de nascimento
    informacoesContainer.appendChild(criaInfoBox("Nascimento", dados.nascimento, "nascimento-centralizado"));

    // Adicionando as informações ao container principal
    container.appendChild(informacoesContainer);

    // Criando e adicionando o detalhe do jogador, que fica abaixo das outras informações
    const detalhes = document.createElement("p");
    detalhes.classList.add("detalhes-jogador");
    detalhes.innerHTML = dados.detalhes;
    container.appendChild(detalhes);

    // Adicionando o botão de voltar
    const botao = document.createElement("button");
    botao.classList.add("botao-voltar");
    botao.innerText = "Voltar";
    botao.onclick = () => {
        const ultimaOrigem = localStorage.getItem("ultimaOrigem") || "index.html";
        console.log("Redirecionando para:", ultimaOrigem); // Log para depuração
        window.location.href = ultimaOrigem;
    };
    container.appendChild(botao);

    // Adicionando o container ao corpo da página
    body.appendChild(container);
};

// Carregar informações do jogador ao carregar a página
document.addEventListener("DOMContentLoaded", async () => {
    if (localStorage.getItem("logado") === "sim") {
        const dados = await pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`);
        montaPagina(dados);
    } else {
        document.body.innerHTML = "<h1>Você precisa estar logado para ter acesso.</h1>";
    }
});
