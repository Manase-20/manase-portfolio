// 1. Dark Mode Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggleBtn.querySelector('i');

// Cek preferensi user di localStorage
if (localStorage.getItem('theme') === 'dark') {
    body.setAttribute('data-theme', 'dark');
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggleBtn.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// 2. Scroll Reveal Animation
const revealElements = document.querySelectorAll('.section-reveal');

const scrollReveal = function () {
    for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 100; // Jarak trigger animasi

        if (elementTop < windowHeight - elementVisible) {
            revealElements[i].classList.add('active');
        }
    }
};

window.addEventListener('scroll', scrollReveal);
scrollReveal(); // Trigger once on load

// 3. Contact Form Submission (Using your existing Google Apps Script)
const scriptURL = 'https://script.google.com/macros/s/AKfycbzJABqMqVHIwkpVXyZAxTQcxg1W4_dlXcxXOzQjWMa-l5Uw1nyDZi1TyPFLFq0Yg_H63A/exec';
const form = document.forms['contact-form'];
const btnSend = document.querySelector('.btn-send');
const formAlert = document.querySelector('.form-alert');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    // UI Feedback saat loading
    const originalBtnText = btnSend.innerHTML;
    btnSend.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    btnSend.disabled = true;

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
        form.reset();
        formAlert.classList.remove('d-none');
        btnSend.innerHTML = originalBtnText;
        btnSend.disabled = false;
        
        // Hilangkan alert setelah 5 detik
        setTimeout(() => {
            formAlert.classList.add('d-none');
        }, 5000);
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert('Gagal mengirim pesan. Silakan coba lagi.');
        btnSend.innerHTML = originalBtnText;
        btnSend.disabled = false;
    });
});