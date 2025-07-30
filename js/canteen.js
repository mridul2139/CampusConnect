// Canteen JavaScript for CampusConnect

// Dummy data for menu
const menu = [
  { id: 1, name: 'Samosa', category: 'Snacks', description: 'Crispy fried pastry with spicy potato filling', price: 20 },
  { id: 2, name: 'Paneer Pakora', category: 'Snacks', description: 'Cottage cheese fritters', price: 40 },
  { id: 3, name: 'Aloo Tikki', category: 'Snacks', description: 'Spiced potato patties', price: 25 },
  { id: 4, name: 'Veg Cutlet', category: 'Snacks', description: 'Mixed vegetable cutlets', price: 30 },
  { id: 5, name: 'Dhokla', category: 'Snacks', description: 'Steamed gram flour snack', price: 35 },
  { id: 6, name: 'Kachori', category: 'Snacks', description: 'Spicy lentil-filled pastry', price: 22 },
  { id: 7, name: 'Chicken Biryani', category: 'Main Course', description: 'Fragrant rice with tender chicken', price: 120 },
  { id: 8, name: 'Veg Biryani', category: 'Main Course', description: 'Fragrant rice with mixed vegetables', price: 80 },
  { id: 9, name: 'Dal Khichdi', category: 'Main Course', description: 'Comforting rice and lentil dish', price: 60 },
  { id: 10, name: 'Masala Dosa', category: 'Main Course', description: 'Crispy rice crepe with potato filling', price: 45 },
  { id: 11, name: 'Masala Chai', category: 'Beverages', description: 'Spiced Indian tea', price: 15 },
  { id: 12, name: 'Coffee', category: 'Beverages', description: 'Hot brewed coffee', price: 20 },
  { id: 13, name: 'Lemonade', category: 'Beverages', description: 'Fresh lemon juice', price: 25 }
];

// Dummy data for orders
const orders = [
  { id: 'ORD001', name: 'Amit Sharma', phone: '9876543210', items: 'Samosa, Dhokla', total: 55, status: 'delivered', time: '12:30', date: '2024-06-01' },
  { id: 'ORD002', name: 'Priya Singh', phone: '9123456789', items: 'Paneer Pakora', total: 40, status: 'ready', time: '13:00', date: '2024-06-01' },
  { id: 'ORD003', name: 'Rahul Verma', phone: '9988776655', items: 'Aloo Tikki, Veg Cutlet', total: 55, status: 'preparing', time: '13:30', date: '2024-06-01' },
  { id: 'ORD004', name: 'Sneha Patel', phone: '9001122334', items: 'Kachori', total: 22, status: 'accepted', time: '14:00', date: '2024-06-01' }
];

let cart = [];
let currentFilter = 'all';
let customerName = '', customerPhone = '';

document.addEventListener('DOMContentLoaded', function() {
  initializeCanteen();
  setupEventListeners();
});

function initializeCanteen() {
  loadMenuCategories();
  loadRecentOrders();
  updateCart();
  setupDarkMode();
}

function setupEventListeners() {
  document.getElementById('filter-all').addEventListener('click', () => filterMenu('all'));
  document.getElementById('filter-main').addEventListener('click', () => filterMenu('Main Course'));
  document.getElementById('filter-snacks').addEventListener('click', () => filterMenu('Snacks'));
  document.getElementById('filter-beverages').addEventListener('click', () => filterMenu('Beverages'));
  document.getElementById('place-order').addEventListener('click', placeOrder);
  document.getElementById('clear-cart').addEventListener('click', clearCart);
  document.getElementById('view-orders').addEventListener('click', () => openModal('order-history-modal'));
  document.getElementById('view-all-orders').addEventListener('click', () => openModal('order-history-modal'));
  document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
}

function loadMenuCategories() {
  const container = document.getElementById('menu-categories');
  container.innerHTML = '';
  const categories = ['Main Course', 'Snacks', 'Beverages'];
  categories.forEach(category => {
    const items = menu.filter(item => item.category === category);
    if (items.length === 0) return;
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'menu-category-section';
    categoryDiv.innerHTML = `
      <h4 class="menu-category">${category}</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${items.map(item => `
          <div class="menu-item" data-category="${category}" data-id="${item.id}">
            <div class="flex items-start space-x-3">
              <div class="text-3xl">🍽️</div>
              <div class="flex-1">
                <div class="flex items-start justify-between">
                  <div>
                    <h5 class="font-semibold text-gray-900">${item.name}</h5>
                    <p class="text-sm text-gray-600 mt-1">${item.description}</p>
                  </div>
                  <div class="text-right">
                    <div class="font-bold text-gray-900">₹${item.price}</div>
                  </div>
                </div>
                <div class="flex items-center justify-between mt-3">
                  <div class="flex items-center space-x-2">
                    <button class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors" onclick="decreaseQuantity(${item.id})">-</button>
                    <span id="qty-${item.id}" class="w-8 text-center font-medium">0</span>
                    <button class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors" onclick="increaseQuantity(${item.id})">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    container.appendChild(categoryDiv);
  });
}

