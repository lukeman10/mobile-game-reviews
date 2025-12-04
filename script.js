let allReviews = [];

// Load the JSON file and display the reviews
fetch("reviews.json")
    .then(response => response.json())
    .then(data => {
        allReviews = data;
        displayReviews(allReviews);
    })
    .catch(error => {
        console.error("Error loading JSON:", error);
    });

function displayReviews(reviews) {
    const container = document.getElementById("reviewsContainer");
    container.innerHTML = "";

    reviews.forEach(item => {
        const reviewDiv = document.createElement("div");
        reviewDiv.className = "review";

        reviewDiv.innerHTML = `
            <div class="game-title">${item.game}</div>
            <div>⭐ Rating: ${item.rating}</div>
            <p>${item.review}</p>
            <div class="game-title">Pros</div>
            <p>${item.pros}</p>
            <div class="game-title">Cons</div>
            <p>${item.cons}</p>
        `;

        container.appendChild(reviewDiv);
    });
}

// ⭐ Keyword Search
document.getElementById("searchInput").addEventListener("input", function () {
    const keyword = this.value.toLowerCase();

    const filtered = allReviews.filter(item =>
        item.game.toLowerCase().includes(keyword) ||
        item.review.toLowerCase().includes(keyword) ||
        item.pros.toLowerCase().includes(keyword) ||
        item.cons.toLowerCase().includes(keyword)
    );

    displayReviews(filtered);
});
