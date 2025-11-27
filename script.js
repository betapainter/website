// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll("section[id]")

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        const navHeight = document.getElementById("fixed-nav").offsetHeight
        const targetPosition = targetSection.offsetTop - navHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Active navigation link on scroll
  window.addEventListener("scroll", () => {
    let current = ""
    const navHeight = document.getElementById("fixed-nav").offsetHeight

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navHeight - 100
      const sectionHeight = section.offsetHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("data-section") === current) {
        link.classList.add("active")
      }
    })
  })

  // Gallery functionality
  const miniaturesData = [] // Declare miniaturesData variable here
  let currentFilter = "Todas"
  let currentMiniature = null
  let currentImageIndex = 0

  // Render gallery
  function renderGallery() {
    const galleryGrid = document.getElementById("gallery-grid")
    galleryGrid.innerHTML = ""

    const filteredMiniatures = miniaturesData
      .filter((miniature) => currentFilter === "Todas" || miniature.tipo === currentFilter)
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

    filteredMiniatures.forEach((miniature) => {
      const card = document.createElement("div")
      card.className = "gallery-card"
      card.onclick = () => openModal(miniature)

      const imageSrc = miniature.imagenPrincipal || miniature.imagenes[0] || "/placeholder.svg?height=800&width=600"

      card.innerHTML = `
                <img src="${imageSrc}" alt="${miniature.nombre}" class="gallery-card-image">
                <div class="gallery-card-content">
                    <h3 class="gallery-card-title">${miniature.nombre}</h3>
                    <p class="gallery-card-date">${miniature.fecha}</p>
                </div>
            `

      galleryGrid.appendChild(card)
    })
  }

  // Filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn")
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")
      currentFilter = button.getAttribute("data-filter")
      renderGallery()
    })
  })

  // Modal functionality
  const modal = document.getElementById("modal")
  const modalOverlay = modal.querySelector(".modal-overlay")
  const modalClose = modal.querySelector(".modal-close")
  const modalImage = document.getElementById("modal-image")
  const currentImageSpan = document.getElementById("current-image")
  const totalImagesSpan = document.getElementById("total-images")
  const modalPrevBtn = modal.querySelector(".modal-prev")
  const modalNextBtn = modal.querySelector(".modal-next")

  function openModal(miniature) {
    currentMiniature = miniature
    currentImageIndex = 0

    // Populate modal content
    document.getElementById("modal-title").textContent = miniature.nombre
    document.getElementById("modal-description").textContent = miniature.descripcion
    document.getElementById("modal-date").textContent = miniature.fecha
    document.getElementById("modal-type").textContent = miniature.tipo

    // Handle awards
    const awardsSection = document.getElementById("modal-awards-section")
    const awardsList = document.getElementById("modal-awards")

    if (miniature.reconocimientos && miniature.reconocimientos.length > 0) {
      awardsSection.classList.remove("hidden")
      awardsList.innerHTML = miniature.reconocimientos.map((award) => `<li>${award}</li>`).join("")
    } else {
      awardsSection.classList.add("hidden")
    }

    // Update image
    updateModalImage()

    // Handle thumbnails
    const thumbnailsSection = document.getElementById("modal-thumbnails-section")
    const thumbnailsContainer = document.getElementById("modal-thumbnails")

    if (miniature.imagenes.length > 1) {
      thumbnailsSection.classList.remove("hidden")
      thumbnailsContainer.innerHTML = miniature.imagenes
        .map(
          (img, index) => `
                    <div class="modal-thumbnail ${index === 0 ? "active" : ""}" data-index="${index}">
                        <img src="${img}" alt="Thumbnail ${index + 1}">
                    </div>
                `,
        )
        .join("")

      // Add thumbnail click handlers
      thumbnailsContainer.querySelectorAll(".modal-thumbnail").forEach((thumb) => {
        thumb.addEventListener("click", () => {
          currentImageIndex = Number.parseInt(thumb.getAttribute("data-index"))
          updateModalImage()
          updateThumbnailActive()
        })
      })
    } else {
      thumbnailsSection.classList.add("hidden")
    }

    // Show modal
    modal.classList.remove("hidden")
    document.body.style.overflow = "hidden"
  }

  function closeModal() {
    modal.classList.add("hidden")
    document.body.style.overflow = ""
    currentMiniature = null
  }

  function updateModalImage() {
    if (!currentMiniature) return

    modalImage.src = currentMiniature.imagenes[currentImageIndex] || "/placeholder.svg"
    modalImage.alt = `${currentMiniature.nombre} - Imagen ${currentImageIndex + 1}`
    currentImageSpan.textContent = currentImageIndex + 1
    totalImagesSpan.textContent = currentMiniature.imagenes.length
  }

  function updateThumbnailActive() {
    const thumbnails = document.querySelectorAll(".modal-thumbnail")
    thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle("active", index === currentImageIndex)
    })
  }

  function nextImage() {
    if (!currentMiniature) return
    currentImageIndex = (currentImageIndex + 1) % currentMiniature.imagenes.length
    updateModalImage()
    updateThumbnailActive()
  }

  function previousImage() {
    if (!currentMiniature) return
    currentImageIndex = currentImageIndex === 0 ? currentMiniature.imagenes.length - 1 : currentImageIndex - 1
    updateModalImage()
    updateThumbnailActive()
  }

  // Modal event listeners
  modalClose.addEventListener("click", closeModal)
  modalOverlay.addEventListener("click", closeModal)
  modalPrevBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    previousImage()
  })
  modalNextBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    nextImage()
  })

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("hidden")) {
      if (e.key === "Escape") closeModal()
      if (e.key === "ArrowLeft") previousImage()
      if (e.key === "ArrowRight") nextImage()
    }
  })

  // Initialize gallery
  renderGallery()
})
