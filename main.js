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

// Save current fact to Supabase through your backend
async function saveFact() {
  try {
    const data = await response.json()

    if (response.ok) {
      alert("Fact saved to Supabase!");
    } else {
      const err = await response.json();
      console.error("Save failed:", err);
      alert("Error saving fact.");
    }
  } catch (error) {
    console.error("Save error:", error);
    alert("Save failed. Check backend.");
  }
}

function shareFact() {
  if (navigator.share) {
    navigator.share({
      title: "Cat Fact 🐱",
      text: currentFact,
      url: window.location.href,
    });
  } else {
    navigator.clipboard.writeText(currentFact);
    alert("Copied to clipboard!");
  }
}

nextBtn.addEventListener("click", getCatFact);
saveBtn.addEventListener("click", saveFact);
shareBtn.addEventListener("click", shareFact);

getCatFact(); 