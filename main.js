const factText = document.getElementById("fact-text");
const nextBtn = document.getElementById("next-btn");
const saveBtn = document.getElementById("save-btn");
const shareBtn = document.getElementById("share-btn");

let currentFact = "";

async function getCatFact() {
  try {
    const response = await fetch("https://catfact.ninja/fact");
    const data = await response.json();
    currentFact = data.fact;
    factText.textContent = currentFact;
  } catch (error) {
    factText.textContent = "Could not load cat fact.";
    console.error("Fetch error:", error);
  }
}

async function saveFact() {
  try {
    const response = await fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ fact: currentFact })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Fact saved to Supabase!");
    } else {
      console.error("Save failed:", data);
      alert("Error saving fact.");
    }
  } catch (error) {
    console.error("Save error:", error);
    alert("Save failed. Check backend.");
  }
}