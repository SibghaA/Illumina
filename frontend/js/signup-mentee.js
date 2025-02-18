document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('menteeSignupForm');

  const notification = document.createElement('div');
  notification.className = 'notification';
  document.body.appendChild(notification);

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (data.password !== data.confirmPassword) {
      notification.textContent = 'Passwords do not match';
      notification.style.backgroundColor = '#dc3545';
      notification.classList.add('show');
      setTimeout(() => notification.classList.remove('show'), 3000);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          userType: 'mentee',
        }),
      });

      if (response.ok) {
        notification.textContent = 'Successfully signed up! Redirecting to homepage...';
        notification.classList.add('show');

        form.classList.add('submitting');

        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to sign up');
      }
    } catch (error) {
      notification.textContent = error.message;
      notification.style.backgroundColor = '#dc3545';
      notification.classList.add('show');
      setTimeout(() => notification.classList.remove('show'), 3000);
    }
  });
});
