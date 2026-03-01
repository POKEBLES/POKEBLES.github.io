/* ===================================
   MANFOREST GRAPHICS - Authentication JavaScript
   =================================== */

// Password Toggle Visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggleBtn = input.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="far fa-eye-slash"></i>';
        }
    } else {
        input.type = 'password';
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="far fa-eye"></i>';
        }
    }
}

// Password Strength Meter
const passwordInput = document.getElementById('password');
const strengthBar = document.querySelector('.strength-fill');
const strengthText = document.querySelector('.strength-text');

if (passwordInput && strengthBar) {
    passwordInput.addEventListener('input', (e) => {
        const password = e.target.value;
        const strength = checkPasswordStrength(password);
        
        // Update strength bar
        strengthBar.className = 'strength-fill ' + strength.class;
        
        // Update strength text
        if (strengthText) {
            strengthText.textContent = strength.text;
        }
    });
}

function checkPasswordStrength(password) {
    let strength = { score: 0, class: '', text: '' };
    
    if (!password) {
        return { score: 0, class: '', text: '' };
    }
    
    // Length check
    if (password.length >= 8) strength.score++;
    if (password.length >= 12) strength.score++;
    
    // Character variety checks
    if (/[a-z]/.test(password)) strength.score++; // lowercase
    if (/[A-Z]/.test(password)) strength.score++; // uppercase
    if (/[0-9]/.test(password)) strength.score++; // numbers
    if (/[^a-zA-Z0-9]/.test(password)) strength.score++; // special chars
    
    // Determine strength class and text
    if (strength.score <= 2) {
        strength.class = 'weak';
        strength.text = 'Weak password';
    } else if (strength.score <= 4) {
        strength.class = 'medium';
        strength.text = 'Medium password';
    } else {
        strength.class = 'strong';
        strength.text = 'Strong password';
    }
    
    return strength;
}

