// Main JavaScript functionality for AZU website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize website functionality
function initializeWebsite() {
    setupNavigation();
    loadContent();
    setupSmoothScrolling();
}

// Setup navigation functionality
function setupNavigation() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'true');
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-opacity-90');
            } else {
                navbar.classList.remove('bg-opacity-90');
            }
        });
    }

    // Close mobile menu when clicking on links
    if (mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                if (mobileMenuButton) {
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
}

// Load content from JSON file
async function loadContent() {
    try {
        const response = await fetch('./data/content.json');
        if (!response.ok) {
            throw new Error('Failed to load content');
        }
        const data = await response.json();
        populateContent(data);
    } catch (error) {
        console.error('Error loading content:', error);
        // Use fallback content if JSON fails to load
        populateContent(getFallbackContent());
    }
}

// Populate HTML sections with content
function populateContent(data) {
    populateMusicSection(data.music);
    populateAboutSection(data.about);
    populateMerchSection(data.merch);
    populateNewsSection(data.news);
    populateContactSection(data.contact);
}

// Populate music section
function populateMusicSection(musicData) {
    const musicContent = document.getElementById('music-content');
    if (!musicContent || !musicData) return;

    musicContent.innerHTML = '';

    musicData.albums.forEach(album => {
        const albumCard = createAlbumCard(album);
        musicContent.appendChild(albumCard);
    });
}

// Create album card element
function createAlbumCard(album) {
    const card = document.createElement('div');
    card.className = 'bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300';
    
    card.innerHTML = `
        <div class="relative">
            <img src="${album.artwork}" alt="${album.title}" class="w-full h-64 object-cover" loading="lazy" onerror="this.src='./assets/images/placeholder-album.jpg'">
            <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button class="bg-azu-purple hover:bg-azu-indigo text-white rounded-full p-4 transform hover:scale-110 transition-all duration-200" onclick="playAlbum('${album.id}')" aria-label="Play ${album.title}">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 5v10l8-5-8-5z"/>
                    </svg>
                </button>
            </div>
        </div>
        <div class="p-6">
            <h3 class="text-xl font-bold text-white mb-2">${album.title}</h3>
            <p class="text-gray-400 mb-4">${album.tracks.length} tracks</p>
            <div class="space-y-2">
                ${album.tracks.map((track, index) => `
                    <div class="flex items-center justify-between text-sm text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer" onclick="playTrack('${album.id}', ${index})">
                        <span>${track.title}</span>
                        <span>${track.duration}</span>
                    </div>
                `).join('')}
            </div>
            <div class="mt-4 flex space-x-2">
                ${album.streamingLinks ? Object.entries(album.streamingLinks).map(([platform, url]) => `
                    <a href="${url}" target="_blank" rel="noopener noreferrer" class="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded-full text-xs transition-colors duration-200">
                        ${platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                `).join('') : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Populate merch section
function populateMerchSection(merchData) {
    const merchContent = document.getElementById('merch-content');
    if (!merchContent || !merchData) return;

    merchContent.innerHTML = '';

    merchData.items.forEach(item => {
        const merchCard = createMerchCard(item);
        merchContent.appendChild(merchCard);
    });

    // Setup merch filter functionality
    setupMerchFilters(merchData.items);
}

// Create merch card element
function createMerchCard(item) {
    const card = document.createElement('div');
    card.className = `bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 merch-item`;
    card.setAttribute('data-category', item.category);
    
    card.innerHTML = `
        <div class="relative">
            <img src="${item.image}" alt="${item.name}" class="w-full h-64 object-cover" loading="lazy" onerror="this.src='./assets/images/placeholder-merch.jpg'">
            <div class="absolute top-2 right-2">
                <span class="bg-azu-purple bg-opacity-90 text-white px-2 py-1 rounded-full text-xs font-medium">
                    ${item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </span>
            </div>
            ${item.isNew ? `
                <div class="absolute top-2 left-2">
                    <span class="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        NEW
                    </span>
                </div>
            ` : ''}
            ${item.discount ? `
                <div class="absolute bottom-2 left-2">
                    <span class="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        ${item.discount}% OFF
                    </span>
                </div>
            ` : ''}
        </div>
        <div class="p-4">
            <h3 class="text-lg font-bold text-white mb-2">${item.name}</h3>
            <p class="text-gray-400 text-sm mb-3 line-clamp-2">${item.description}</p>
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-2">
                    ${item.originalPrice && item.originalPrice !== item.price ? `
                        <span class="text-gray-500 line-through text-sm">$${item.originalPrice}</span>
                    ` : ''}
                    <span class="text-white font-bold text-lg">$${item.price}</span>
                </div>
                <div class="flex items-center space-x-1">
                    ${generateStarRating(item.rating)}
                    <span class="text-gray-400 text-sm">(${item.reviews || 0})</span>
                </div>
            </div>
            ${item.sizes && item.sizes.length > 0 ? `
                <div class="mb-3">
                    <p class="text-gray-400 text-xs mb-1">Available sizes:</p>
                    <div class="flex space-x-1">
                        ${item.sizes.map(size => `
                            <span class="bg-gray-700 text-white px-2 py-1 rounded text-xs">${size}</span>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            <div class="flex space-x-2">
                <button class="flex-1 bg-azu-purple hover:bg-azu-indigo text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-azu-purple" onclick="addToCart('${item.id}')">
                    Add to Cart
                </button>
                <button class="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500" onclick="toggleWishlist('${item.id}')" aria-label="Add to wishlist">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHTML += '<svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<svg class="w-4 h-4 text-gray-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
    }
    
    return starsHTML;
}

// Setup merch filter functionality
function setupMerchFilters(items) {
    const filterButtons = document.querySelectorAll('.merch-filter-btn');
    const merchItems = document.querySelectorAll('.merch-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-azu-purple');
                btn.classList.add('bg-gray-700');
            });
            this.classList.add('active', 'bg-azu-purple');
            this.classList.remove('bg-gray-700');
            
            // Filter items
            merchItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    item.classList.add('animate-fade-in');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('animate-fade-in');
                }
            });
        });
    });
}

