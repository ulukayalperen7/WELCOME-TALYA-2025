document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-particle';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0,245,255,0.6) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(0,245,255,0.3);
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ripple {
                    to {
                        width: 100px;
                        height: 100px;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    const avatar = document.querySelector('.avatar');
    avatar.addEventListener('click', function() {
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });

    if (window.innerWidth <= 600) {
        document.body.style.overflowX = 'hidden';
    }

    const nameElement = document.querySelector('.name');
    const originalText = nameElement.textContent;
    
    function typeWriter() {
        nameElement.textContent = '';
        let i = 0;
        
        function type() {
            if (i < originalText.length) {
                nameElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        
        type();
    }
    
    setTimeout(typeWriter, 1000);
    
    const container = document.querySelector('.container');
    container.addEventListener('mouseenter', function() {
        this.style.animation = 'glitch 0.3s ease-in-out';
    });
    
    container.addEventListener('mouseleave', function() {
        this.style.animation = 'none';
    });
    
    const glitchStyle = document.createElement('style');
    glitchStyle.textContent = `
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
    `;
    document.head.appendChild(glitchStyle);
    
    const isLowEndDevice = navigator.hardwareConcurrency <= 4;
    if (isLowEndDevice) {
        const shapes = document.querySelectorAll('.geometric-shape');
        shapes.forEach(shape => {
            shape.style.animationDuration = '30s';
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    techItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    console.log('🚀 Portfolio loaded successfully!');
    console.log('💫 Modern animations active');
    console.log('✨ Interactive effects enabled');
});