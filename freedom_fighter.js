const pics = document.getElementById("pics");
const images = document.querySelectorAll("#pics img");
const favorites = document.getElementById("favorites");
const actions = document.getElementById("actions");

let counterDisplay = document.createElement("p");
favorites.appendChild(counterDisplay);

let selectedCount = 0;
let totalImages = images.length;

let originalOrder = Array.from(images);

updateCounter();

images.forEach((img, index) => {
    img.addEventListener("click", function () {

        if (img.classList.contains("selected")) return;

        favorites.appendChild(img);

        img.classList.add("selected");
        img.style.border = "3px solid green";

        selectedCount++;

        addAction(`Moved ${img.src} to favorites`);

        alert(`Image ${index + 1} selected as favorite number ${selectedCount}`);

        if (selectedCount === totalImages) {
            alert("All images have been selected!");
        }

        updateCounter();
    });

    img.title = img.alt;
});

favorites.addEventListener("click", function (e) {

    if (e.target.tagName === "IMG") {
        let img = e.target;

        if (!img.classList.contains("selected")) return;

        img.classList.remove("selected");
        img.style.border = "";

        selectedCount--;

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

function addAction(text) {
    let li = document.createElement("li");
    li.textContent = text;
    actions.appendChild(li);
}

function updateCounter() {
    counterDisplay.textContent = `Remaining images: ${totalImages - selectedCount}`;
}