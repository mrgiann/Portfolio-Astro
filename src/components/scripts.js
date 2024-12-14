document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.containerImg');
  const img = container.querySelector('img');
  const video = container.querySelector('video');

  container.addEventListener('mouseenter', () => {
    if (!video.classList.contains('visible')) {
      // Derivar el nombre del video hover basado en la imagen actual
      const imgSrc = img.src; // Ruta de la imagen actual
      const hoverVideoSrc = imgSrc.replace('.webp', 'hover.mp4'); // Cambia extensión e incluye "hover"

      // Cambiar el src del video al hover correspondiente
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

