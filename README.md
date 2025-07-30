# CampusConnect - Digital Campus Management Platform

A fully responsive and visually attractive campus management website built with HTML, CSS, and JavaScript. This project simulates core student and admin features with dummy/static data to demonstrate a comprehensive educational platform.

## 🌟 Features

### Student Dashboard (`dashboard.html`)
- **Academic Results**: View semester results with downloadable mock report cards
- **CGPA Trend Analysis**: Interactive charts using Chart.js showing academic progress
- **Attendance Tracking**: Subject-wise attendance with visual progress indicators
- **Student Search**: Enhanced search functionality with dropdown showing all students
- **Dark Mode**: Toggle between light and dark themes
- **Report Generation**: Download and print academic reports

### Canteen Services (`canteen.html`)
- **Full Menu System**: Browse menu items categorized by type (Main Course, Snacks, Beverages)
- **Shopping Cart**: Add items to cart with quantity controls
- **Order Management**: Place orders with time slot selection and customer details
- **Order Tracking**: Real-time order status tracking with simulated updates
- **Order History**: View past orders and their status
- **Menu Filtering**: Filter menu items by category

### Admin Panel (`admin.html`)
- **Secure Login**: Authentication with credentials (admin/admin123) - **FIXED**
- **Results Management**: Upload and manage student results with CSV simulation
- **Attendance Entry**: Mark and manage student attendance across subjects
- **Canteen Menu Editor**: Add, edit, and delete menu items with full CRUD operations
- **Order Management**: Update order statuses and manage canteen orders
- **Data Export**: Export system data in JSON format
- **System Backup**: Simulated backup functionality

### Landing Page (`index.html`)
- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Elements**: Floating cards, smooth scrolling, and hover effects
- **Feature Showcase**: Comprehensive overview of platform capabilities
- **Navigation**: Direct links to Dashboard, Canteen, and Admin Panel

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely client-side

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start exploring the platform!

### File Structure
```
CampusConnect/
├── index.html              # Landing page with navigation
├── dashboard.html          # Student dashboard with search
├── canteen.html           # Canteen ordering system
├── admin.html             # Admin panel with login
├── 404.html              # Error page
├── demo-data.json         # Sample data for the platform
├── css/
│   └── style.css         # Main stylesheet (943 lines)
├── js/
│   ├── main.js           # Common functionality (281 lines)
│   ├── dashboard.js      # Student dashboard logic (263 lines)
│   ├── canteen.js        # Canteen functionality (384 lines)
│   └── admin.js          # Admin panel logic (656 lines)
└── README.md             # This file
```

## 🎯 How to Use

### For Students
1. **Access Dashboard**: Click "Student Dashboard" from the homepage
2. **Search Students**: Use the search functionality to find students by name or roll number
3. **View Results**: Check academic performance and CGPA trends
4. **Track Attendance**: Monitor attendance across all subjects
5. **Order Food**: Navigate to canteen to browse menu and place orders
6. **Download Reports**: Generate and download academic reports

### For Canteen Users
1. **Browse Menu**: View menu items categorized by type
2. **Add to Cart**: Use quantity controls to add items to cart
3. **Place Order**: Select time slot and provide customer details
4. **Track Orders**: Monitor order status and view order history
5. **Filter Menu**: Use category filters to find specific items

### For Administrators
1. **Login**: Use credentials `admin` / `admin123`
2. **Manage Results**: Upload student results via the Results Management tab
3. **Mark Attendance**: Use the Attendance Entry tab to record student attendance
4. **Update Menu**: Add, edit, or remove items from the canteen menu
5. **Handle Orders**: Update order statuses in the Order Management tab
6. **Export Data**: Export system data in JSON format

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Tailwind CSS framework
- **JavaScript (ES6+)**: Interactive functionality and data management
- **Chart.js**: Data visualization for CGPA trends
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Inter font family for typography

### Key Features
- **Responsive Design**: Mobile-first approach with breakpoints
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **Local Storage**: Data persistence across browser sessions
- **Modular Architecture**: Separated concerns with dedicated JS files
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation
- **Error Handling**: Comprehensive error handling and debugging support

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎨 Design Features

### Visual Elements
- **Gradient Backgrounds**: Modern color schemes throughout
- **Card-based Layout**: Clean, organized information presentation
- **Smooth Animations**: CSS transitions and hover effects
- **Interactive Charts**: Dynamic data visualization
- **Status Indicators**: Color-coded progress and status elements
- **Toast Notifications**: Real-time feedback for user actions

### User Experience
- **Intuitive Navigation**: Clear menu structure and breadcrumbs
- **Enhanced Search**: Dropdown functionality for student search
- **Loading States**: Visual feedback during operations
- **Error Handling**: Graceful error pages and validation
- **Mobile Optimization**: Touch-friendly interface elements
- **Dark Mode**: Toggle between light and dark themes

## 📱 Mobile Responsiveness

The platform is fully responsive and optimized for:
- **Mobile Phones**: 320px - 768px
- **Tablets**: 768px - 1024px
- **Desktop**: 1024px and above

Key mobile features:
- Hamburger menu for navigation
- Touch-friendly buttons and forms
- Optimized layouts for small screens
- Swipe gestures for interactive elements

## 🔧 Recent Fixes and Improvements

### Admin Login Issue - RESOLVED ✅
- **Problem**: Admin panel not displaying after login
- **Root Cause**: CSS specificity issue with `.hidden` class
- **Solution**: Updated to use `classList.remove('hidden')` instead of inline styles
- **Status**: Fully functional with proper debugging support

### Data Consistency - VERIFIED ✅
- **Chicken Biryani**: Consistently available across all menu sources
- **Pricing**: Standardized pricing in Indian Rupees (₹)
- **Menu Items**: Synchronized across admin panel and canteen

### Enhanced Student Search - IMPLEMENTED ✅
- **Dropdown Display**: Shows all students when search input is focused
- **Comprehensive Info**: Displays name, roll number, department, year, CGPA, attendance
- **Quick Selection**: Clickable dropdown items for easy student switching
- **Auto-hide**: Dropdown hides when clicking outside

## 🔧 Customization

### Adding New Features
1. **New Pages**: Create HTML files following the existing structure
2. **Styling**: Add CSS classes using Tailwind or custom styles
3. **Functionality**: Extend JavaScript files with new modules
4. **Data**: Update sample data objects in respective JS files

### Modifying Existing Features
- **Colors**: Update CSS custom properties in `style.css`
- **Layout**: Modify Tailwind classes in HTML files
- **Data**: Edit sample data in JavaScript files
- **Functionality**: Update event handlers and logic

## 🚀 Performance Optimizations

- **Minified Dependencies**: CDN links for faster loading
- **Lazy Loading**: Images and non-critical resources
- **Efficient CSS**: Tailwind's utility-first approach
- **Optimized JavaScript**: Modular code structure
- **Caching**: Local storage for data persistence
- **Debugging Support**: Comprehensive console logging

## 🔒 Security Considerations

This is a demonstration project with simulated data. In a production environment, consider:
- **Server-side Validation**: All user inputs
- **HTTPS**: Secure data transmission
- **Authentication**: Proper user management
- **Data Encryption**: Sensitive information protection
- **Input Sanitization**: Prevent XSS attacks

## 📄 License

This project is created for educational and demonstration purposes. Feel free to use, modify, and distribute as needed.

## 🤝 Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


---

**CampusConnect** - Empowering education through innovative technology solutions.

**Project Status**: ✅ All core features functional and tested
