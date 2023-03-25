const songsObject = {
    "💧😢🎸": "Teardrops On My Guitar",
    "🚫🦸‍♀️" : "Anti Hero",
    "🤴♥ ": "King Of My Heart",
    "📃💍": "Paper Rings",
    "☎🐍": "Look What You Made Me Do",
    "❄🏖 ": "Snow on the Beach",
    "🕛🌧 ": "Midnight Rain",
    "🤝📴": "Shake It Off",
    "🍾😵": "Champagne Problems",
    "🧩🤯 ": "Mastermind",
    "🧣🍂": "All Too Well",
    "💑📖 ": "Love Story",
    "👎🩸 ": "Bad Blood",
    "⚪️🐎 ": "White Horse",
    "📸🔥 ": "Picture to Burn",
    "___🌌🚀": "Blank Space",
    "👇❤": "This Love",
    "👋🗽 ": "Welcome to New York",
    "🍀1️⃣": "The Lucky One",
  };
  const container = document.querySelector(".container");
  const controls = document.querySelector(".controls-container");
  const startButton = document.getElementById("start");
  const mechanicsButton = document.getElementById("mechanics");
  const cheatButton = document.getElementById("cheatsheet");
  const aboutButton = document.getElementById("about");
  const letterContainer = document.getElementById("letter-container");
  const userInputSection = document.getElementById("userInputSection");
  const resultText = document.getElementById("result");
  const hints = Object.keys(songsObject);
  let randomHint = "",
    randomWord = "";
  let winCount = 0,
    lossCount = 5;
  
  const generateRandomValue = (array) => Math.floor(Math.random() * array.length);
  
  //Blocker
  const blocker = () => {
    let letterButtons = document.querySelectorAll(".letters");
    letterButtons.forEach((button) => {
      button.disabled = true;
    });
    stopGame();
  };
  
  //Start game
  startButton.addEventListener("click", () => {
    //Controls and buttons visibility
    controls.classList.add("hide");
    init();
  });

  
  //Stop Game
  const stopGame = () => {
    controls.classList.remove("hide");
  };
  
  //Generate Word
  const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";
    randomHint = hints[generateRandomValue(hints)];
    randomWord = songsObject[randomHint];
    container.innerHTML = `<div id="songHint">${randomHint}</div>`;
    let displayItem = "";
    randomWord.split("").forEach((value) => {
      if (value == " ") {
        winCount += 1;
        displayItem += `<span class="inputSpace">&nbsp;</span>`;
      } else {
        displayItem += `<span class="inputSpace">_</span>`;
      }
    });
    userInputSection.innerHTML = displayItem;
  };
  
  //Initial Function
  const init = () => {
    winCount = 0;
    lossCount = 5;
    document.getElementById(
      "chanceCount"
    ).innerHTML = `<span>Tries Left:</span>${lossCount}`;
    randomHint = null;
    randomWord = "";
    userInputSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();
    for (let i = 65; i < 91; i++) {
      let button = document.createElement("button");
      button.classList.add("letters");
      //Number to ASCII [A - Z]
      button.innerText = String.fromCharCode(i);
      //Character button click
      button.addEventListener("click", () => {
        let charArray = randomWord.toUpperCase().split("");
        let inputSpace = document.getElementsByClassName("inputSpace");
        if (charArray.includes(button.innerText)) {
          charArray.forEach((char, index) => {
            if (char === button.innerText) {
              button.classList.add("used");
              inputSpace[index].innerText = char;
              winCount += 1;
              if (winCount == charArray.length) {
                resultText.innerHTML = "You Won!";
                blocker();
              }
            }
          });
        } else {
          lossCount -= 1;
          document.getElementById(
            "chanceCount"
          ).innerHTML = `<span>Tries Left:</span> ${lossCount}`;
          button.classList.add("used");
          if (lossCount == 0) {
            resultText.innerHTML = "Game Over!";
            blocker();
          }
        }
        button.disabled = true;
      });
      letterContainer.appendChild(button);
    }
  };
  
  window.onload = () => {
    init();
  };