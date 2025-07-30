// Admin JavaScript for CampusConnect

// Dummy data for menu items
const menuItems = [
  { id: 1, name: 'Samosa', category: 'Snacks', description: 'Crispy fried pastry with spicy potato filling', price: 20, availability: 'available' },
  { id: 2, name: 'Paneer Pakora', category: 'Snacks', description: 'Cottage cheese fritters', price: 40, availability: 'available' },
  { id: 3, name: 'Aloo Tikki', category: 'Snacks', description: 'Spiced potato patties', price: 25, availability: 'available' },
  { id: 4, name: 'Veg Cutlet', category: 'Snacks', description: 'Mixed vegetable cutlets', price: 30, availability: 'available' },
  { id: 5, name: 'Dhokla', category: 'Snacks', description: 'Steamed gram flour snack', price: 35, availability: 'available' },
  { id: 6, name: 'Kachori', category: 'Snacks', description: 'Spicy lentil-filled pastry', price: 22, availability: 'available' },
  { id: 7, name: 'Chicken Biryani', category: 'Main Course', description: 'Fragrant rice with tender chicken', price: 120, availability: 'available' },
  { id: 8, name: 'Veg Biryani', category: 'Main Course', description: 'Fragrant rice with mixed vegetables', price: 80, availability: 'available' },
  { id: 9, name: 'Dal Khichdi', category: 'Main Course', description: 'Comforting rice and lentil dish', price: 60, availability: 'available' },
  { id: 10, name: 'Masala Dosa', category: 'Main Course', description: 'Crispy rice crepe with potato filling', price: 45, availability: 'available' },
  { id: 11, name: 'Masala Chai', category: 'Beverages', description: 'Spiced Indian tea', price: 15, availability: 'available' },
  { id: 12, name: 'Coffee', category: 'Beverages', description: 'Hot brewed coffee', price: 20, availability: 'available' },
  { id: 13, name: 'Lemonade', category: 'Beverages', description: 'Fresh lemon juice', price: 25, availability: 'available' }
];

// Dummy data for orders
const orders = [
  { id: 'ORD001', student: 'Amit Sharma', items: ['Samosa', 'Dhokla'], total: 55, timeSlot: '12:30 PM', status: 'preparing' },
  { id: 'ORD002', student: 'Priya Singh', items: ['Paneer Pakora'], total: 40, timeSlot: '1:00 PM', status: 'ready' },
  { id: 'ORD003', student: 'Rahul Verma', items: ['Aloo Tikki', 'Veg Cutlet'], total: 55, timeSlot: '1:30 PM', status: 'accepted' },
  { id: 'ORD004', student: 'Sneha Patel', items: ['Coffee', 'Kachori'], total: 42, timeSlot: '2:00 PM', status: 'accepted' },
  { id: 'ORD005', student: 'Vikas Nair', items: ['Lemonade', 'Veg Cutlet'], total: 55, timeSlot: '2:30 PM', status: 'preparing' }
];

// Dummy data for students
const students = [
  { id: 'STU001', name: 'Amit Sharma', class: 'CS 3A' },
  { id: 'STU002', name: 'Priya Singh', class: 'CS 3A' },
  { id: 'STU003', name: 'Rahul Verma', class: 'CS 3B' },
  { id: 'STU004', name: 'Sneha Patel', class: 'ME 2A' },
  { id: 'STU005', name: 'Vikas Nair', class: 'ME 2B' },
  { id: 'STU006', name: 'Meera Iyer', class: 'EE 4A' }
];

let currentTab = 'results';
let editingMenuItem = null;

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
  setupLoginForm();
  setupTabNavigation();
  setupEventListeners();
  setupDarkMode();
});

