const sugarImage = document.getElementById('bagosugar');
const moneyImage = document.getElementById('money');

const moneyCounterDisplay = document.getElementById('moneyTotal');
const bagCounterDisplay = document.getElementById('bagTotal');

let bagCurrentWidth = 400;
let MoneyCurrentWidth = 400;
const defaultWidth;

let numBags = 0; // Initialize counter
let numMoney = 5;

sugarImage.addEventListener('click', function() {
	
	if (numMoney >= 5) {
		numBags++;
		numMoney -= 5;

		moneyCounterDisplay.textContent = numMoney;
		bagCounterDisplay.textContent = numBags;

		bagCurrentWidth *= 1.10; // Increase width by 10%
		sugarImage.style.width = bagCurrentWidth + 'px'; // Add new width directly into style
		
		setTimeout(function() {
			bagCurrentWidth = defaultWith; 
			sugarImage.style.width = bagCurrentWidth + 'px';
		}, 100); // Delay 100 ms before shrinking
	
	}

});
