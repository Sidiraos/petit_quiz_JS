const responses = ["c", "a", "b", "a", "c"];
const emojis = ["✔️", "✨", "👀", "😭", "👎"];
const falseResponse =
  "background: linear-gradient(to right, #f857a6, #ff5858);";
const trueResponse = "background: linear-gradient(to right, #11998e, #38ef7d);";
const check = document.querySelector("#valider");

function addUserResponses(radioButtons) {
  let userValues = [];
  radioButtons.forEach(function (button, index) {
    console.log("button value : ", button.value);
    if (button.value === responses[index]) {
      userValues.push(true);
    } else {
      userValues.push(false);
    }
  });

  return userValues;
}

function bgChangingWithUserResponse(userValues) {
  userValues.forEach(function (value, i) {
    console.log("value ", value);
    if (value) {
      document.getElementById(`q${i + 1}`).style = trueResponse;
    } else {
      document.getElementById(`q${i + 1}`).style = falseResponse;
    }
  });
}

function showScore(userValues) {
  let score = userValues.filter((elt) => elt === true).length;
  console.log("le score : ", score);
  let motivationSentence;
  let feedback =
    "Retentez une autre réponse dans les cases rouges, puis re-validez !";
  let note = (score / responses.length).toFixed(1);

  if (note <= 0.2) {
    motivationSentence = emojis[3] + " Peut mieux faire ! " + emojis[3];
  } else if (note <= 0.4) {
    motivationSentence = emojis[2] + " Il reste quelques erreurs. " + emojis[3];
  } else if (note <= 0.6) {
    motivationSentence = emojis[1] + " Encore un effort ... " + emojis[2];
  } else if (note == 1) {
    motivationSentence =
      emojis[0] + " Bravo, c'est un sans faute ! " + emojis[0];
    feedback = "Quelle culture ...";
  } else {
    motivationSentence = emojis[1] + " Vous y êtes presque ! " + emojis[1];
  }

  document.getElementById(
    "feedback"
  ).innerHTML = `<p class = 'fs-4'>${motivationSentence} </p> <p class = 'fs-4'>Score : <span class = 'fw-bold'> ${score} / ${responses.length} </span> </p> <p class = 'fw-normal'>${feedback}</p>`;
}

// programme principale
// evenement click du bouton pour envoyer les reponses
check.addEventListener("click", () => {
  const radioButtons = document.querySelectorAll("input[type=radio]:checked");
  console.log("valeurs checké ", radioButtons);
  let userValues = addUserResponses(radioButtons);
  console.log(userValues);
  bgChangingWithUserResponse(userValues);
  showScore(userValues);
});

// evenement changement de radio background disparait
const radioButtons = document.querySelectorAll("input[type=radio]");
function bgChangingWithRadio() {
    radioButtons.forEach(radioButton => {
      radioButton.addEventListener("change", () => {
        console.log("i changed radio button");
        const parentClass = radioButton.closest(".col-12");
        parentClass.style = "background : none ;";
        console.log(radioButton);
      });
    });
}  
bgChangingWithRadio();