(() => {
  const modal = document.getElementById("documentModal");
  const title = document.getElementById("documentModalTitle");
  const frame = document.getElementById("documentModalFrame");
  const imageWrap = document.getElementById("documentModalImageWrap");
  const image = document.getElementById("documentModalImage");
  const openLink = document.getElementById("documentModalOpen");
  const resumePrintButton = document.getElementById("printResumeButton");
  const closeButton = modal?.querySelector("[data-modal-close]");
  const links = document.querySelectorAll(".document-link[data-modal-src]");
  let lastFocused = null;

  if (!modal || !title || !frame || !imageWrap || !image || !openLink || !closeButton) {
    return;
  }

  const openModal = (trigger) => {
    const src = trigger.dataset.modalSrc;
    const modalTitle = trigger.dataset.modalTitle || trigger.textContent.trim();
    const isImage = trigger.dataset.modalType === "image";

    lastFocused = trigger;
    title.textContent = modalTitle;
    openLink.href = src;
    openLink.textContent = isImage ? "Abrir imagen en otra pesta\u00f1a" : "Abrir documento en otra pesta\u00f1a";

    if (isImage) {
      frame.hidden = true;
      frame.removeAttribute("src");
      image.src = src;
      image.alt = modalTitle;
      imageWrap.hidden = false;
    } else {
      imageWrap.hidden = true;
      image.removeAttribute("src");
      image.alt = "";
      frame.hidden = false;
      frame.src = src;
    }

    modal.hidden = false;
    document.body.classList.add("modal-open");
    closeButton.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    frame.removeAttribute("src");
    frame.hidden = false;
    imageWrap.hidden = true;
    image.removeAttribute("src");
    image.alt = "";
    openLink.href = "#";
    openLink.textContent = "Abrir documento en otra pesta\u00f1a";
    document.body.classList.remove("modal-open");

    if (lastFocused) {
      lastFocused.focus();
      lastFocused = null;
    }
  };

  resumePrintButton?.addEventListener("click", () => {
    if (!modal.hidden) {
      closeModal();
    }

    window.print();
  });

  links.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openModal(trigger);
    });
  });

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
})();
