// ---------- COPIAR EMAIL ----------
const copyBtn = document.getElementById("copy-btn");
const emailInput = document.getElementById("email");
const copyBtnSpan = copyBtn.querySelector("span");
const copiedText = copyBtn.dataset.copiedText || "Copied";

let restoreTimeout = null;

copyBtn.addEventListener("click", function () {
  const textToCopy = emailInput.value;

  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      const originalText = copyBtnSpan.textContent;

      copyBtnSpan.textContent = copiedText;

      if (restoreTimeout) clearTimeout(restoreTimeout);

      restoreTimeout = setTimeout(function () {
        copyBtnSpan.textContent = originalText;
      }, 2000);
    })
    .catch(function (err) {
      console.error("Error al copiar:", err);
    });
});



// ---------- MODAL DE IMÁGENES ----------

const modal = document.getElementById("imageModal");
const modalImg = document.querySelector(".modalImage");
const closeBtn = document.querySelector(".close");

document.addEventListener("click", function (e) {
  const target = e.target;

  if (target.matches(".certifications img")) {
    modalImg.src = target.src;
    modal.classList.add("visible");
  }
});

closeBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  modal.classList.remove("visible");
});

modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.classList.remove("visible");
  }
});









const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorOutline.animate(
    {
      left: `${posX}px`,
      top: `${posY}px`,
    },
    { duration: 200, fill: "forwards" }
  );
});


const inputs = document.querySelectorAll('.theme-input, .language-input, a, .theme-option, label, #copy-btn, img.image, .fa-chevron-down');  // Selecciona ambos elementos

inputs.forEach(input => {
  input.addEventListener('mouseenter', () => {
    cursorDot.style.width = '12px';
    cursorDot.style.height = '12px';
    cursorDot.style.backgroundColor = 'var(--color-texto)';
    cursorDot.style.opacity = '0.8';
  });

  input.addEventListener('mouseleave', () => {
    cursorDot.style.width = '25px';
    cursorDot.style.height = '25px';
    cursorDot.style.backgroundColor = 'var(--color-texto)';
  });
});




