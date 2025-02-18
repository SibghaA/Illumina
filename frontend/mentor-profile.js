document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const mentorId = urlParams.get("id");

  const connectButton = document.getElementById("connectButton");
  const connectionModal = document.getElementById("connectionModal");
  const closeModal = document.querySelector(".close-modal");
  const connectionForm = document.getElementById("connectionForm");
  const modalMentorName = document.getElementById("modalMentorName");

  async function fetchMentorProfile() {
    try {
      const response = await fetch(`/api/mentors/${mentorId}`);
      const mentor = await response.json();
      updateProfileUI(mentor);
    } catch (error) {
      console.error("Error fetching mentor profile:", error);
    }
  }

  function updateProfileUI(mentor) {
    document.title = `${mentor.firstName} ${mentor.lastName} - Mentor Profile`;

    const mentorImage = document.getElementById("mentorImage");
    mentorImage.src = mentor.image || "/images/default-avatar.jpg";
    mentorImage.alt = `${mentor.firstName} ${mentor.lastName}`;

    document.getElementById("mentorName").textContent = `${mentor.firstName} ${mentor.lastName}`;
    document.getElementById("mentorProfession").textContent = mentor.profession;
    document.getElementById("mentorLocation").textContent = mentor.location;
    document.getElementById("mentorAvailability").textContent =
      `${mentor.availability} hours per week`;

    const expertiseContainer = document.getElementById("expertiseContainer");
    expertiseContainer.innerHTML = mentor.expertise
      .map(exp => `<span class="expertise-tag">${exp}</span>`)
      .join("");

    document.getElementById("mentorExperience").textContent =
      `${mentor.experience} years of professional experience in ${mentor.profession}`;

    document.getElementById("mentorAbout").textContent = mentor.mentorMotivation;

    document.getElementById("mentorStyle").textContent = mentor.mentorStyle;

    document.getElementById("previousMentoring").textContent =
      mentor.previousMentoring || "No previous mentoring experience specified.";

    modalMentorName.textContent = mentor.firstName;
  }

  connectButton.addEventListener("click", function () {
    connectionModal.style.display = "block";
  });

  closeModal.addEventListener("click", function () {
    connectionModal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === connectionModal) {
      connectionModal.style.display = "none";
    }
  });

  connectionForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      mentorId: mentorId,
      message: document.getElementById("message").value,
      goals: document.getElementById("goals").value,
    };

    try {
      const response = await fetch("/api/connection-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Connection request sent successfully!");
        connectionModal.style.display = "none";
        connectionForm.reset();
      } else {
        throw new Error("Failed to send connection request");
      }
    } catch (error) {
      console.error("Error sending connection request:", error);
      alert("Failed to send connection request. Please try again later.");
    }
  });

  fetchMentorProfile();
});
