import { recipes } from "../data/recipes.js";
import { CardRecip } from "../facto/recettes.js";
import { ingredientItem } from "../facto/filtre.js";
import { applianceItem } from "../facto/filtre.js";
import { ustensilsItem } from "../facto/filtre.js";
import { toLowerCaseInclude } from "../js/cas_suivant.js";

// test

// appel des selector et de currentRecipes, variable libre 
export let currentRecipes = recipes;

const cardsSection = document.querySelector(".card-section");
const searchBar = document.querySelector('#search');


ingredientItem()

// function qui recupere recipe
function getUser() {
    // const res = recipes
    currentRecipes = orderList(recipes);
    createRecipesList(currentRecipes);
    // console.log(currentRecipes)
}


// function pour trier toute les recettes par ordre alphabetique avec sort 
function orderList(data) {

    const orderData = data.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        return 0;
    })

    return orderData;

}


// function creant nos card en utilisant la class et le constructor 
// et utilisation du foreach pour recuperer les donner a injecter dans CardRecip
function createRecipesList(userList) {
    userList.forEach(user => {

        const recipesTemplates = new CardRecip(user);
        const cardDom = recipesTemplates.getCardDom();

        cardsSection.innerHTML += cardDom;
    });
}

// event au keyup sur la searchBar
searchBar.addEventListener("keyup", filterData);

// recuperation des tags en utilisant ${category} sur les querySelector > p 
// Et les push dans l'array tagNames selon leut innerText 
function getUserSelectedTags(category) {
    const tagsNames = [];
    const tagsNodeElements = document.querySelectorAll(`.dropdown-${category}-tag > p`)
    if (tagsNodeElements.length > 0) {
        for (const tag of tagsNodeElements) {
            tagsNames.push(tag.innerText);
        }
    }
    return tagsNames;
}


export function filterData() {
    currentRecipes = orderList(recipes);

    cardsSection.innerHTML = "";

    const searchString = document.getElementById('search')?.value.toLowerCase();
    const selectedTagsIngredients = getUserSelectedTags('ingredients');
    const selectedTagsAppliance = getUserSelectedTags('appliance');
    const selectedTagsUstensils = getUserSelectedTags('ustensils');

    const selectedTagsObject = {
        ingredients: selectedTagsIngredients,
        appliance: selectedTagsAppliance,
        ustensils: selectedTagsUstensils
    }


    // creation d'une function  formattedRecipeSubData avec les recipes et les  tagCategory en param
    //On utilisise switch case break pour donner l'instruction voulu et retourner ce que nous voulons 
    // selon que ce soit un ingredient une aplliance ou un ustensil
    // nous retournons le resultat dans l'array formattedSubData
    const formattedRecipeSubData = function (recipe, tagCategory) {
        let formattedSubData = []
        switch (tagCategory) {
            case 'ingredients':
                formattedSubData = recipe.ingredients.map((el) => el.ingredient);
                break;
            case 'appliance':
                formattedSubData = [recipe.appliance];
                break;
            case 'ustensils':
                formattedSubData = recipe.ustensils;
                break;
            default:
                break;
        }
        return formattedSubData;
    }


    // const func pour faire match les tag selon les recettes 
    const isTagMatchWithRecipeData = function (tag, recipeSubData) {
        for (let data of recipeSubData) {
            if (toLowerCaseInclude(data, tag.toLowerCase())) {
                return true;
            }
        }
    }

    // var filteredData qui nous compare par rapport a recipe les tag selectionner et les l'input principale
    let filteredData = currentRecipes.filter(recipe => {
        for (const tagCategory in selectedTagsObject) {
            if (selectedTagsObject[tagCategory].length > 0) {
                for (let tag of selectedTagsObject[tagCategory]) {
                    if (!isTagMatchWithRecipeData(tag, formattedRecipeSubData(recipe, tagCategory))) {
                        return false;
                    }
                }
            }
        }
        return true;
    });


    // condition qui compare la recherche sur l'input de search bar  la description les ingredients et le name

    let recipesSorted = [];

    for (let currentRecipes of recipes) {

        let ingredientInside = false;

        for (let i; i < currentRecipes.ingredients.length; i++) {
            if (currentRecipes.ingredients[i].ingredient.toLowerCase().includes(searchString)) {
                ingredientInside = true;
            }
        }

        if (currentRecipes.name.toLowerCase().includes(searchString) || currentRecipes.description.toLowerCase().includes(searchString) || ingredientInside) {
            recipesSorted.push(currentRecipes);
        }
        console.log(recipesSorted);
    }

    // createRecipesList(recipesSorted);

    currentRecipes = filteredData;

    // Si filteredData est egale a aucune card return message recette erreur 
    if (filteredData == 0) {
        return cardsSection.innerHTML = `
        <div class="recipe-defaut">
                <div class="recipe-defaut-txt">
                    <h5>Aucune recette ne correspond à votre critère… vous pouvez
                    chercher « tarte aux pommes », « poisson », etc.</h5>
                </div>
        </div>`;
    };

    // si longueur du message dans input est inferieur a 3 caractére return  message erreur
    if (searchString.length < 3 && searchString.length > 0) {
        return cardsSection.innerHTML = `
        <div class="recipe-defaut">
            <div class="recipe-defaut-txt">
                <h5>Veuillez entrer plus de caractères dans le champ de recherche</h5>
            </div>
    </div>`;
    } else {

        createRecipesList(recipesSorted);
        ingredientItem();
        applianceItem();
        ustensilsItem();
    };

}

getUser()
ingredientItem()
applianceItem()
ustensilsItem()