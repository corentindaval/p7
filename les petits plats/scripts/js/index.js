import { recipes } from "../data/recipes.js";
import { CardRecip } from "../facto/recettes.js";
import { ingredientItem } from "../facto/filtre.js";
import { applianceItem } from "../facto/filtre.js";
import { ustensilsItem } from "../facto/filtre.js";
import { toLowerCaseInclude } from "../js/cas_suivant.js";

// test

// appel des selector et de currentRecipes, variable libre 
export let currentRecipes = recipes;
export var list_recette_selectionner = [];

const cardsSection = document.querySelector(".card-section");
const searchBar = document.querySelector('#search');
//var list_recette_selectionner = [];

ingredientItem()

// function qui recupere recipe et l'affiche
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
searchBar.addEventListener("keyup", filterData);//declenchement de filterData lorsque l'on rempli l'input de recherche

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
    console.log("tagname:" + tagsNames);
}

//fonction de recherche et trie
export function filterData() {
    currentRecipes = orderList(recipes);

    cardsSection.innerHTML = "";

    const searchString = document.getElementById('search')?.value.toLowerCase();//bar de recherche
    const selectedTagsIngredients = getUserSelectedTags('ingredients');//tags ingredient
    const selectedTagsAppliance = getUserSelectedTags('appliance');//tags appareils
    const selectedTagsUstensils = getUserSelectedTags('ustensils');//tags ustensils
    var listtagingredient = [];
    var listtagustensil = [];
    var listtagappareil = [];

    //recup des tag selectionner
    const selectedTagsObject = {
        ingredients: selectedTagsIngredients,
        appliance: selectedTagsAppliance,
        ustensils: selectedTagsUstensils
    }
    console.log("ingredients:" + selectedTagsIngredients);
    console.log("appareils:" + selectedTagsAppliance);
    console.log("ustensils:" + selectedTagsUstensils);

    // creation d'une function  formattedRecipeSubData avec les recipes et les  tagCategory en param
    //On utilisise switch case break pour donner l'instruction voulu et retourner ce que nous voulons 
    // selon que ce soit un ingredient une aplliance ou un ustensil
    // nous retournons le resultat dans l'array formattedSubData
    const formattedRecipeSubData = function (recipe, tagCategory) {
        let formattedSubData = []
        switch (tagCategory) {
            case 'ingredients':
                formattedSubData = recipe.ingredients.map((el) => el.ingredient);
                console.log("test data: " + formattedSubData);
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
       // console.log("data:" + formattedSubData);
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

    // var filteredData qui nous compare par rapport a recipe les tag selectionner et les input principale
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

    let recherche = [];
    if (searchString.includes(" ")) {
        const seprecherche = searchString.split(" ");
        seprecherche.forEach(function (element) {
            recherche.push(element);
        });

    } else {
        recherche.push(searchString);
    }

    //version d'origine

   /* for (let currentRecipes of recipes) {

        let ingredientInside = false;
        console.log("recherche:" + searchString);
       
        var nbmots = 0;
        recherche.forEach(function (element) {
           
                for (let i; i < currentRecipes.ingredients.length; i++) {
                    if (currentRecipes.ingredients[i].ingredient.toLowerCase().includes(element)) {
                        ingredientInside = true;
                    }
                }
                //cherche les recette qui inclu le contenu de la bar de recherche dans leur nom,description ou ingredient
                if (currentRecipes.name.toLowerCase().includes(element) || currentRecipes.description.toLowerCase().includes(element) || ingredientInside) {
                    nbmots += 1;
                }
        });
        console.log("nbmots:" + nbmots + " recherche:" + recherche.length);
        if (nbmots == recherche.length) {
            recipesSorted.push(currentRecipes);
        }
       
       
       // console.log("recette sortie"+recipesSorted);
    }
    */

    //version avec for
    /*
    for (let currentRecipes of recipes) {
        let ingredientInside = false;
        console.log("recherche:" + searchString);
        var nbmots = 0;
        for (let element of recherche) {
            for (let i; i < currentRecipes.ingredients.length; i++) {
                if (currentRecipes.ingredients[i].ingredient.toLowerCase().includes(element)) {
                    ingredientInside = true;
                }
            }
            //cherche les recette qui inclu le contenu de la bar de recherche dans leur nom,description ou ingredient
            if (currentRecipes.name.toLowerCase().includes(element) || currentRecipes.description.toLowerCase().includes(element) || ingredientInside) {
                nbmots += 1;
            }
        }
        console.log("nbmots:" + nbmots + " recherche:" + recherche.length);
        if (nbmots == recherche.length) {
            recipesSorted.push(currentRecipes);
        }
    }
   */
  //  /*
    //version avec for each

    recipes.forEach(function (currentRecipes) {

        let ingredientInside = false;
        console.log("recherche:" + searchString);

        var nbmots = 0;
        recherche.forEach(function (element) {

            currentRecipes.ingredients.forEach(function (ingredient) {
                if (ingredient==element) {
                    ingredientInside = true;
                }

            });
            //cherche les recette qui inclu le contenu de la bar de recherche dans leur nom,description ou ingredient
            if (currentRecipes.name.toLowerCase().includes(element) || currentRecipes.description.toLowerCase().includes(element) || ingredientInside) {
                nbmots += 1;
            }
        });
        console.log("nbmots:" + nbmots + " recherche:" + recherche.length);
        if (nbmots == recherche.length) {
            recipesSorted.push(currentRecipes);
        }
        // console.log("recette sortie"+recipesSorted);
    });
 //   */









    // createRecipesList(recipesSorted);

    //currentRecipes = filteredData;
    console.log("test:" + recipesSorted);

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
        if (selectedTagsIngredients != ""||selectedTagsAppliance!=""||selectedTagsUstensils!="") {
            var tri = [];
            if (selectedTagsIngredients != "") {
                recipesSorted.forEach(function (element) {
                    var nbingredient = 0;
                        selectedTagsIngredients.forEach(function (tagingredient) {
                            let ingredientInside = false;
                            element.ingredients.forEach(function (lingredient) {
                                console.log("ingredient examiner:" + tagingredient);
                                if (lingredient.ingredient == tagingredient) {
                                    var dejapresent = false;
                                    tri.forEach(function (recette) {
                                        if (recette.name == element.name) {
                                            dejapresent = true;
                                        }
                                    });
                                    if (dejapresent == false) {
                                        ingredientInside = true;
                                    }
                                }
                            });
                            if (ingredientInside == true) {
                                nbingredient += 1;
                                // console.log("tri element:" + tri);
                            }
                            if (nbingredient == selectedTagsIngredients.length) {
                                tri.push(element);
                            }
                        });  

                });
              
               
            }
            if (selectedTagsAppliance != "") {
               /* selectedTagsAppliance.forEach(function (tagappliance) {
                    recipesSorted.forEach(function (element) {
                        let appareil = false;
                        if (element.appliance == tagappliance.appliance) {
                            var dejapresent = false;
                            tri.forEach(function (recette) {
                                if (recette.name == element.name) {
                                    dejapresent = true;
                                }
                            });
                            if (dejapresent == false) {
                                appareil = true;
                            } 
                        }
                        if (appareil == true) {
                            tri.push(element);
                        }
                    });
                });
                */

                if (tri != "") {
                    var nvtri = [];
                   // selectedTagsAppliance.forEach(function (tagappliance) {
                        tri.forEach(function (element) {
                            let appareil = false;
                            console.log("appareil:" + element.appliance);
                            if (element.appliance == selectedTagsAppliance) {
                                var dejapresent=false
                                nvtri.forEach(function (recette) {
                                    if (element.name == recette.name) {
                                        dejapresent = true;
                                    }
                                });
                                if (dejapresent == false) {
                                    appareil = true;
                                }
                            }
                            if (appareil == true) {
                                nvtri.push(element);
                            }
                        });
                  //  });
                  
                    tri = nvtri;
                } else {
                   // selectedTagsAppliance.forEach(function (tagappliance) {
                        recipesSorted.forEach(function (element) {
                            let appareil = false;
                            console.log("appareil:" + element.appliance + " tag:" + selectedTagsAppliance);
                            if (element.appliance == selectedTagsAppliance) {
                                var dejapresent = false
                                tri.forEach(function (recette) {
                                    if (element.name == recette.name) {
                                        dejapresent = true;
                                    }
                                });
                                if (dejapresent == false) {
                                    appareil = true;
                                }
                            }
                            if (appareil == true) {
                                tri.push(element);
                            }
                        });

                   // });
                   

                }

            }
            if (selectedTagsUstensils != "") {
                if (tri != "") {
                    var nvtri = [];
                    tri.forEach(function (element) {
                        let ustensil = false;
                        element.ustensils.forEach(function (lustensil) {
                            lustensil.forEach(function (sustensil) {
                                if (sustensil == selectedTagsUstensils) {
                                    ustensil = true;
                                }
                            });
                        });
                        if (ustensil = true) {
                            nvtri.push(element);
                        }
                    });
                    tri = nvtri;
                } else {
                    recipesSorted.forEach(function (element) {
                        let ustensil = false;
                        element.ustensils.forEach(function (lustensil) {
                                if (lustensil == selectedTagsUstensils) {
                                    ustensil = true;
                                }
                        });
                        if (ustensil == true) {
                            tri.push(element);
                        }
                    });
                }

            }
            list_recette_selectionner = tri;
            console.log("tri:" + tri);
            createRecipesList(tri);//creer la liste des recettes
            ingredientItem();
            applianceItem();
            ustensilsItem();
        } else {
            list_recette_selectionner = recipesSorted;
            createRecipesList(recipesSorted);//creer la liste des recettes
            ingredientItem();
            applianceItem();
            ustensilsItem();
        }
    };

}

getUser()
ingredientItem()
applianceItem()
ustensilsItem()