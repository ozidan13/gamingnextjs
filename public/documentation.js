// Animation and interaction enhancements for documentation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the sections animations with staggered effect
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('active');
        }, 100 * index);
    });

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add pulse effect
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
            
            // Add glow effect to the icon
            const icon = card.querySelector('.feature-icon svg');
            if (icon) {
                icon.style.filter = 'drop-shadow(0 0 5px var(--primary))';
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'all 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            
            const icon = card.querySelector('.feature-icon svg');
            if (icon) {
                icon.style.filter = 'none';
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Add scroll progress indicator
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.classList.add('scroll-progress');
        progressBar.style = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            width: 0%;
            z-index: 1000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = `${scrollPercentage}%`;
        });
    };
    createScrollProgress();

    // Add active state to current section in TOC
    const updateActiveTOCItem = () => {
        const tocLinks = document.querySelectorAll('.toc a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = '#' + section.getAttribute('id');
                }
            });
            
            tocLinks.forEach(link => {
                link.style.fontWeight = 'normal';
                link.style.color = 'var(--text)';
                if (link.getAttribute('href') === current) {
                    link.style.color = 'var(--primary)';
                    link.style.fontWeight = '600';
                }
            });
        });
    };
    updateActiveTOCItem();

    // Add code copy functionality
    const addCodeCopyButtons = () => {
        const preElements = document.querySelectorAll('pre');
        
        preElements.forEach(pre => {
            // Create copy button
            const copyButton = document.createElement('button');
            copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
            copyButton.style = `
                position: absolute;
                right: 10px;
                top: 10px;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                border-radius: 4px;
                padding: 4px 8px;
                cursor: pointer;
                color: var(--text);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.2s ease, background 0.2s ease;
            `;
            
            // Show button on hover
            pre.addEventListener('mouseenter', () => {
                copyButton.style.opacity = '1';
            });
            
            pre.addEventListener('mouseleave', () => {
                copyButton.style.opacity = '0';
            });
            
            // Copy functionality
            copyButton.addEventListener('click', () => {
                const code = pre.querySelector('code').innerText;
                navigator.clipboard.writeText(code).then(() => {
                    // Visual feedback
                    copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                    copyButton.style.background = 'var(--success)';
                    copyButton.style.color = 'white';
                    
                    setTimeout(() => {
                        copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
                        copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
                        copyButton.style.color = 'var(--text)';
                    }, 2000);
                });
            });
            
            pre.appendChild(copyButton);
            pre.style.position = 'relative';
        });
    };
    addCodeCopyButtons();

    // Add section navigation
    const addSectionNavigation = () => {
        const mainContent = document.querySelector('.main-content');
        if (!mainContent || sections.length < 2) return;
        
        sections.forEach((section, index) => {
            if (index < sections.length - 1) { // Skip the last section
                const nextButton = document.createElement('button');
                nextButton.classList.add('section-nav-button');
                nextButton.innerHTML = `
                    <span>Next Section</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                `;
                nextButton.style = `
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 20px;
                    background: rgba(255, 255, 255, 0.05);
                    border: none;
                    border-radius: 4px;
                    color: var(--text);
                    margin-top: 20px;
                    font-family: 'Montserrat', sans-serif;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    float: right;
                `;
                
                nextButton.addEventListener('mouseenter', () => {
                    nextButton.style.background = 'var(--primary)';
                    nextButton.style.transform = 'translateX(5px)';
                });
                
                nextButton.addEventListener('mouseleave', () => {
                    nextButton.style.background = 'rgba(255, 255, 255, 0.05)';
                    nextButton.style.transform = 'translateX(0)';
                });
                
                nextButton.addEventListener('click', () => {
                    const nextSection = sections[index + 1];
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                });
                
                section.appendChild(nextButton);
            }
        });
    };
    addSectionNavigation();
});

// Easter egg for gaming enthusiasts
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Activate easter egg
            document.body.style.transition = 'all 0.5s ease';
            document.body.style.background = 'var(--primary)';
            
            // Create game character SVG
            const gameChar = document.createElement('div');
            gameChar.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="100" height="100">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
            `;
            gameChar.style = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: bounce 1s infinite alternate;
                z-index: 1000;
            `;
            
            // Add style
            const style = document.createElement('style');
            style.textContent = `
                @keyframes bounce {
                    from { transform: translate(-50%, -50%) scale(1); }
                    to { transform: translate(-50%, -50%) scale(1.2); }
                }
            `;
            document.head.appendChild(style);
            
            document.body.appendChild(gameChar);
            
            // Reset after 3 seconds
            setTimeout(() => {
                document.body.style.background = 'var(--darker)';
                document.body.removeChild(gameChar);
                document.head.removeChild(style);
            }, 3000);
            
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
}); 