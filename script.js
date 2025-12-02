// Load the JSON file and display the reviews
fetch("reviews.json")
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("reviewsContainer");

        data.forEach(item => {
            const reviewDiv = document.createElement("div");
            reviewDiv.className = "review";

            reviewDiv.innerHTML = `
                <div class="game-title">${item.game}</div>
                <div>⭐ Rating: ${item.rating}</div>
                <p>${item.review}</p>
            `;

            container.appendChild(reviewDiv);
        });
    })
    .catch(error => {
        console.error("Error loading JSON:", error);
    });
