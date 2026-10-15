// Loaded with `defer`, so the DOM is ready when this runs.

/* ---------------------------------------------
   Mobile menu
--------------------------------------------- */
const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const nav = document.getElementById("nav")

function setMenu(open) {
  nav.classList.toggle("active", open)
  mobileMenuBtn.setAttribute("aria-expanded", String(open))
  mobileMenuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu")

  const icon = mobileMenuBtn.querySelector("i")
  icon.classList.toggle("fa-bars", !open)
  icon.classList.toggle("fa-times", open)
}

if (mobileMenuBtn && nav) {
  mobileMenuBtn.addEventListener("click", () => {
    setMenu(!nav.classList.contains("active"))
  })

  // Close the menu when a link is chosen
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false))
  })
}

// Smooth scrolling is handled by `scroll-behavior: smooth` in styles.css,
// and `scroll-margin-top` stops the fixed header covering section titles.

/* ---------------------------------------------
   Lightbox
   Gallery data is read from the HTML, so captions
   only need editing in one place.
--------------------------------------------- */
const workItems = Array.from(document.querySelectorAll(".work-item"))
const lightbox = document.getElementById("lightbox")
const lightboxImage = document.getElementById("lightbox-image")
const lightboxTitle = document.getElementById("lightbox-title")
const lightboxDescription = document.getElementById("lightbox-description")
const lightboxClose = document.getElementById("lightbox-close")
const lightboxPrev = document.getElementById("lightbox-prev")
const lightboxNext = document.getElementById("lightbox-next")

const galleryData = workItems.map((item) => {
  const img = item.querySelector("img")
  return {
    src: img ? img.getAttribute("src") : "",
    alt: img ? img.getAttribute("alt") : "",
    title: item.querySelector(".work-overlay h4")?.textContent.trim() || "",
    description:
      item.querySelector(".work-overlay p")?.textContent.trim() || "",
  }
})

let currentIndex = 0
let isLightboxOpen = false
let lastFocused = null

function updateLightboxContent() {
  const item = galleryData[currentIndex]
  lightboxImage.src = item.src
  lightboxImage.alt = item.alt || item.title
  lightboxTitle.textContent = item.title
  lightboxDescription.textContent = item.description
}

function openLightbox(index) {
  currentIndex = index
  isLightboxOpen = true
  lastFocused = document.activeElement
  updateLightboxContent()
  lightbox.classList.add("active")
  lightbox.setAttribute("aria-hidden", "false")
  document.body.style.overflow = "hidden"
  lightboxClose.focus()
}

function closeLightbox() {
  isLightboxOpen = false
  lightbox.classList.remove("active")
  lightbox.setAttribute("aria-hidden", "true")
  document.body.style.overflow = ""
  if (lastFocused) lastFocused.focus()
}

function showPrevious() {
  currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length
  updateLightboxContent()
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryData.length
  updateLightboxContent()
}

if (lightbox && galleryData.length) {
  workItems.forEach((item, index) => {
    // Make gallery items usable with a keyboard
    item.setAttribute("tabindex", "0")
    item.setAttribute("role", "button")
    item.setAttribute("aria-label", `View larger: ${galleryData[index].title}`)

    item.addEventListener("click", () => openLightbox(index))
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        openLightbox(index)
      }
    })
  })

  lightboxClose.addEventListener("click", closeLightbox)
  lightboxPrev.addEventListener("click", showPrevious)
  lightboxNext.addEventListener("click", showNext)

  // Close when clicking the dark background
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox()
  })

  // Keep Tab focus inside the lightbox while it's open
  lightbox.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return
    const focusable = [lightboxClose, lightboxPrev, lightboxNext]
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  })
}

/* ---------------------------------------------
   Keyboard shortcuts
--------------------------------------------- */
document.addEventListener("keydown", (e) => {
  if (isLightboxOpen) {
    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowLeft") showPrevious()
    if (e.key === "ArrowRight") showNext()
    return
  }

  if (e.key === "Escape" && nav && nav.classList.contains("active")) {
    setMenu(false)
    mobileMenuBtn.focus()
  }
})

/* ---------------------------------------------
   Reveal-on-scroll animation
   Skipped for users who prefer reduced motion.
--------------------------------------------- */
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches

const revealTargets = document.querySelectorAll(
  ".service-card, .qualification-card, .work-item, .testimonial-card",
)

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target) // animate once only
        }
      })
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  )

  revealTargets.forEach((el) => {
    el.classList.add("reveal")
    revealObserver.observe(el)
  })
}

/* ---------------------------------------------
   Back to top button
   Shows once the hero has scrolled out of view.
--------------------------------------------- */
const backToTopBtn = document.querySelector(".back-to-top-btn")
const hero = document.getElementById("hero")

if (backToTopBtn && hero && "IntersectionObserver" in window) {
  const heroObserver = new IntersectionObserver(([entry]) => {
    backToTopBtn.classList.toggle("is-visible", !entry.isIntersecting)
  })
  heroObserver.observe(hero)

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    })
  })
}

/* ---------------------------------------------
   Footer year
--------------------------------------------- */
const yearEl = document.getElementById("year")
if (yearEl) yearEl.textContent = new Date().getFullYear()
