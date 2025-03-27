try {
    const response = await fetch("./assets/json/recipes.json");
    const data = await response.json();
    displayRecipes(data);
    ingredientsFilter(data);
} catch (error) {
    console.error("Error", error);
}
function displayRecipes(d) {
    const main = document.querySelector("#recipes-list .row");
    main.innerHTML = '';
    d.slice(0, 50).forEach((recipe, index) => {
        const article = document.createElement('div');
        article.className = 'col';
        article.id = index + 1;
        article.innerHTML = `
    <div class="col" id="${recipe.id + 1}">
    <div class="card h-100">
      <div class="card-img-top"></div>
      <div class="card-body">
        <div class="row mb-2">
          <h2 class="card-title col-8 card-name">${recipe.name}</h2>
          <div class="card-title col-4 text-end card-time-container">
            <img class="me-1 card-time-watch" alt="" src="./assets/img/watch-time.svg" /><span class="card-time">${recipe.time}</span>
          </div>
        </div>
        <div class="row">
          <ul class="card-text col-6 list-unstyled card-ingredients-list">
            ${recipe.ingredients.map(ingredient => `
                      <li class="card-ingredients-list-item">
                <span class="card-ingredients-list-item-ingredient">${ingredient.ingredient}</span>
                        <span class="card-ingredients-list-item-quantity">${ingredient.quantity || ''}</span>
                        <span class="card-ingredients-list-item-unit">${ingredient.unit || ''}</span>
              </li>
            `).join('')}
          </ul>
          <p class="card-text col-6 card-description">${recipe.description}</p>
        </div>
      </div>
    </div>
    </div>
  `;
        main.appendChild(article);
    });
}

function addTagAndFilter(ingredient) {
    const tagContainer = document.getElementById('dropdownIngredients');
    const tag = document.createElement('span');
    tag.className = 'ingredient-tag';
    tag.textContent = ingredient;
    tagContainer.appendChild(tag);
}

function ingredientsFilter(recipes) {
    const ingredientSet = new Set();
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredientSet.add(ingredient.ingredient);
        });
    });
    const ingredientFilter = document.getElementById('ingredients-list');
    ingredientFilter.innerHTML = '';
    ingredientSet.forEach(ingredient => {
        const option = document.createElement('option');
        option.value = ingredient;
        option.textContent = ingredient;
        option.addEventListener('click', () => addTagAndFilter(ingredient));
        ingredientFilter.appendChild(option);
    });
}
const searchRecipes= query => {
const searchJson = `./assets/json/recipes.json?query=${encodeURIComponent(query)}`;
fetch(searchJson)
    //const article = document.createElement('div');
    //        article.innerHTML = `
//<script> if (query !== ${recipe.name})</script>
//<p>Il n'y a pas de recette correspondant à votre recherche.</p>`;
    // Je ne comprends pas pourquoi j'ai une erreur de syntaxe ici donc je mets cette ligne en commentaire qui correspond a la phase 3.2

    .then(response => {
        return response.json();
    })
    .then(data => {
        displayRecipes(data);
        ingredientsFilter(data);
    })
    .catch(error => {
        console.error("Error", error);
    });
}


const searchInput = document.getElementById('search');
if (searchInput) {
    searchInput.addEventListener('input', function() {
    const query = this.value;
    if (query.length >= 3) {
        searchRecipes(query);
    } else {
        document.getElementById('results').style.display = 'none';
    }
    if (!query) {
        document.getElementById('results').style.display = 'none';
    }
});
}
