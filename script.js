// ===========================
// DESI AGRI - MAIN SCRIPT
// ===========================

// State Management
const appState = {
    isLoggedIn: false,
    farmer: {
        name: '',
        phone: '',
        region: ''
    },
    selectedCrop: null
};

// Crop Database
const cropsDatabase = {
    wheat: {
        name: 'Wheat',
        season: 'Winter (Oct-Mar)',
        daysToMaturity: 120,
        waterNeeds: 'Moderate',
        soilType: 'Well-drained loam',
        bestPractices: [
            'Sow in rows with 23 cm spacing',
            'Irrigate 4-5 times during growing season',
            'Apply nitrogen fertilizer in 2-3 splits',
            'Harvest when grain becomes hard'
        ],
        pests: 'Armyworm, Aphids',
        diseases: 'Rust, Smut'
    },
    rice: {
        name: 'Rice',
        season: 'Summer-Monsoon (Jun-Oct)',
        daysToMaturity: 120,
        waterNeeds: 'High',
        soilType: 'Clayey loam',
        bestPractices: [
            'Maintain 5 cm water depth in field',
            'Transplant seedlings after 30-35 days',
            'Use high-quality seeds for better yield',
            'Harvest at 80% maturity of grain'
        ],
        pests: 'Stem borer, Leaf folder',
        diseases: 'Blast, Brown spot'
    },
    sugarcane: {
        name: 'Sugarcane',
        season: 'Year-round (Oct-May best)',
        daysToMaturity: 360,
        waterNeeds: 'Very High',
        soilType: 'Deep fertile loam',
        bestPractices: [
            'Plant setts with 2-3 buds',
            'Irrigate every 10-15 days',
            'Apply compost and manure regularly',
            'Intercrop with legumes'
        ],
        pests: 'Top borer, Scale insects',
        diseases: 'Red rot, Wilt'
    },
    corn: {
        name: 'Corn',
        season: 'Summer & Monsoon',
        daysToMaturity: 120,
        waterNeeds: 'Moderate-High',
        soilType: 'Fertile well-drained loam',
        bestPractices: [
            'Space plants 20 cm apart in rows',
            'Provide 4-5 irrigations during season',
            'Use quality hybrid seeds',
            'Harvest when kernels are milky'
        ],
        pests: 'Stem borer, Fall armyworm',
        diseases: 'Leaf spot, Rust'
    },
    cotton: {
        name: 'Cotton',
        season: 'Summer (Mar-Oct)',
        daysToMaturity: 180,
        waterNeeds: 'High',
        soilType: 'Well-drained black soil',
        bestPractices: [
            'Sow in rows 90 cm apart',
            'Use 20 kg seeds per hectare',
            'Irrigate at flowering and boll formation',
            'Prune unnecessary branches'
        ],
        pests: 'Bollworm, Whiteflies',
        diseases: 'Leaf curl, Fusarium wilt'
    },
    potato: {
        name: 'Potato',
        season: 'Winter (Oct-Mar)',
        daysToMaturity: 90,
        waterNeeds: 'Moderate',
        soilType: 'Loose fertile loam',
        bestPractices: [
            'Use certified quality seeds',
            'Space 20x60 cm apart',
            'Provide 3-4 irrigations',
            'Harvest 90 days after planting'
        ],
        pests: 'Aphids, Cut worms',
        diseases: 'Late blight, Scab'
    }
};

// Weather Forecast Data
const weatherForecast = [
    { day: 'Mon', temp: '28°C', condition: '☀️' },
    { day: 'Tue', temp: '26°C', condition: '⛅' },
    { day: 'Wed', temp: '24°C', condition: '🌧️' },
    { day: 'Thu', temp: '25°C', condition: '⛅' },
    { day: 'Fri', temp: '29°C', condition: '☀️' },
    { day: 'Sat', temp: '30°C', condition: '☀️' },
    { day: 'Sun', temp: '27°C', condition: '⛅' }
];

// Government Schemes Data
const schemes = [
    {
        name: 'PM-KISAN',
        description: 'Direct income support to farmers',
        benefit: '₹6,000/year in 3 installments',
        eligibility: 'All farmer families'
    },
    {
        name: 'Pradhan Mantri Fasal Bima Yojana',
        description: 'Crop insurance scheme',
        benefit: 'Coverage up to crop value',
        eligibility: 'All farmers'
    },
    {
        name: 'Soil Health Card Scheme',
        description: 'Free soil testing and cards',
        benefit: 'Personalized fertilizer recommendation',
        eligibility: 'All farmers'
    },
    {
        name: 'Kisan Vikas Patra',
        description: 'Savings scheme for farmers',
        benefit: '7.5% annual interest',
        eligibility: 'Farmers with ₹1,000+',
        eligibility: 'Farmers saving for investment'
    },
    {
        name: 'National Agriculture Market (e-NAM)',
        description: 'Online trading platform',
        benefit: 'Direct market access, better prices',
        eligibility: 'All farmers'
    },
    {
        name: 'Krishi Sinchayee Yojana',
        description: 'Irrigation infrastructure development',
        benefit: '50% subsidy on equipment',
        eligibility: 'Farmers with suitable land'
    }
];

