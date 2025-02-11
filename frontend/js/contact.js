document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.querySelector(".contact-form");
    
    
  const notification = document.createElement("div");
  notification.className = "notification";
  document.body.appendChild(notification);

  contactForm.addEventListener("submit", async function(e) {
    e.preventDefault();
        
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
                
        notification.textContent = "Message sent successfully!";
        notification.style.backgroundColor = "#4CAF50";
        notification.classList.add("show");
                
                
        contactForm.reset();
                
                
        setTimeout(() => {
          notification.classList.remove("show");
        }, 3000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
            
      notification.textContent = "Failed to send message. Please try again.";
      notification.style.backgroundColor = "#dc3545";
      notification.classList.add("show");
            
      setTimeout(() => {
        notification.classList.remove("show");
      }, 3000);
    }
  });
}); 