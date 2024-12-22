document.getElementById('copy-btn').addEventListener('click', function() {
  // Obtener el valor del campo de texto
  var emailInput = document.getElementById('email');
  var textToCopy = emailInput.value;

  // Usar la API del portapapeles
  navigator.clipboard.writeText(textToCopy).then(() => {
    // Cambiar el texto del botón a "Copied"
    var span = this.querySelector('span');
    var originalText = span.textContent;
    span.textContent = 'Copied';
    
    // Volver al texto original después de 2 segundos
    setTimeout(() => {
      span.textContent = originalText;
    }, 2000);
  }).catch(err => {
    console.error('Error al copiar el texto:', err);
  });
});



// Obtener el modal, la imagen y el botón de cierre
var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("modalImage");
var closeBtn = document.getElementsByClassName("close")[0];

// Funcionalidad para las imágenes de las certificaciones (si las tienes)
document.querySelector(".certifications img").onclick = function() {
  modal.style.display = "flex";
  modalImg.src = this.src;      
}
// Botón de cierre
closeBtn.onclick = function(event) {
  event.stopPropagation(); 
  modal.style.display = "none";  // Cerrar el modal
};

// Cerrar el modal al hacer clic fuera de la imagen
modal.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};


document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.containerImg'); 
  const img = container.querySelector('img');
  const video = container.querySelector('video');

  container.addEventListener('mouseenter', () => {
    // Verificar que la imagen sea la principal
    if (img.src.includes('logo.webp') && !video.classList.contains('visible')) {
      // Establecer el src del video de hover solo para la imagen principal
      const hoverVideoSrc = "logohover.mp4";

      // Cambiar el src del video
      video.src = hoverVideoSrc;
      video.load(); // Recargar el video

      // Cambiar visibilidad
      img.classList.add('hidden');
      video.classList.add('visible');
      video.play();
    }
  });

  video.addEventListener('ended', () => {
    // Cuando termine el video, regresa a la imagen
    video.classList.remove('visible');
    img.classList.remove('hidden');
    video.src = ""; // Limpia la referencia del video
  });
});


function addface() {
  const typingText = document.getElementById("typing-text");
  setTimeout(() => {
    typingText.innerHTML += " :)";
    setTimeout(() => {
      typingText.innerHTML = typingText.innerHTML.replace(" :)", "");
    }, 4000);
  }, 10000);
}
window.onload = function () {
  addface();
};






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
    cursorDot.style.backgroundColor = 'var(--color-texto)'; // Cambiar color si se desea
    cursorDot.style.opacity = '0.8'; // Establecer opacidad (ajustar el valor según lo desees)
  });

  input.addEventListener('mouseleave', () => {
    cursorDot.style.width = '25px';
    cursorDot.style.height = '25px';
    cursorDot.style.backgroundColor = 'var(--color-texto)'; // Restaurar color original
  });
});
