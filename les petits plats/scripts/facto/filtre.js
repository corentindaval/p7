import { filterData } from "../js/index.js";
import { currentRecipes } from "../js/index.js";
import { list_recette_selectionner } from "../js/index.js";
// tableau d'ingredient , appliance , ustensils
let allAppliance = [];
let allUstensils = [];
let allIngredients = [];

let listAppareil = document.getElementById("dropdown-appareil-list");
let listIngredient = document.getElementById("dropdown-ingredient-list");
let listUstensils = document.getElementById("dropdown-ustensiles-list");
let tagField = document.querySelector('.tag-section')

// function appliance boucle pour recuperer tous les items avec for 
// creation d'une const avec new set et l'application de la methode sort 
export function applianceItem() {

    allAppliance = [];
    if (list_recette_selectionner != "") {
        list_recette_selectionner.forEach(function (element) {
            for (let i = 0; i < currentRecipes.length; i++) {
                if (element.appliance == currentRecipes[i].appliance) {
                    let appliances = currentRecipes[i].appliance;
                    allAppliance.push(appliances);
                }
            }
        });
    } else {
        for (let i = 0; i < currentRecipes.length; i++) {
            let appliances = currentRecipes[i].appliance;
            // console.log("test 3 : " + appliances);liste appareils
            allAppliance.push(appliances);
        }
    }
   

    const applianceNoRepeat = new Set(allAppliance.sort());
    listAppareil.innerHTML = "";
    applianceNoRepeat.forEach((item) => {
        let appLi = document.createElement('li');
        appLi.innerText = item;
      // console.log("test2 : " + item);liste ustensil
        listAppareil.appendChild(appLi);

        // click  des element appliance 
        appLi.addEventListener('click', function (e) {
            const newDropAppliance = document.createElement('div')
            const p = document.createElement('p')
            const iCircle = document.createElement('i')
            iCircle.className = "fa-regular fa-circle-xmark"
            newDropAppliance.className = 'dropdown-appliance-tag'
            newDropAppliance.appendChild(p)
            newDropAppliance.appendChild(iCircle)
            p.innerHTML = e.target.innerHTML
            tagField.appendChild(newDropAppliance)


            // On click de la croix on remove l'élement entier
            iCircle.addEventListener('click', function (e) {
                newDropAppliance.remove()
                filterData()
            })
            // On reutilise filterData pour ravoir nos recette ou nos messages d erreur 
            filterData()
        })
    });

}

// function ingredient boucle pour recuperer tous les items avec for 
// creation d'une const avec new set et l'application de la methode sort  
export function ingredientItem() {

    allIngredients = [];

    if (list_recette_selectionner != "") {
        var nvlistingredient = [];
        list_recette_selectionner.forEach(function (element) {
            element.ingredients.forEach(function (eingredient) {
                var dejapresent = false;
                if (nvlistingredient != "") {
                    nvlistingredient.forEach(function (ningredient) {
                        if (eingredient.ingredient == ningredient) {
                            dejapresent = true;
                        }
                    });
                    if (dejapresent == false) {
                        nvlistingredient.push(eingredient.ingredient);
                    }
                } else {
                    nvlistingredient.push(eingredient.ingredient);
                }
            });
   
        });
        let ingredients = nvlistingredient;
        ingredients.forEach(function (element) {
            allIngredients.push(element);
        })
     

    } else {
        for (let i = 0; i < currentRecipes.length; i++) {
            let ingredients = currentRecipes[i].ingredients;
            ingredients.forEach(({ ingredient }) => {
                allIngredients.push(`${ingredient}`);
            })
        }
    }

  
    // console.log(allIngredients)
    listIngredient.innerHTML = "";
    const ingredientNoRepeat = new Set(allIngredients.sort());

    ingredientNoRepeat.forEach((item) => {
        let ingLi = document.createElement('li');
        ingLi.innerText = item;
        listIngredient.appendChild(ingLi);

        ingLi.addEventListener('click', function (e) {
            const newDropIngredients = document.createElement('div')
            const p = document.createElement('p')
            const iCircle = document.createElement('i')
            iCircle.className = "fa-regular fa-circle-xmark"
            newDropIngredients.className = 'dropdown-ingredients-tag'
            newDropIngredients.appendChild(p)
            newDropIngredients.appendChild(iCircle)
            p.innerHTML = e.target.innerHTML
            tagField.appendChild(newDropIngredients)

            // On click de la croix on remove l'élement entier 
            iCircle.addEventListener('click', function (e) {
                newDropIngredients.remove()
                filterData()
            })
            // On reutilise filterData pour ravoir nos recette ou nos messages d erreur 
            filterData()
        })
    })
}

// function ustensils boucle pour recuperer tous les items avec for 
// creation d'une const avec new set et l'application de la methode sort et slice 
export function ustensilsItem() {

    allUstensils = [];

    if (list_recette_selectionner != "") {
        list_recette_selectionner.forEach(function (element) {
            for (let i = 0; i < currentRecipes.length; i++) {
                if (element.ustensils == currentRecipes[i].ustensils) {
                    let ustensils = currentRecipes[i].ustensils;
                    ustensils.filter((ustensil) => {
                        if (allUstensils != "") {
                            var dejapresent = false;
                            allUstensils.forEach(function (ellist) {
                                if (ellist == ustensil) {
                                    dejapresent = true;
                                }
                            })
                            if (dejapresent == false) {
                                allUstensils.push(ustensil);
                            }

                        } else {
                            allUstensils.push(ustensil);
                        }
                       
                      
                    })
                }
            }
        });

    } else {
        for (let i = 0; i < currentRecipes.length; i++) {
            let ustensils = currentRecipes[i].ustensils;
            ustensils.filter((ustensil) => {
                allUstensils.push(ustensil)
            })
        }
    }



   
    const ustensilsNoRepeat = new Set(allUstensils.slice(0, 30).sort());

    listUstensils.innerHTML = "";
    ustensilsNoRepeat.forEach((item) => {
        let ustenLi = document.createElement('li');
        ustenLi.innerText = item;
        listUstensils.appendChild(ustenLi)
        // console.log(ustenLi , item)

        ustenLi.addEventListener('click', function (e) {
            const newDropUstensils = document.createElement('div')
            const p = document.createElement('p')
            // p.className = 'ustensils-custom'
            const iCircle = document.createElement('i')
            iCircle.className = "fa-regular fa-circle-xmark"
            newDropUstensils.className = 'dropdown-ustensils-tag'
            newDropUstensils.appendChild(p)
            newDropUstensils.appendChild(iCircle)
            p.innerHTML = e.target.innerHTML
            tagField.appendChild(newDropUstensils)

            // On click de la croix on remove l'élement entier 
            iCircle.addEventListener('click', function (e) {
                newDropUstensils.remove()
                filterData()
            })
            // On reutilise filterData pour ravoir nos recette ou nos messages d erreur 
            filterData()
        })


    })
}