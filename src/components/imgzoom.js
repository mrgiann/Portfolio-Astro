// Obtener el modal, la imagen y el botón de cierre
var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("modalImage");
var closeBtn = document.getElementsByClassName("close")[0];

// Funcionalidad para las imágenes de las certificaciones (si las tienes)
document.querySelector(".certifications img").onclick = function() {
  modal.style.display = "flex";
  modalImg.src = this.src;      
}

// Funcionalidad para las imágenes dentro de las tarjetas de los proyectos
var projectImages = document.querySelectorAll(".cardProject img");
projectImages.forEach(function(img) {
  img.onclick = function() {
    modal.style.display = "flex";
    modalImg.src = this.src;  // Establecer la imagen del modal con la imagen clickeada
  };
});

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
