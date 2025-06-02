// Login function
document.getElementById("loginBtn").addEventListener("click", async function (e) {
	e.preventDefault();
  
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
  
	// Validate empty fields
	if (!email || !password) {
	  alert("Please fill in both fields.");
	  return;
	}
  
	// Validate email format
	const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	if (!emailPattern.test(email)) {
	  alert("Please enter a valid email address.");
	  return;
	}
  
	// Send the POST request to the backend for login
	try {
	  const response = await fetch("http://localhost:3000/login", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json"
		},
		body: JSON.stringify({ email, password })
	  });
  
	  const result = await response.json();
  
	  if (response.ok) {
		// Store the first name in localStorage after login success
		localStorage.setItem('firstName', result.firstName); // Assuming 'firstName' is returned in the response
  
		alert("Login successful!");
		window.location.href = "index.html"; // Redirect to main page
	  } else {
		alert(result.message || "Login failed. Please check your credentials.");
	  }
	} catch (error) {
	  alert("There was an error with the login.");
	  console.error(error);
	}
  });
  