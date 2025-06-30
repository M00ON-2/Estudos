document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    {
      question: "O que acontece com a energia interna de um gás quando ele é aquecido?",
      answers: ["Diminui", "Aumenta", "Permanece Constante", "Desaparece"],
      correct: 1
    },
    {
      question: "Qual é o nome da lei que diz que a energia não pode ser criada nem destruída?",
      answers: ["Lei de Boyle", "Lei de Ohm", "Primeira Lei da Termodinâmica", "Segunda lei de newton"],
      correct: 2
    },
    {
      question: "Qual unidade é usada para medir o calor?",
      answers: ["Metro", "Graus celsius", "Caloria", "Litro"],
      correct: 2
    },
    {
      question: "Quando colocamos uma colher de metal quente na água fria, o que acontece?",
      answers: ["A colher esfria e a água esquenta", "A colher fica mais quente", "A água fica mais fria", "Nada acontece"],
      correct: 0
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  const questionContainer = document.getElementById("question-container");
  const nextBtn = document.getElementById("next-btn");
  const rewardSection = document.getElementById("reward");
  const scoreDisplay = document.getElementById("score-display");
  const shopItems = document.getElementById("shop-items");

  function showQuestion() {
    const q = questions[currentQuestion];
    questionContainer.innerHTML = `<h2>${q.question}</h2>` +
      q.answers.map((answer, i) => `<div class="option" data-index="${i}">${answer}</div>`).join("");

    document.querySelectorAll(".option").forEach(option => {
      option.addEventListener("click", handleAnswer);
    });

    nextBtn.style.display = "none";
  }

  function handleAnswer(e) {
    const selectedIndex = parseInt(e.target.dataset.index);
    const q = questions[currentQuestion];
    const options = document.querySelectorAll(".option");

    options.forEach((opt, i) => {
      opt.style.pointerEvents = "none";
      if (i === q.correct) {
        opt.classList.add("correct");
      } else if (i === selectedIndex) {
        opt.classList.add("incorrect");
      }
    });

    if (selectedIndex === q.correct) {
      score += 10;
    }

    nextBtn.style.display = "inline-block";
  }

  nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showRewards();
    }
  });

  function showRewards() {
    document.getElementById("quiz").style.display = "none";
    rewardSection.classList.remove("hidden");
    scoreDisplay.textContent = score;

    const items = [
      { name: "Camiseta Virtual", cost: 20 },
      { name: "Emblema de Ouro", cost: 30 },
      { name: "Poder Especial", cost: 40 }
    ];

    shopItems.innerHTML = "";
    items.forEach(item => {
      const afford = score >= item.cost;
      const div = document.createElement("div");
      div.classList.add("shop-item");
      div.innerHTML = `
        <strong>${item.name}</strong><br>
        Custa ${item.cost} pontos<br>
        <button ${afford ? "" : "disabled"}>${afford ? "Comprar" : "Insuficiente"}</button>
      `;
      if (afford) {
        const button = div.querySelector("button");
        button.addEventListener("click", () => {
          div.classList.add("purchased");
          const msg = document.createElement("div");
          msg.className = "purchase-message";
          msg.textContent = "Item comprado!";
          div.appendChild(msg);
        });
      }
      shopItems.appendChild(div);
    });
  }

  // Iniciar o quiz
  showQuestion();
});