// Add to cart function
function addToCart(itemId) {
    // Simulate adding to cart
    showNotification('Item added to cart!', 'success');
    console.log('Added to cart:', itemId);
    
    // Here you would typically:
    // 1. Add item to cart state/localStorage
    // 2. Update cart counter
    // 3. Send to backend if needed
}

// Toggle wishlist function
function toggleWishlist(itemId) {
    // Simulate wishlist toggle
    showNotification('Added to wishlist!', 'info');
    console.log('Toggled wishlist:', itemId);
    
    // Here you would typically:
    // 1. Toggle item in wishlist state/localStorage
    // 2. Update wishlist UI
    // 3. Send to backend if needed
}

// Populate about section
function populateAboutSection(aboutData) {
    const aboutContent = document.getElementById('about-content');
    if (!aboutContent || !aboutData) return;

    aboutContent.innerHTML = `
        <div class="order-2 lg:order-1">
            <img src="${aboutData.image}" alt="AZU" class="w-full max-w-md mx-auto rounded-lg shadow-2xl" loading="lazy" onerror="this.src='./assets/images/placeholder-artist.jpg'">
        </div>
        <div class="order-1 lg:order-2 prose prose-lg prose-invert">
            <p class="text-gray-300 leading-relaxed text-lg">
                ${aboutData.biography}
            </p>
            <div class="flex space-x-4 mt-8">
                ${aboutData.socialMedia ? Object.entries(aboutData.socialMedia).map(([platform, url]) => `
                    <a href="${url}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-azu-purple transition-colors duration-200" aria-label="${platform}">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            ${getSocialIcon(platform)}
                        </svg>
                    </a>
                `).join('') : ''}
            </div>
        </div>
    `;
}

// Populate news section
function populateNewsSection(newsData) {
    const newsContent = document.getElementById('news-content');
    if (!newsContent || !newsData) return;

    newsContent.innerHTML = '';

    newsData.forEach(item => {
        const newsCard = createNewsCard(item);
        newsContent.appendChild(newsCard);
    });
}

