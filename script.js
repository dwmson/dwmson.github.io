// Smooth scroll to the recipe section
function jumpToRecipe() {
    document.getElementById("ingredients").scrollIntoView({ behavior: "smooth" });
}

// Open Share Modal
function openShareModal() {
    document.getElementById("shareModal").style.display = "flex";
    document.getElementById("shareLink").value = window.location.href; // Set the link
}

// Close Share Modal
function closeShareModal() {
    document.getElementById("shareModal").style.display = "none";
}

// Copy Link to Clipboard
function copyShareLink() {
    let shareInput = document.getElementById("shareLink");
    shareInput.select();
    document.execCommand("copy");

    // Show confirmation message
    let message = document.getElementById("copyMessage");
    message.innerText = "Link copied to clipboard!";
    setTimeout(() => { message.innerText = ""; }, 2000);
}


// Declare 'ratings' globally only once
let ratings = JSON.parse(localStorage.getItem("recipeRatings")) || [];
let selectedRating = 0; // Store the selected rating

updateAverageRating(); // Ensure the rating updates on page load

// Open Rating Modal
function openRatingModal() {
    document.getElementById("ratingModal").style.display = "flex";
}

// Close Rating Modal
function closeRatingModal() {
    document.getElementById("ratingModal").style.display = "none";
}

// Select all stars
const stars = document.querySelectorAll(".stars span");

// Light up stars progressively on hover (Left to Right) via JS
stars.forEach((star, index) => {

    // HOVER IN
    star.addEventListener("mouseover", () => {
        highlightStars(index); 
        // highlightStars(index) = highlight from leftmost star up to 'index'
    });

    // HOVER OUT
    star.addEventListener("mouseout", () => {
        if (selectedRating === 0) {
            resetStars(); // Reset only if no selection has been made
        }
    });

    // CLICK = select rating
    star.addEventListener("click", () => {
        // Instead of index + 1, read the star's data-value
        selectedRating = parseInt(star.dataset.value, 10);
        
        rateRecipe(selectedRating);
        updateSelectedStars();
    });
});

// Highlight stars from 0 to 'index' on hover
function highlightStars(index) {
    resetStars();
    for (let i = 0; i <= index; i++) {
        stars[i].classList.add("hovered");
    }
}

// Remove all hover/selected classes
function resetStars() {
    stars.forEach(star => {
        star.classList.remove("hovered", "selected");
    });
    updateSelectedStars(); // Re-apply the selected stars
}

// Keep selected stars highlighted after click
function updateSelectedStars() {
    for (let i = 0; i < selectedRating; i++) {
        stars[i].classList.add("selected");
    }
}

// Store & update ratings in localStorage, and UI
function rateRecipe(starsCount) {
    ratings.push(starsCount);
    localStorage.setItem("recipeRatings", JSON.stringify(ratings));

    document.getElementById("ratingMessage").innerText = 
        `You rated this recipe ${starsCount} stars! ⭐`;

    updateAverageRating();
}

// Calculate and display average rating
function updateAverageRating() {
    if (ratings.length === 0) return;

    let sum = ratings.reduce((total, num) => total + num, 0);
    let average = (sum / ratings.length).toFixed(1);

    document.getElementById("average-rating").innerText = average;
    document.getElementById("rating-count").innerText = ratings.length;

    // Update Star Display
    let starsDisplay = "★★★★★☆☆☆☆☆".substring(
      5 - Math.round(average), 
      10 - Math.round(average)
    );
    document.getElementById("display-stars").innerText = starsDisplay;
}



