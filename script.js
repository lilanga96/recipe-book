import { data } from "./data.js";

const div = document.querySelector('.container');
const modal = document.getElementById('recipeModal');
const searchInput = document.querySelector('#searchInput');
// At the beginning of the script.js file
const addRecipeForm = document.getElementById('addRecipeForm');
const addRecipeBtn = document.getElementById('addRecipeBtn');
const recipeForm = document.getElementById('recipeForm');
const recipeModal = document.getElementById('recipeModal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close');

addRecipeBtn.addEventListener('click', () => {
    addRecipeForm.style.display = 'block';
});

// Existing code...

window.closeAddRecipeModal = function() {
    addRecipeForm.style.display = 'none';
}

// Existing code...


recipeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const recipeName = document.getElementById('recipeName').value;
    const recipeImage = document.getElementById('recipeImage').value;
    const recipeType = document.getElementById('recipeType').value;
    const recipeInstructions = document.getElementById('recipeText').value;

    if (recipeName && recipeImage && recipeType && recipeInstructions) {
        const newRecipe = {
            name: recipeName,
            image: recipeImage,
            recipe: recipeInstructions,
            type: recipeType
        };

        recipes.push(newRecipe); // Add the new recipe to the recipes array
        renderNewRecipe(newRecipe); // Render the new recipe on the page
        closeModal();
        closeAddRecipeModal();
        recipeForm.reset();
    } else {
        alert('Please fill out all fields.');
    }
});

window.toggleNewRecipe = function(index, type) {
    const recipeText = document.querySelector(`.${type}RecipeText${index}`);
    const button = document.querySelector(`.${type}RecipeBtn${index}`);
    const modalContent = document.getElementById('modalContent');
    const dishName = document.querySelector(`.${type}RecipeName`);

    if (recipeText.style.display === 'none') {
        modalContent.innerHTML = `<h3>${dishName.textContent}</h3>${recipeText.innerHTML}`;
        modal.style.display = 'block';
    } else {
        closeModal();
        button.textContent = 'Show Recipe';
    }
}

function renderNewRecipe(recipe, type) {
    const recipeElement = document.createElement('div');
    recipeElement.innerHTML = `
        <div class="card">
          <img src="../images/${recipe.image}"alt="${recipe.name}" class="card-image">
          
            <h3 class="${recipe.type}RecipeName">${recipe.name}</h3>
            <div class="${recipe.type}RecipeText${recipes.length}" style="display: none;">
                <p class="rsp">${recipe.recipe}</p>
            </div>
            <button class="${recipe.type}RecipeBtn${recipes.length}" onclick="toggleNewRecipe(${recipes.length}, '${recipe.type}')">Show Recipe</button>
        </div>
    `;
    div.appendChild(recipeElement);

    const newRecipeInfo = {
        name: recipe.name,
        element: recipeElement,
        type: recipe.type
    };

    recipes.push(newRecipeInfo);
}



let recipes = [];

searchInput.addEventListener('input', function (e) {
    const value = e.target.value.toLowerCase();
    recipes.forEach(recipe => {
        if (recipe.element) {
            const isVisible = recipe.name.toLowerCase().includes(value);
            recipe.element.style.display = isVisible ? 'block' : 'none';
        }
    });
});

const recipeFilter = document.getElementById('recipeFilter');

recipeFilter.addEventListener('change', function () {
    const selectedType = recipeFilter.value;

    recipes.forEach((recipe) => {
        const isVisible = selectedType === 'all' || recipe.type === selectedType;
        if (recipe.element) {
            recipe.element.style.display = isVisible ? 'block' : 'none';
        }
    });
});

data.burgers.forEach(recipe => {
    recipes.push({ ...recipe, type: 'burger' });
});

data.meat.forEach(recipe => {
    recipes.push({ ...recipe, type: 'meat' });
});

data.salads.forEach(recipe => {
    recipes.push({ ...recipe, type: 'salad' });
});

data.desserts.forEach(recipe => {
    recipes.push({ ...recipe, type: 'dessert' });
});
data.pasta.forEach(recipe => {
    recipes.push({ ...recipe, type: 'pasta' });
});

data.seaFood.forEach(recipe => {
    recipes.push({ ...recipe, type: 'seaFood' });
});

data.drinks.forEach(recipe => {
    recipes.push({ ...recipe, type: 'drink' });
});


function renderCards(foodArray, type) {
    foodArray.forEach(({ name, image, recipe }, index) => {
        let info = document.createElement('div');
        info.innerHTML = `<div class="card">
            ${image} <h3 class="${type}RecipeName">${name}</h3>
            <div class="${type}RecipeText${index}" style="display: none;">
                <p class="rsp">${recipe}</p>
            </div>
            <button class="${type}RecipeBtn${index}" onclick="toggleRecipe(${index}, '${type}')">Show Recipe</button>
        </div>`;
        div.append(info);

        const recipeInfo = {
            name,
            element: info,
            type
        };

        recipes.push(recipeInfo);
    });
}


renderCards(data.burgers, 'burger');
renderCards(data.meat, 'meat');
renderCards(data.salads, 'salad');
renderCards(data.desserts, 'dessert'); 
renderCards(data.pasta, 'pasta');
renderCards(data.drinks, 'drink');
renderCards(data.seaFood, 'seaFood');

window.closeModal = function () {
    modal.style.display = 'none';
}

window.toggleRecipe = function (index, type) {
    const recipeText = document.querySelector(`.${type}RecipeText${index}`);
    const button = document.querySelector(`.${type}RecipeBtn${index}`);
    const modalContent = document.getElementById('modalContent');
    const dishName = document.querySelector(`.${type}RecipeName`);

    if (recipeText.style.display === 'none') {
        modalContent.innerHTML = `<h3>${dishName.textContent}</h3>${recipeText.innerHTML}`;
        modal.style.display = 'block';
    } else {
        closeModal();
        button.textContent = 'Show Recipe';
    }
};