function filterMenu(category) {
  currentFilter = category;
  const filterButtons = ['filter-all', 'filter-main', 'filter-snacks', 'filter-beverages'];
  filterButtons.forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (btnId === `filter-${category.toLowerCase().replace(' ', '')}` || (category === 'all' && btnId === 'filter-all')) {
      btn.className = 'text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full';
    } else {
      btn.className = 'text-sm text-gray-600 px-3 py-1 rounded-full hover:bg-gray-100';
    }
  });
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function increaseQuantity(itemId) {
  const quantityElement = document.getElementById(`qty-${itemId}`);
  let quantity = parseInt(quantityElement.textContent) || 0;
  quantity++;
  quantityElement.textContent = quantity;
  updateCart();
}

function decreaseQuantity(itemId) {
  const quantityElement = document.getElementById(`qty-${itemId}`);
  let quantity = parseInt(quantityElement.textContent) || 0;
  if (quantity > 0) {
    quantity--;
    quantityElement.textContent = quantity;
    updateCart();
  }
}

function updateCart() {
  const cartContainer = document.getElementById('cart-items');
  const cartCountElement = document.getElementById('cart-count');
  const subtotalElement = document.getElementById('cart-subtotal');
  const taxElement = document.getElementById('cart-tax');
  const totalElement = document.getElementById('cart-total');
  cart = [];
  let subtotal = 0;
  menu.forEach(item => {
    const quantity = parseInt(document.getElementById(`qty-${item.id}`)?.textContent) || 0;
    if (quantity > 0) {
      cart.push({ ...item, quantity });
      subtotal += parseFloat(item.price) * quantity;
    }
  });
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountElement.textContent = totalItems;
  const tax = subtotal * 0.05;
  const total = subtotal + tax;
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p class="text-gray-500 text-center py-8">Your cart is empty</p>';
  } else {
    cartContainer.innerHTML = cart.map(item => `
      <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div class="flex items-center space-x-3">
          <div class="text-2xl">🍽️</div>
          <div>
            <h5 class="font-medium text-gray-900">${item.name}</h5>
            <p class="text-sm text-gray-600">Qty: ${item.quantity}</p>
          </div>
        </div>
        <div class="text-right">
          <div class="font-medium text-gray-900">₹${(parseFloat(item.price) * item.quantity).toFixed(2)}</div>
        </div>
      </div>
    `).join('');
  }
  subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
  taxElement.textContent = `₹${tax.toFixed(2)}`;
  totalElement.textContent = `₹${total.toFixed(2)}`;
}

function clearCart() {
  cart = [];
  menu.forEach(item => {
    const quantityElement = document.getElementById(`qty-${item.id}`);
    if (quantityElement) quantityElement.textContent = '0';
  });
  updateCart();
  showToast('Cart cleared successfully', 'success');
}

