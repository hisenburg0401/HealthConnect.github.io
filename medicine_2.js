let medicines = [];
for (let i = 1; i <= 100; i++) {
  medicines.push({
    name: `Medicine ${i}`,
    image: 'https://via.placeholder.com/120',
    price: Math.floor(Math.random() * 200 + 50)
  });
}

let cart = {};
let currentPage = 1;
const itemsPerPage = 10;

function showSection(section) {
  document.getElementById('bookSection').classList.toggle('hidden', section !== 'book');
  document.getElementById('uploadSection').classList.toggle('hidden', section !== 'upload');
}

function renderMedicines() {
  const searchQuery = document.getElementById('searchBar').value.toLowerCase();
  const filtered = medicines.filter(med => med.name.toLowerCase().includes(searchQuery));
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const list = filtered.slice(start, end);

  const container = document.getElementById('medicineList');
  container.innerHTML = '';

  list.forEach(med => {
    const quantity = cart[med.name]?.quantity || 0;

    const card = document.createElement('div');
    card.className = 'medicine-card';
    card.innerHTML = `
      <img src="${med.image}" alt="${med.name}">
      <div class="medicine-details">
        <h4>${med.name}</h4>
        <p>Price: ₹${med.price}</p>
        <div class="quantity-control">
          <button onclick="updateQuantity('${med.name}', ${med.price}, -1)">−</button>
          <span>${quantity}</span>
          <button onclick="updateQuantity('${med.name}', ${med.price}, 1)">+</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  renderPagination(filtered.length);
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.onclick = () => {
      currentPage = i;
      renderMedicines();
    };
    pagination.appendChild(btn);
  }
}

function updateQuantity(name, price, delta) {
  if (!cart[name]) {
    cart[name] = { quantity: 0, price };
  }

  cart[name].quantity += delta;

  if (cart[name].quantity <= 0) {
    delete cart[name];
  }

  renderMedicines();
}

function viewCart() {
  const cartDiv = document.getElementById('cartItems');
  cartDiv.innerHTML = '';

  let total = 0;

  Object.entries(cart).forEach(([name, { quantity, price }]) => {
    const itemTotal = quantity * price;
    total += itemTotal;

    const item = document.createElement('p');
    item.textContent = `${name} - ₹${price} × ${quantity} = ₹${itemTotal}`;
    cartDiv.appendChild(item);
  });

  const totalElement = document.createElement('p');
  totalElement.style.fontWeight = 'bold';
  totalElement.style.marginTop = '1rem';
  totalElement.textContent = `Total: ₹${total}`;
  cartDiv.appendChild(totalElement);

  document.getElementById('cartModal').style.display = 'block';
}

function closeCart() {
  document.getElementById('cartModal').style.display = 'none';
}

function confirmUploadOrder() {
  const address = document.getElementById('deliveryAddress').value;
  const time = document.getElementById('deliveryTime').value;
  const file = document.getElementById('prescriptionUpload').files[0];

  if (!file || !address || !time) {
    alert("Please fill all the fields and upload a prescription.");
    return;
  }

  document.getElementById('uploadConfirmation').textContent = "Order confirmed! We’ll deliver it soon.";
}

document.addEventListener('DOMContentLoaded', renderMedicines);
