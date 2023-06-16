export class CardRecip {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.servings = data.servings
        this.ingredients = data.ingredients
        this.time = data.time
        this.description = data.description
        this.appliance = data.appliance
        this.ustensils = data.ustensils
        this.quantity = data.quantity

    }
    //mise en place carte recette
    getCardDom() {
        return `
        <article id="${this.id}" class="fiche-recette">
            <div class="recipe-img">
                <svg width="380" height="178" viewBox="0 0 380 178" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5C0 2.23858 2.23858 0 5 0H375C377.761 0 380 2.23858 380 5V178H0V5Z" fill="#C7BEBE"/>
                </svg>            
            </div>
            <div class="recipe-detail">
                <div class="recipe-head-txt">
                    <h5>${this.name}</h5>
                    <span class="time">${this.time} min</span>
                </div>
           
                <div class="container-details">
                    <ul class="recipe-ingredients">
                    ${this.ingredients.map((ingredient) => `<li><strong>${ingredient.ingredient}</strong>: ${"quantity" in ingredient ? ingredient.quantity : ""}
                    ${"unit" in ingredient ? ingredient.unit : ""}`)}</li>                
                    </ul>
                    <p class="recipe-description">${this.description.substring(0, 220)}${this.description.length > 180 ? "..." : ""}</p>
                </div>
            </div>
        </article>
        `
    }

}