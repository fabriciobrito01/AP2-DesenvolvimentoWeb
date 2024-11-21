const url = "https://botafogo-atletas.mange.li/2024-1/";
const container = document.getElementById("container");
const login = document.getElementById("login");
const jogadores = document.getElementById("secao-jogadores");
const botoesTopo = document.getElementById("botoes-topo");

// Função para manipular o clique no card
const manipulaClick = (e) => {
    const id = e.currentTarget.dataset.id;
    const urlDetalhes = `detalhes.html?id=${id}`;
    localStorage.setItem("ultimaOrigem", "index.html"); // Salva a origem como área de cards
    window.location.href = urlDetalhes;
};

// Função para pegar dados JSON de uma URL
const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
};

// Função para montar o card de cada jogador
const montaCard = (atleta) => {
    const cartao = document.createElement("article");

    // Adiciona a imagem
    const imagem = document.createElement("img");
    imagem.src = atleta.imagem || "imagem-padrao.jpg"; // Imagem padrão, se necessário
    imagem.alt = `Imagem de ${atleta.nome}`;
    cartao.appendChild(imagem);

    // Adiciona o nome
    const nome = document.createElement("h1");
    nome.textContent = atleta.nome;
    cartao.appendChild(nome);

    // Adiciona o botão "Saiba Mais"
    const botao = document.createElement("button");
    botao.textContent = "Saiba Mais";
    botao.onclick = () => manipulaClick({ currentTarget: cartao }); // Simula o clique no card
    cartao.appendChild(botao);

    // Define os atributos para manipulação posterior
    cartao.dataset.id = atleta.id;
    cartao.dataset.nJogos = atleta.n_jogos;
    cartao.dataset.altura = atleta.altura;

    return cartao;
};

// Função para verificar se o usuário está logado
const verificaLogin = () => {
    const logado = localStorage.getItem("logado");

    if (logado === "sim") {
        login.style.display = "none";
        jogadores.style.display = "block";
        botoesTopo.style.display = "flex";
    } else {
        login.style.display = "block";
        jogadores.style.display = "none";
        botoesTopo.style.display = "none";
    }
};

// Função para carregar jogadores masculinos
const carregarMasculino = () => {
    pega_json(`${url}masculino`).then((dados) => {
        container.innerHTML = ""; // Limpa os cards anteriores
        dados.forEach((atleta) => {
            container.appendChild(montaCard(atleta)); // Adiciona os cards dos atletas masculinos
        });
    });
};

// Evento de clique no botão "Masculino"
const masculinoBtn = document.getElementById("botao2");
masculinoBtn.addEventListener("click", carregarMasculino);

// Função para manipular o botão de login
const manipulaBotao = () => {
    const texto = document.getElementById("senha").value;

    if (hex_md5(texto) === "b78d300d15057992b03e23fcea44ab7d") {
        localStorage.setItem("logado", "sim");
        verificaLogin();
    } else {
        alert("Senha Incorreta!");
    }
};

document.getElementById("botao-entrar").onclick = manipulaBotao;

// Função de logout
document.getElementById("logout").onclick = () => {
    localStorage.removeItem("logado");
    window.location.reload();
};

// Verifica login ao carregar a página
document.addEventListener("DOMContentLoaded", verificaLogin);
