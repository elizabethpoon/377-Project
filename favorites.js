const favoritesList = document.getElementById("favorites-list");

async function loadFavorites() {
  try {
    const response = await fetch("/api/favorites");
    const facts = await response.json();

    if (!facts.length) {
      favoritesList.innerHTML = "<li>No saved cat facts yet!</li>";
      return;
    }

    favoritesList.innerHTML = ""; // clear existing content

    facts.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.fact;
      favoritesList.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading favorites:", error);
    favoritesList.innerHTML = "<li>Error loading saved facts.</li>";
  }
}

loadFavorites();