import { recipes } from "../data/recipes.js";
import { CardRecip } from "../facto/recettes.js";
import { ingredientItem } from "../facto/filtre.js";
import { applianceItem } from "../facto/filtre.js";
import { ustensilsItem } from "../facto/filtre.js";
import { toLowerCaseInclude } from "../js/cas_suivant.js";

// test

// appel des selectors et de currentRecipes, variable libre 
export let currentRecipes = recipes;
export var list_recette_selectionner = [];
var sauv_tri=[];
const cardsSection = document.querySelector(".card-section");
const searchBar = document.querySelector('#search');
//var list_recette_selectionner = [];

ingredientItem()

// fonction qui récupère recipe et l'affiche
function getUser() {
    // const res = recipes
    currentRecipes = orderList(recipes);
    createRecipesList(currentRecipes);
   
}


// fonction pour trier toutes les recettes par ordre alphabetique avec sort 
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


// fonction créant les cards en utilisant la class et le constructor 
// et utilisation du foreach pour récupérer les données à injecter dans CardRecip
function createRecipesList(userList) {
    userList.forEach(user => {

        const recipesTemplates = new CardRecip(user);
        const cardDom = recipesTemplates.getCardDom();

        cardsSection.innerHTML += cardDom;
    });
}

// event au keyup sur la searchBar
searchBar.addEventListener("keyup", filterData);//déclenchement de filterData lorsque l'on rempli l'input de recherche

// récupération des tags en utilisant ${category} sur les querySelector > p 
// Et les push dans l'array tagNames selon leur innerText 
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

//fonction de recherche et tri
export function filterData() {
    currentRecipes = orderList(recipes);

    cardsSection.innerHTML = "";

    const searchString = document.getElementById('search')?.value.toLowerCase();//barre de recherche
    const selectedTagsIngredients = getUserSelectedTags('ingredients');//tags ingredient
    const selectedTagsAppliance = getUserSelectedTags('appliance');//tags appareils
    const selectedTagsUstensils = getUserSelectedTags('ustensils');//tags ustensils
    var listtagingredient = [];
    var listtagustensil = [];
    var listtagappareil = [];
    var tri = [];

    //récuperation des tag selectionnés
    const selectedTagsObject = {
        ingredients: selectedTagsIngredients,
        appliance: selectedTagsAppliance,
        ustensils: selectedTagsUstensils
    }
   

    // création d'une fonction  formattedRecipeSubData avec les recipes et les  tagCategory en param
    //On utilise switch case break pour donner l'instruction voulue et retourner ce que nous voulons 
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

    // var filteredData qui compare par rapport à recipe les tags selectionnés et les inputs principaux
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


    // condition qui compare la recherche de l'input de search bar à  la description des ingredients et au name

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
            //cherche les recettes qui comprennent le contenu de la barre de recherche dans leur nom,description ou ingredient
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
       
        if (nbmots == recherche.length) {
            recipesSorted.push(currentRecipes);
        }
        // console.log("recette sortie"+recipesSorted);
    });
 //   */

    // createRecipesList(recipesSorted);

    //currentRecipes = filteredData;
    

    // Si filteredData est égal à aucune card alors return message recette erreur 
    if (filteredData == 0) {
        return cardsSection.innerHTML = `
        <div class="recipe-defaut">
                <div class="recipe-defaut-txt">
                    <h5>Aucune recette ne correspond à votre critère… vous pouvez
                    chercher « tarte aux pommes », « poisson », etc.</h5>
                </div>
        </div>`;
    };

    // si longueur du message dans input est inferieur à 3 caractères alors return  message erreur
    if (searchString.length < 3 && searchString.length > 0) {
        return cardsSection.innerHTML = `
        <div class="recipe-defaut">
            <div class="recipe-defaut-txt">
                <h5>Veuillez entrer plus de caractères dans le champ de recherche</h5>
            </div>
    </div>`;
    } else {
        if (selectedTagsIngredients != ""||selectedTagsAppliance!=""||selectedTagsUstensils!="") {
            if (selectedTagsIngredients != "") {
                recipesSorted.forEach(function (element) {
                    var nbingredient = 0;
                        selectedTagsIngredients.forEach(function (tagingredient) {
                            let ingredientInside = false;
                            element.ingredients.forEach(function (lingredient) {
                              
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
                    var nv_tri = [];
                    tri.forEach(function (element) {
                        var nbustensils = 0;
                        element.ustensils.forEach(function (ustensil) {
                            selectedTagsUstensils.forEach(function (selection) {
                                if (ustensil == selection) {
                                    nbustensils += 1;
                                }
                            })
                            if (nbustensils == selectedTagsUstensils.length) {
                                var dejapresent = false;
                                if (nv_tri != "") {
                                    nv_tri.forEach(function (recette) {
                                        if (recette.name == element.name) {
                                            dejapresent = true;
                                        }
                                    })
                                    if (dejapresent == false) {
                                        nv_tri.push(element);
                                    }
                                } else {
                                    nv_tri.push(element);
                                }
                            }
                        });
                    })
                    tri=nv_tri
                } else {
                    var nv_tri = [];
                    recipesSorted.forEach(function (element) {
                        var nbustensil = 0;
                        element.ustensils.forEach(function (ustensil) {
                            selectedTagsUstensils.forEach(function (selection) {
                                if (ustensil == selection) {
                                    nbustensil += 1;
                                }
                            })
                            if (nbustensil == selectedTagsUstensils.length) {
                                
                                var dejapresent = false;
                                if (nv_tri != "") {
                                    nv_tri.forEach(function (recette) {
                                        if (recette.name == element.name) {
                                            dejapresent = true;
                                        }
                                    })
                                    if (dejapresent == false) {
                                        nv_tri.push(element);
                                    }
                                } else {
                                    nv_tri.push(element);
                                }
                            }
                        });
                    });
                    tri = nv_tri;
                }
                 //  sauv_tri = tri;
                


            }
            list_recette_selectionner = tri;
           
            createRecipesList(tri);//créer la liste des recettes
            ingredientItem();
            applianceItem();
            ustensilsItem();
        } else {
            list_recette_selectionner = recipesSorted;
            createRecipesList(recipesSorted);//créer la liste des recettes
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