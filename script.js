let button = document.getElementById('button')
let nom = document.getElementById('name')



button.addEventListener('click', () => {
  //  guessMyAge()
    masquerDiv()
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
    const codePays = dataNationality.country[0].country_id
    document.querySelector("#nationality").innerHTML = "Je devine que vous êtes né : " + dataCountry.result.result[codePays];
    //let totalPourcent = 0;
    //totalPourcent = dataNationality.country[0].probability / (dataNationality.country[0].probability + dataNationality.country[1].probability + dataNationality.country[2].probability + dataNationality.country[3].probability + dataNationality.country[4].probability) * 100
    // for (let i=0;dataNationality.country.length-1;i++) {
    //     return totalPourcent += dataNationality.country[i].probability;
    // }
    const img = document.querySelector("#flag");
    img.src = `https://flagsapi.com/${codePays}/shiny/64.png`;
    //document.querySelector("#pourcent").innerHTML = "J'en suis sure à " + totalPourcent + " %";
    // document.querySelector("#pourcent").innerHTML = "J'en suis sure à " + totalPourcent;
}





