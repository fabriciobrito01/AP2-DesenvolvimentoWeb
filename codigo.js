const url = "https://botafogo-atletas.mange.li/2024-1/";
const woman = "./botafeminino.js";

const container = document.getElementById("container");
const login = document.getElementById("login");
const jogadores = document.getElementById("secao-jogadores");
const botoesTopo = document.getElementById("botoes-topo");
const header = document.querySelector("header");
const logout = document.getElementById("logout");
const barraPesquisa = document.getElementById("barra-pesquisa");

// Função para manipular o clique no card
const manipulaClick = (e) => {
    const id = e.currentTarget.dataset.id;
    const urlDetalhes = `detalhes.html?id=${id}`;
    const woman = `detalhes.html?id=${id}`;
    localStorage.setItem("ultimaOrigem", "index.html"); // Salva a origem como área de cards
    window.location.href = urlDetalhes;
    window.location.href = woman;
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
        botoesTopo.style.display = "block";
        header.style.display = "flex";
        logout.style.display = "block";
        barraPesquisa.style.display = "block";

        container.innerHTML = ""; // Limpa os cards anteriores

    } else {
        login.style.display = "block";
        jogadores.style.display = "none";
        botoesTopo.style.display = "none";
        header.style.display = "none";
        logout.style.display = "none";
        barraPesquisa.style.display = "none";
    }
};

// Função para carregar ambos os elencos
const carregarAmbos = async () => {
    container.innerHTML = ""; // Limpa os cards anteriores

    // Carregar elenco masculino
    const masculino = await pega_json(`${url}masculino`);
    masculino.forEach((atleta) => {
        container.appendChild(montaCard(atleta)); // Adiciona os cards masculinos
    });

    // Carregar elenco feminino
    const feminino = await pega_json(`${url}feminino`);
    feminino.forEach((atleta) => {
        container.appendChild(montaCard(atleta)); // Adiciona os cards femininos
    });
};

// Evento de clique no botão "Ambos"
const ambosBtn = document.getElementById("botao1");
ambosBtn.addEventListener("click", carregarAmbos);


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

// Função para carregar jogadoras femininas
const carregarFeminino = () => {
    pega_json(`${url}feminino`).then((dados) => {
        container.innerHTML = ""; // Limpa os cards anteriores
        dados.forEach((atleta) => {
            container.appendChild(montaCard(atleta)); // Adiciona os cards das atletas femininas
        });
    });
};

// Evento de clique no botão "Feminino"
const femininoBtn = document.getElementById("botao3");
femininoBtn.addEventListener("click", carregarFeminino);


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