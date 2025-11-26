// OSINT Academy - Main JavaScript

class OSINTAcademy {
    constructor() {
        this.currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.matrixRain = null;
        this.terminalAnimations = [];
        this.dorkingData = this.initializeDorkingData();
        this.init();
    }

    init() {
        this.setupCustomCursor();
        this.setupMatrixRain();
        this.setupTerminalAnimations();
        this.setupScrollAnimations();
        this.setupInteractiveElements();
        
        // Page-specific initialization
        if (this.currentPage.includes('dorking')) {
            this.setupDorkingTools();
        } else {
            this.setupStudyGuide();
        }
    }

    // Custom Hacker Cursor
    setupCustomCursor() {
        // Remove any existing cursor first
        const existingCursor = document.querySelector('.custom-cursor');
        if (existingCursor) {
            existingCursor.remove();
        }

        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = '▊';
        cursor.style.position = 'fixed';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '9999';
        cursor.style.fontSize = '20px';
        cursor.style.color = 'var(--neon-green)';
        cursor.style.textShadow = 'var(--glow-green)';
        cursor.style.transition = 'opacity 0.3s ease';
        document.body.appendChild(cursor);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Cursor blink effect
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }

    // Matrix Rain Background Effect
    setupMatrixRain() {
        const canvas = document.getElementById('matrix-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff41';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        this.matrixRain = setInterval(drawMatrix, 35);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Terminal Typing Animations
    setupTerminalAnimations() {
        const terminals = document.querySelectorAll('.terminal-text');
        
        terminals.forEach((terminal, index) => {
            const text = terminal.textContent;
            terminal.textContent = '';
            terminal.style.display = 'inline-block';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    terminal.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50 + Math.random() * 50);
                }
            };
            
            // Stagger animations
            setTimeout(typeWriter, index * 1000);
        });
    }

    // Scroll-triggered Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.fade-in-up').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Interactive Elements Setup
    setupInteractiveElements() {
        // Hover effects for cards
        document.querySelectorAll('.cyber-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px) rotateX(5deg)';
                card.style.boxShadow = '0 10px 30px rgba(0, 255, 65, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0deg)';
                card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            });
        });

        // Button click effects
        document.querySelectorAll('.cyber-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Study Guide Setup
    setupStudyGuide() {
        // Technique cards expansion
        document.querySelectorAll('.technique-card').forEach(card => {
            const header = card.querySelector('.technique-header');
            const content = card.querySelector('.technique-content');
            
            if (header && content) {
                header.addEventListener('click', () => {
                    const isExpanded = card.classList.contains('expanded');
                    
                    // Close all other cards
                    document.querySelectorAll('.technique-card').forEach(c => {
                        c.classList.remove('expanded');
                        c.querySelector('.technique-content').style.maxHeight = '0';
                    });
                    
                    // Toggle current card
                    if (!isExpanded) {
                        card.classList.add('expanded');
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                });
            }
        });

        // Progress tracking
        this.setupProgressTracking();
    }

    // Progress Tracking
    setupProgressTracking() {
        const progressBar = document.querySelector('.progress-bar');
        const techniques = document.querySelectorAll('.technique-card');
        const progressText = document.querySelector('.progress-text');
        
        if (!progressBar || !techniques.length) return;

        let completed = parseInt(localStorage.getItem('osint-progress') || '0');
        this.updateProgressDisplay(completed, techniques.length);

        techniques.forEach((technique, index) => {
            const checkbox = technique.querySelector('.progress-checkbox');
            if (checkbox) {
                checkbox.checked = (completed & (1 << index)) !== 0;
                
                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        completed |= (1 << index);
                    } else {
                        completed &= ~(1 << index);
                    }
                    
                    localStorage.setItem('osint-progress', completed.toString());
                    this.updateProgressDisplay(completed, techniques.length);
                });
            }
        });
    }

    updateProgressDisplay(completed, total) {
        const progressBar = document.querySelector('.progress-bar');
        const progressText = document.querySelector('.progress-text');
        const percentage = Math.round((completed.toString(2).replace(/0/g, '').length) / total * 100);
        
        if (progressBar) {
            progressBar.style.width = percentage + '%';
        }
        
        if (progressText) {
            progressText.textContent = `${percentage}% Complete`;
        }
    }

    // Dorking Tools Setup
    setupDorkingTools() {
        const emailInput = document.getElementById('email-input');
        const usernameInput = document.getElementById('username-input');
        const phoneInput = document.getElementById('phone-input');
        const generateBtn = document.getElementById('generate-dorks');
        const resultsContainer = document.getElementById('dork-results');

        // Debug log
        console.log('Setting up dorking tools...');
        console.log('Inputs found:', { emailInput, usernameInput, phoneInput, generateBtn, resultsContainer });

        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                console.log('Generate button clicked');
                this.generateDorks(emailInput?.value, usernameInput?.value, phoneInput?.value);
            });
        }

        // Real-time generation
        [emailInput, usernameInput, phoneInput].forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    console.log('Input changed:', input.id, input.value);
                    this.generateDorks(emailInput?.value, usernameInput?.value, phoneInput?.value);
                });
            }
        });

        // Initial test generation
        setTimeout(() => {
            console.log('Running initial test generation...');
            this.generateDorks('', '', '');
        }, 1000);
    }

    // Generate Google Dorks
    generateDorks(email, username, phone) {
        const resultsContainer = document.getElementById('dork-results');
        if (!resultsContainer) return;

        let dorks = [];

        // Email dorks
        if (email) {
            dorks.push(...this.dorkingData.email.map(dork => ({
                category: 'Email Reconnaissance',
                query: dork.query.replace('{email}', email),
                description: dork.description,
                type: 'email'
            })));
        }

        // Username dorks
        if (username) {
            dorks.push(...this.dorkingData.username.map(dork => ({
                category: 'Username Search',
                query: dork.query.replace('{username}', username),
                description: dork.description,
                type: 'username'
            })));
        }

        // Phone dorks - handle multiple formats
        if (phone) {
            const phoneFormats = this.generatePhoneFormats(phone);
            
            phoneFormats.forEach(phoneFormat => {
                this.dorkingData.phone.forEach(dork => {
                    dorks.push({
                        category: `Phone Investigation (${phoneFormat.type})`,
                        query: dork.query.replace('{phone}', phoneFormat.number),
                        description: `${dork.description} - ${phoneFormat.description}`,
                        type: 'phone'
                    });
                });
            });
        }

        this.displayDorks(dorks);
    }

    // Generate multiple phone number formats
    generatePhoneFormats(phone) {
        const formats = [];
        const cleanNumber = phone.replace(/\D/g, '');
        
        // Original format
        formats.push({
            number: cleanNumber,
            type: 'Numeric',
            description: 'Numbers only'
        });

        // With country code format
        if (cleanNumber.length >= 10) {
            const withPlus = '+' + cleanNumber;
            formats.push({
                number: withPlus,
                type: 'International',
                description: 'With + prefix'
            });
        }

        // Formatted with dashes
        if (cleanNumber.length >= 10) {
            const formatted = cleanNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            formats.push({
                number: formatted,
                type: 'US Formatted',
                description: 'XXX-XXX-XXXX format'
            });
        }

        // With spaces
        if (cleanNumber.length >= 10) {
            const withSpaces = cleanNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
            formats.push({
                number: withSpaces,
                type: 'Spaced',
                description: 'XXX XXX XXXX format'
            });
        }

        return formats;
    }

    // Display Generated Dorks
    displayDorks(dorks) {
        const resultsContainer = document.getElementById('dork-results');
        if (!resultsContainer) return;

        resultsContainer.innerHTML = '';

        if (dorks.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <div class="icon">🔍</div>
                    <h3>No Input Provided</h3>
                    <p>Enter an email, username, or phone number to generate Google dorks.</p>
                </div>
            `;
            return;
        }

        // Group dorks by category
        const groupedDorks = dorks.reduce((groups, dork) => {
            if (!groups[dork.category]) {
                groups[dork.category] = [];
            }
            groups[dork.category].push(dork);
            return groups;
        }, {});

        Object.entries(groupedDorks).forEach(([category, dorkList]) => {
            const categorySection = document.createElement('div');
            categorySection.className = 'dork-category fade-in-up';
            categorySection.innerHTML = `
                <h3 class="category-title">${category}</h3>
                <div class="dork-list">
                    ${dorkList.map(dork => `
                        <div class="dork-item">
                            <div class="dork-query">
                                <code>${this.escapeHtml(dork.query)}</code>
                                <button class="copy-btn" onclick="osintAcademy.copyToClipboard('${this.escapeHtml(dork.query)}')">
                                    📋
                                </button>
                            </div>
                            <div class="dork-description">${dork.description}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            resultsContainer.appendChild(categorySection);
        });

        // Animate results
        setTimeout(() => {
            document.querySelectorAll('.dork-category').forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 100);
    }

    // Copy to Clipboard
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('Copied to clipboard!');
        }).catch(() => {
            this.showNotification('Failed to copy', 'error');
        });
    }

    // Show Notification
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }

    // Escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Initialize Dorking Data
    initializeDorkingData() {
        return {
            email: [
                { query: '"{email}"', description: 'Exact email search' },
                { query: '{email} filetype:pdf', description: 'Email in PDF documents' },
                { query: '{email} site:linkedin.com', description: 'LinkedIn profile search' },
                { query: '{email} site:facebook.com', description: 'Facebook profile search' },
                { query: '{email} site:twitter.com', description: 'Twitter account search' },
                { query: '{email} site:instagram.com', description: 'Instagram profile search' },
                { query: '{email} "password" OR "login"', description: 'Potential credential leaks' },
                { query: '{email} "@" filetype:txt', description: 'Text files containing email' },
                { query: '{email} site:pastebin.com', description: 'Pastebin mentions' },
                { query: '{email} site:github.com', description: 'GitHub repositories' },
                { query: '{email} "data breach" OR "leaked"', description: 'Data breach mentions' },
                { query: '{email} site:breachdirectory.org', description: 'Breach directory search' },
                { query: '{email} ext:sql OR ext:csv', description: 'Database files with email' },
                { query: '{email} intitle:"index of"', description: 'Open directories with email' },
                { query: '{email} "contact" OR "about"', description: 'Contact page mentions' }
            ],
            username: [
                { query: '"{username}"', description: 'Exact username search' },
                { query: '{username} site:github.com', description: 'GitHub profile' },
                { query: '{username} site:twitter.com', description: 'Twitter account' },
                { query: '{username} site:reddit.com', description: 'Reddit profile' },
                { query: '{username} site:stackoverflow.com', description: 'Stack Overflow profile' },
                { query: '{username} site:youtube.com', description: 'YouTube channel' },
                { query: '{username} site:medium.com', description: 'Medium articles' },
                { query: '{username} site:dev.to', description: 'Dev.to profile' },
                { query: '{username} site:gitlab.com', description: 'GitLab profile' },
                { query: '{username} site:bitbucket.org', description: 'Bitbucket profile' },
                { query: '{username} "avatar" OR "profile"', description: 'Profile images' },
                { query: '{username} intitle:"index of"', description: 'Open directories' },
                { query: '{username} filetype:pdf', description: 'PDF documents' },
                { query: '{username} site:pastebin.com', description: 'Pastebin posts' },
                { query: '{username} "contact" OR "email"', description: 'Contact information' }
            ],
            phone: [
                { query: '{phone}', description: 'Phone number search' },
                { query: '{phone} site:facebook.com', description: 'Facebook profile' },
                { query: '{phone} site:linkedin.com', description: 'LinkedIn contact' },
                { query: '{phone} "contact" OR "phone"', description: 'Contact directories' },
                { query: '{phone} intitle:"index of"', description: 'Open directories' },
                { query: '{phone} filetype:pdf', description: 'PDF documents' },
                { query: '{phone} "directory" OR "listing"', description: 'Business directories' },
                { query: '{phone} site:yellowpages.com', description: 'Yellow pages' },
                { query: '{phone} site:whitepages.com', description: 'White pages' },
                { query: '{phone} "address" OR "location"', description: 'Location information' }
            ]
        };
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.osintAcademy = new OSINTAcademy();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.osintAcademy && window.osintAcademy.matrixRain) {
        clearInterval(window.osintAcademy.matrixRain);
    }
});