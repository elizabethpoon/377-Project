const favoritesList = document.getElementById("favorites-list");

async function loadFavorites() {
  try {
    const response = await fetch("/api/favorites");
    const facts = await response.json();

    if (!facts.length) {
      favoritesList.innerHTML = "<li>No saved cat facts yet!</li>";
      return;
    }

    favoritesList.innerHTML = ""; // Clear existing list

    facts.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.fact;

      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.classList.add("delete-btn");
      delBtn.addEventListener("click", () => deleteFact(item.id));

      li.appendChild(delBtn);
      favoritesList.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading favorites:", error);
    favoritesList.innerHTML = "<li>Error loading saved facts.</li>";
  }
}

// ✅ Define deleteFact outside the loop
async function deleteFact(id) {
  const confirmed = confirm("Are you sure you want to delete this fact?");
  if (!confirmed) return;

  try {
    const response = await fetch("/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });

    const result = await response.json();
    if (response.ok) {
      alert("Deleted!");
      loadFavorites(); // Refresh the list
    } else {
      alert("Delete failed: " + result.error);
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert("Could not delete fact.");
  }
}

loadFavorites();