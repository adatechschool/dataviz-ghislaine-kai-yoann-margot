let button = document.getElementById('button')
let nom = document.getElementById('name')

button.addEventListener('click', () => {
    guessMyAge()
    guessMyNationality()
})

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
    console.log(codePays)
    console.log(dataCountry.result.result.codePays)
    document.querySelector("#nationality").innerHTML = "Je devine que vous né en " + dataCountry.result.result[codePays];
    const img = document.querySelector("#flag");
    img.src = `https://flagsapi.com/${codePays}/shiny/64.png`
}





