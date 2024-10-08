const currentDate = document.querySelector(".current-date");
daysTag = document.querySelector(".days");
prevNextIcon = document.querySelectorAll(".icons span");

// Getting new date, current year, and current month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",]
 
const renderCalendar = () => {
	let firstDayOfMonth = new Date (currYear, currMonth, 1).getDay(), //Get first day of the month
	lastDateOfMonth = new Date (currYear, currMonth + 1, 0).getDate(), //Get last date of the month
	lastDayOfMonth = new Date (currYear, currMonth, lastDateOfMonth).getDay(), //Get last day of the month
	lastDateOfLastMonth = new Date (currYear, currMonth, 0).getDate(); //Get last date of the previous month

	let liTag = "";
	
	for (let i = firstDayOfMonth; i > 0; i--) { // Create li of last month last days
		liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
	}
	
	for (let i = 1; i <= lastDateOfMonth; i++) { // Create li of current days of month
		let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
		liTag += `<li class="${isToday}">${i}</li>`;
	}		
	
	for (let i = lastDayOfMonth; i < 6; i++) { // Create li of next month first days & add active class to current date
		liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
	}
	
	currentDate.innerText = `${months[currMonth]} ${currYear}`;
	daysTag.innerHTML = liTag;
}
renderCalendar();
prevNextIcon.forEach(icon => {
	icon.addEventListener("click", () => { // Add click event on arrow icons 
		// If left icon is clicked go back one month, otherwise go forward one month
		currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
		
		if(currMonth < 0 || currMonth > 11) { // If the current month is less than 0 or greater than 11
			// Create new date of current year & month and pass it as date value
			date = new Date(currYear, currMonth); 
			currYear = date.getFullYear(); // Updateing current year with new date year
			currMonth = date.getMonth(); // Updating current month with new date month
		} else { // otherwise pass new Date as date value
			date = new Date();
		}
		renderCalendar();
	});
});