// AI Chatbot Responses
const chatbotResponses = {
    'increase yield': 'To increase crop yield: 1) Use certified quality seeds, 2) Apply organic manure and compost, 3) Follow proper spacing and irrigation, 4) Monitor soil health regularly, 5) Practice crop rotation, 6) Use integrated pest management.',
    'pest control': 'Pest Control Tips: 1) Regular field inspection, 2) Use resistant varieties, 3) Practice crop rotation, 4) Apply neem oil or organic pesticides, 5) Release natural predators, 6) Maintain field hygiene. Avoid chemical pesticides when possible.',
    'soil preparation': 'Soil Preparation: 1) Test soil pH and nutrients, 2) Add 5-10 tons compost per hectare, 3) Plow 3-4 times, 4) Remove weeds and stones, 5) Level the field, 6) Provide drainage. Good soil ensures better yield.',
    'water management': 'Water Management: 1) Check soil moisture before irrigation, 2) Water early morning or evening, 3) Drip irrigation saves 40% water, 4) Mulching reduces evaporation, 5) Avoid waterlogging, 6) Rainwater harvesting for dry season.',
    'fertilizer': 'Fertilizer Guide: 1) Conduct soil test first, 2) Use NPK in recommended ratios, 3) Organic manure for soil health, 4) Split applications for better uptake, 5) Bio-fertilizers improve soil bacteria, 6) Avoid excessive chemical fertilizers.',
    'crop rotation': 'Crop Rotation Benefits: 1) Breaks pest cycles, 2) Improves soil nitrogen, 3) Reduces disease pressure, 4) Diversifies income, 5) Maintains soil fertility. Rotate with legumes for nitrogen fixation.',
    'weather': 'Monitor weather daily for better planning. Heavy rain: drain fields, reduce irrigation. High heat: increase watering, use mulching. Strong winds: support tall crops. Frost: use protective measures.',
    'default': 'I can help with crop advisory, pest control, soil management, water usage, fertilizers, government schemes, and general farming tips. What would you like to know?'
};

// ===========================
// DOM ELEMENTS
// ===========================

const loginPage = document.getElementById('login-page');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const farmerGreeting = document.getElementById('farmer-greeting');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const quickButtons = document.querySelectorAll('.quick-btn');

// ===========================
// EVENT LISTENERS
// ===========================

// Login Form Submit
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleLogin();
});

// Logout Button
logoutBtn.addEventListener('click', handleLogout);

// Navigation Tabs
navBtns.forEach(btn => {
    btn.addEventListener('click', () => handleTabSwitch(btn));
});

// Chat Form
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleChatSubmit();
});

// Quick Question Buttons
quickButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const question = btn.dataset.question;
        chatInput.value = question;
    });
});

// Crop Selection
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('crop-btn')) {
        handleCropSelection(e.target);
    }
});

// ===========================
// LOGIN FUNCTIONALITY
// ===========================

function handleLogin() {
    const name = document.getElementById('farmer-name').value;
    const phone = document.getElementById('farmer-phone').value;
    const region = document.getElementById('farmer-region').value;

    // Validation
    if (!name || !phone || !region) {
        alert('Please fill all fields');
        return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
        alert('Please enter a valid 10-digit phone number');
        return;
    }

    // Set app state
    appState.isLoggedIn = true;
    appState.farmer = { name, phone, region };

    // Update UI
    farmerGreeting.textContent = `Welcome, ${name}!`;
    loginPage.classList.add('hidden');
    dashboard.classList.remove('hidden');

    // Initialize dashboard
    initializeDashboard();
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        appState.isLoggedIn = false;
        appState.farmer = { name: '', phone: '', region: '' };
        
        loginPage.classList.remove('hidden');
        dashboard.classList.add('hidden');
        
        // Reset forms
        loginForm.reset();
        document.getElementById('chat-messages').innerHTML = 
            '<div class="message bot-message"><p>Hello! I\'m your AI farming assistant. Ask me anything about crops, weather, soil, or farming techniques.</p></div>';
    }
}

// ===========================
// DASHBOARD INITIALIZATION
// ===========================

function initializeDashboard() {
    // Initialize forecast
    initializeWeatherForecast();
    
    // Initialize crops
    initializeCropAdvisory();
    
    // Initialize schemes
    initializeSchemes();
}