// Create news card element
function createNewsCard(newsItem) {
    const card = document.createElement('div');
    card.className = 'bg-gray-700 rounded-lg shadow-md p-6 border-l-4 border-azu-purple';
    
    const date = new Date(newsItem.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    card.innerHTML = `
        <div class="flex items-start justify-between mb-4">
            <span class="bg-azu-purple bg-opacity-20 text-azu-purple px-3 py-1 rounded-full text-sm font-medium">
                ${date}
            </span>
        </div>
        <h3 class="text-xl font-bold text-white mb-3">${newsItem.title}</h3>
        <p class="text-gray-300 leading-relaxed">${newsItem.content}</p>
        ${newsItem.link ? `
            <a href="${newsItem.link}" target="_blank" rel="noopener noreferrer" class="inline-block mt-4 bg-azu-purple hover:bg-azu-indigo text-white px-4 py-2 rounded-md transition-colors duration-200">
                Read More
            </a>
        ` : ''}
    `;
    
    return card;
}

// Populate contact section
function populateContactSection(contactData) {
    const contactContent = document.getElementById('contact-content');
    if (!contactContent || !contactData) return;

    contactContent.innerHTML = `
        <form class="space-y-4" onsubmit="handleContactForm(event)">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input type="text" id="name" name="name" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-azu-purple focus:border-transparent transition-colors duration-200">
            </div>
            <div>
                <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input type="email" id="email" name="email" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-azu-purple focus:border-transparent transition-colors duration-200">
            </div>
            <div>
                <label for="message" class="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea id="message" name="message" rows="4" required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-azu-purple focus:border-transparent transition-colors duration-200"></textarea>
            </div>
            <button type="submit" class="w-full bg-azu-purple hover:bg-azu-indigo text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-azu-purple focus:ring-offset-2 focus:ring-offset-gray-900">
                Send Message
            </button>
        </form>
        <div class="mt-8 text-center">
            <p class="text-gray-400 mb-4">Or reach out directly:</p>
            <a href="mailto:${contactData.email}" class="text-azu-purple hover:text-azu-indigo transition-colors duration-200">
                ${contactData.email}
            </a>
        </div>
    `;
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to section function (used by hero button)
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Handle contact form submission
function handleContactForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    // Simulate form submission (replace with actual form handling)
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    event.target.reset();
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-md shadow-lg transition-all duration-300 ${
        type === 'success' ? 'bg-green-600 text-white' :
        type === 'error' ? 'bg-red-600 text-white' :
        'bg-blue-600 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Get social media icon SVG
function getSocialIcon(platform) {
    const icons = {
        instagram: '<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-2.508 0-4.541-2.033-4.541-4.541s2.033-4.541 4.541-4.541 4.541 2.033 4.541 4.541-2.033 4.541-4.541 4.541zm7.49-8.094c-.587 0-1.063-.476-1.063-1.063s.476-1.063 1.063-1.063 1.063.476 1.063 1.063-.476 1.063-1.063 1.063z"/>',
        spotify: '<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>',
        twitter: '<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>',
        facebook: '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>'
    };
    return icons[platform] || '';
}

// Fallback content if JSON fails to load
function getFallbackContent() {
    return {
        music: {
            albums: [
                {
                    id: 'album1',
                    title: 'Sample Album',
                    artwork: './assets/images/placeholder-album.jpg',
                    tracks: [
                        { title: 'Sample Track 1', duration: '3:45' },
                        { title: 'Sample Track 2', duration: '4:12' }
                    ],
                    streamingLinks: {
                        spotify: '#',
                        apple: '#'
                    }
                }
            ]
        },
        merch: {
            items: [
                {
                    id: 'merch1',
                    name: 'AZU Logo T-Shirt',
                    description: 'Premium cotton t-shirt featuring the iconic AZU logo design',
                    price: '29.99',
                    originalPrice: '39.99',
                    image: './assets/images/placeholder-merch.jpg',
                    category: 'apparel',
                    rating: 4.5,
                    reviews: 23,
                    sizes: ['S', 'M', 'L', 'XL'],
                    isNew: true,
                    discount: 25
                },
                {
                    id: 'merch2',
                    name: 'Album Art Poster',
                    description: 'High-quality print of AZU\'s latest album artwork',
                    price: '19.99',
                    image: './assets/images/placeholder-merch.jpg',
                    category: 'collectibles',
                    rating: 4.8,
                    reviews: 15
                },
                {
                    id: 'merch3',
                    name: 'AZU Vinyl Record',
                    description: 'Limited edition vinyl pressing of AZU\'s debut album',
                    price: '34.99',
                    image: './assets/images/placeholder-merch.jpg',
                    category: 'music',
                    rating: 5.0,
                    reviews: 8,
                    isNew: false
                },
                {
                    id: 'merch4',
                    name: 'Embroidered Cap',
                    description: 'Stylish cap with embroidered AZU logo',
                    price: '24.99',
                    image: './assets/images/placeholder-merch.jpg',
                    category: 'accessories',
                    rating: 4.2,
                    reviews: 12
                }
            ]
        },
        about: {
            biography: 'AZU is an innovative artist and musician creating immersive musical experiences that blend artistic vision with contemporary sound.',
            image: './assets/images/placeholder-artist.jpg',
            socialMedia: {
                instagram: '#',
                spotify: '#',
                twitter: '#'
            }
        },
        news: [
            {
                date: '2024-01-15',
                title: 'New Music Coming Soon',
                content: 'Stay tuned for exciting new releases and updates from AZU.'
            }
        ],
        contact: {
            email: 'contact@azu-music.com',
            socialMedia: {
                instagram: '#',
                spotify: '#'
            }
        }
    };
}

// Play album function (to be implemented with audio player)
function playAlbum(albumId) {
    console.log('Playing album:', albumId);
    // This will be implemented when audio player is ready
}

// Play track function (to be implemented with audio player)
function playTrack(albumId, trackIndex) {
    console.log('Playing track:', albumId, trackIndex);
    // This will be implemented when audio player is ready
}

// Handle newsletter form submission
function handleNewsletterForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const interests = formData.getAll('interests');
    
    // Simple validation
    if (!name || !email) {
        showNotification('Please fill in your name and email.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate newsletter subscription (replace with actual newsletter service)
    console.log('Newsletter subscription:', { name, email, interests });
    
    // Show success message
    showNotification(`Welcome to the AZU community, ${name}! Check your email for confirmation.`, 'success');
    
    // Reset form
    event.target.reset();
    
    // Optional: Send to newsletter service (Mailchimp, ConvertKit, etc.)
    // submitToNewsletterService({ name, email, interests });
}

// Function to submit to newsletter service (placeholder)
function submitToNewsletterService(data) {
    // This would integrate with your chosen newsletter service
    // Example for Mailchimp, ConvertKit, or custom backend
    /*
    fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Newsletter subscription successful:', result);
    })
    .catch(error => {
        console.error('Newsletter subscription error:', error);
        showNotification('There was an error subscribing. Please try again.', 'error');
    });
    */
}

// Book preview function
function previewBook(bookId) {
    const bookPreviews = {
        'silence': {
            title: 'The Sound of Silence',
            preview: 'In the quiet moments between notes, we find the most profound truths about music and life. This book explores how silence shapes sound, and how the spaces between beats create the rhythm of our existence...'
        },
        'heart': {
            title: 'Rhythms of the Heart',
            preview: 'Love beats in 4/4 time, loss echoes in minor keys. These poems and lyrics capture the universal language of human emotion, translated through the lens of musical expression...'
        },
        'beat': {
            title: 'Behind the Beat',
            preview: 'Every great song starts with a single idea. Learn the production techniques, songwriting methods, and creative processes that transform inspiration into chart-topping hits...'
        },
        'digital': {
            title: 'Digital Dreams',
            preview: 'Technology has revolutionized music creation, opening doors to sounds we never imagined possible. Explore how digital tools are reshaping artistic expression in the 21st century...'
        },
        'journey': {
            title: 'The Artist\'s Journey',
            preview: 'From bedroom producer to international artist, this memoir chronicles the highs, lows, and everything in between. A raw, honest look at what it takes to make it in the music industry...'
        },
        'songwriting': {
            title: 'Songwriting Secrets',
            preview: 'What makes a song unforgettable? Discover the techniques, structures, and creative approaches that separate good songs from great ones. Your guide to crafting melodies that move hearts...'
        }
    };

    const book = bookPreviews[bookId];
    if (book) {
        showBookPreview(book.title, book.preview);
    }
}

// Show book preview modal
function showBookPreview(title, preview) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75';
    modal.onclick = function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };

    modal.innerHTML = `
        <div class="bg-azu-gray-light rounded-xl p-6 max-w-2xl w-full border border-azu-gray">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-2xl font-display font-bold text-white">${title}</h3>
                <button onclick="document.body.removeChild(this.closest('.fixed'))" 
                        class="text-gray-400 hover:text-white transition-colors duration-200">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div class="text-gray-300 leading-relaxed mb-6">
                <p>${preview}</p>
            </div>
            <div class="flex space-x-4">
                <button onclick="document.body.removeChild(this.closest('.fixed'))" 
                        class="bg-azu-purple hover:bg-azu-indigo text-white px-6 py-2 rounded-lg transition-colors duration-200">
                    Close Preview
                </button>
                <button class="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                    Download Full Book
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// Download all books function
function downloadAllBooks() {
    const books = [
        { name: 'AZU - The Sound of Silence.pdf', url: './books/the-sound-of-silence.pdf' },
        { name: 'AZU - Rhythms of the Heart.pdf', url: './books/rhythms-of-the-heart.pdf' },
        { name: 'AZU - Behind the Beat.pdf', url: './books/behind-the-beat.pdf' },
        { name: 'AZU - Digital Dreams.pdf', url: './books/digital-dreams.pdf' },
        { name: 'AZU - The Artist\'s Journey.pdf', url: './books/the-artists-journey.pdf' },
        { name: 'AZU - Songwriting Secrets.pdf', url: './books/songwriting-secrets.pdf' }
    ];

    showNotification('Starting download of all books...', 'info');
    
    books.forEach((book, index) => {
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = book.url;
            link.download = book.name;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, index * 500); // Stagger downloads by 500ms
    });

    setTimeout(() => {
        showNotification('All books download initiated! Check your downloads folder.', 'success');
    }, books.length * 500 + 1000);
}