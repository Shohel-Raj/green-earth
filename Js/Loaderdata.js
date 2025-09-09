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
console.log(id)
  const response = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
  const data = await response.json();
  const allData = data.plants;
  console.log(allData,data)

  removeActiveClass();

  const clickedButton = document.getElementById(`btn-${id}`);
  clickedButton.classList.add('active');

  const treeCardContainer = document.getElementById('tree-container-main');
  treeCardContainer.innerHTML = "";

  if (!allData.length) {
    treeCardContainer.innerHTML = `
      <div class="col-span-3 text-center p-6">
        <h2 class="text-5xl font-bold text-gray-800"><i class="fa-solid fa-triangle-exclamation"></i></h2>
        <p class="text-gray-500 text-sm mt-2">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <p class="text-xl font-semibold text-gray-700 mt-2">নেক্সট Lesson এ যান</p>
      </div>
    `;
    hideLoader();
    return;
  }

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
    <h3 class="font-semibold text-gray-800">${item.name || "Unknown Tree"}</h3>

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
    <button class="w-full bg-green-700 text-white py-2.5 rounded-full font-medium hover:bg-green-800 transition">
      Add to Cart
    </button>
  </div>
    `;
    treeCardContainer.appendChild(div);
  });

  hideLoader();
};

// Utility: remove active class from category buttons
const removeActiveClass = () => {
  const buttons = document.querySelectorAll("#tree-container button");
  buttons.forEach(btn => btn.classList.remove("active"));
};

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
