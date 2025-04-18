const questions = [
    {
      text: "How are you today?",
      type: "button",
      options: [{ text: "Good", value: 1 }, { text: "Bad", value: 0 }]
    },
    {
      text: "How many times have you smiled? 1-5",
      type: "range",
      min: 1,
      max: 10,
      default: 5
    },
    {
      text: "How lucky do you feel today? min-max",
      type: "range",
      min: 1,
      max: 10,
      default: 5
    },
    {
      text: "Did you or are you going to talk with family/friends today?",
      type: "button",
      options: [{ text: "Yes", value: 1 }, { text: "No", value: 0 }]
    },
    {
      text: "What’s your mood right now?",
      type: "button",
      options: [{ text: "Happy", value: 1 }, { text: "Not happy", value: 0 }]
    },
    {
      text: "How would you rate your day today? 1-10",
      type: "range",
      min: 1,
      max: 10,
      default: 5
    },
    {
      text: "How many bars of chocolate do you want right now?",
      type: "button",
      options: [{ text: "As many as I can get", value: 1 }, { text: "Not in the mood for it", value: 0 }]
    },
    {
      text: "Did you enjoy this quiz?",
      type: "button",
      options: [{ text: "Yes, it reminded me of my mood", value: 1 }, { text: "No, get this over with already", value: 0 }]
    }
  ];
  
  let currentQuestion = 0;
  let answers = [];
  let happysong

  function showQuestion() {
    const q = questions[currentQuestion];
    const container = document.getElementById("quizStage");
    container.innerHTML = "";
  
    const questionEl = document.createElement("div");
    questionEl.innerHTML = `<p>${q.text}</p>`;
  
    if (q.type === "button") {
      q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.className = "option";
        btn.textContent = option.text;
        btn.onclick = () => handleAnswer(option.value);
        questionEl.appendChild(btn);
      });
    } else if (q.type === "range") {
      const range = document.createElement("input");
      range.type = "range";
      range.min = q.min;
      range.max = q.max;
      range.value = q.default;
      range.onchange = () => handleAnswer(parseInt(range.value));
      questionEl.appendChild(range);
    }
  
    container.appendChild(questionEl);
  }
  
  function handleAnswer(value) {
    answers.push(value);
    localStorage.setItem(`q${currentQuestion + 1}`, value);
    flashBackground(value);
  
    currentQuestion++;
    if (currentQuestion < questions.length) {
      setTimeout(() => {
        removeFlash();
        showQuestion();
      }, 500); // delay for flash effect
    } else {
      showResult();
    }
  }
  
  function flashBackground(value) {
    const main = document.querySelector(".yellow");
    if (value > 5 || value === 1) {
      main.classList.add("flash-happy");
    } else {
      main.classList.add("flash-sad");
    }
  }
  
  function removeFlash() {
    const main = document.querySelector(".yellow");
    main.classList.remove("flash-happy");
    main.classList.remove("flash-sad");
  }
  
  function showResult() {
    const main = document.querySelector(".yellow");
    const container = document.getElementById("quizStage");
    const result = answers.reduce((a, b) => a + b, 0);
    const avg = result / answers.length;
  
    container.innerHTML = "";
    document.getElementById("result").style.display = "block";
  
    if (avg >= 2) {
      main.style.backgroundImage = "url('final-happy-face.png')";
      document.getElementById("result").textContent = "You seem to be in a good mood! keep it going :)";
      document.getElementById("happyAudio").play(); // ← this line
    } else {
      main.style.backgroundImage = "url('final-sad-face.png')";
      document.getElementById("result").textContent = "You a bit down today. Come on, cheer up!";
      document.getElementById("sadAudio").play(); // ← this line
    }
  }
  
  
  document.addEventListener("DOMContentLoaded", showQuestion);
  