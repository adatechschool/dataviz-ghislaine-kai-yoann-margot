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
    let response = await fetch(`https://api.nationalize.io/?name=${nom.value}`);
    let dataNationality = await response.json()
    displayNationality(dataNationality)
}

function displayNationality(dataNationality){
    document.querySelector("#nationality").innerHTML = "Je devine que vous êtes " + dataNationality.country
}