// Setup login form
function setupLoginForm() {
  const loginForm = document.getElementById('login-form');
  const loginScreen = document.getElementById('login-screen');
  const adminPanel = document.getElementById('admin-panel');
  
  console.log('Setting up login form...');
  console.log('Login form element:', loginForm);
  console.log('Login screen element:', loginScreen);
  console.log('Admin panel element:', adminPanel);
  
  if (!loginForm || !loginScreen || !adminPanel) {
    console.error('Required elements not found!');
    return;
  }
  
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    console.log('Login attempt:', username, password);
    
    if (username === 'admin' && password === 'admin123') {
      console.log('Credentials valid, hiding login screen...');
      loginScreen.style.display = 'none';
      console.log('Showing admin panel...');
      adminPanel.classList.remove('hidden');
      
      // Force a reflow to ensure the display change takes effect
      adminPanel.offsetHeight;
      
      console.log('Admin panel display style:', adminPanel.style.display);
      console.log('Admin panel visibility:', adminPanel.offsetHeight > 0);
      
      try {
        showToast('Login successful!', 'success');
      } catch (error) {
        console.error('Error showing toast:', error);
        alert('Login successful!');
      }
      
      console.log('Login successful, switching to results tab...');
      // Load initial tab content
      switchTab('results');
    } else {
      console.log('Login failed: invalid credentials');
      try {
        showToast('Invalid credentials!', 'error');
      } catch (error) {
        console.error('Error showing toast:', error);
        alert('Invalid credentials!');
      }
    }
  });
}

// Setup tab navigation
function setupTabNavigation() {
  const tabs = document.querySelectorAll('.tab-button');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
}

// Switch between tabs
function switchTab(tabName) {
  console.log('Switching to tab:', tabName);
  currentTab = tabName;
  
  // Update tab buttons
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeTabButton = document.querySelector(`[data-tab="${tabName}"]`);
  if (activeTabButton) {
    activeTabButton.classList.add('active');
  } else {
    console.error('Tab button not found for:', tabName);
  }
  
  // Hide all tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.style.display = 'none';
  });
  
  // Show selected tab content
  const tabContent = document.getElementById(`${tabName}-tab`);
  if (tabContent) {
    tabContent.style.display = 'block';
    console.log('Tab content displayed:', tabName);
  } else {
    console.error('Tab content not found for:', tabName);
  }
  
  // Load tab-specific content
  switch(tabName) {
    case 'results':
      loadResultsTab();
      break;
    case 'attendance':
      loadAttendanceTab();
      break;
    case 'canteen':
      loadCanteenTab();
      break;
    case 'orders':
      loadOrdersTab();
      break;
    default:
      console.error('Unknown tab:', tabName);
  }
}

// Setup event listeners
function setupEventListeners() {
  // Dark mode toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }
  
  // Logout button
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
  
  // Export and backup buttons
  const exportBtn = document.getElementById('export-data');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportData);
  }
  
  const backupBtn = document.getElementById('backup-system');
  if (backupBtn) {
    backupBtn.addEventListener('click', backupSystem);
  }
}

// Handle logout
function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    document.getElementById('admin-panel').classList.add('hidden');
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('login-form').reset();
    showToast('Logged out successfully', 'success');
  }
}

// Backup system
function backupSystem() {
  showToast('Creating system backup...', 'success');
  setTimeout(() => {
    showToast('System backup completed successfully!', 'success');
  }, 3000);
}

// Load results tab
function loadResultsTab() {
  console.log('Loading results tab...');
  const container = document.getElementById('results-content');
  console.log('Results container:', container);
  
  if (!container) {
    console.error('Results container not found!');
    return;
  }
  
  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Upload Results</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Select CSV File</label>
            <input type="file" id="results-upload" accept=".csv" class="hidden">
            <button id="upload-results-btn" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Choose File
            </button>
          </div>
          <div class="text-sm text-gray-600">
            <p>Upload a CSV file with columns: Student ID, Subject, Grade, Credits, GPA</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Recent Results</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left py-2">Student ID</th>
                <th class="text-left py-2">Subject</th>
                <th class="text-left py-2">Grade</th>
                <th class="text-left py-2">Credits</th>
                <th class="text-left py-2">GPA</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="py-2">CS2024001</td>
                <td class="py-2">Computer Science</td>
                <td class="py-2">A</td>
                <td class="py-2">3</td>
                <td class="py-2">4.0</td>
              </tr>
              <tr class="border-b">
                <td class="py-2">CS2024002</td>
                <td class="py-2">Mathematics</td>
                <td class="py-2">A-</td>
                <td class="py-2">4</td>
                <td class="py-2">3.7</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  
  console.log('Results tab content loaded');
  
  // Add event listeners for results tab
  const uploadBtn = document.getElementById('upload-results-btn');
  if (uploadBtn) {
    uploadBtn.addEventListener('click', () => {
      document.getElementById('results-upload').click();
    });
  }
  
  const resultsUpload = document.getElementById('results-upload');
  if (resultsUpload) {
    resultsUpload.addEventListener('change', handleResultsUpload);
  }
}

