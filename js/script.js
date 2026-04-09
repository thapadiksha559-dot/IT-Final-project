// ========================================
// TECH NOVA SOLUTIONS - FINAL JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function () {



    // ========================================
    // IMAGE SLIDER (ONLY IF EXISTS)
    // ========================================
    const slidesContainer = document.querySelector('.slides');

    if (slidesContainer) {
        let currentSlide = 0;
        const totalSlides = slidesContainer.children.length;

        function showSlide() {
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide();
        }

        document.getElementById('next')?.addEventListener('click', nextSlide);
        document.getElementById('prev')?.addEventListener('click', prevSlide);

        setInterval(nextSlide, 4000);
    }

    // ========================================
    // TABLE SORTING (FIXED)
    // ========================================
    document.querySelectorAll('th').forEach((th, index) => {
        th.style.cursor = 'pointer';

        th.addEventListener('click', function (e) {
            const table = e.target.closest('table');
            const tbody = table.tBodies[0];
            const rows = Array.from(tbody.rows);

            const isAsc = th.classList.contains('asc');
            th.classList.toggle('asc', !isAsc);
            th.classList.toggle('desc', isAsc);

            rows.sort((a, b) => {
                const aText = a.cells[index].innerText.trim();
                const bText = b.cells[index].innerText.trim();

                const aNum = parseFloat(aText);
                const bNum = parseFloat(bText);

                if (!isNaN(aNum) && !isNaN(bNum)) {
                    return isAsc ? aNum - bNum : bNum - aNum;
                }

                return isAsc
                    ? aText.localeCompare(bText)
                    : bText.localeCompare(aText);
            });

            rows.forEach(row => tbody.appendChild(row));
        });
    });

    // ========================================
    // GALLERY LIGHTBOX (FULL IMAGE FIXED)
    // ========================================
    document.querySelectorAll('.gallery-grid a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                top:0; left:0;
                width:100%; height:100%;
                background: rgba(0,0,0,0.9);
                display:flex;
                align-items:center;
                justify-content:center;
                z-index:9999;
                cursor:pointer;
            `;

            lightbox.innerHTML = `
                <img src="${this.href}" style="
                    max-width:90%;
                    max-height:90%;
                    border-radius:10px;
                ">
            `;

            lightbox.onclick = () => document.body.removeChild(lightbox);
            document.body.appendChild(lightbox);
        });
    });

    // ========================================
    // SMOOTH SCROLL (SAFE)
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});

// ========================================
// CONTACT FORM VALIDATION (KEEP GLOBAL)
// ========================================
function validateContactForm() {
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();

    if (!name || !email || !message) {
        alert('❌ Please fill all required fields!');
        return false;
    }

    if (name.length < 2) {
        alert('❌ Name must be at least 2 characters!');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('❌ Invalid email format!');
        return false;
    }

    if (message.length < 10) {
        alert('❌ Message must be at least 10 characters!');
        return false;
    }

    if (phone && !/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
        alert('❌ Enter valid 10-digit phone number!');
        return false;
    }

    alert('✅ Message sent successfully!');
    return true;
}

// ========================================
// INIT LOG
// ========================================
console.log('✅ TechNova JS Loaded Successfully');