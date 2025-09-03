document.addEventListener('DOMContentLoaded', () => {

    // --- Header & Mobile Navigation ---
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links') as HTMLElement;

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu on link click
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // --- Portfolio Filtering ---
    const filterContainer = document.querySelector('.portfolio-filters');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterContainer && portfolioItems.length > 0) {
        filterContainer.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('filter-btn')) {
                // Update active button state
                filterContainer.querySelector('.active').classList.remove('active');
                target.classList.add('active');

                const filterValue = target.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    const htmlItem = item as HTMLElement;
                    if (filterValue === 'all' || htmlItem.dataset.category === filterValue) {
                        htmlItem.style.display = 'block';
                    } else {
                        htmlItem.style.display = 'none';
                    }
                });
            }
        });
    }
    
    // --- Service Card Links to Form ---
    const serviceLinks = document.querySelectorAll('a[data-service]');
    const serviceTypeSelect = document.getElementById('serviceType') as HTMLSelectElement;

    if (serviceLinks.length > 0 && serviceTypeSelect) {
        serviceLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const service = (e.currentTarget as HTMLElement).dataset.service;
                if (service) {
                    serviceTypeSelect.value = service;
                }
            });
        });
    }

    // --- Pricing Package Selection in Form ---
    const orderPackageButtons = document.querySelectorAll('.order-package-btn');
    const packageSelect = document.getElementById('package') as HTMLSelectElement;

    if (orderPackageButtons.length > 0 && packageSelect) {
        orderPackageButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const packageName = (e.currentTarget as HTMLElement).dataset.package;
                if (packageName) {
                    packageSelect.value = packageName;
                }
            });
        });
    }

    // --- Order Form Submission ---
    const orderForm = document.getElementById('order-form') as HTMLFormElement;
    const successMessage = document.getElementById('form-success-message');

    if (orderForm && successMessage) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // In a real application, you would send this data to a server.
            // For this demo, we'll just simulate success.
            const formData = new FormData(orderForm);
            console.log('Form Submitted. Data:', Object.fromEntries(formData.entries()));

            // Hide form and show success message
            orderForm.style.display = 'none';
            successMessage.style.display = 'block';

            // Optional: redirect to WhatsApp after a delay
            setTimeout(() => {
                const whatsappUrl = `https://wa.me/923337239429?text=Hi%20Mansoor,%20I%20just%20submitted%20my%20order%20form!`;
                // window.open(whatsappUrl, '_blank');
            }, 3000);
        });
    }
});
