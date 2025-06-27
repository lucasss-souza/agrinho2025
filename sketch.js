let estado = "menu";
let botaoComecar, botaoQuiz, botaoSobre, botaoVoltar, botaoAvancar;
let img;  // Variável para armazenar a imagem

// Perguntas e respostas do Quiz
let perguntas = [
  {
    pergunta: "Qual é uma característica do campo?",
    respostas: ["Menor densidade populacional", "Mais tecnologia", "Maior densidade populacional", "Mais prédios"],
    respostaCorreta: 0 // Índice da resposta correta (Menor densidade populacional)
  },
  {
    pergunta: "O que é mais comum no campo?",
    respostas: ["Cultura digital", "Atividades agrícolas", "Comércio", "Indústrias"],
    respostaCorreta: 1 // Índice da resposta correta (Atividades agrícolas)
  },
  {
    pergunta: "O campo oferece mais:",
    respostas: ["Tradição", "Tranquilidade", "Agitação", "Tecnologia"],
    respostaCorreta: 1 // Índice da resposta correta (Tranquilidade)
  }
];

let perguntaAtual = 0;
let respostaSelecionada = -1; // Nenhuma resposta selecionada inicialmente
let respostaCorreta = false;
let feedback = ""; // Para armazenar o feedback
let botoesRespostas = []; // Para armazenar os botões de resposta

function preload() {
  // Carregando a imagem da pasta 'img'
  img = loadImage('img/imagem1.jpg');  // Verifique se o caminho está correto
}

function setup() {
  createCanvas(600, 400);

  // Botões da tela principal
  botaoComecar = createButton("Começar");
  botaoComecar.position(265, 100);
  botaoComecar.mousePressed(() => mudarEstado("jogo"));

  botaoQuiz = createButton("Quizizz");
  botaoQuiz.position(269, 150);
  botaoQuiz.mousePressed(() => mudarEstado("quiz"));

  botaoSobre = createButton("Sobre o Desenvolvedor");
  botaoSobre.position(230, 200);
  botaoSobre.mousePressed(() => mudarEstado("sobre"));

  // Botão Voltar (criado uma vez, usado nas telas internas)
  botaoVoltar = createButton("Voltar");
  botaoVoltar.position(10, 10);
  botaoVoltar.mousePressed(() => mudarEstado("menu"));
  botaoVoltar.hide(); // escondido inicialmente

  // Botão Avançar (criado, mas escondido inicialmente)
  botaoAvancar = createButton("Avançar");
  botaoAvancar.position(500, 350);
  botaoAvancar.mousePressed(() => mudarEstado("fase2"));
  botaoAvancar.hide(); // escondido inicialmente
}

function draw() {
  background(220);

  if (estado === "menu") {
    mostrarMenu();
  } else if (estado === "jogo") {
    mostrarJogo();
  } else if (estado === "quiz") {
    mostrarQuiz();
  } else if (estado === "sobre") {
    mostrarSobre();
  } else if (estado === "Fase2") {
    mostrarFase2();
  }
}

function mostrarMenu() {
  mostrarOuEsconderBotoesMenu(true);
  botaoVoltar.hide();
  botaoAvancar.hide();

  // Exibindo a imagem no fundo do menu
  imageMode(CENTER);  // Alinha a imagem pelo centro
  image(img, width / 2, height / 2);  // Desenha a imagem no centro da tela

  textAlign(CENTER, CENTER);
  textSize(24);
  text("CAMPO E CIDADE", width / 2, 40);
}

function mostrarJogo() {
  mostrarOuEsconderBotoesMenu(false);
  botaoVoltar.show();
  botaoAvancar.show();  // Mostra o botão Avançar

  textAlign(CENTER, CENTER);
  textSize(24);
  text("CAMPO", width / 2, height / 10);
  text("O campo é uma área rural, geralmente ", 300, 80)
  text("caracterizada por grandes extensões de terra abertas,", 300, 100)
  text("usadas principalmente para atividades agrícolas, como", 300, 125)
  text("cultivo de alimentos e pastagem de animais.", 300, 150)
  text(" Ao contrário das cidades, o campo tem menor", 300, 175)
  text("densidade populacional e é mais conectado à", 300, 200)
  text("natureza, oferecendo tranquilidade e simplicidade", 300, 225)
}

function mostrarQuiz() {
  mostrarOuEsconderBotoesMenu(false);
  botaoVoltar.show();
  botaoAvancar.hide();  // Esconde o botão Avançar

  // Exibe a pergunta atual
  textAlign(CENTER, CENTER);
  textSize(24);
  text(perguntas[perguntaAtual].pergunta, width / 2, 50);

  // Limpa os botões de resposta da pergunta anterior, se houver
  for (let botao of botoesRespostas) {
    botao.remove();
  }
  botoesRespostas = []; // Limpa a lista de botões

  // Exibe as opções de resposta
  for (let i = 0; i < perguntas[perguntaAtual].respostas.length; i++) {
    let yPosition = 100 + (i * 40);
    let respostaBotao = createButton(perguntas[perguntaAtual].respostas[i]);
    respostaBotao.position(200, yPosition);
    respostaBotao.mousePressed(() => verificarResposta(i));
    botoesRespostas.push(respostaBotao); // Adiciona o botão à lista
  }

  // Exibe o feedback se disponível
  if (feedback !== "") {
    textSize(18);
    fill(respostaCorreta ? "green" : "red");
    text(feedback, width / 2, 300);
  }
}

function verificarResposta(respostaEscolhida) {
  respostaSelecionada = respostaEscolhida;
  if (respostaSelecionada === perguntas[perguntaAtual].respostaCorreta) {
    respostaCorreta = true;
    feedback = "Resposta Correta!";
  } else {
    respostaCorreta = false;
    feedback = "Resposta Errada!";
  }

  // Espera 1 segundo para mostrar feedback e avançar
  setTimeout(() => {
    perguntaAtual++;
    if (perguntaAtual >= perguntas.length) {
      mudarEstado("menu");  // Finaliza o quiz
    } else {
      feedback = "";  // Limpa o feedback para a próxima pergunta
      mudarEstado("quiz");  // Avança para a próxima pergunta
    }
  }, 1000);
}

function mostrarSobre() {
  mostrarOuEsconderBotoesMenu(false);
  botaoVoltar.show();
  botaoAvancar.hide();  // Esconde o botão Avançar

  textAlign(CENTER, CENTER);
  textSize(24);
  text("Desenvolvedor: Lucas de Souza Ramos", width / 2, height / 10);
}

// Nova função para a Fase 2
function mostrarFase2() {
  mostrarOuEsconderBotoesMenu(false);
  botaoVoltar.show();
  botaoAvancar.hide();  // Esconde o botão Avançar nesta fase

  textAlign(CENTER, CENTER);
  textSize(24);
  text("Você está na Fase 2!", width / 2, height / 10);
}

// Função que muda o estado
function mudarEstado(novoEstado) {
  estado = novoEstado;

  if (estado === "menu") {
    // Limpa a tela quando voltar ao menu
    clear();
    feedback = "";
    perguntaAtual = 0; // Reseta o quiz quando voltar para o menu

    // Esconde os botões de resposta
    for (let botao of botoesRespostas) {
      botao.remove();
    }
    botoesRespostas = [];
  }
}

// Função que mostra ou esconde os botões do menu principal
function mostrarOuEsconderBotoesMenu(mostrar) {
  if (mostrar) {
    botaoComecar.show();
    botaoQuiz.show();
    botaoSobre.show();
  } else {
    botaoComecar.hide();
    botaoQuiz.hide();
    botaoSobre.hide();
  }
}
