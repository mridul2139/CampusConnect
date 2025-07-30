// Dashboard JavaScript for CampusConnect

// Dummy data for students
const students = [
  { id: 1, name: 'Amit Sharma', rollNo: 'CS2024001', department: 'Computer Science', year: 3, cgpa: 8.5, attendance: 92 },
  { id: 2, name: 'Priya Singh', rollNo: 'CS2024002', department: 'Computer Science', year: 3, cgpa: 9.1, attendance: 95 },
  { id: 3, name: 'Rahul Verma', rollNo: 'ME2024001', department: 'Mechanical Engineering', year: 2, cgpa: 7.8, attendance: 88 },
  { id: 4, name: 'Sneha Patel', rollNo: 'EE2024001', department: 'Electrical Engineering', year: 4, cgpa: 8.9, attendance: 94 },
  { id: 5, name: 'Vikas Nair', rollNo: 'CE2024001', department: 'Civil Engineering', year: 1, cgpa: 8.2, attendance: 90 },
  { id: 6, name: 'Meera Iyer', rollNo: 'CS2024003', department: 'Computer Science', year: 3, cgpa: 8.7, attendance: 89 }
];

// Dummy data for results
const results = [
  { subject: 'Computer Science', grade: 'A', credits: 3, gpa: 4.0 },
  { subject: 'Mathematics', grade: 'A-', credits: 4, gpa: 3.7 },
  { subject: 'Physics', grade: 'B+', credits: 4, gpa: 3.3 },
  { subject: 'English', grade: 'A', credits: 3, gpa: 4.0 },
  { subject: 'History', grade: 'B', credits: 3, gpa: 3.0 },
  { subject: 'Chemistry', grade: 'A-', credits: 4, gpa: 3.7 }
];

// Dummy data for attendance
const attendance = [
  { subject: 'Computer Science', present: 18, total: 20, percentage: 90 },
  { subject: 'Mathematics', present: 19, total: 20, percentage: 95 },
  { subject: 'Physics', present: 17, total: 20, percentage: 85 },
  { subject: 'English', present: 20, total: 20, percentage: 100 },
  { subject: 'History', present: 16, total: 20, percentage: 80 },
  { subject: 'Chemistry', present: 18, total: 20, percentage: 90 }
];

let cgpaChart;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
  initializeDashboard();
  setupEventListeners();
});

function initializeDashboard() {
  loadResults();
  loadAttendance();
  initializeCGPAChart();
  setupDarkMode();
}

function setupEventListeners() {
  document.getElementById('chart-semester').addEventListener('click', () => updateChart('semester'));
  document.getElementById('chart-year').addEventListener('click', () => updateChart('year'));
  document.getElementById('download-report').addEventListener('click', downloadReport);
  document.getElementById('print-report').addEventListener('click', printReport);
  document.getElementById('search-btn').addEventListener('click', performSearch);
  
  const searchInput = document.getElementById('student-search');
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') performSearch();
  });
  
  // Show dropdown when input is focused
  searchInput.addEventListener('focus', function() {
    performSearch();
  });
  
  // Hide dropdown when clicking outside
  document.addEventListener('click', function(e) {
    const searchContainer = document.getElementById('search-results');
    const searchInput = document.getElementById('student-search');
    if (!searchInput.contains(e.target) && !searchContainer.contains(e.target)) {
      searchContainer.classList.add('hidden');
    }
  });
  
  document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
}

function performSearch() {
  const searchTerm = document.getElementById('student-search').value.trim().toLowerCase();
  const resultsContainer = document.getElementById('search-results');
  
  // Show all students if search term is empty
  if (!searchTerm) {
    const allStudents = students.map(student => `
      <div class="search-result-item" onclick="selectStudent('${student.id}')">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-medium text-gray-900">${student.name}</h4>
            <p class="text-sm text-gray-600">${student.rollNo} • ${student.department} • Year ${student.year}</p>
          </div>
          <div class="text-right">
            <div class="font-medium text-blue-600">CGPA: ${student.cgpa}</div>
            <div class="text-sm text-gray-600">Attendance: ${student.attendance}%</div>
          </div>
        </div>
      </div>
    `).join('');
    
    resultsContainer.innerHTML = allStudents;
    resultsContainer.classList.remove('hidden');
    return;
  }
  
  // Filter students based on search term
  const found = students.filter(student =>
    (student.name || '').toLowerCase().includes(searchTerm) ||
    (student.rollNo || '').toLowerCase().includes(searchTerm)
  );
  
  if (found.length === 0) {
    resultsContainer.innerHTML = '<p class="text-gray-500 text-center py-4">No students found</p>';
  } else {
    resultsContainer.innerHTML = found.map(student => `
      <div class="search-result-item" onclick="selectStudent('${student.id}')">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-medium text-gray-900">${student.name}</h4>
            <p class="text-sm text-gray-600">${student.rollNo} • ${student.department} • Year ${student.year}</p>
          </div>
          <div class="text-right">
            <div class="font-medium text-blue-600">CGPA: ${student.cgpa}</div>
            <div class="text-sm text-gray-600">Attendance: ${student.attendance}%</div>
          </div>
        </div>
      </div>
    `).join('');
  }
  resultsContainer.classList.remove('hidden');
}

