const typingText = document.querySelector(".typing__text p"),
  inpField = document.querySelector(".wrapper .input__field"),
  mistakeTag = document.querySelector(".mistake span"),
  timeTag = document.querySelector(".time span b"),
  wpmTag = document.querySelector(".wpm span "),
  cpmTag = document.querySelector(".cpm span "),
  tryAgainBtn = document.querySelector(".btn");

let timer,
  maxTime = 60,
  leftTime = maxTime;

let charIndex = (istyping = mistakes = 0);
function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[randIndex].split("").forEach((span) => {
    const spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });

  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}
function initTyping() {
  const charecters = typingText.querySelectorAll("span");
  const typedChar = inpField.value.split("")[charIndex];
  if (charIndex < charecters.length - 1 && leftTime > 0) {
    if (!istyping) {
      timer = setInterval(initTimer, 1000);
      istyping = true;
    }

    if (typedChar == null) {
      charIndex--;
      if (charecters[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }
      charecters[charIndex].classList.remove("incorrect", "correct");
    } else {
      if (charecters[charIndex].innerText === typedChar) {
        charecters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        charecters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }
    charecters.forEach((span) => span.classList.remove("active"));
    charecters[charIndex].classList.add("active");

    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - leftTime)) * 60
    );
    wpm = wpm < 0 || !wpm || wpm === Infinity ? "0" : wpm;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = wpm;
    cpmTag.innerText = charIndex - mistakes;
  } else {
    inpField.innerText = "";
    clearInterval(timer);
  }
}

function initTimer() {
  if (leftTime > 0) {
    leftTime--;
    timeTag.innerText = leftTime;
  } else {
    clearInterval(timer);
  }
}
function resetGame() {
  randomParagraph();
  inpField.value = "";
  clearInterval(timer);
  leftTime = maxTime;
  charIndex = istyping = mistakes = 0;
  timeTag.innerText = leftTime;
  mistakeTag.innerText = mistakes;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
