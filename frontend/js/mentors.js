document.addEventListener('DOMContentLoaded', async function () {
  const mentorsGrid = document.querySelector('.mentors-grid');

  try {
    const response = await fetch('/api/mentors');
    const mentors = await response.json();

    mentorsGrid.innerHTML = '';

    mentors.forEach(mentor => {
      const mentorCard = document.createElement('div');
      mentorCard.className = 'mentor-card';
      mentorCard.innerHTML = `
                <h3>${mentor.firstName} ${mentor.lastName}</h3>
                <p class="profession">${mentor.profession}</p>
                <p class="location">${mentor.location}</p>
                <a href="/mentorprofile?id=${mentor.id}" class="connect-btn">View Profile</a>
            `;
      mentorsGrid.appendChild(mentorCard);
    });
  } catch (error) {
    console.error('Error fetching mentors:', error);
    mentorsGrid.innerHTML = '<p>Failed to load mentors. Please try again later.</p>';
  }
});
