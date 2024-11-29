const foods = [
    '🍕', '🍔', '🍣', '🍝', '🥗', '🌮', '🥩', '🍦', '🥪', '🍜',
    '🍤', '🍰', '🍩', '🍪', '🍉', '🍇', '🍓', '🍊', '🍋', '🍍',
    // Add more emojis to reach 200 as needed
];

const meals = [
    'Spaghetti Bolognese with garlic bread and a side salad',
    'Grilled chicken with roasted vegetables and quinoa',
    'Sushi platter with miso soup and edamame',
    'Burger with fries and a milkshake',
    'Steak with mashed potatoes and green beans',
    'Tacos with rice and beans',
    'Pizza with a Caesar salad',
    'Salmon with asparagus and rice pilaf',
    'Chicken curry with naan and basmati rice',
    'Vegan Buddha bowl with hummus and pita',
    // Add more meal descriptions to reach over 200 options
];

const foodContainer = document.getElementById('floating-food-container');
const foodList = document.getElementById('food-list');
const randomFoodResult = document.getElementById('random-food-result');
const randomFoodButton = document.getElementById('random-food-button');
const scoreDisplay = document.getElementById('score');

let score = 0;

// Store the initial positions of each food
let initialPositions = [];

// Generate random food items floating around
function generateFloatingFood() {
    foodContainer.innerHTML = ''; // Clear existing food
    foods.forEach((food, index) => {
        const foodElement = document.createElement('div');
        foodElement.classList.add('food');
        const left = Math.random() * (window.innerWidth - 50);
        const top = Math.random() * (window.innerHeight - 50);
        foodElement.style.left = left + 'px';
        foodElement.style.top = top + 'px';
        foodElement.textContent = food;

        // Add random animation speed and direction
        const duration = Math.random() * 3 + 2; // Random duration between 2 to 5 seconds
        const direction = Math.random() < 0.5 ? 'normal' : 'reverse'; // Random direction
        foodElement.style.animation = `float ${duration}s ${direction} infinite`;

        initialPositions[index] = { left, top, foodElement };
        foodElement.addEventListener('click', () => {
            addToPlate(food, index);
            showPoints(foodElement);
        });
        foodContainer.appendChild(foodElement);
    });
}

// Show random points
function showPoints(foodElement) {
    const points = Math.random() < 0.8 ? Math.floor(Math.random() * 5) + 1 : -(Math.floor(Math.random() * 2) + 1); // 80% chance for positive points
    const pointElement = document.createElement('div');
    pointElement.classList.add('point-popup');
    pointElement.textContent = points >= 0 ? `+${points}` : `${points}`;
    pointElement.style.left = foodElement.style.left;
    pointElement.style.top = foodElement.style.top;
    pointElement.style.color = points >= 0 ? 'green' : 'red';

    document.body.appendChild(pointElement);

    // Update score
    score += points;
    scoreDisplay.textContent = `Score: ${score}`;

    // Check for image display
    if (score >= 10) {
        displayImage();
    }

    // Remove the point element after animation
    setTimeout(() => {
        pointElement.remove();
    }, 1000);

const scoreDisplay = document.getElementById('score');
let score = 0;

// Example function to update score
function updateScore(points) {
    score += points;
    scoreDisplay.textContent = `Score: ${score}`;
}

// Trigger this function whenever you want to update the score
}

// Add clicked food to the plate in random positions
function addToPlate(food, index) {
    const li = document.createElement('li');
    li.textContent = food;
    li.style.position = 'absolute';
    li.style.fontSize = '2em';

    // Randomly position within the plate
    const maxLeft = 200; // Max width of the plate minus some padding
    const maxTop = 200; // Max height of the plate minus some padding
    li.style.left = Math.random() * maxLeft + 'px';
    li.style.top = Math.random() * maxTop + 'px';

    li.addEventListener('click', () => removeFromPlate(index, li));
    foodList.appendChild(li);

    // Remove the food from its floating position
    initialPositions[index].foodElement.style.display = 'none';
}

// Remove food from the plate and return it to its original position
function removeFromPlate(index, li) {
    li.remove();
    const { left, top, foodElement } = initialPositions[index];
    foodElement.style.display = 'block';
    foodElement.style.left = left + 'px';
    foodElement.style.top = top + 'px';
}

// Random meal selector for dinner
randomFoodButton.addEventListener('click', () => {
    const randomMeal = meals[Math.floor(Math.random() * meals.length)];
    randomFoodResult.textContent = `For dinner tonight, the universe wants you to eat ${randomMeal}. You're welcome!`;
});

// Initialize the floating food items
generateFloatingFood();

// Ensure floating foods are generated upon resizing the window
window.addEventListener('resize', generateFloatingFood);

// Function to display an image when score reaches 10
function displayImage() {
    const image = document.createElement('img');
    image.src = 'path/to/your/congrats-image.jpg'; // Replace with your image path
    image.style.position = 'absolute';
    image.style.top = '50%';
    image.style.left = '50%';
    image.style.transform = 'translate(-50%, -50%)';
    image.style.zIndex = '1000';
    document.body.appendChild(image);

    // Remove image after a few seconds
    setTimeout(() => {
        image.remove();
    }, 5000);
}