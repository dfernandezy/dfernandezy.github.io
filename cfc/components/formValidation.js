// formValidation.js - Contact form validation logic

export function setupFormValidation() {
    function validateForm() {
        const form = document.getElementById('contact-form');
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#DC143C';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });
        return isValid;
    }

    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            // Show success message with animation
            const successMessage = document.createElement('div');
            successMessage.innerHTML = `
                <div class="fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        Message sent successfully!
                    </div>
                </div>
            `;
            document.body.appendChild(successMessage);
            setTimeout(() => {
                successMessage.firstElementChild.style.transform = 'translateX(0)';
            }, 100);
            setTimeout(() => {
                successMessage.firstElementChild.style.transform = 'translateX(full)';
                setTimeout(() => {
                    successMessage.remove();
                }, 300);
            }, 3000);
            this.reset();
        }
    });
}
