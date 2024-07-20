function encodeHTML(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;');
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + '...';
}

document.addEventListener('DOMContentLoaded', async () => {
    const category = new URLSearchParams(window.location.search).get('category');
    if (category) {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?type=${category}&apiKey=a4abe88d167d459aa77f3cf0976454ab&addRecipeInformation=true`);
            const data = await response.json();
            displayCategoryRecipes(category, data.results);
        } catch (error) {
            console.error('Error fetching category recipes:', error);
            document.getElementById('category-title').textContent = 'Error loading category recipes';
        }
    } else {
        document.getElementById('category-title').textContent = 'Category not found';
    }
});

function displayCategoryRecipes(category, recipes) {
    document.getElementById('category-title').textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Recipes`;
    const categoryCardsContainer = document.getElementById('category-cards');
    categoryCardsContainer.innerHTML = ''; // Clear existing content

    recipes.forEach(recipe => {
        const sanitizedTitle = encodeHTML(recipe.title);
        const truncatedSummary = truncateText(recipe.summary || 'No description available', 200); // Adjust character limit as needed

        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <h3>${sanitizedTitle}</h3>
            <p>${truncatedSummary}</p>
            <a href="recipe.html?id=${recipe.id}">View Recipe</a>
        `;
        categoryCardsContainer.appendChild(recipeCard);
    });
}