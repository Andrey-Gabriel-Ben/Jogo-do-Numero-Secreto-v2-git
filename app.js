let limite = 100;
let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumero();
let tentativas = 1;

function textoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ("speechSynthesis" in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = "pt-BR";
        utterance.rate = 1.4;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
};

function mensagemInicial() {
    textoNaTela("h1", "Jogo do Número Secreto");
    textoNaTela("p", `Escolha um número entre 1 e ${limite}`);
};

mensagemInicial();

function gerarNumero() {
    let numeroSorteado = parseInt((Math.random() * limite) + 1);
    console.log(numeroSorteado);
    if (listaDeNumerosSorteados.includes(numeroSorteado)) {
        return gerarNumero();
    } else {
        if (listaDeNumerosSorteados.length >= (limite / 5)) { listaDeNumerosSorteados.splice(0, 1) };
        listaDeNumerosSorteados.push(numeroSorteado);
        return numeroSorteado;
    };
};

function verificarChute() {
    let chute = document.querySelector("input").value;
    let palavraTentaiva = tentativas > 1 ? "tentativas" : "tentativa";
    if (chute == numeroSecreto) {
        textoNaTela("h1", "Acertou! 🥳🥳");
        textoNaTela("p", `Você acertou o Número Secreto em ${tentativas} ${palavraTentaiva}`);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (numeroSecreto > chute) {
            textoNaTela("p", `O Número Secreto é MAIOR que ${chute}`);
        } else {
            textoNaTela("p", `O Número Secreto é MENOR que ${chute}`);
        };
        limparCampo();
        tentativas++;
    };
};

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
};

function reiniciarJogo() {
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
};