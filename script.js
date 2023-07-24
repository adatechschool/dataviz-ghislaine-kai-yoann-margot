let button = document.getElementById('button')
let nom = document.getElementById('name')
let reponseCorrecte = document.getElementById('button-reponse-correcte')
let reponseIncorrecte = document.getElementById('button-reponse-incorrecte')
let indicePays = 0;

button.addEventListener('click', () => {
 // guessMyAge()
    masquerDiv()
    guessMyNationality()
})

reponseCorrecte.addEventListener('click', () => {
       guessMyAge()
   //  masquerDiv()
   //  guessMyNationality()
})

reponseIncorrecte.addEventListener('click', () => {
    // guessMyAge()
    // masquerDiv()
       indicePays += 1
       guessMyNationality()
}) 

function masquerDiv()
{
  if (document.getElementById('reponse-utilisateur').style.display == 'none') {
       document.getElementById('reponse-utilisateur').style.display = 'block';
  }
  else {
       document.getElementById('reponse-utilisateur').style.display = 'none';
  }
}

async function guessMyAge() {
    let response = await fetch(`https://api.agify.io?name=${nom.value}`);
    let dataAge = await response.json()
    displayAge(dataAge)
}

function displayAge(dataAge){
    document.querySelector("#age").innerHTML = "Je devine que vous avez " + dataAge.age + " ans"
}

async function guessMyNationality() {
    let responseC = await fetch(`https://api.nationalize.io/?name=${nom.value}`);
    let dataNationality = await responseC.json()
    let responseP = await fetch(`https://happyapi.fr/api/getLands`);
    let dataCountry = await responseP.json()
    displayNationality(dataNationality, dataCountry)
}

function displayNationality(dataNationality, dataCountry){
    
    const codePays = dataNationality.country[indicePays].country_id
    document.querySelector("#nationality").innerHTML = "Je devine que vous êtes né : " + dataCountry.result.result[codePays];
    const img = document.querySelector("#flag");
    img.src = `https://flagsapi.com/${codePays}/shiny/64.png`;
}





