const pics = document.getElementById("pics");
const images = document.querySelectorAll("#pics img");
const favorites = document.getElementById("favorites");
const actions = document.getElementById("actions");

// Counter display (on va le créer dynamiquement)
let counterDisplay = document.createElement("p");
favorites.appendChild(counterDisplay);

let selectedCount = 0;
let totalImages = images.length;

// Sauvegarde ordre original
let originalOrder = Array.from(images);

// Initial counter
updateCounter();

// CLICK sur images (dans pics)
images.forEach((img, index) => {
    img.addEventListener("click", function () {

        // Empêcher double clic
        if (img.classList.contains("selected")) return;

        // Déplacer vers favorites
        favorites.appendChild(img);

        img.classList.add("selected");
        img.style.border = "3px solid green";

        selectedCount++;

        // Log action
        addAction(`Moved ${img.src} to favorites`);

        // Message utilisateur
        alert(`Image ${index + 1} selected as favorite number ${selectedCount}`);

        if (selectedCount === totalImages) {
            alert("All images have been selected!");
        }

        updateCounter();
    });

    // Tooltip
    img.title = img.alt;
});


// REVERT (cliquer sur image dans favorites)
favorites.addEventListener("click", function (e) {

    if (e.target.tagName === "IMG") {
        let img = e.target;

        if (!img.classList.contains("selected")) return;

        img.classList.remove("selected");
        img.style.border = "";

        selectedCount--;

        // Remettre à la bonne position
        let originalIndex = originalOrder.indexOf(img);

        if (originalIndex >= pics.children.length) {
            pics.appendChild(img);
        } else {
            pics.insertBefore(img, pics.children[originalIndex]);
        }

        addAction(`Reverted ${img.src} back to the main list`);

        updateCounter();
    }
});


// Ajouter action dans la liste
function addAction(text) {
    let li = document.createElement("li");
    li.textContent = text;
    actions.appendChild(li);
}


// Mettre à jour compteur
function updateCounter() {
    counterDisplay.textContent = `Remaining images: ${totalImages - selectedCount}`;
}