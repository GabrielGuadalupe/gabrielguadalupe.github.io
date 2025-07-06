const sugarImage = document.getElementById('sugar');
const sugarTotal = document.getElementById('sugarTotal');

const moneyImage = document.getElementById('money');
const moneyTracker = document.getElementById('moneyTracker');

const sellButton = document.getElementById('sell');


let sugarCurrentWidth = 100;
let moneyCurrentWidth = 10;
const sugarDefaultWidth = 100;
const moneyDefaultWidth = 10;

let numSugar = 1;
let numMoney = 0;

	moneyTracker.textContent = numMoney; 
	sugarTotal.textContent = numSugar;

sugarImage.addEventListener('click', function() {
	
	if (numMoney >= 5) {
		sugarCurrentWidth *= 1.10; // Increase width by 10%
		sugarImage.style.width = sugarCurrentWidth + '%';
		numSugar++;
		numMoney -= 5;
		//moneyTracker.textContent = numMoney; // Update counter displays
		//sugarTotal.textContent = numSugar;
		
		setTimeout(function() {
			sugarCurrentWidth = sugarDefaultWidth; // Reset the stored width so that we dont get expontential growth sugar
			sugarImage.style.width = sugarCurrentWidth + '%';
		}, 100); //Delay 100 ms before shrinking 
	}
	
});

sellButton.addEventListener('click', function() {
	
	if  (numSugar > 0) {
		moneyCurrentWidth *= 1.10;
		moneyImage.style.width = moneyCurrentWidth + '%';
		
		numMoney += (numSugar * 10);
		numSugar -= numSugar;
		
		
		//numSugar--;
		//numMoney += 5; 
		
		setTimeout(function() {
			moneyCurrentWidth = moneyDefaultWidth;
			moneyImage.style.width = moneyCurrentWidth + '%';
		}, 100);
	}
	
});

const chemistImage = document.getElementById('chemist');
const numberOfChemist = document.getElementById('chemNum');
const costOfChemist = document.getElementById('chemCost');

let numChem = 0;
let chemCost = 15; 

chemistImageCurrentWidth = 20;
chemistImageDefaultWidth = 20;

numberOfChemist.textContent = numChem;
costOfChemist.textContent = "$" + chemCost;

chemistImage.addEventListener('click', function() {
	
	if (numMoney >= chemCost) {
		chemistImageCurrentWidth *= 1.10;
		chemistImage.style.width = chemistImageCurrentWidth + '%';
		numChem++;
		numMoney -= chemCost;
		chemCost = Math.ceil((15 * (1.15 * numChem) - 1) * 100) / 100;
		//numberOfChemist.textContent = numChem;
		costOfChemist.textContent = "$" + chemCost;
		//moneyTracker.textContent = numMoney;
	}
	
	setTimeout(function() {
		chemistImageCurrentWidth = chemistImageDefaultWidth;
		chemistImage.style.width = chemistImageCurrentWidth + '%';
	}, 100);
	
});

let sugarPerSecond = 0;
let chemContrib = 0;

//  Cn = C1 · αn−1, where C1 is the cost of the first item and Cn is the cost of the nth item. In the actual game, α = 1.15.

function calcSugar() {
	sugarPerSecond = numChem * 0.01; //Eventually figure out how to make a list/array and use a for loop to add everything to make it efficient
	sps.textContent = Math.ceil(sugarPerSecond * 100) / 10 + " sugar per second";
}

const sps = document.getElementById('sps');

function gameLoop() {
	
	numSugar += sugarPerSecond;
	
	moneyTracker.textContent = Math.ceil(numMoney * 100) / 100; // Update counter displays
	sugarTotal.textContent = Math.ceil(numSugar * 100) / 100;
	numberOfChemist.textContent = numChem;
}

setInterval(calcSugar, 1000);
setInterval(gameLoop, 100);

function debug() {
	console.log(numChem);
}