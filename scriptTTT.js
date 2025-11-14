// ========== GLOBALS ========== //

const world = {}; // World tile storage
const infoBar = document.getElementById("info-bar");
const goldBox = document.getElementById("gold-box");

let viewX = 0, viewY = 0;
let targetViewX = 0, targetViewY = 0;
const tileSize = 256;

let wheatPerSecond = 1;
let woodPerSecond = 0;
let stonePerSecond = 0;
let goldPerSecond = 0;

let zoomLevel = 1; // 1 = 100%, 0.5 = 50%, 2 = 200%

const gameState = {
  resources: {
    wheat: 100,
    wood: 0,
    stone: 0,
    gold: 0
  }
};

// ========== MOUSE CONTROLS ========== //

// Disable right-click context menu
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

let isDragging = false;
let dragStartX = 0, dragStartY = 0;
let dragStartViewX = 0, dragStartViewY = 0;

document.addEventListener("mousedown", (e) => {
  if (e.button === 2) {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragStartViewX = targetViewX;
    dragStartViewY = targetViewY;
    document.body.classList.add("dragging");
  }
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const dx = e.clientX - dragStartX;
  const dy = e.clientY - dragStartY;

  targetViewX = dragStartViewX - dx / tileSize;
  targetViewY = dragStartViewY - dy / tileSize;
});

document.addEventListener("mouseup", (e) => {
  if (e.button === 2) {
    isDragging = false;
    document.body.classList.remove("dragging");
  }
});

document.addEventListener("wheel", (e) => {
	const zoomSpeed = 0.1
	
	// Prevent page from scrolling
	e.preventDefault();
	
	if (e.deltaY < 0) {
		zoomLevel += zoomSpeed;
	} else {
		zoomLevel -= zoomSpeed;
	}
	
	// Clamp zoom level
	zoomLevel = Math.max(0.25, Math.min(2.5, zoomLevel));
	
	updateMapView();
}, { passive: false}); // Passive false required to call e.preventDefault()

// ========== KEYBOARD MOVEMENT ========== //

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
    case "ArrowUp":
      targetViewY -= 0.5;
      break;
    case "s":
    case "ArrowDown":
      targetViewY += 0.5;
      break;
    case "a":
    case "ArrowLeft":
      targetViewX -= 0.5;
      break;
    case "d":
    case "ArrowRight":
      targetViewX += 0.5;
      break;
    default:
      return;
  }
  updateMapView();
});

// ========== MAP TRANSFORM ========== //

function updateMapView() {
  const map = document.getElementById("map");
  const infoBarHeight = infoBar.offsetHeight || 0;
  
  const offsetX = -viewX * tileSize + window.innerWidth / 2 - tileSize / 2;
  const offsetY = -viewY * tileSize + (window.innerHeight - infoBarHeight) / 2 - tileSize / 2;

  map.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoomLevel})`;
}

function animate() {
  const speed = 0.1;

  viewX += (targetViewX - viewX) * speed;
  viewY += (targetViewY - viewY) * speed;

  if (Math.abs(viewX - targetViewX) < 0.01) viewX = targetViewX;
  if (Math.abs(viewY - targetViewY) < 0.01) viewY = targetViewY;

  updateMapView();
  requestAnimationFrame(animate);
}

// ========== TILE GENERATION ========== //

function drawTile(x, y) {
  const map = document.getElementById("map");
  const tile = document.createElement("div");
  tile.classList.add("tile");

  tile.style.left = `${x * tileSize}px`;
  tile.style.top = `${y * tileSize}px`;

  tile.dataset.x = x;
  tile.dataset.y = y;

  tile.addEventListener("click", () => {
    tile.classList.add("owned");
    console.log(`Tile at ${x},${y} claimed.`);
    world[`${x},${y}`].owner = "player";
  });

  map.appendChild(tile);
}

// ========== RESOURCE UI ========== //

function createResourceCounter(id, parent) {
  const counter = document.createElement("div");
  counter.id = id;
  counter.classList.add("resource-counter");
  parent.appendChild(counter);
  return counter;
}

const wheatCounter = createResourceCounter("wheat-counter", infoBar);
const woodCounter = createResourceCounter("wood-counter", infoBar);
const stoneCounter = createResourceCounter("stone-counter", infoBar);
const goldCounter = createResourceCounter("gold-counter", goldBox);

function updateResourceDisplay() {
  wheatCounter.textContent = `Wheat: ${gameState.resources.wheat}`;
  woodCounter.textContent = `Wood: ${gameState.resources.wood}`;
  stoneCounter.textContent = `Stone: ${gameState.resources.stone}`;
  goldCounter.textContent = `Gold: ${gameState.resources.gold}`;
}

// ========== RESOURCE LOGIC ========== //

setInterval(() => {
  growResources();
  updateResourceDisplay();
}, 1000);

function growResources() {
  gameState.resources.wheat += wheatPerSecond;
  gameState.resources.wood += woodPerSecond;
  gameState.resources.stone += stonePerSecond;
  gameState.resources.gold += goldPerSecond;
}

// ========== PURCHASES ========== //

function createPurchaseButton(label, onClick) {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.addEventListener("click", onClick);
  goldBox.appendChild(btn);
  return btn;
}

createPurchaseButton("Buy Wheat", buyWheat);
createPurchaseButton("Buy Wood", buyWood);
createPurchaseButton("Buy Tile", buyTile);

function buyWheat() {
  if (gameState.resources.gold >= 1) {
    gameState.resources.gold -= 1;
    gameState.resources.wheat += 50;
  } else {
    console.log("Not enough Gold!");
  }
}

function buyWood() {
  if (gameState.resources.gold >= 1) {
    gameState.resources.gold -= 1;
    gameState.resources.wood += 20;
  } else {
    console.log("Not enough Gold!");
  }
}

function buyTile() {
  console.log("Tile purchase logic goes here...");
}

// ========== INIT ========== //

world["0,0"] = { owner: null };
drawTile(0, 0);
animate();
updateResourceDisplay();
