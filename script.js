// PLP 6 — Interactive Web Pages with JavaScript
// Event handling, interactive UI, and custom form validation.

// -------------- Part 1: Event Handling Basics
const themeToggle = document.getElementById('themeToggle');
const toggleMsgBtn = document.getElementById('toggleMsgBtn');
const clickMessage = document.getElementById('clickMessage');
const hoverBox = document.getElementById('hoverBox');
const liveInput = document.getElementById('liveInput');
const livePreview = document.getElementById('livePreview');

// Click: Toggle message visibility
toggleMsgBtn.addEventListener('click', () => {
  clickMessage.classList.toggle('hidden');
});

// Hover and Focus: Highlight box
const activateHover = () => hoverBox.classList.add('is-active');
const deactivateHover = () => hoverBox.classList.remove('is-active');
hoverBox.addEventListener('mouseenter', activateHover);
hoverBox.addEventListener('mouseleave', deactivateHover);
hoverBox.addEventListener('focus', activateHover);
hoverBox.addEventListener('blur', deactivateHover);

// Keyboard input: Live preview
liveInput.addEventListener('input', () => {
  livePreview.textContent = liveInput.value;
});

// -------------- Part 2: Interactive Elements (Tabs, Counter, FAQ, Theme)
// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('theme--light');
});

// Tabs
const tabs = Array.from(document.querySelectorAll('.tab'));
const panels = Array.from(document.querySelectorAll('.tab-panel'));
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const panelId = tab.getAttribute('aria-controls');

    tabs.forEach((t) => {
      t.classList.toggle('is-active', t === tab);
      t.setAttribute('aria-selected', String(t === tab));
    });
    panels.forEach((p) => p.classList.toggle('is-active', p.id === panelId));
  });
});

// Counter
let count = 0;
const countValue = document.getElementById('countValue');
const incBtn = document.getElementById('incBtn');
const decBtn = document.getElementById('decBtn');
const resetBtn = document.getElementById('resetBtn');
const countHint = document.getElementById('countHint');

function updateCountDisplay() {
  countValue.textContent = String(count);
  if (count >= 10) {
    countHint.textContent = 'You reached 10! 🏆';
  } else {
    countHint.textContent = 'Reach 10 to win! 🎯';
  }
}

incBtn.addEventListener('click', () => { count += 1; updateCountDisplay(); });
decBtn.addEventListener('click', () => { count -= 1; updateCountDisplay(); });
resetBtn.addEventListener('click', () => { count = 0; updateCountDisplay(); });

// FAQ (Collapsible)
const faqButtons = Array.from(document.querySelectorAll('.faq__q'));
faqButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const answerId = btn.getAttribute('aria-controls');
    const answerEl = document.getElementById(answerId);
    btn.setAttribute('aria-expanded', String(!expanded));
    answerEl.classList.toggle('hidden', expanded);
  });
});

// -------------- Part 3: Custom Form Validation
const form = document.getElementById('signupForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPass = document.getElementById('confirm');
const terms = document.getElementById('terms');
const nameErr = document.getElementById('nameErr');
const emailErr = document.getElementById('emailErr');
const passErr = document.getElementById('passErr');
const confirmErr = document.getElementById('confirmErr');
const formStatus = document.getElementById('formStatus');

function validateName(value) {
  const trimmed = String(value).trim();
  if (trimmed.length < 2) return 'Name must be at least 2 characters.';
  return '';
}

function validateEmail(value) {
  const trimmed = String(value).trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!emailRegex.test(trimmed)) return 'Enter a valid email address.';
  return '';
}

function validatePassword(value) {
  const str = String(value);
  if (str.length < 6) return 'Password must be at least 6 characters.';
  if (!/[A-Z]/.test(str)) return 'Include at least one uppercase letter.';
  if (!/[0-9]/.test(str)) return 'Include at least one number.';
  return '';
}

function validateConfirm(passwordValue, confirmValue) {
  if (String(passwordValue) !== String(confirmValue)) return 'Passwords do not match.';
  return '';
}

function showError(el, msg) {
  el.textContent = msg;
}

function clearStatus() {
  formStatus.textContent = '';
}

// Live validation
fullName.addEventListener('input', () => { showError(nameErr, validateName(fullName.value)); clearStatus(); });
email.addEventListener('input', () => { showError(emailErr, validateEmail(email.value)); clearStatus(); });
password.addEventListener('input', () => { showError(passErr, validatePassword(password.value)); clearStatus(); });
confirmPass.addEventListener('input', () => { showError(confirmErr, validateConfirm(password.value, confirmPass.value)); clearStatus(); });

// Submit handler
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameMsg = validateName(fullName.value);
  const emailMsg = validateEmail(email.value);
  const passMsg = validatePassword(password.value);
  const confirmMsg = validateConfirm(password.value, confirmPass.value);
  const termsMsg = terms.checked ? '' : 'You must accept the terms.';

  showError(nameErr, nameMsg);
  showError(emailErr, emailMsg);
  showError(passErr, passMsg);
  showError(confirmErr, confirmMsg);

  const messages = [nameMsg, emailMsg, passMsg, confirmMsg, termsMsg].filter(Boolean);
  if (messages.length > 0) {
    formStatus.textContent = messages[0];
    return;
  }

  formStatus.textContent = 'Success! Your account has been created.';
  form.reset();
});


