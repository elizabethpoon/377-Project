const favoritesList = document.getElementById("favorites-list");

// Load facts from your Supabase-backed API
async function loadFavorites() {
  try {
    const response = await fetch("http://localhost:3000/api/favorites");
    const facts = await response.json();

    if (!facts.length) {
      favoritesList.innerHTML = "<li>No saved cat facts yet!</li>";
      return;
    }

    favoritesList.innerHTML = "";
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