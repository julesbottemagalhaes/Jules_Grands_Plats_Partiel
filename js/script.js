try {
    const response = await fetch("recipes.json");
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayRecipes(data);
} catch (error) {
    console.error("Failed to fetch recipes:", error);
}
// Je n'arrive pas a load le .json même en le changeant de place et en changeant le path
function displayRecipes(d) {
    const main = document.querySelector("#recipes-list .row");
    main.innerHTML = '';
    d.slice(0, 50).forEach((recipe, index) => {
        const article = document.createElement('div');
        article.className = 'col';
        article.id = index + 1;
        article.innerHTML = `
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
                <span class="card-ingredients-list-item-ingredient">${ingredient.name}</span>
                <span class="card-ingredients-list-item-quantity">${ingredient.quantity}</span>
                <span class="card-ingredients-list-item-unit">${ingredient.unit}</span>
              </li>
            `).join('')}
          </ul>
          <p class="card-text col-6 card-description">${recipe.description}</p>
        </div>
      </div>
    </div>
  `;
        main.appendChild(article);
    });
}
const searchRecipes= query => {
const searchJson = `recipes.json?query=${encodeURIComponent(query)}`;
fetch(searchJson)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        displayRecipes(data);
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