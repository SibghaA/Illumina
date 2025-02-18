document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const mentorId = urlParams.get("id");

  const mentorName = document.getElementById("mentorName");
  const mentorProfession = document.getElementById("mentorProfession");
  const mentorLocation = document.getElementById("mentorLocation");
  const mentorAvailability = document.getElementById("mentorAvailability");
  const expertiseContainer = document.getElementById("expertiseContainer");
  const mentorExperience = document.getElementById("mentorExperience");
  const mentorAbout = document.getElementById("mentorAbout");
  const mentorStyle = document.getElementById("mentorStyle");
  const previousMentoring = document.getElementById("previousMentoring");
  const modalMentorName = document.getElementById("modalMentorName");

  const connectButton = document.getElementById("connectButton");
  const connectionModal = document.getElementById("connectionModal");
  const closeModal = document.querySelector(".close-modal");

  if (connectButton && connectionModal && closeModal) {
    connectButton.addEventListener("click", () => {
      connectionModal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
      connectionModal.style.display = "none";
    });

    window.addEventListener("click", event => {
      if (event.target === connectionModal) {
        connectionModal.style.display = "none";
      }
    });
  }

  const connectionForm = document.getElementById("connectionForm");

  const notification = document.createElement("div");
  notification.className = "notification";
  document.body.appendChild(notification);

  try {
    const response = await fetch(`/api/mentors/${mentorId}`);
    const mentor = await response.json();

    mentorName.textContent = `${mentor.firstName} ${mentor.lastName}`;
    mentorProfession.textContent = mentor.profession;
    mentorLocation.textContent = mentor.location;
    if (mentorAvailability) mentorAvailability.textContent = mentor.availability;
    if (mentorExperience) mentorExperience.textContent = mentor.experience;
    if (mentorAbout) mentorAbout.textContent = mentor.about;
    if (mentorStyle) mentorStyle.textContent = mentor.mentorStyle;
    if (previousMentoring)
      previousMentoring.textContent =
        mentor.previousMentoring || "No previous mentoring experience listed";
    if (modalMentorName) modalMentorName.textContent = `${mentor.firstName} ${mentor.lastName}`;

    if (expertiseContainer) {
      expertiseContainer.innerHTML = mentor.expertise
        .map(tag => `<span class="expertise-tag">${tag}</span>`)
        .join("");
    }

    if (connectionForm) {
      connectionForm.addEventListener("submit", async e => {
        e.preventDefault();

        const formData = new FormData(connectionForm);
        const data = {
          mentorId: mentorId,
          mentorName: mentorName.textContent,
          requesterName: formData.get("requesterName"),
          requesterEmail: formData.get("requesterEmail"),
          requesterProfession: formData.get("requesterProfession"),
          message: formData.get("message"),
          goals: formData.get("goals"),
        };

        try {
          const response = await fetch("/api/connections", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            notification.textContent = "Connection request sent successfully!";
            notification.style.backgroundColor = "#4CAF50";
            notification.classList.add("show");

            connectionForm.reset();
            connectionModal.style.display = "none";

            setTimeout(() => {
              notification.classList.remove("show");
            }, 3000);
          } else {
            throw new Error("Failed to send connection request");
          }
        } catch (error) {
          notification.textContent = "Failed to send connection request. Please try again.";
          notification.style.backgroundColor = "#dc3545";
          notification.classList.add("show");

          setTimeout(() => {
            notification.classList.remove("show");
          }, 3000);
        }
      });
    }
  } catch (error) {
    console.error("Error fetching mentor:", error);
    mentorName.textContent = "Error loading mentor";
  }
});
