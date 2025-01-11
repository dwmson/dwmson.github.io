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


// Open Rating Modal
function openRatingModal() {
    document.getElementById("ratingModal").style.display = "flex";
}

// Close Rating Modal
function closeRatingModal() {
    document.getElementById("ratingModal").style.display = "none";
}

// Store Ratings in Local Storage
let ratings = JSON.parse(localStorage.getItem("recipeRatings")) || [];
updateAverageRating();

// Rate Recipe Function
function rateRecipe(stars) {
    ratings.push(stars);
    localStorage.setItem("recipeRatings", JSON.stringify(ratings));
    
    document.getElementById("ratingMessage").innerText = `You rated this recipe ${stars} stars! ⭐`;
    
    updateAverageRating();
}

// Update Average Rating
function updateAverageRating() {
    if (ratings.length === 0) return;

    let sum = ratings.reduce((total, num) => total + num, 0);
    let average = (sum / ratings.length).toFixed(1); // Round to 1 decimal place

    document.getElementById("average-rating").innerText = average;
    document.getElementById("rating-count").innerText = ratings.length;

    // Update Star Display
    let stars = "★★★★★☆☆☆☆☆".substring(5 - Math.round(average), 10 - Math.round(average));
    document.getElementById("display-stars").innerText = stars;
}

