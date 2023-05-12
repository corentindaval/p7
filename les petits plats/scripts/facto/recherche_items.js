const ingredientSearch = document.querySelector("#search-ingredient")
const appareilSearch = document.querySelector("#search-appareil")
const ustensileSearch = document.querySelector('#search-ustensiles')



ingredientSearch.addEventListener('keyup', tagSearchIngredient)
appareilSearch.addEventListener('keyup', tagSearchAppareil)
ustensileSearch.addEventListener('keyup', tagSearchUstensile)


function tagSearchIngredient(e) {

    const filterMainIngredient = e.target.value.toUpperCase();
    const dropdownIngredientList = document.getElementById("dropdown-ingredient-list");
    const listIngredient = dropdownIngredientList.getElementsByTagName("li")

    for (let i = 0; i < listIngredient.length; i++) {
        const txtValue = listIngredient[i].textContent || listIngredient[i].innerText;
        if (txtValue.toUpperCase().indexOf(filterMainIngredient) > -1) {
            listIngredient[i].style.display = "block";
        } else {
            listIngredient[i].style.display = "none";
        }
    }
}

function tagSearchAppareil(e) {

    const filterMainAppareil = e.target.value.toUpperCase();
    const dropdownAppareilList = document.getElementById("dropdown-appareil-list");
    const listAppareil = dropdownAppareilList.getElementsByTagName("li")

    for (let i = 0; i < listAppareil.length; i++) {
        const txtValue = listAppareil[i].textContent || listAppareil[i].innerText;
        if (txtValue.toUpperCase().indexOf(filterMainAppareil) > -1) {
            listAppareil[i].style.display = "block";
        } else {
            listAppareil[i].style.display = "none";
        }
    }
}


function tagSearchUstensile(e) {

    const filterMainUstensile = e.target.value.toUpperCase();
    const dropdownUstensileList = document.getElementById("dropdown-ustensiles-list");
    const listUstensils = dropdownUstensileList.getElementsByTagName("li")

    for (let i = 0; i < listUstensils.length; i++) {
        const txtValue = listUstensils[i].textContent || listUstensils[i].innerText;
        if (txtValue.toUpperCase().indexOf(filterMainUstensile) > -1) {
            listUstensils[i].style.display = "block";
        } else {
            listUstensils[i].style.display = "none";
        }
    }
}