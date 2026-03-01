/* ===================================
   MANFOREST GRAPHICS - Quote Request JavaScript
   =================================== */

(() => {
    let currentStep = 1;
    const totalSteps = 4;
    const formState = {};
    let lastEstimate = null;

    const form = document.getElementById('quoteRequestForm');
    const steps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.quote-steps .step');

    const materialRatesPerSqm = {
        aluminum: 1700,
        'stainless-steel': 2600,
        acrylic: 1450,
        pvc: 900,
        wood: 1200,
        vinyl: 650
    };

    const serviceSpecRates = {
        design: { mode: 'flat', value: 3500 },
        fabrication: { mode: 'area', value: 700 },
        printing: { mode: 'area', value: 450 },
        installation: { mode: 'area', value: 420 },
        delivery: { mode: 'flat', value: 1800 }
    };

    const estimatorNodes = {
        width: document.getElementById('specWidth'),
        height: document.getElementById('specHeight'),
        unit: document.getElementById('specUnit'),
        wastage: document.getElementById('wastage'),
        sides: document.getElementById('sides'),
        grade: document.getElementById('materialGrade'),
        button: document.getElementById('calculateEstimateBtn'),
        result: document.getElementById('estimatorResult'),
        area: document.getElementById('estimateArea'),
        qty: document.getElementById('estimateQuantity'),
        materialCost: document.getElementById('estimateMaterialCost'),
        serviceCost: document.getElementById('estimateServiceCost'),
        total: document.getElementById('estimateTotal')
    };

    function init() {
        if (!form || !steps.length) {
            return;
        }

        const hasAuthManager = typeof window.AuthManager !== 'undefined';
        const isLoggedIn = hasAuthManager
            ? window.AuthManager.isAuthenticated()
            : localStorage.getItem('userToken') !== null;

        if (!isLoggedIn) {
            localStorage.setItem('redirectAfterLogin', window.location.pathname);
            window.location.href = 'login.html';
            return;
        }

        showStep(currentStep);
        bindEstimator();
        bindFilePreview();
        bindSubmit();
        bindRealtimeEstimatorRefresh();
    }

    function showStep(stepNumber) {
        steps.forEach((step) => {
            step.style.display = step.id === `step${stepNumber}` ? 'block' : 'none';
            step.classList.toggle('active', step.id === `step${stepNumber}`);
        });

        stepIndicators.forEach((indicator, index) => {
            const indicatorStep = index + 1;
            indicator.classList.remove('active', 'completed');

            if (indicatorStep < stepNumber) {
                indicator.classList.add('completed');
            } else if (indicatorStep === stepNumber) {
                indicator.classList.add('active');
            }
        });

        const quoteSteps = document.querySelector('.quote-steps');
        if (quoteSteps) {
            window.scrollTo({
                top: quoteSteps.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    }

    function clearFieldErrorState(stepElement) {
        const errorMessages = stepElement.querySelectorAll('.error-message');
        errorMessages.forEach((msg) => msg.remove());

        const erroredFields = stepElement.querySelectorAll('.error');
        erroredFields.forEach((field) => field.classList.remove('error'));
    }

    function appendError(target, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        target.appendChild(errorDiv);
    }

    function validateCurrentStep() {
        const stepElement = document.getElementById(`step${currentStep}`);
        if (!stepElement) return false;

        clearFieldErrorState(stepElement);
        let isValid = true;

        const requiredFields = stepElement.querySelectorAll('[required]');
        const visitedRadioNames = new Set();

        requiredFields.forEach((field) => {
            if (field.type === 'radio') {
                if (visitedRadioNames.has(field.name)) return;
                visitedRadioNames.add(field.name);

                const checkedRadio = stepElement.querySelector(`input[name="${field.name}"]:checked`);
                if (!checkedRadio) {
                    const radioGroup = field.closest('.radio-group') || field.parentElement;
                    if (radioGroup) {
                        radioGroup.classList.add('error');
                        appendError(radioGroup, 'Please select one option');
                    }
                    isValid = false;
                }
                return;
            }

            if (field.type === 'checkbox') {
                const checkboxGroup = field.closest('.checkbox-group');
                if (!checkboxGroup) return;

                const shouldValidateGroup = Array.from(checkboxGroup.querySelectorAll('input[type="checkbox"]')).some((item) => item.required);
                if (!shouldValidateGroup) return;

                const checked = checkboxGroup.querySelectorAll('input[type="checkbox"]:checked').length;
                if (checked === 0 && !checkboxGroup.querySelector('.error-message')) {
                    checkboxGroup.classList.add('error');
                    appendError(checkboxGroup, 'Please select at least one option');
                    isValid = false;
                }
                return;
            }

            if ((field.value || '').toString().trim() === '') {
                field.classList.add('error');
                appendError(field.parentElement, 'This field is required');
                isValid = false;
                return;
            }

            if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
                field.classList.add('error');
                appendError(field.parentElement, 'Please enter a valid email address');
                isValid = false;
                return;
            }

            if (field.type === 'tel') {
                const digitCount = field.value.replace(/\D/g, '').length;
                if (digitCount < 10) {
                    field.classList.add('error');
                    appendError(field.parentElement, 'Please enter a valid phone number');
                    isValid = false;
                }
            }
        });

        if (currentStep === 3) {
            const estimateIsVisible = estimatorNodes.result && estimatorNodes.result.style.display !== 'none';
            if (!estimateIsVisible) {
                const estimatorWrapper = document.getElementById('quoteEstimator');
                if (estimatorWrapper) {
                    appendError(estimatorWrapper, 'Please calculate your estimate before proceeding to review.');
                }
                isValid = false;
            }
        }

        return isValid;
    }

    function extractMultiSelectValues(selectElement) {
        return Array.from(selectElement.selectedOptions).map((option) => option.value);
    }

    function collectStepData(stepNumber) {
        const stepElement = document.getElementById(`step${stepNumber}`);
        if (!stepElement) return;

        const fields = stepElement.querySelectorAll('input, select, textarea');
        fields.forEach((field) => {
            const name = field.name;
            if (!name) return;

            if (field.type === 'checkbox') {
                const all = stepElement.querySelectorAll(`input[name="${name}"][type="checkbox"]`);
                formState[name] = Array.from(all)
                    .filter((item) => item.checked)
                    .map((item) => item.value);
                return;
            }

            if (field.type === 'radio') {
                const checked = stepElement.querySelector(`input[name="${name}"]:checked`);
                formState[name] = checked ? checked.value : '';
                return;
            }

            if (field.type === 'file') {
                formState[name] = field.files ? Array.from(field.files).map((f) => f.name) : [];
                return;
            }

            if (field.multiple && field.tagName === 'SELECT') {
                formState[name] = extractMultiSelectValues(field);
                return;
            }

            formState[name] = field.value;
        });

        if (lastEstimate) {
            formState.estimate = lastEstimate;
        }
    }

    function toCurrency(value) {
        return `₱${Math.round(value).toLocaleString('en-PH')}`;
    }

    function getSelectedValuesByName(name) {
        return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((item) => item.value);
    }

    function computeEstimate() {
        const quantity = Math.max(1, Number(document.getElementById('quantity')?.value || 1));
        const width = Number(estimatorNodes.width?.value || 0);
        const height = Number(estimatorNodes.height?.value || 0);

        if (!(width > 0) || !(height > 0)) {
            return { error: 'Please enter valid width and height values.' };
        }

        const unit = estimatorNodes.unit?.value || 'ft';
        const wastagePercent = Math.max(0, Number(estimatorNodes.wastage?.value || 0));
        const sides = Math.max(1, Number(estimatorNodes.sides?.value || 1));
        const materialGrade = estimatorNodes.grade?.value || 'standard';

        const areaPerPieceBaseSqm = unit === 'm'
            ? width * height
            : (width * height) * 0.092903;

        const areaPerPieceSqm = areaPerPieceBaseSqm * sides;
        const adjustedAreaPerPieceSqm = areaPerPieceSqm * (1 + (wastagePercent / 100));
        const totalAreaSqm = adjustedAreaPerPieceSqm * quantity;

        const selectedMaterials = getSelectedValuesByName('materials').filter((mat) => mat !== 'no-preference');
        const resolvedMaterials = selectedMaterials.length
            ? selectedMaterials
            : ['aluminum', 'acrylic'];

        const gradeMultiplier = materialGrade === 'premium' ? 1.22 : 1;

        let materialCost = 0;
        resolvedMaterials.forEach((material) => {
            const rate = materialRatesPerSqm[material] || 0;
            materialCost += totalAreaSqm * rate * gradeMultiplier;
        });

        const selectedServices = getSelectedValuesByName('services');
        let serviceSpecCost = 0;

        selectedServices.forEach((service) => {
            const config = serviceSpecRates[service];
            if (!config) return;

            if (config.mode === 'flat') {
                serviceSpecCost += config.value;
            } else {
                serviceSpecCost += totalAreaSqm * config.value;
            }
        });

        const illumination = document.querySelector('input[name="illumination"]:checked')?.value;
        if (illumination === 'yes') {
            serviceSpecCost += totalAreaSqm * 1200;
        }

        const location = document.getElementById('location')?.value;
        if (location === 'outdoor') {
            serviceSpecCost *= 1.1;
        } else if (location === 'both') {
            serviceSpecCost *= 1.15;
        }

        const totalEstimate = materialCost + serviceSpecCost;

        return {
            quantity,
            totalAreaSqm,
            selectedMaterials: resolvedMaterials,
            selectedServices,
            materialCost,
            serviceSpecCost,
            totalEstimate
        };
    }

    function renderEstimate(estimate) {
        if (estimate.error) {
            alert(estimate.error);
            return;
        }

        lastEstimate = estimate;

        estimatorNodes.area.textContent = `${estimate.totalAreaSqm.toFixed(2)} sqm`;
        estimatorNodes.qty.textContent = `${estimate.quantity}`;
        estimatorNodes.materialCost.textContent = toCurrency(estimate.materialCost);
        estimatorNodes.serviceCost.textContent = toCurrency(estimate.serviceSpecCost);
        estimatorNodes.total.textContent = toCurrency(estimate.totalEstimate);

        estimatorNodes.result.style.display = 'block';
    }

    function bindEstimator() {
        if (!estimatorNodes.button) return;

        estimatorNodes.button.addEventListener('click', () => {
            const estimate = computeEstimate();
            renderEstimate(estimate);
        });
    }

    function bindRealtimeEstimatorRefresh() {
        const refreshSources = [
            'quantity',
            'location',
            'specWidth',
            'specHeight',
            'specUnit',
            'wastage',
            'sides',
            'materialGrade'
        ];

        refreshSources.forEach((id) => {
            const node = document.getElementById(id);
            if (!node) return;
            node.addEventListener('input', () => {
                if (!lastEstimate) return;
                const estimate = computeEstimate();
                renderEstimate(estimate);
            });
            node.addEventListener('change', () => {
                if (!lastEstimate) return;
                const estimate = computeEstimate();
                renderEstimate(estimate);
            });
        });

        ['services', 'materials', 'illumination'].forEach((name) => {
            const nodes = document.querySelectorAll(`input[name="${name}"]`);
            nodes.forEach((node) => {
                node.addEventListener('change', () => {
                    if (!lastEstimate) return;
                    const estimate = computeEstimate();
                    renderEstimate(estimate);
                });
            });
        });
    }

    function bindFilePreview() {
        const fileInput = document.getElementById('fileUpload');
        if (!fileInput) return;

        const preview = document.createElement('div');
        preview.id = 'filePreview';
        fileInput.parentElement.appendChild(preview);

        fileInput.addEventListener('change', (event) => {
            const files = Array.from(event.target.files || []);
            preview.innerHTML = '';

            files.forEach((file) => {
                const item = document.createElement('div');
                item.className = 'file-item';
                item.style.display = 'flex';
                item.style.gap = '0.5rem';
                item.style.alignItems = 'center';
                item.style.marginTop = '0.5rem';
                item.innerHTML = `<i class="fas fa-file"></i><span>${file.name}</span><small>(${Math.round(file.size / 1024)} KB)</small>`;
                preview.appendChild(item);
            });
        });
    }

    function mapValue(value, dictionary) {
        return dictionary[value] || value || 'N/A';
    }

    function populateReview() {
        const review = document.getElementById('reviewContent');
        if (!review) return;

        const industryMap = {
            retail: 'Retail/Department Store',
            restaurant: 'Restaurant/Food Service',
            hotel: 'Hotel/Resort',
            corporate: 'Corporate/Office',
            healthcare: 'Healthcare',
            education: 'Education',
            'real-estate': 'Real Estate',
            other: 'Other'
        };

        const projectTypeMap = {
            new: 'New Installation',
            replacement: 'Sign Replacement',
            renovation: 'Store Renovation',
            rebranding: 'Rebranding',
            expansion: 'Business Expansion'
        };

        const urgencyMap = {
            flexible: 'Flexible Timeline',
            standard: 'Standard (2-4 weeks)',
            rush: 'Rush (1-2 weeks)',
            emergency: 'Emergency (Less than 1 week)'
        };

        const budgetMap = {
            'under-50k': 'Under ₱50,000',
            '50k-100k': '₱50,000 - ₱100,000',
            '100k-250k': '₱100,000 - ₱250,000',
            '250k-500k': '₱250,000 - ₱500,000',
            'over-500k': 'Over ₱500,000',
            flexible: 'Flexible/Open'
        };

        const formatList = (value) => {
            if (!value || (Array.isArray(value) && value.length === 0)) return 'N/A';
            return Array.isArray(value) ? value.join(', ') : value;
        };

        const estimateHtml = formState.estimate
            ? `
                <div class="review-section">
                    <h3>Automated Cost Estimate</h3>
                    <div class="review-grid">
                        <div class="review-item"><strong>Total Area</strong><span>${formState.estimate.totalAreaSqm.toFixed(2)} sqm</span></div>
                        <div class="review-item"><strong>Quantity</strong><span>${formState.estimate.quantity}</span></div>
                        <div class="review-item"><strong>Material Cost</strong><span>${toCurrency(formState.estimate.materialCost)}</span></div>
                        <div class="review-item"><strong>Service Spec Impact</strong><span>${toCurrency(formState.estimate.serviceSpecCost)}</span></div>
                        <div class="review-item full-width"><strong>Estimated Total</strong><span>${toCurrency(formState.estimate.totalEstimate)}</span></div>
                    </div>
                </div>
            `
            : '';

        review.innerHTML = `
            <div class="review-section">
                <h3>Contact Information</h3>
                <div class="review-grid">
                    <div class="review-item"><strong>Name</strong><span>${(formState.firstName || '')} ${(formState.lastName || '')}</span></div>
                    <div class="review-item"><strong>Email</strong><span>${formState.email || 'N/A'}</span></div>
                    <div class="review-item"><strong>Phone</strong><span>${formState.phone || 'N/A'}</span></div>
                    <div class="review-item"><strong>Company</strong><span>${formState.company || 'N/A'}</span></div>
                    <div class="review-item full-width"><strong>Industry</strong><span>${mapValue(formState.industry, industryMap)}</span></div>
                </div>
            </div>

            <div class="review-section">
                <h3>Project Details</h3>
                <div class="review-grid">
                    <div class="review-item"><strong>Project Type</strong><span>${mapValue(formState.projectType, projectTypeMap)}</span></div>
                    <div class="review-item"><strong>Urgency</strong><span>${mapValue(formState.urgency, urgencyMap)}</span></div>
                    <div class="review-item"><strong>Target Date</strong><span>${formState.targetDate || 'N/A'}</span></div>
                    <div class="review-item"><strong>Quantity</strong><span>${formState.quantity || 'N/A'}</span></div>
                    <div class="review-item full-width"><strong>Services</strong><span>${formatList(formState.services)}</span></div>
                    <div class="review-item full-width"><strong>Signage Type</strong><span>${formatList(formState.signageType)}</span></div>
                </div>
            </div>

            <div class="review-section">
                <h3>Specifications</h3>
                <div class="review-grid">
                    <div class="review-item"><strong>Dimensions</strong><span>${formState.dimensions || 'N/A'}</span></div>
                    <div class="review-item"><strong>Materials</strong><span>${formatList(formState.materials)}</span></div>
                    <div class="review-item"><strong>Location</strong><span>${formState.location || 'N/A'}</span></div>
                    <div class="review-item"><strong>Illumination</strong><span>${formState.illumination || 'N/A'}</span></div>
                    <div class="review-item"><strong>Design Assets</strong><span>${formState.hasDesign || 'N/A'}</span></div>
                    <div class="review-item"><strong>Budget</strong><span>${mapValue(formState.budget, budgetMap)}</span></div>
                    <div class="review-item full-width"><strong>Project Description</strong><p>${formState.projectDescription || 'N/A'}</p></div>
                </div>
            </div>
            ${estimateHtml}
        `;
    }

    function generateReferenceNumber() {
        const now = new Date();
        const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
        const randomPart = Math.floor(1000 + Math.random() * 9000);
        return `MFQ-${timestamp}-${randomPart}`;
    }

    async function fakeSubmit(payload) {
        console.log('Quote request payload:', payload);
        return new Promise((resolve) => setTimeout(resolve, 1200));
    }

    function bindSubmit() {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (!validateCurrentStep()) return;

            for (let stepNo = 1; stepNo <= totalSteps; stepNo++) {
                collectStepData(stepNo);
            }

            if (window.AuthManager && !window.AuthManager.isAuthenticated()) {
                window.AuthManager.showLoginRequired('Please log in or sign up to submit a quote request.');
                return;
            }

            const submitButton = form.querySelector('button[type="submit"]');
            const original = submitButton ? submitButton.innerHTML : '';
            if (submitButton) {
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
                submitButton.disabled = true;
            }

            try {
                await fakeSubmit(formState);

                const success = document.getElementById('quoteSuccess');
                if (success) {
                    success.style.display = 'block';
                }

                form.style.display = 'none';
                const stepsWrap = document.querySelector('.quote-steps');
                if (stepsWrap) stepsWrap.style.display = 'none';

                const confirmEmail = document.getElementById('confirmEmail');
                if (confirmEmail) confirmEmail.textContent = formState.email || 'your email';

                const ref = document.getElementById('referenceNumber');
                if (ref) ref.textContent = generateReferenceNumber();

                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                alert('Failed to submit quote request. Please try again.');
                if (submitButton) {
                    submitButton.innerHTML = original;
                    submitButton.disabled = false;
                }
            }
        });
    }

    window.nextStep = function nextStep() {
        if (!validateCurrentStep()) {
            return;
        }

        collectStepData(currentStep);

        if (currentStep < totalSteps) {
            currentStep += 1;
            if (currentStep === 4) {
                populateReview();
            }
            showStep(currentStep);
        }
    };

    window.prevStep = function prevStep() {
        if (currentStep > 1) {
            currentStep -= 1;
            showStep(currentStep);
        }
    };

    init();
})();
