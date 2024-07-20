document.addEventListener('DOMContentLoaded', () => {
    const mealPlanContainer = document.getElementById('meal-plan-container');

    // Load meal plan from localStorage
    let mealPlan = JSON.parse(localStorage.getItem('mealPlan')) || [];

    // Function to display the meal plan
    function displayMealPlan() {
        mealPlanContainer.innerHTML = ''; // Clear existing content
        mealPlan.forEach((meal, index) => {
            const mealCard = document.createElement('div');
            mealCard.className = 'meal-card';
            mealCard.innerHTML = `
                <h3>${meal.name}</h3>
                <p>${meal.description}</p>
                <button onclick="removeMeal(${index})">Remove</button>
            `;
            mealPlanContainer.appendChild(mealCard);
        });
    }

    // Function to remove a meal
    window.removeMeal = function(index) {
        mealPlan.splice(index, 1);
        localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
        displayMealPlan();
    }

    // Initial display of meal plan
    displayMealPlan();
});