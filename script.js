let button = document.getElementById('button')
let nom = document.getElementById('name')
let reponseCorrecte = document.getElementById('button-reponse-correcte')
let reponseIncorrecte = document.getElementById('button-reponse-incorrecte')
let indicePays = 0;
let countryId = '';
let videoBoule = document.getElementById("animation");
let apparitionPhrase = document.getElementById("nationality");
let apparitionDrapeau = document.getElementById("flag");
let apparitionAge = document.getElementById("age");

// lancement animation fumée dans boule de cristal
const lancementAnimation = () => {
    videoBoule.play().then(() => {
        document.getElementById("statusText").innerHTML = "Yay ! La vidéo est lancée !";
    }).catch((error) => {
        document.getElementById("statusText").innerHTML = "Erreur: " + error;
    })
}

// lancement animation prédiction nationalité
const lancementPhrase = () => {
    apparitionPhrase.className = "animation-text"
}

// lancement animation drapeau
const lancementDrapeau = () => {
    apparitionDrapeau.className = "animation-text"
}

// lancement animation prédiction âge
const lancementAge = () => {
    apparitionAge.className = "animation-text"
}

button.addEventListener('click', () => {
    masquerDiv()
    lancementAnimation()
    guessMyNationality()
    // lancementPhrase()
})

reponseCorrecte.addEventListener('click', () => {
    guessMyAge();
    lancementAnimation();
})

reponseIncorrecte.addEventListener('click', () => {
    indicePays += 1;
    guessMyNationality();
    lancementAnimation();
    // lancementPhrase();
})

// fonction pour faire apparaître les 2 boutons de réponse utilisateur
function masquerDiv() {
    if (document.getElementById('reponse-utilisateur').style.display == 'none') {
        document.getElementById('reponse-utilisateur').style.display = 'block';
    }
    else {
        document.getElementById('reponse-utilisateur').style.display = 'none';
    }
}

async function guessMyAge() {
    let response = await fetch(`https://api.agify.io?name=${nom.value}&country_id=${countryId}`);
    // let response = await fetch(`https://api.agify.io?name=${nom.value}`);
    let dataAge = await response.json()
    displayAge(dataAge)
}

function displayAge(dataAge) {
    document.querySelector("#age").innerHTML = "Je devine que tu as " + dataAge.age + " ans";
    document.querySelector("#age").classList.remove("animation-text");
    void apparitionAge.offsetWidth;
    document.querySelector("#age").className = "animation-text";
}

async function guessMyNationality() {
    let responseC = await fetch(`https://api.nationalize.io/?name=${nom.value}`);
    let dataNationality = await responseC.json()
    let responseP = await fetch(`https://happyapi.fr/api/getLands`);
    let dataCountry = await responseP.json()
    displayNationality(dataNationality, dataCountry)
}

function displayNationality(dataNationality, dataCountry) {
    const codePays = dataNationality.country[indicePays].country_id;
    countryId = codePays;
    document.querySelector("#nationality").innerHTML = "Je devine que ton pays est : " + dataCountry.result.result[codePays];
    document.querySelector("#nationality").classList.remove("animation-text");
    void apparitionPhrase.offsetWidth;
    document.querySelector("#nationality").className = "animation-text";
    const img = document.querySelector("#flag");
    document.querySelector("#flag").classList.remove("animation-text");
    void apparitionDrapeau.offsetWidth;
    document.querySelector("#flag").className = "animation-text";
    img.src = `https://flagsapi.com/${codePays}/shiny/64.png`;
}