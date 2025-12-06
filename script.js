let allReviews = [];

// Load saved dark mode preference
if (localStorage.getItem("darkmode") === "on") {
    document.body.classList.add("dark-mode");
}

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
// ⭐ Keyword Search (with darkmode bypass)
document.getElementById("searchInput").addEventListener("input", function () {
    const keyword = this.value.toLowerCase();

    // If user is typing the secret code, do NOT filter reviews
    if (keyword === "darkmode") {
        displayReviews(allReviews);
        return;
    }
    else if (keyword === "lightmode") {
        displayReviews(allReviews);
        return;
    }

    const filtered = allReviews.filter(item =>
        item.game.toLowerCase().includes(keyword) ||
        item.review.toLowerCase().includes(keyword) ||
        item.pros.toLowerCase().includes(keyword) ||
        item.cons.toLowerCase().includes(keyword)
    );

    displayReviews(filtered);
});


// Secret Mode Triggers (darkmode + lightmode)
document.getElementById("searchInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const code = this.value.toLowerCase().trim();

        if (code === "darkmode") {
            document.body.classList.add("dark-mode");
            localStorage.setItem("darkmode", "on");
            this.value = "";
            displayReviews(allReviews);
        }

        if (code === "lightmode") {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("darkmode", "off");
            this.value = "";
            displayReviews(allReviews);
        }
    }
});

