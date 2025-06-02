document.addEventListener("DOMContentLoaded", () => {
	const doctorsData = [
	  { Specialization: "Cardiologist", Name: "Dr. Sucheta Mudgerikar" },
	  { Specialization: "Cardiologist", Name: "Dr. Mukesh Kumar" },
	  { Specialization: "Cardiologist", Name: "Dr. Sameer Patel" },
	  { Specialization: "Cardiologist", Name: "Dr. Keval Changadiya" },
	  { Specialization: "Cardiologist", Name: "Dr. Sahil Patel" },
	  { Specialization: "Neurologist", Name: "Dr. Vishal Jogi" },
	  { Specialization: "Neurologist", Name: "Dr. Narendra Barad" },
	  { Specialization: "Neurologist", Name: "Dr. Bhumir Chauhan" },
	  { Specialization: "Neurologist", Name: "Dr. Mahendra Singh Chauhan" },
	  { Specialization: "Neurologist", Name: "Dr. Arvind Sharma" },
	  { Specialization: "Neurologist", Name: "Dr. Dinesh S Saini" },
	  { Specialization: "Neurologist", Name: "Dr. Shailesh Darji" },
	  { Specialization: "Neurologist", Name: "Dr. Shuchit Pandey" },
	  { Specialization: "Neurologist", Name: "Dr. Jignesh Prajapati" },
	  { Specialization: "Oncologist", Name: "Dr. Malhar Patel" },
	  { Specialization: "Oncologist", Name: "Dr. Jay Prakash Neema" },
	  { Specialization: "Oncologist", Name: "Dr. Harsh Shah" },
	  { Specialization: "Oncologist", Name: "Dr. Chirag Amin" },
	  { Specialization: "Dermatologist", Name: "Dr. Rupa Tejas Shah" },
	  { Specialization: "Dermatologist", Name: "Dr. Meeta Desai" }
	  // ... add more if needed
	];
  
	const timeSlots = [
	  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
	  "12:00 PM", "2:00 PM", "2:30 PM", "3:00 PM"
	];
  
	const specializationSelect = document.getElementById("specialization");
	const doctorSelect = document.getElementById("doctorSelect");
	const dateInput = document.getElementById("dateSelect");
	const slotContainer = document.getElementById("slotContainer");
	const confirmationMessage = document.getElementById("confirmationMessage");
  
	function populateDoctorDropdown(specialization) {
	  doctorSelect.innerHTML = ""; // Clear existing options
  
	  const filteredDoctors = specialization === "All"
		? doctorsData
		: doctorsData.filter(doc => doc.Specialization === specialization);
  
	  filteredDoctors.forEach(doc => {
		const option = document.createElement("option");
		option.value = doc.Name;
		option.textContent = doc.Name;
		doctorSelect.appendChild(option);
	  });
  
	  loadSlots(); // Load slots for the first doctor in the filtered list
	}
  
	// Set min date to today
	const today = new Date().toISOString().split("T")[0];
	dateInput.min = today;
  
	function getKey(doctor, date) {
	  return `${doctor}_${date}`;
	}
  
	function loadSlots() {
	  const doctor = doctorSelect.value;
	  const date = dateInput.value;
	  slotContainer.innerHTML = "";
	  confirmationMessage.textContent = "";
  
	  if (!doctor || !date) return;
  
	  const bookedKey = getKey(doctor, date);
	  const bookedSlots = JSON.parse(localStorage.getItem(bookedKey)) || [];
  
	  timeSlots.forEach(slot => {
		const btn = document.createElement("button");
		btn.textContent = slot;
		btn.disabled = bookedSlots.includes(slot);
		btn.className = btn.disabled ? "slot disabled" : "slot";
  
		btn.addEventListener("click", () => {
		  if (confirm(`Confirm booking with ${doctor} at ${slot} on ${date}?`)) {
			bookedSlots.push(slot);
			localStorage.setItem(bookedKey, JSON.stringify(bookedSlots));
			loadSlots();
			confirmationMessage.textContent =
			  `Appointment booked with ${doctor} at ${slot} on ${date}.`;
		  }
		});
  
		slotContainer.appendChild(btn);
	  });
	}
  
	// Event listeners
	specializationSelect.addEventListener("change", (e) => {
	  populateDoctorDropdown(e.target.value);
	});
  
	doctorSelect.addEventListener("change", loadSlots);
	dateInput.addEventListener("change", loadSlots);
  
	// Initial population
	populateDoctorDropdown("All");
  });
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