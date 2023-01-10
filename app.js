const responses = ["c", "a", "b", "a", "c"];;
const emojis = ["✔️", "✨", "👀", "😭", "👎"];
const falseResponse = "background: linear-gradient(to right, #f857a6, #ff5858);" ;
const trueResponse = "background: linear-gradient(to right, #11998e, #38ef7d);" ;
const check = document.querySelector('#valider');
// reponses des users
const radioButtons = document.querySelectorAll('input[type=radio]:checked') 

function addUserResponses() {
    let userValues = [] ;
    for (let radioButton of radioButtons){
        if(radioButton.checked) {
            console.log(radioButton.value) ;
            userValues.push(radioButton.value) ;
        }
        else {
            console.log("a radio button is not checked")
        }
    }
    console.log(userValues) ;
    return userValues ;
}

// evenement click du bouton pour envoyer les reponses 
check.addEventListener('click' , () => {
    let score = 0 ;
// ajouter les reponses de l'utilisateur
    let userValues = addUserResponses() ;
// changer le background id true or false
    for (let i = 0 ; i < userValues.length ; i++) {
        if (userValues[i] == responses[i]) {
            document.getElementById(`q${i+1}`).style = trueResponse;
            score++ ;
        }
        else {
            document.getElementById(`q${i+1}`).style = falseResponse ;
        }
    }

    // feedback score
    // score
    console.log("le score : " , score) ;
    let motivationSentence;
    let feedback = "Retentez une autre réponse dans les cases rouges, puis re-validez !" ;
    let note = (score / responses.length).toFixed(1)
    
    if( note <= 0.2) {
        motivationSentence = emojis[3] + " Peut mieux faire ! " + emojis[3] ;
    }
    else if ( note <= 0.4) {
        motivationSentence = emojis[2] + " Il reste quelques erreurs. " + emojis[3] ;
    }
    else if ( note <= 0.6) {
        motivationSentence = emojis[1] + " Encore un effort ... " + emojis[2] ;
    }
    else if ( note == 1) {
        motivationSentence = emojis[0] + " Bravo, c'est un sans faute ! " + emojis[0] ;
        feedback = "Quelle culture ..." ;
    }
    else {
        motivationSentence = emojis[1] + " Vous y êtes presque ! " + emojis[1] ;
    }
    
    document.getElementById('feedback').innerHTML = `<p class = 'fs-4'>${motivationSentence} </p> <p class = 'fs-4'>Score : <span class = 'fw-bold'> ${score} / ${responses.length} </span> </p> <p class = 'fw-normal'>${feedback}</p>`
});

// evenement changement de radio background disparait
for (let radioButton of radioButtons) {
    radioButton.addEventListener('change' , () => {
        console.log('i changed radio button') ;
        const parentClass = radioButton.closest('.col-12') ;
        parentClass.style = "background : none ;"
        console.log(parentClass)
})
}

