document.addEventListener('DOMContentLoaded', async () => {
    const recipeId = new URLSearchParams(window.location.search).get('id');
    if (recipeId) {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=a4abe88d167d459aa77f3cf0976454ab`);
            const recipe = await response.json();
            displayRecipeDetails(recipe);
        } catch (error) {
            console.error('Error fetching recipe details:', error);
            document.getElementById('recipe-title').textContent = 'Error loading recipe';
        }
    } else {
        document.getElementById('recipe-title').textContent = 'Recipe not found';
    }
});

function displayRecipeDetails(recipe) {
    document.getElementById('recipe-title').textContent = recipe.title;
    
    const addToMealPlanButton = document.getElementById('add-to-meal-plan');
    addToMealPlanButton.addEventListener('click', () => {
        addToMealPlan(recipe.id, recipe.title, recipe.summary || 'No description available');
    });
    const recipeContent = document.getElementById('recipe-content');
    recipeContent.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" style="max-width: 100%; height: auto;">
        <h3>Ingredients</h3>
        <ul>
            ${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
        </ul>
        <h3>Instructions</h3>
        <p>${recipe.instructions}</p>
        <h3>Summary</h3>
        <p>${recipe.summary}</p>
        <button id="favorite-button">Add to Favorites</button>
    `;
    document.getElementById('favorite-button').addEventListener('click', () => addToFavorites(recipe.id, recipe.title, recipe.summary));
    
}
function addToMealPlan(id, title, description) {
    let mealPlan = JSON.parse(localStorage.getItem('mealPlan')) || [];
    mealPlan.push({ id, name: title, description });
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
    alert(`${title} has been added to your meal plan.`);
}
function addToFavorites(id, title, summary) {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newFavorite = { id, title, summary };
    if (!favoriteRecipes.some(recipe => recipe.id === id)) {
        favoriteRecipes.push(newFavorite);
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        alert(`${title} has been added to your favorites!`);
    } else {
        alert(`${title} is already in your favorites!`);
    }
}