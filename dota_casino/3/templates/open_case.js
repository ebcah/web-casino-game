let winners_panel = [];
const itemRoller = document.getElementById("itemRoller");
const openCaseBtn = document.getElementById("openCaseBtn");
const rewardSection = document.getElementById("rewardSection");
const rewardImage = document.getElementById("rewardImage");
const rewardName = document.getElementById("rewardName");
const rewardPrice = document.getElementById("rewardPrice");

let isAnimating = false; // Flag for animation state

// Function to get a random item from they_can_drop
function getRandomItem() {
    const randomNum = Math.random();

    if (randomNum < 0.02) {
        return they_can_drop[0]; // Legendary Item
    } else if (randomNum < 0.22) {
        return they_can_drop[Math.floor(Math.random() * 4) + 1]; // Epic Items
    } else if (randomNum < 0.72) {
        return they_can_drop[Math.floor(Math.random() * 10) + 6]; // Rare Items
    } else {
        return they_can_drop[Math.floor(Math.random() * 10) + 16]; // Common or Worse Items
    }
}

// Function to open the case
function openCase() {
    if (isAnimating) return; // Ignore if animation is ongoing

    isAnimating = true; // Set animation flag
    openCaseBtn.disabled = true;
    rewardSection.style.display = "none"; // Hide initially
    itemRoller.style.transform = "translateX(0)";
    
    itemRoller.innerHTML = ''; // Clear previous items

    let items = []; // Array to hold items for this draw
    for (let i = 0; i < 50; i++) {
        items.push(getRandomItem());
    }

    // Add images of items to the interface
    items.forEach(item => {
        const img = document.createElement("img");
        img.src = item.img;
        img.alt = item.name;
        itemRoller.appendChild(img);
    });

    let offset = 0;
    const maxOffset = (items.length - 3) * 100 - 300 + getRandomNumber(-48, 48);
    const totalDuration = 6000;
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);
        const easing = easeOutExpo(progress);

        offset = maxOffset * easing;
        itemRoller.style.transform = `translateX(-${offset}px)`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            const finalItem = items[items.length - 5]; // Get the final generated item
            rewardImage.src = finalItem.img;
            rewardName.innerText = finalItem.name;
            rewardPrice.innerText = `$${finalItem.price}`;

            console.log("Final item:", finalItem); // Debug log
            rewardSection.style.display = "block"; // Show after setting reward

            // Add item to winners_panel
            winners_panel.push(finalItem);
            displayWinnersPanel();

            openCaseBtn.disabled = false; // Enable button again
            isAnimating = false; // Reset animation state
        }
    }

    requestAnimationFrame(animate);
}

// Function to display the won items in the panel-bar
function displayWinnersPanel() {
    const panels = document.querySelectorAll('.panel-item');
    
    // Clear current images
    panels.forEach(panel => {
        panel.innerHTML = '';
    });

    // Add new images in reverse order
    winners_panel.slice(-panels.length).forEach((item, index) => {
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.name;
        panels[panels.length - 1 - index].appendChild(img); // Add in reverse order
    });
}

// Easing function for animation
function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -30 * t);
}

// Function to generate a random number
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Event handler for the open case button
openCaseBtn.addEventListener("click", openCase);