function showOrderDetailsModal() {
  const modalHtml = `
    <div id="order-details-modal" class="modal fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div class="modal-content bg-white rounded-lg p-6 max-w-sm w-full">
        <h3 class="text-lg font-semibold mb-4">Enter Your Details</h3>
        <div class="mb-3">
          <label class="block text-sm font-medium mb-1">Name</label>
          <input id="order-name" type="text" class="form-input w-full border rounded px-3 py-2" placeholder="Your Name" />
        </div>
        <div class="mb-3">
          <label class="block text-sm font-medium mb-1">Phone Number</label>
          <input id="order-phone" type="tel" class="form-input w-full border rounded px-3 py-2" placeholder="10-digit Mobile" maxlength="10" />
        </div>
        <div class="flex justify-end space-x-2 mt-4">
          <button onclick="closeModal('order-details-modal')" class="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button onclick="submitOrderDetails()" class="px-4 py-2 bg-blue-600 text-white rounded">Continue</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function submitOrderDetails() {
  const name = document.getElementById('order-name').value.trim();
  const phone = document.getElementById('order-phone').value.trim();
  if (!name || !phone.match(/^\d{10}$/)) {
    showToast('Please enter a valid name and 10-digit phone number', 'warning');
    return;
  }
  customerName = name;
  customerPhone = phone;
  closeModal('order-details-modal');
  placeOrderFinal();
}

function placeOrder() {
  if (cart.length === 0) {
    showToast('Please add items to cart', 'warning');
    return;
  }
  if (!document.getElementById('time-slot').value) {
    showToast('Please select a pickup time', 'warning');
    return;
  }
  showOrderDetailsModal();
}

function placeOrderFinal() {
  const timeSlot = document.getElementById('time-slot').value;
  const orderId = 'ORD' + Math.random().toString(36).substr(2, 6).toUpperCase();
  const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  const newOrder = {
    id: orderId,
    name: customerName,
    phone: customerPhone,
    items: cart.map(item => item.name).join(', '),
    total: total,
    time: timeSlot,
    status: 'accepted',
    date: new Date().toISOString().split('T')[0]
  };
  orders.unshift(newOrder);
  showToast('Order placed successfully!', 'success');
  clearCart();
  loadRecentOrders();
  setTimeout(() => {
    showOrderStatus(orderId);
  }, 1000);
}

function loadRecentOrders() {
  const container = document.getElementById('recent-orders');
  container.innerHTML = '';
  orders.slice(0, 3).forEach(order => {
    const orderItem = document.createElement('div');
    orderItem.className = 'border-b border-gray-200 pb-3 last:border-b-0';
    orderItem.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <div>
          <h4 class="font-medium text-gray-900">${order.id}</h4>
          <p class="text-sm text-gray-600">${order.items}</p>
        </div>
        <span class="order-status status-${order.status}">${order.status}</span>
      </div>
      <div class="flex justify-between items-center text-sm">
        <span class="text-gray-600">${order.time} - ${order.date}</span>
        <span class="font-medium">₹${parseFloat(order.total).toFixed(2)}</span>
      </div>
    `;
    container.appendChild(orderItem);
  });
}

function showOrderStatus(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;
  const content = document.getElementById('order-status-content');
  content.innerHTML = `
    <div class="space-y-6">
      <div class="text-center">
        <h4 class="text-lg font-semibold text-gray-900 mb-2">Order #${order.id}</h4>
        <p class="text-gray-600">Placed for ${order.time}</p>
      </div>
      <div class="space-y-3">
        ${order.items.split(',').map(item => `
          <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span>${item.trim()}</span>
          </div>
        `).join('')}
      </div>
      <div class="border-t pt-4">
        <div class="flex justify-between items-center mb-4">
          <span class="font-semibold">Total:</span>
          <span class="font-bold text-lg">₹${parseFloat(order.total).toFixed(2)}</span>
        </div>
        <div class="space-y-3">
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Order Accepted</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 bg-gray-300 rounded-full"></div>
            <span>Preparing</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 bg-gray-300 rounded-full"></div>
            <span>Ready for Pickup</span>
          </div>
        </div>
      </div>
    </div>
  `;
  openModal('order-status-modal');
}

function loadOrderHistory() {
  const content = document.getElementById('order-history-content');
  content.innerHTML = `
    <div class="space-y-4">
      ${orders.map(order => `
        <div class="border border-gray-200 rounded-lg p-4">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h4 class="font-semibold text-gray-900">${order.id}</h4>
              <p class="text-sm text-gray-600">${order.date} at ${order.time}</p>
            </div>
            <span class="order-status status-${order.status}">${order.status}</span>
          </div>
          <div class="space-y-2 mb-3">
            ${order.items.split(',').map(item => `
              <div class="flex justify-between items-center">
                <span class="text-gray-700">${item.trim()}</span>
              </div>
            `).join('')}
          </div>
          <div class="flex justify-between items-center border-t pt-3">
            <span class="font-semibold">Total:</span>
            <span class="font-bold text-lg">₹${parseFloat(order.total).toFixed(2)}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('hidden');
  if (modalId === 'order-history-modal') loadOrderHistory();
}
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('hidden');
}
function setupDarkMode() {
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    document.body.classList.add('dark');
    document.getElementById('dark-mode-toggle').innerHTML = '<i class="fas fa-sun"></i>';
  }
}
function toggleDarkMode() {
  const body = document.body;
  const toggle = document.getElementById('dark-mode-toggle');
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  localStorage.setItem('darkMode', isDark);
  toggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  showToast(isDark ? 'Dark mode enabled' : 'Light mode enabled', 'success');
}
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.closeModal = closeModal;
window.submitOrderDetails = submitOrderDetails; 