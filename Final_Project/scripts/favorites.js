document.addEventListener('DOMContentLoaded', () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favoriteRecipes.length > 0) {
        displayFavoriteRecipes(favoriteRecipes);
    } else {
        document.getElementById('favorite-recipes').innerHTML = '<p>No favorite recipes found.</p>';
    }
});

function displayFavoriteRecipes(recipes) {
    const favoriteCardsContainer = document.getElementById('favorite-cards');
    favoriteCardsContainer.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <h3>${recipe.title}</h3>
            <p>${recipe.summary || 'No description available'}</p>
            <a href="recipe.html?id=${recipe.id}">View Recipe</a>
        `;
        favoriteCardsContainer.appendChild(recipeCard);
    });
}


function renderFavorites() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const favoritesContainer = document.getElementById('favorite-cards');
    favoritesContainer.innerHTML = '';
    
    if (favoriteRecipes.length === 0) {
        favoritesContainer.innerHTML = '<p>You have no favorite recipes.</p>';
        return;
    }
    
    favoriteRecipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
        <h3>${recipe.title}</h3>
        <p>${recipe.summary}</p>
        <a href="recipe.html?id=${recipe.id}">View Recipe</a>
        <button onclick="removeFromFavorites(${recipe.id})">Remove from Favorites</button>
        `;
        favoritesContainer.appendChild(recipeCard);
    });
}
function removeFromFavorites(id) {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    favoriteRecipes = favoriteRecipes.filter(recipe => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    renderFavorites();
}

document.addEventListener('DOMContentLoaded', () => {
    renderFavorites();
});