// Load attendance tab
function loadAttendanceTab() {
  const container = document.getElementById('attendance-content');
  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Mark Attendance</h3>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Subject</label>
              <select class="w-full border rounded px-3 py-2">
                <option>Computer Science</option>
                <option>Mathematics</option>
                <option>Physics</option>
                <option>English</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Date</label>
              <input type="date" class="w-full border rounded px-3 py-2" value="${new Date().toISOString().split('T')[0]}">
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Class</label>
              <select class="w-full border rounded px-3 py-2">
                <option>CS 3A</option>
                <option>CS 3B</option>
                <option>ME 2A</option>
                <option>ME 2B</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Student List</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left py-2">Student ID</th>
                <th class="text-left py-2">Name</th>
                <th class="text-left py-2">Status</th>
                <th class="text-left py-2">Action</th>
              </tr>
            </thead>
            <tbody id="attendance-table">
              ${students.map(student => `
                <tr>
                  <td>${student.id}</td>
                  <td>${student.name}</td>
                  <td>
                    <select class="text-sm border rounded px-2 py-1">
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                      <option value="late">Late</option>
                    </select>
                  </td>
                  <td>
                    <button class="text-green-600 hover:text-green-700 text-sm">Save</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="mt-4">
          <button id="save-attendance" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Save All Attendance
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Add event listener for save attendance
  const saveAttendanceBtn = document.getElementById('save-attendance');
  if (saveAttendanceBtn) {
    saveAttendanceBtn.addEventListener('click', handleAttendanceSave);
  }
}

// Load canteen tab
function loadCanteenTab() {
  const container = document.getElementById('canteen-content');
  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Add/Edit Menu Item</h3>
        <form id="menu-form" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Name</label>
              <input type="text" id="menu-name" class="w-full border rounded px-3 py-2" required>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Category</label>
              <select id="menu-category" class="w-full border rounded px-3 py-2" required>
                <option value="">Select Category</option>
                <option value="Main Course">Main Course</option>
                <option value="Snacks">Snacks</option>
                <option value="Beverages">Beverages</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Price (₹)</label>
              <input type="number" id="menu-price" class="w-full border rounded px-3 py-2" required>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Availability</label>
              <select id="menu-availability" class="w-full border rounded px-3 py-2" required>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Description</label>
            <textarea id="menu-description" class="w-full border rounded px-3 py-2" rows="3" required></textarea>
          </div>
          <div class="flex space-x-2">
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              ${editingMenuItem ? 'Update Item' : 'Add Item'}
            </button>
            ${editingMenuItem ? '<button type="button" onclick="cancelEdit()" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">Cancel</button>' : ''}
          </div>
        </form>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Current Menu</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="menu-items-container">
          ${menuItems.map(item => `
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold">${item.name}</h4>
                <span class="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">₹${item.price}</span>
              </div>
              <p class="text-sm text-gray-600 mb-2">${item.description}</p>
              <div class="flex justify-between items-center">
                <span class="text-xs bg-gray-100 px-2 py-1 rounded">${item.category}</span>
                <div class="space-x-2">
                  <button onclick="editMenuItem(${item.id})" class="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                  <button onclick="deleteMenuItem(${item.id})" class="text-red-600 hover:text-red-700 text-sm">Delete</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  // Add event listener for menu form
  const menuForm = document.getElementById('menu-form');
  if (menuForm) {
    menuForm.addEventListener('submit', handleMenuForm);
  }
}

// Load orders tab
function loadOrdersTab() {
  const container = document.getElementById('orders-content');
  container.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-4">Order Management</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-2">Order ID</th>
              <th class="text-left py-2">Student</th>
              <th class="text-left py-2">Items</th>
              <th class="text-left py-2">Total</th>
              <th class="text-left py-2">Time</th>
              <th class="text-left py-2">Status</th>
              <th class="text-left py-2">Action</th>
            </tr>
          </thead>
          <tbody id="orders-table">
            ${orders.map(order => `
              <tr class="border-b">
                <td class="py-2">${order.id}</td>
                <td class="py-2">${order.student}</td>
                <td class="py-2">${order.items.join(', ')}</td>
                <td class="py-2">₹${order.total}</td>
                <td class="py-2">${order.timeSlot}</td>
                <td class="py-2">
                  <select class="text-sm border rounded px-2 py-1" onchange="updateOrderStatus('${order.id}', this.value)">
                    <option value="accepted" ${order.status === 'accepted' ? 'selected' : ''}>Accepted</option>
                    <option value="preparing" ${order.status === 'preparing' ? 'selected' : ''}>Preparing</option>
                    <option value="ready" ${order.status === 'ready' ? 'selected' : ''}>Ready</option>
                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                  </select>
                </td>
                <td class="py-2">
                  <button onclick="viewOrderDetails('${order.id}')" class="text-blue-600 hover:text-blue-700 text-sm">View</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Handle results upload
function handleResultsUpload(event) {
  const file = event.target.files[0];
  if (file) {
    showToast('Results uploaded successfully!', 'success');
    // In a real app, you would process the CSV file here
  }
}

// Handle attendance save
function handleAttendanceSave() {
  showToast('Attendance saved successfully!', 'success');
}

// Handle menu form
function handleMenuForm(event) {
  event.preventDefault();
  
  const name = document.getElementById('menu-name').value;
  const category = document.getElementById('menu-category').value;
  const price = document.getElementById('menu-price').value;
  const description = document.getElementById('menu-description').value;
  const availability = document.getElementById('menu-availability').value;
  
  if (editingMenuItem) {
    // Update existing item
    const item = menuItems.find(i => i.id === editingMenuItem);
    if (item) {
      item.name = name;
      item.category = category;
      item.price = parseFloat(price);
      item.description = description;
      item.availability = availability;
      showToast('Menu item updated successfully!', 'success');
    }
  } else {
    // Add new item
    const newItem = {
      id: menuItems.length + 1,
      name,
      category,
      price: parseFloat(price),
      description,
      availability
    };
    menuItems.push(newItem);
    showToast('Menu item added successfully!', 'success');
  }
  
  // Reset form
  document.getElementById('menu-form').reset();
  editingMenuItem = null;
  
  // Reload canteen tab
  loadCanteenTab();
}

// Edit menu item
function editMenuItem(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (!item) return;
  
  document.getElementById('menu-name').value = item.name;
  document.getElementById('menu-category').value = item.category;
  document.getElementById('menu-price').value = item.price;
  document.getElementById('menu-description').value = item.description;
  document.getElementById('menu-availability').value = item.availability;
  
  editingMenuItem = itemId;
}

// Cancel edit
function cancelEdit() {
  document.getElementById('menu-form').reset();
  editingMenuItem = null;
  loadCanteenTab();
}

// Delete menu item
function deleteMenuItem(itemId) {
  if (confirm('Are you sure you want to delete this menu item?')) {
    const index = menuItems.findIndex(i => i.id === itemId);
    if (index > -1) {
      menuItems.splice(index, 1);
      loadCanteenTab();
      showToast('Menu item deleted successfully!', 'success');
    }
  }
}

// Update order status
function updateOrderStatus(orderId, newStatus) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    showToast(`Order ${orderId} status updated to ${newStatus}`, 'success');
  }
}

// View order details
function viewOrderDetails(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    alert(`Order Details:\nID: ${order.id}\nStudent: ${order.student}\nItems: ${order.items.join(', ')}\nTotal: ₹${order.total}\nTime: ${order.timeSlot}\nStatus: ${order.status}`);
  }
}

// Export data
function exportData() {
  setTimeout(() => {
    const data = {
      students: students,
      menuItems: menuItems,
      orders: orders
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'campus_data.json';
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('Data exported successfully!', 'success');
  }, 1000);
}

// Setup dark mode
function setupDarkMode() {
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    document.body.classList.add('dark');
    const toggle = document.getElementById('dark-mode-toggle');
    if (toggle) toggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

// Toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  const toggle = document.getElementById('dark-mode-toggle');
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  localStorage.setItem('darkMode', isDark);
  toggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  showToast(isDark ? 'Dark mode enabled' : 'Light mode enabled', 'success');
}

// Global functions
window.editMenuItem = editMenuItem;
window.deleteMenuItem = deleteMenuItem;
window.cancelEdit = cancelEdit;
window.updateOrderStatus = updateOrderStatus;
window.viewOrderDetails = viewOrderDetails;
window.exportData = exportData;
window.handleLogout = handleLogout;
window.backupSystem = backupSystem; 