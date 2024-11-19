const url = "https://botafogo-atletas.mange.li/2024-1/";
const container = document.getElementById("container");
const loginForm = document.getElementById("login-form");
const loginArea = document.getElementById("login-area");
const login = document.getElementById("login");
const jogadores = document.getElementById("secao-jogadores");

const manipulaClick = (e) => {
    const id = e.currentTarget.dataset.id;
    const url = `detalhes.html?id=${id}`;
    document.cookie = `id=${id}`;
    document.cookie = `altura=${e.currentTarget.dataset.altura}`;

    localStorage.setItem(id, id);
    localStorage.setItem("dados", JSON.stringify(e.currentTarget.dataset));
    sessionStorage.setItem(id, id);
    sessionStorage.setItem("dados", JSON.stringify(e.currentTarget.dataset));
    window.location = url;
    console.log(e.currentTarget);
};

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
};

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


const verificaLogin = () => {
    const logado = localStorage.getItem("logado");

    if (logado === "sim") {
        loginForm.style.display = "none";
        loginArea.style.display = "none";
        jogadores.style.display = "block"; 
        login.style.display = "none";
        document.getElementById("botoes-topo").style.display = "flex"; 

        pega_json(`${url}masculino`).then((r) => {
            container.innerHTML = ""; 
            r.forEach((ele) => container.appendChild(montaCard(ele)));
        });
    } else {
        loginForm.style.display = "block";
        loginArea.style.display = "block";
        jogadores.style.display = "none";
        login.style.display = "block";
        document.getElementById("botoes-topo").style.display = "none"; 
        container.innerHTML = ""; 
    }
};


const manipulaBotao = () => {
    const texto = document.getElementById("senha").value;

    if (hex_md5(texto) === "b78d300d15057992b03e23fcea44ab7d") {
        localStorage.setItem("logado", "sim");
        verificaLogin();
    } else {
        alert("Senha Incorreta!");
    }
};

document.getElementById("botao").onclick = manipulaBotao;

document.getElementById("logout").onclick = () => {
    localStorage.removeItem("logado");
    window.location.reload();
};

document.addEventListener("DOMContentLoaded", verificaLogin);
