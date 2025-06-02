// Existing bookAppointment function
function bookAppointment() {
	alert("Redirecting to appointment booking...");
	// In real-world, redirect like this:
	// window.location.href = "/book";
  }
  
    // Show the greeting and hamburger menu when logged in
	window.onload = function () {
		const firstName = localStorage.getItem('firstName');
		const greeting = document.getElementById('userGreeting');
		const hamburger = document.getElementById('hamburger');
		const hamburgerMenu = document.getElementById('hamburgerMenu');
	  
		if (firstName) {
		  greeting.style.display = 'none'; // hide Login/Register
		  hamburger.style.display = 'inline-block'; // show hamburger
	  
		  hamburger.addEventListener('click', () => {
			hamburgerMenu.style.display =
			  hamburgerMenu.style.display === 'block' ? 'none' : 'block';
		  });
	  
		  document.getElementById('logout').addEventListener('click', () => {
			localStorage.removeItem('firstName');
			window.location.href = 'login.html';
		  });
		} else {
		  greeting.style.display = 'inline-block';
		  hamburger.style.display = 'none';
		  hamburgerMenu.style.display = 'none';
		}
	  };
	  
  
  