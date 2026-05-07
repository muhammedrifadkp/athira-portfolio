// 1. Initialize Lenis (Smooth Scroll) - Optimized Integration
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});
// Connect Lenis to GSAP Ticker for perfect sync (Fixes Jitter/Lag)
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
// Disable GSAP lag smoothing to prevent conflicts with Lenis
gsap.ticker.lagSmoothing(0);
// Sync GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('bg-accent/95', 'shadow-md', 'border-b', 'border-primary/5');
        nav.classList.remove('md:bg-transparent', 'md:backdrop-blur-none');
    } else {
        nav.classList.remove('bg-accent/95', 'shadow-md', 'border-b', 'border-primary/5');
        nav.classList.add('md:bg-transparent', 'md:backdrop-blur-none');
    }
});

// 2. Custom Cursor Logic (Magnetic)
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Dot follows instantly
    gsap.to(cursorDot, { x: mouseX, y: mouseY, duration: 0 });
});
// Smooth outline follow loop
function animateCursor() {
    let dt = 0.2; // ease factor
    cursorX += (mouseX - cursorX) * dt;
    cursorY += (mouseY - cursorY) * dt;
    cursorOutline.style.left = cursorX + "px";
    cursorOutline.style.top = cursorY + "px";
    requestAnimationFrame(animateCursor);
}
animateCursor();
// Magnetic Buttons
const magneticBtns = document.querySelectorAll('.magnetic-btn');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
        gsap.to(cursorOutline, { scale: 1.5, opacity: 0.5, duration: 0.3 });
    });
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.3 });
        gsap.to(cursorOutline, { scale: 1, opacity: 1, duration: 0.3 });
    });
});

// 3. Initialization (Simplified - Loader Removed)
window.addEventListener("load", () => {
    // Refresh ScrollTrigger to ensure pinned sections are correct
    ScrollTrigger.refresh();

    // Subtle Hero Entrance (Optional, but keeps it professional)
    gsap.from('.hero-reveal', {
        y: 30,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
    });
    gsap.from('.hero-img-container', {
        autoAlpha: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out"
    });

    // Typewriter start
    gsap.to('#typewriter', {
        text: "CLO3D Design | Digital Fashion | Styling",
        duration: 3,
        delay: 0.5,
        ease: "none"
    });
});
// 4. Parallax Elements
gsap.utils.toArray('.parallax-element').forEach(el => {
    const speed = el.getAttribute('data-speed');
    gsap.to(el, {
        y: (i, target) => ScrollTrigger.maxScroll(window) * speed,
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 0
        }
    });
});

// 5. Marquee Animation
gsap.to(".marquee-track", {
    xPercent: -50,
    ease: "none",
    duration: 20,
    repeat: -1
});

// 6. Map Pin Drop (Bi-directional)
const mapTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#map-container",
        start: "top 75%",
        end: "bottom top",
        toggleActions: "play reverse play reverse"
    }
});
mapTl.from("#map-container", { scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.7)" });

// 7. General Reveal Animations (Bi-directional)
gsap.utils.toArray('[data-gsap="fade"]').forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "bottom top",
            toggleActions: "play reverse play reverse"
        },
        opacity: 0, y: 20, duration: 0.8
    });
});
gsap.utils.toArray('[data-gsap="slide-up"]').forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom top",
            toggleActions: "play reverse play reverse"
        },
        y: 100, opacity: 0, duration: 1, ease: "power3.out"
    });
});

// 8. Age & Stats Calculator
function updateTimeBasedStats() {
    const birthDate = new Date('2024-01-10T11:10:00');
    const careerStartDate = new Date('2024-01-10T00:00:00'); // Journey start
    const now = new Date();
    // --- AGE CALCULATION ---
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();
    let hours = now.getHours() - birthDate.getHours();
    let minutes = now.getMinutes() - birthDate.getMinutes();
    let seconds = now.getSeconds() - birthDate.getSeconds();
    if (seconds < 0) { seconds += 60; minutes--; }
    if (minutes < 0) { minutes += 60; hours--; }
    if (hours < 0) { hours += 24; days--; }
    if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    if (months < 0) { months += 12; years--; }
    const els = {
        years: document.getElementById('years'),
        months: document.getElementById('months'),
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds'),
        secBar: document.getElementById('sec-bar')
    };
    if (els.years) els.years.innerText = String(years).padStart(2, '0');
    if (els.months) els.months.innerText = String(months).padStart(2, '0');
    if (els.days) els.days.innerText = String(days).padStart(2, '0');
    if (els.hours) els.hours.innerText = String(hours).padStart(2, '0');
    if (els.minutes) els.minutes.innerText = String(minutes).padStart(2, '0');
    if (els.seconds) els.seconds.innerText = String(seconds).padStart(2, '0');
    if (els.secBar) {
        const secPercent = (seconds / 60) * 100;
        els.secBar.style.width = `${secPercent}%`;
    }
    // --- CAREER STATS CALCULATION ---
    // Calculate Experience
    let expYears = now.getFullYear() - careerStartDate.getFullYear();
    let expMonths = now.getMonth() - careerStartDate.getMonth();
    if (expMonths < 0) {
        expYears--;
        expMonths += 12;
    }
    // Format experience (e.g., 5+)
    const expEl = document.getElementById('dynamic-exp');
    if (expEl) expEl.innerText = `${expYears}+`;
    // Calculate Collections (approx 2 major + 2 capsule per year)
    const totalMonthsSinceStart = (expYears * 12) + expMonths;
    const estimatedProjects = Math.floor(totalMonthsSinceStart * 0.3) + 4;
    const projEl = document.getElementById('dynamic-projects');
    if (projEl) projEl.innerText = `${estimatedProjects}+`;
}
setInterval(updateTimeBasedStats, 1000);
updateTimeBasedStats();

// 9. Horizontal Scroll (Advanced - Bug Fixes)
const worksWrapper = document.querySelector("#works-wrapper");
function getScrollAmount() {
    let worksWidth = worksWrapper.scrollWidth;
    // Ensure we don't return positive values if content fits screen
    return -Math.max(0, worksWidth - window.innerWidth);
}
const tween = gsap.to(worksWrapper, {
    x: getScrollAmount,
    ease: "none"
});
ScrollTrigger.create({
    trigger: "#works-container",
    start: "top top",
    end: () => "+=" + (worksWrapper.scrollWidth - window.innerWidth),
    pin: true,
    animation: tween,
    scrub: 1,
    invalidateOnRefresh: true,
    anticipatePin: 1
});

// 10. Timeline Line Drawing
gsap.to("#scroll-line", {
    height: "100%",
    ease: "none",
    scrollTrigger: {
        trigger: ".timeline-line",
        start: "top center",
        end: "bottom center",
        scrub: 0.5
    }
});
// Force refresh triggers after window load to ensure accurate measurements
window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});
// Service Items Stagger (Bi-directional)
gsap.utils.toArray('[data-gsap="service-item"]').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "bottom top",
            toggleActions: "play reverse play reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1
    });
});

// 11. WhatsApp Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('service').value || 'Not specified';
        const message = document.getElementById('message').value.trim();
        
        // Format the WhatsApp message
        const whatsappMessage = `*New Inquiry from Portfolio*
---------------------------
*Name:* ${name}
*Email:* ${email}
*Service:* ${service}

*Message:*
${message}`;
        
        // Target WhatsApp number
        const phoneNumber = "916282658938";
        
        // Create the WhatsApp URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
        
        // Reset form after submission
        contactForm.reset();
    });
}