// Login Form
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            remember: document.getElementById('remember')?.checked || false
        };

        // Validate
        if (!formData.email || !formData.password) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        if (!window.ManforestUtils.validateEmail(formData.email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Show loading
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        submitBtn.disabled = true;

        try {
            // Simulate API call (replace with actual authentication)
            const response = await simulateAuth(formData);
            
            // Save authentication state
            AuthManager.setAuth(response.token, {
                email: formData.email,
                remember: formData.remember
            });
            
            showMessage('Login successful! Redirecting...', 'success');
            
            // Redirect to saved page or dashboard
            const redirectUrl = localStorage.getItem('redirectAfterLogin');
            localStorage.removeItem('redirectAfterLogin');
            
            setTimeout(() => {
                window.location.href = redirectUrl || 'index.html';
            }, 1500);
        } catch (error) {
            showMessage('Invalid email or password', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Register Form
const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company')?.value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            agreeTerms: document.getElementById('agreeTerms')?.checked,
            newsletter: document.getElementById('newsletter')?.checked
        };

        // Validation
        if (!validateRegistration(formData)) {
            return;
        }

        // Show loading
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await simulateRegistration(formData);
            
            showMessage('Account created successfully! Redirecting to verify email...', 'success');
            
            // Redirect to email verification
            setTimeout(() => {
                window.location.href = 'email-verification.html?email=' + encodeURIComponent(formData.email);
            }, 1500);
        } catch (error) {
            showMessage('Registration failed. Please try again.', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

function validateRegistration(data) {
    // Check required fields
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.password || !data.confirmPassword) {
        showMessage('Please fill in all required fields', 'error');
        return false;
    }

    // Validate email
    if (!window.ManforestUtils.validateEmail(data.email)) {
        showMessage('Please enter a valid email address', 'error');
        return false;
    }

    // Validate phone
    if (!window.ManforestUtils.validatePhone(data.phone)) {
        showMessage('Please enter a valid phone number', 'error');
        return false;
    }

    // Check password length
    if (data.password.length < 8) {
        showMessage('Password must be at least 8 characters long', 'error');
        return false;
    }

    // Check password match
    if (data.password !== data.confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return false;
    }

    // Check terms agreement
    if (!data.agreeTerms) {
        showMessage('You must agree to the Terms & Conditions', 'error');
        return false;
    }

    return true;
}

// Forgot Password Form
const forgotPasswordForm = document.getElementById('forgotPasswordForm');

if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;

        if (!email || !window.ManforestUtils.validateEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        const submitBtn = forgotPasswordForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            await simulatePasswordReset(email);
            
            // Hide step1, show step2
            document.getElementById('step1').style.display = 'none';
            document.getElementById('step2').style.display = 'block';
            
            // Update email in success message
            const emailSpan = document.querySelector('.user-email');
            if (emailSpan) {
                emailSpan.textContent = email;
            }
            
            // Start countdown
            startCountdown();
        } catch (error) {
            showMessage('Failed to send reset email. Please try again.', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    let seconds = 60;
    
    const interval = setInterval(() => {
        seconds--;
        countdownElement.textContent = seconds;
        
        if (seconds <= 0) {
            clearInterval(interval);
            countdownElement.textContent = '0';
        }
    }, 1000);
}

// Email Verification
function checkVerificationStatus() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const email = urlParams.get('email');

    // Update email display
    const emailElements = document.querySelectorAll('.user-email');
    emailElements.forEach(el => {
        if (email) el.textContent = email;
    });

    // Show appropriate section
    const sections = {
        pending: 'pendingVerification',
        success: 'verificationSuccess',
        failed: 'verificationFailed'
    };

    Object.values(sections).forEach(id => {
        const section = document.getElementById(id);
        if (section) section.style.display = 'none';
    });

    const sectionToShow = sections[status] || 'pendingVerification';
    const section = document.getElementById(sectionToShow);
    if (section) section.style.display = 'block';
}

// Resend verification email
function resendVerification() {
    const btn = document.getElementById('resendBtn');
    const timerElement = document.getElementById('resendTimer');
    
    if (!btn) return;
    
    btn.disabled = true;
    btn.textContent = 'Sending...';
    
    // Simulate API call
    setTimeout(() => {
        showMessage('Verification email sent!', 'success');
        
        // Start 60 second cooldown
        let seconds = 60;
        timerElement.style.display = 'block';
        
        const interval = setInterval(() => {
            seconds--;
            document.getElementById('timerSeconds').textContent = seconds;
            
            if (seconds <= 0) {
                clearInterval(interval);
                btn.disabled = false;
                btn.textContent = 'Resend Email';
                timerElement.style.display = 'none';
            }
        }, 1000);
    }, 1000);
}

// Social Login
function socialLogin(provider) {
    console.log(`Logging in with ${provider}`);
    showMessage(`${provider} login coming soon!`, 'info');
    
    // In production, this would redirect to OAuth flow
    // Example: window.location.href = `/auth/${provider}`;
}

// Simulate API calls
function simulateAuth(data) {
    return new Promise((resolve, reject) => {
        console.log('Login attempt:', data);
        setTimeout(() => {
            // Simulate success (80% success rate for demo)
            if (Math.random() > 0.2) {
                resolve({ success: true, token: 'demo-token-123' });
            } else {
                reject({ success: false, message: 'Invalid credentials' });
            }
        }, 1500);
    });
}

function simulateRegistration(data) {
    return new Promise((resolve) => {
        console.log('Registration:', data);
        setTimeout(() => {
            resolve({ success: true });
        }, 1500);
    });
}

function simulatePasswordReset(email) {
    return new Promise((resolve) => {
        console.log('Password reset for:', email);
        setTimeout(() => {
            resolve({ success: true });
        }, 1500);
    });
}

// Show message helper
function showMessage(message, type = 'info') {
    if (window.ManforestUtils && window.ManforestUtils.showToast) {
        window.ManforestUtils.showToast(message, type);
    } else {
        alert(message);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check if on email verification page
    if (window.location.pathname.includes('email-verification')) {
        checkVerificationStatus();
    }
});

console.log('Authentication functionality initialized');

// Authentication State Management
const AuthManager = {
    // Check if user is authenticated
    isAuthenticated() {
        return localStorage.getItem('userToken') !== null;
    },

    // Get current user info
    getCurrentUser() {
        const userStr = localStorage.getItem('currentUser');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Set authentication
    setAuth(token, user) {
        localStorage.setItem('userToken', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
    },

    // Clear authentication
    clearAuth() {
        localStorage.removeItem('userToken');
        localStorage.removeItem('currentUser');
    },

    // Require authentication for a page/form
    requireAuth(redirectUrl = 'login.html') {
        if (!this.isAuthenticated()) {
            // Save the current URL to redirect back after login
            localStorage.setItem('redirectAfterLogin', window.location.pathname);
            window.location.href = redirectUrl;
            return false;
        }
        return true;
    },

    // Show login required modal
    showLoginRequired(message = 'You must be logged in to access this feature.') {
        if (window.ManforestUtils && window.ManforestUtils.showToast) {
            window.ManforestUtils.showToast(message, 'warning');
        } else {
            alert(message);
        }
        
        setTimeout(() => {
            localStorage.setItem('redirectAfterLogin', window.location.pathname);
            window.location.href = 'login.html';
        }, 2000);
    }
};

// Make AuthManager globally available
window.AuthManager = AuthManager;
