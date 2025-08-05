// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const nav = document.getElementById("nav")

mobileMenuBtn.addEventListener("click", () => {
  nav.classList.toggle("active")
  const icon = mobileMenuBtn.querySelector("i")
  if (nav.classList.contains("active")) {
    icon.classList.remove("fa-bars")
    icon.classList.add("fa-times")
  } else {
    icon.classList.remove("fa-times")
    icon.classList.add("fa-bars")
  }
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active")
    const icon = mobileMenuBtn.querySelector("i")
    icon.classList.remove("fa-times")
    icon.classList.add("fa-bars")
  })
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Lightbox functionality
const workItems = document.querySelectorAll(".work-item")
const lightbox = document.getElementById("lightbox")
const lightboxImage = document.getElementById("lightbox-image")
const lightboxTitle = document.getElementById("lightbox-title")
const lightboxDescription = document.getElementById("lightbox-description")
const lightboxClose = document.getElementById("lightbox-close")
const lightboxPrev = document.getElementById("lightbox-prev")
const lightboxNext = document.getElementById("lightbox-next")

let currentIndex = 0
let isLightboxOpen = false

// Gallery data
const galleryData = [
  {
    src: "assets/boiler-installations-bolton.webp",
    title: "Boiler Installation",
    description: "New Worcester Bosch combi boiler installation in Bolton",
  },
  {
    src: "assets/kitchen-plumber.webp",
    title: "Kitchen Plumbing",
    description:
      "1st and 2nd fix kitchen plumbing completed for a client in Manchester",
  },
  {
    src: "assets/central-heating-pipework-install-bolton.webp",
    title: "Central Heating System",
    description:
      "Full central heating system installation with radiators Atherton",
  },
  {
    src: "assets/ahsan-ak-plumbing-heating-bolton.webp",
    title: "Boiler Installation & Pipework Repair",
    description:
      "Repaired pipework to facilitate safe and compliant installation of the new boiler",
  },
  {
    src: "assets/gas-cooker-installs-bolton.webp",
    title: "Gas Cooker Installation",
    description: "Safe and professional gas cooker installation",
  },
  {
    src: "assets/gas-safety-check-bolton-for-landlords.webp",
    title: "Gas Safety Inspection",
    description: "Annual gas safety certificate and appliance check",
  },
]

// Open lightbox
function openLightbox(index) {
  currentIndex = index
  isLightboxOpen = true
  updateLightboxContent()
  lightbox.classList.add("active")
  document.body.style.overflow = "hidden"
}

// Close lightbox
function closeLightbox() {
  isLightboxOpen = false
  lightbox.classList.remove("active")
  document.body.style.overflow = ""
}

// Update lightbox content
function updateLightboxContent() {
  const item = galleryData[currentIndex]
  lightboxImage.src = item.src
  lightboxImage.alt = item.title
  lightboxTitle.textContent = item.title
  lightboxDescription.textContent = item.description
}

// Navigate to previous image
function showPrevious() {
  currentIndex = currentIndex === 0 ? galleryData.length - 1 : currentIndex - 1
  updateLightboxContent()
}

// Navigate to next image
function showNext() {
  currentIndex = currentIndex === galleryData.length - 1 ? 0 : currentIndex + 1
  updateLightboxContent()
}

// Event listeners
workItems.forEach((item, index) => {
  item.addEventListener("click", () => openLightbox(index))
})

lightboxClose.addEventListener("click", closeLightbox)
lightboxPrev.addEventListener("click", showPrevious)
lightboxNext.addEventListener("click", showNext)

// Close lightbox when clicking outside content
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox()
  }
})

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (!isLightboxOpen) return

  switch (e.key) {
    case "Escape":
      closeLightbox()
      break
    case "ArrowLeft":
      showPrevious()
      break
    case "ArrowRight":
      showNext()
      break
  }
})

// Form submission
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const data = Object.fromEntries(formData)

    // Here you would typically send the data to your server
    // For demo purposes, we'll just show an alert
    alert("Thank you for your message! We'll get back to you soon.")

    // Reset form
    this.reset()
  })

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.backdropFilter = "blur(10px)"
  } else {
    header.style.backdropFilter = "none"
  }
})

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document
  .querySelectorAll(
    ".service-card, .qualification-card, .work-item, .testimonial-card"
  )
  .forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
