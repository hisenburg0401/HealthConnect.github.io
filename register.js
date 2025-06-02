function register() {
	const firstName = document.getElementById('firstName').value.trim();
	const lastName = document.getElementById('lastName').value.trim();
	const age = document.getElementById('age').value;
	const gender = document.getElementById('gender').value;
	const email = document.getElementById('email').value.trim();
	const password = document.getElementById('password').value;
  
	// Check for empty fields
	if (!firstName || !lastName || !age || !gender || !email || !password) {
	  alert("Please fill in all the required fields.");
	  return;
	}
  
	// Email format validation
	const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!emailPattern.test(email)) {
	  alert("Please enter a valid email address.");
	  return;
	}
  
	fetch("http://localhost:3000/register", {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json"
	  },
	  body: JSON.stringify({ firstName, lastName, age, gender, email, password })
	})
	.then(response => response.json())
	.then(data => {
	  if (data.success) {
		alert("Registration successful! You can now log in.");
		window.location.href = "login.html"; // Redirect to login page
	  } else {
		alert(data.message);
	  }
	})
	.catch(error => {
	  alert("Error during registration.");
	  console.error(error);
	});
  }
  