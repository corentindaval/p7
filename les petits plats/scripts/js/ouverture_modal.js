const iconeTag = document.querySelector('.icone-preview > svg');
const iconeTag2 = document.querySelector('.icone-preview-2 > svg');
const iconeTag3 = document.querySelector('.icone-preview-3 > svg');

iconeTag.addEventListener("click", openModalIngredient);
iconeTag2.addEventListener("click", openModalAppareil);
iconeTag3.addEventListener("click", openModalUstensiles);


const dropdownIngredient = document.querySelector('.dropdown-ingredient');
const dropdownAppareil = document.querySelector('.dropdown-appareil');
const dropdownUstensiles = document.querySelector('.dropdown-ustensiles');
const ingredientInput = document.getElementById('search-ingredient');
const appareilInput = document.getElementById('search-appareil');
const ustensileInput = document.getElementById('search-ustensiles');



function openModalIngredient() {
    if (dropdownIngredient.style.display === 'none') {
        dropdownIngredient.style.display = 'block';
        dropdownAppareil.style.display = 'none';
        appareilInput.style.width = "170px";
        dropdownUstensiles.style.display = 'none';
        ustensileInput.style.width = "170px";
        ingredientInput.style.width = '667px';
        iconeTag.style.transform = 'rotate(180deg)';
    } else {
        dropdownIngredient.style.display = 'none';
        ingredientInput.style.width = "170px";
        iconeTag.style.transform = 'rotate(0deg)';
    }
}

function openModalAppareil() {
    if (dropdownAppareil.style.display === 'none') {
        dropdownAppareil.style.display = 'block';
        dropdownIngredient.style.display = 'none';
        ingredientInput.style.width = "170px";
        dropdownUstensiles.style.display = 'none';
        ustensileInput.style.width = "170px";
        appareilInput.style.width = '667px';
        iconeTag2.style.transform = 'rotate(180deg)';
    } else {
        dropdownAppareil.style.display = 'none';
        appareilInput.style.width = "170px";
        iconeTag2.style.transform = 'rotate(0deg)';
    }
}
cd 
function openModalUstensiles() {
    if (dropdownUstensiles.style.display === 'none') {
        dropdownUstensiles.style.display = 'block';
        dropdownIngredient.style.display = 'none';
        ingredientInput.style.width = "170px";
        dropdownAppareil.style.display = 'none'
        appareilInput.style.width = "170px";
        ustensileInput.style.width = '667px';
        iconeTag3.style.transform = 'rotate(180deg)';
    } else {
        dropdownUstensiles.style.display = 'none';
        ustensileInput.style.width = "170px";
        iconeTag3.style.transform = 'rotate(0deg)';
    }
}