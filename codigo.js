const masc = "https://botafogo-atletas.mange.li/2024-1/";
const fem = "https://botafogo-atletas.mange.li/2024-1/feminino";
const all = "https://botafogo-atletas.mange.li/2024-1/all";

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
    const mascDetalhes = `detalhes.html?id=${id}`;
    const fem = `detalhes.html?id=${id}`;
    localStorage.setItem("ultimaOrigem", "index.html");
    window.location.href = mascDetalhes;
    window.location.href = fem;
};

// Função para pegar dados JSON de uma masc
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
    imagem.src = atleta.imagem || "imagem-padrao.jpg";
    imagem.alt = `Imagem de ${atleta.nome}`;
    cartao.appendChild(imagem);

    // Adiciona o nome
    const nome = document.createElement("h1");
    nome.textContent = atleta.nome;
    cartao.appendChild(nome);

    // Adiciona o botão "Saiba Mais"
    const botao = document.createElement("button");
    botao.textContent = "Saiba Mais";
    botao.onclick = () => manipulaClick({ currentTarget: cartao });
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

        container.innerHTML = "";

    } else {
        login.style.display = "block";
        jogadores.style.display = "none";
        botoesTopo.style.display = "none";
        header.style.display = "none";
        logout.style.display = "none";
        barraPesquisa.style.display = "none";
    }
};

// Função para carregar os dois elencos
const carregarAll = () => {
    pega_json(`${masc}all`).then((dados) => {
        container.innerHTML = "";
        dados.forEach((atleta) => {
            container.appendChild(montaCard(atleta));
        });
    });
}

// Evento de clique no botão "Ambos"
const allBtn = document.getElementById("botao1");
allBtn.addEventListener("click", carregarAll);

// Função para carregar jogadores masculinos
const carregarMasculino = () => {
    pega_json(`${masc}masculino`).then((dados) => {
        container.innerHTML = "";
        dados.forEach((atleta) => {
            container.appendChild(montaCard(atleta));
        });
    });
};

// Evento de clique no botão "Masculino"
const masculinoBtn = document.getElementById("botao2");
masculinoBtn.addEventListener("click", carregarMasculino);

// Função para carregar jogadoras femininas
const carregarFeminino = () => {
    pega_json(`${masc}feminino`).then((dados) => {
        container.innerHTML = "";
        dados.forEach((atleta) => {
            container.appendChild(montaCard(atleta));
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

// Função para filtrar jogadores na barra de pesquisa
const filtrarJogadores = () => {
    const pesquisa = document.getElementById("campo-pesquisa").value.toLowerCase();
    const cartoes = container.querySelectorAll("article");

    cartoes.forEach((cartao) => {
        const nome = cartao.querySelector("h1").textContent.toLowerCase();
        if (nome.includes(pesquisa)) {
            cartao.style.display = "block"; // Mostra o cartão
        } else {
            cartao.style.display = "none"; // Esconde o cartão
        }
    });
};

// Adiciona evento à barra de pesquisa
document.getElementById("campo-pesquisa").addEventListener("input", filtrarJogadores);