window.selectStudent = function(studentId) {
  const student = students.find(s => s.id == studentId);
  if (!student) return;
  document.querySelector('.dashboard-header h1').textContent = `${student.name}'s Dashboard`;
  document.querySelector('.dashboard-header p').textContent = `Roll No: ${student.rollNo} • ${student.department} • Year ${student.year}`;
  document.querySelector('.dashboard-card:nth-child(1) .text-3xl').textContent = student.cgpa;
  document.querySelector('.dashboard-card:nth-child(2) .text-3xl').textContent = `${student.attendance}%`;
  document.getElementById('search-results').classList.add('hidden');
  document.getElementById('student-search').value = '';
  showToast(`Switched to ${student.name}'s dashboard`, 'success');
};

function loadResults() {
  const tableBody = document.getElementById('results-table');
  tableBody.innerHTML = '';
  results.forEach(result => {
    const row = document.createElement('tr');
    row.className = 'border-b border-gray-100 hover:bg-gray-50';
    row.innerHTML = `
      <td class="py-3 px-4">${result.subject}</td>
      <td class="py-3 px-4">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          ${result.grade}
        </span>
      </td>
      <td class="py-3 px-4">${result.credits}</td>
      <td class="py-3 px-4 font-medium">${result.gpa}</td>
    `;
    tableBody.appendChild(row);
  });
}

function loadAttendance() {
  const container = document.getElementById('attendance-container');
  container.innerHTML = '';
  attendance.forEach(att => {
    const statusClass = att.percentage >= 90 ? 'attendance-good' : att.percentage >= 75 ? 'attendance-warning' : 'attendance-poor';
    const card = document.createElement('div');
    card.className = `attendance-card ${statusClass}`;
    card.innerHTML = `
      <div class="flex justify-between items-center mb-2">
        <h4 class="font-medium text-gray-900">${att.subject}</h4>
        <span class="text-sm font-medium">${att.percentage}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${att.percentage}%"></div>
      </div>
      <p class="text-xs text-gray-600 mt-1">${att.present}/${att.total} classes attended</p>
    `;
    container.appendChild(card);
  });
}

function initializeCGPAChart() {
  const ctx = document.getElementById('cgpaChart').getContext('2d');
  // For demo, use static data. You can aggregate from results if needed.
  cgpaChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
      datasets: [{
        label: 'CGPA',
        data: results.slice(0, 6).map(r => parseFloat(r.gpa)),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: false, min: 2.5, max: 4.0, ticks: { stepSize: 0.5 } } }
    }
  });
}

function updateChart(type) {
  const semesterBtn = document.getElementById('chart-semester');
  const yearBtn = document.getElementById('chart-year');
  if (type === 'semester') {
    semesterBtn.className = 'text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full';
    yearBtn.className = 'text-sm text-gray-600 px-3 py-1 rounded-full hover:bg-gray-100';
    cgpaChart.data.labels = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'];
    cgpaChart.data.datasets[0].data = results.slice(0, 6).map(r => parseFloat(r.gpa));
  } else {
    yearBtn.className = 'text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full';
    semesterBtn.className = 'text-sm text-gray-600 px-3 py-1 rounded-full hover:bg-gray-100';
    cgpaChart.data.labels = ['Year 1', 'Year 2', 'Year 3', 'Year 4'];
    cgpaChart.data.datasets[0].data = [3.2, 3.4, 3.6, 3.8]; // Example, aggregate as needed
  }
  cgpaChart.update();
}

function downloadReport() {
  showToast('Report download started...', 'success');
  setTimeout(() => {
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(generateReportText());
    link.download = 'academic_report.txt';
    link.click();
    showToast('Report downloaded successfully!', 'success');
  }, 2000);
}

function printReport() {
  showToast('Opening print dialog...', 'success');
  setTimeout(() => { window.print(); }, 1000);
}

function generateReportText() {
  const cgpa = results.reduce((sum, r) => sum + parseFloat(r.gpa), 0) / (results.length || 1);
  const att = attendance.reduce((sum, a) => sum + parseFloat(a.percentage), 0) / (attendance.length || 1);
  return `CampusConnect Academic Report\nGenerated on: ${new Date().toLocaleDateString()}\n\nACADEMIC PERFORMANCE:\nCurrent CGPA: ${cgpa.toFixed(2)}\nOverall Attendance: ${att.toFixed(1)}%\n`;
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