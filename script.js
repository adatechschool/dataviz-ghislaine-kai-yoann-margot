let button = document.getElementById("button")
let nom = document.getElementById("name")

const quelEstTonAge = async () => {
    let age = `https://api.agify.io?name=${nom}`
    let data = await fetch(age);
    console.log(data);
    let response = await data.json();
    console.log(response)
    document.querySelector("p").innerHTML = `Vous avez ${response.age} ans`
}

button.addEventListener("click", quelEstTonAge())