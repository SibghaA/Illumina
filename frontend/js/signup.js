document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('signupForm');
  const steps = Array.from(document.getElementsByClassName('form-step'));
  const backBtn = document.getElementById('backBtn');
  const submitBtn = document.getElementById('submitBtn');
  const mentorFields = document.getElementById('step3-mentor');
  const menteeFields = document.getElementById('step3-mentee');
  const roleOptions = document.querySelectorAll('.role-option input[type="radio"]');

  let currentStep = 0;

  const notification = document.createElement('div');
  notification.className = 'notification';
  document.body.appendChild(notification);

  roleOptions.forEach(radio => {
    radio.addEventListener('change', function () {
      currentStep = 1;
      showStep(currentStep);

      const userType = this.value;
      if (userType === 'mentor') {
        mentorFields.style.display = 'block';
        menteeFields.style.display = 'none';
      } else {
        mentorFields.style.display = 'none';
        menteeFields.style.display = 'block';
      }
    });
  });

  backBtn.addEventListener('click', function () {
    currentStep--;
    showStep(currentStep);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateStep(currentStep)) {
      notification.textContent = 'Form submitted successfully! Redirecting to homepage...';
      notification.classList.add('show');

      form.classList.add('submitting');

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    }
  });

  function showStep(stepNumber) {
    steps.forEach((step, index) => {
      step.style.display = index === stepNumber ? 'block' : 'none';
    });

    if (stepNumber === 0) {
      backBtn.style.display = 'none';
    } else {
      backBtn.style.display = 'block';
    }

    if (stepNumber === steps.length - 1) {
      submitBtn.style.display = 'block';
    } else {
      submitBtn.style.display = 'none';
    }
  }

  function validateStep(step) {
    let isValid = true;
    let fields = [];

    switch (step) {
      case 0: {
        if (!document.querySelector('input[name="userType"]:checked')) {
          alert('Please select whether you want to be a mentor or mentee');
          isValid = false;
        }
        break;
      }

      case 1: {
        fields = ['firstName', 'lastName', 'email', 'dob', 'location'];
        fields.forEach(field => {
          const input = document.getElementById(field);
          if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
          } else {
            input.classList.remove('error');
          }
        });

        if (!isValid) {
          alert('Please fill in all required fields');
        }
        break;
      }

      case 2: {
        const userType = document.querySelector('input[name="userType"]:checked').value;

        if (userType === 'mentor') {
          fields = [
            'profession',
            'experience',
            'expertise',
            'previousMentoring',
            'availability',
            'mentorMotivation',
            'mentorStyle',
          ];
        } else {
          fields = [
            'currentStatus',
            'education',
            'interests',
            'goals',
            'mentorPreferences',
            'menteeCommitment',
          ];
        }

        fields.forEach(field => {
          const input = document.getElementById(field);
          if (input.type === 'select-multiple') {
            if (Array.from(input.selectedOptions).length === 0) {
              input.classList.add('error');
              isValid = false;
            } else {
              input.classList.remove('error');
            }
          } else if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
          } else {
            input.classList.remove('error');
          }
        });

        if (!isValid) {
          alert('Please fill in all required fields');
        }
        break;
      }
    }

    return isValid;
  }

  document.querySelectorAll('input, select, textarea').forEach(element => {
    element.addEventListener('input', function () {
      this.classList.remove('error');
    });
  });

  showStep(0);
});
