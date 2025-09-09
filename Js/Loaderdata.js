let cart = [];


// Load Categories

const loadCategory = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/categories');
  const data = await response.json();
  showCategory(data.categories);
};

// Show Categories
const showCategory = (categories) => {
  const catTree = document.getElementById('tree-container');
  catTree.innerHTML = "";

  categories.forEach(element => {
    const div = document.createElement('div');
    div.innerHTML = `
      <button id="btn-${element.id}" 
              onclick="loadtreeById(${element.id})" 
              class="w-full text-white text-left px-4 py-2  text-green-800 rounded hover:bg-green-200">
        ${element.category_name}
      </button>
    `;
    catTree.appendChild(div);
  });
};

// Load tree by Level 
const loadtreeById = async (id) => {
  showLoader();
  const response = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
  const data = await response.json();
  const allData = data.plants;

  removeActiveClass();

  const clickedButton = document.getElementById(`btn-${id}`);
  clickedButton.classList.add('active');

  const treeCardContainer = document.getElementById('tree-container-main');
  treeCardContainer.innerHTML = "";



  allData.forEach(item => {
    const div = document.createElement('div');
    div.className = "bg-white p-4 rounded-lg shadow-sm";
    div.innerHTML = `
      <div >
    <!-- Image -->
    <div class="w-full h-40 bg-gray-200 rounded mb-4 flex items-center justify-center overflow-hidden">
      <img src="${item.image || ''}" 
           alt="${item.name || 'Tree'}" 
           class="h-full w-full object-cover">
    </div>

    <!-- Title -->
    <h3 onclick="showCardDetail(${item.id})" class="font-semibold text-gray-800 cursor-pointer">${item.name || "Unknown Tree"}</h3>

    <!-- Description -->
    <p class="text-gray-600 text-sm mb-3 line-clamp-3">
      ${item.description || "No description available."}
    </p>

    <!-- Category + Price -->
    <div class="flex items-center justify-between mb-3">
      <span class="inline-block bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full">
        ${item.category || "Tree"}
      </span>
      <span class="font-bold">৳${item.price || 0}</span>
    </div>

    <!-- Button -->
    <button onclick='addToCart(${JSON.stringify(item)})' class="w-full bg-green-700 text-white py-2.5 rounded-full font-medium hover:bg-green-800 transition">
      Add to Cart
    </button>
  </div>
    `;
    treeCardContainer.appendChild(div);
  });

  hideLoader();
};



//-------------------------- cart section --------------------------//

const addToCart = (plant) => {
  // Check if already in cart
  const existing = cart.find(item => item.id === plant.id);
  if (existing) {
    existing.quantity += 1; // Increase quantity
  } else {
    cart.push({ ...plant, quantity: 1 });
  }
  updateCartUI();
};

// Update Cart UI
const updateCartUI = () => {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');

  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const li = document.createElement('li');
    li.className = "flex justify-between items-center bg-[#F0FDF4] p-2 rounded";
    li.innerHTML = `
      <span>${item.name} <span class="text-gray-500">${item.price} × ${item.quantity}</span></span>
      <button class="remove-btn text-gray-400 hover:text-red-500">✕</button>
    `;

    // Handle remove button
    li.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromCart(item.id);
    });

    cartItemsContainer.appendChild(li);
  });

  cartTotal.textContent = `Total: ${total} ৳`;
};

// Remove item from cart
const removeFromCart = (id) => {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
};


// remove active class from category buttons
const removeActiveClass = () => {
  const buttons = document.querySelectorAll("#tree-container button");
  buttons.forEach(btn => btn.classList.remove("active"));
};



const showCardDetail = async (id) => {
 const response = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
  const data = await response.json();
  const allData = data.plants;
console.log(allData)
const modal = document.getElementById('modal');
    const closeModalBtn = document.getElementById('closeModal');
    document.getElementById('modalImage').src = allData.image;
      document.getElementById('modalTitle').textContent = allData.name;
      document.getElementById('modalCategory').textContent = `Category: ${allData.category}`;
      document.getElementById('modalPrice').textContent = `Price: $${allData.price}`;
      document.getElementById('modalDescription').textContent = allData.description;
      modal.classList.remove('hidden');

       // Close modal
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    // Close modal on clicking outside content
    modal.addEventListener('click', (e) => {
      if(e.target === modal) {
        modal.classList.add('hidden');
      }
    });

}



// Dummy loader functions
// Show loader
const showLoader = () => {
  document.getElementById('loader').classList.remove('hidden');
};

// Hide loader
const hideLoader = () => {
  document.getElementById('loader').classList.add('hidden');
};

loadCategory();