function initializeWeatherForecast() {
    const forecastGrid = document.getElementById('forecast-grid');
    forecastGrid.innerHTML = '';

    weatherForecast.forEach(day => {
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <p class="forecast-day">${day.day}</p>
            <div class="forecast-icon">${day.condition}</div>
            <p class="forecast-temp">${day.temp}</p>
        `;
        forecastGrid.appendChild(forecastItem);
    });
}

function initializeCropAdvisory() {
    const cropSelector = document.getElementById('crop-selector');
    cropSelector.innerHTML = '';

    Object.keys(cropsDatabase).forEach(cropKey => {
        const crop = cropsDatabase[cropKey];
        const btn = document.createElement('button');
        btn.className = 'crop-btn';
        btn.textContent = crop.name;
        btn.dataset.crop = cropKey;
        cropSelector.appendChild(btn);
    });
}

function initializeSchemes() {
    const schemesGrid = document.getElementById('schemes-grid');
    schemesGrid.innerHTML = '';

    schemes.forEach(scheme => {
        const schemeCard = document.createElement('div');
        schemeCard.className = 'scheme-card card';
        schemeCard.innerHTML = `
            <h3>${scheme.name}</h3>
            <p>${scheme.description}</p>
            <div class="scheme-details">
                <strong>Benefit:</strong> ${scheme.benefit}<br>
                <strong>Eligibility:</strong> ${scheme.eligibility}
            </div>
            <button class="btn-more">Learn More</button>
        `;
        schemesGrid.appendChild(schemeCard);
    });
}

// ===========================
// TAB SWITCHING
// ===========================

function handleTabSwitch(btn) {
    // Remove active class from all buttons and contents
    navBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(tc => tc.classList.remove('active'));

    // Add active class to clicked button and corresponding content
    btn.classList.add('active');
    const tabId = btn.dataset.tab;
    document.getElementById(tabId).classList.add('active');
}

// ===========================
// CROP ADVISORY
// ===========================

function handleCropSelection(btn) {
    const cropKey = btn.dataset.crop;
    const crop = cropsDatabase[cropKey];

    // Update button states
    document.querySelectorAll('.crop-btn').forEach(b => {
        b.classList.remove('active');
    });
    btn.classList.add('active');

    // Update advisory details
    const advisoryDetails = document.getElementById('advisory-details');
    advisoryDetails.innerHTML = `
        <h2>${crop.name}</h2>
        <div class="crop-info">
            <div class="info-item">
                <strong>Season:</strong> ${crop.season}
            </div>
            <div class="info-item">
                <strong>Days to Maturity:</strong> ${crop.daysToMaturity} days
            </div>
            <div class="info-item">
                <strong>Water Needs:</strong> ${crop.waterNeeds}
            </div>
            <div class="info-item">
                <strong>Ideal Soil:</strong> ${crop.soilType}
            </div>
            <div class="info-item">
                <strong>Common Pests:</strong> ${crop.pests}
            </div>
            <div class="info-item">
                <strong>Common Diseases:</strong> ${crop.diseases}
            </div>
        </div>
        
        <h3>Cultivation Tips</h3>
        <ul>
            ${crop.bestPractices.map(practice => `<li>${practice}</li>`).join('')}
        </ul>
    `;

    appState.selectedCrop = cropKey;
}

// ===========================
// CHATBOT FUNCTIONALITY
// ===========================

function handleChatSubmit() {
    const message = chatInput.value.trim();

    if (!message) return;

    // Add user message
    addChatMessage(message, 'user');

    // Clear input
    chatInput.value = '';

    // Simulate bot response delay
    setTimeout(() => {
        const response = generateChatResponse(message);
        addChatMessage(response, 'bot');
    }, 500);
}

function addChatMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateChatResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // Check for matching keywords
    for (const [keyword, response] of Object.entries(chatbotResponses)) {
        if (message.includes(keyword)) {
            return response;
        }
    }

    // If no keyword match, check if it's about selected crop
    if (appState.selectedCrop) {
        const crop = cropsDatabase[appState.selectedCrop];
        return `For ${crop.name}: Season is ${crop.season}, it takes ${crop.daysToMaturity} days to mature. Focus on ${crop.waterNeeds} watering and grow in ${crop.soilType}.`;
    }

    // Default response
    return chatbotResponses.default;
}

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Focus on farmer name input
    document.getElementById('farmer-name').focus();
});

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Get farmer's region-specific recommendations (expandable)
function getRegionSpecificTips(region) {
    const regionTips = {
        north: 'North India: Focus on wheat, sugarcane, and rice. Winter crops are most productive.',
        south: 'South India: Ideal for rice, coconut, and spices. Monsoon is critical for rainfall.',
        east: 'East India: Rice is primary crop. High humidity - watch for fungal diseases.',
        west: 'West India: Cotton, groundnut are major crops. Manage water carefully in dry regions.'
    };
    return regionTips[region] || 'Select your region for specific tips.';
}

// Add this for console debugging (optional)
function logAppState() {
    console.log('App State:', appState);
}

// Format date for display
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}