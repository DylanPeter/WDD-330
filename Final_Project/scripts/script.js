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
function renderSearchResults(results) {
    const searchCardsContainer = document.getElementById('search-cards');
    searchCardsContainer.innerHTML = ''; // Clear existing content

    results.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';

        
        const sanitizedTitle = encodeHTML(recipe.title);
        const truncatedSummary = truncateText(recipe.summary || 'No description available', 1000); // Adjust character limit as needed


        recipeCard.innerHTML = `
            <h3>${sanitizedTitle}</h3>
            <p>${truncatedSummary}</p>
            <a href="recipe.html?id=${recipe.id}">View Recipe</a>
            <button data-id="${recipe.id}" data-title="${sanitizedTitle}" data-summary="${encodeHTML(recipe.summary || 'No description available')}" class="favorite-button">Add to Favorites</button>
        `;
        
        searchCardsContainer.appendChild(recipeCard);
    });

    // Add event listeners to all favorite buttons
    document.querySelectorAll('.favorite-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id');
            const title = event.target.getAttribute('data-title');
            const summary = event.target.getAttribute('data-summary');
            addToFavorites(id, title, summary);
        });
    });
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

document.addEventListener('DOMContentLoaded', () => {
    const featuredRecipes = [
        { id: 1, name: 'Fried Anchovies with Sage', description: 'A classic Italian pasta dish...', link: 'recipe.html?id=1' },
        { id: 2, name: 'Chicken Curry', description: 'A spicy and flavorful curry...', link: 'recipe.html?id=2' },
        { id: 3, name: 'Chocolate Cake', description: 'A rich and moist chocolate cake...', link: 'recipe.html?id=3' },
    ];

    function renderFeaturedRecipes(recipes) {
        const recipeCardsContainer = document.getElementById('recipe-cards');
        recipeCardsContainer.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.innerHTML = `
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
                <a href="${recipe.link}">View Recipe</a>
            `;
            recipeCardsContainer.appendChild(recipeCard);
        });
    }

    renderFeaturedRecipes(featuredRecipes);

    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const query = document.getElementById('search-input').value;
        if (query) {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=a4abe88d167d459aa77f3cf0976454ab&addRecipeInformation=true`);
                const data = await response.json();
                console.log('Search results:', data.results);
                renderSearchResults(data.results);
                document.getElementById('search-results').style.display = 'block';
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        }
    });
});

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

function getRandomRecipes(recipes, count) {
    const shuffled = recipes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

async function fetchRecipes() {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=a4abe88d167d459aa77f3cf0976454ab`);
        const data = await response.json();
        return data.recipes;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
}

async function displayFeaturedRecipes() {
    const recipes = await fetchRecipes();
    const featuredRecipes = getRandomRecipes(recipes, 8); // Change number of featured recipes as needed

    const featuredCardsContainer = document.getElementById('recipe-cards');
    featuredCardsContainer.innerHTML = ''; // Clear existing content

    featuredRecipes.forEach(recipe => {
        const sanitizedTitle = encodeHTML(recipe.title);
        const truncatedSummary = truncateText(recipe.summary || 'No description available', 200); // Adjust character limit as needed

        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <h3>${sanitizedTitle}</h3>
            <p>${truncatedSummary}</p>
            <a href="recipe.html?id=${recipe.id}">View Recipe</a>
        `;
        featuredCardsContainer.appendChild(recipeCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedRecipes();
});

function displayCategoryRecipes(category, recipes) {
    document.getElementById('category-title').textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Recipes`;
    const categoryCardsContainer = document.getElementById('category-cards');
    categoryCardsContainer.innerHTML = ''; // Clear existing content
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <div class="recipe-info">
                <h3>${recipe.title}</h3>
                <p>${recipe.summary || 'No description available'}</p>
                <a href="recipe.html?id=${recipe.id}">View Recipe</a>
            </div>
            <img src="${recipe.image}" alt="${recipe.title}">
        `;
        categoryCardsContainer.appendChild(recipeCard);
    });
}