document.addEventListener('DOMContentLoaded', () => {
  const titulo = document.getElementById('titulo');
  const form = document.getElementById('form');
  const inputNombre = document.getElementById('name');

  // Paleta de colores pasteles para el texto y las palabras del fondo
  const coloresPastel = [
    '#ffb3ba', '#ffdfba', '#ffffba', 
    '#baffc9', '#bae1ff', '#e8baff', '#ff9ff3'
  ];

  const colorAleatorio = () => coloresPastel[Math.floor(Math.random() * coloresPastel.length)];

  // 1. Animación de olas y colores en el título
  if (titulo) {
    const texto = titulo.innerText;
    titulo.innerHTML = '';

    [...texto].forEach((letra, index) => {
      const span = document.createElement('span');
      span.innerHTML = letra === ' ' ? '&nbsp;' : letra;
      span.style.setProperty('--i', index);
      span.style.color = colorAleatorio();

      span.addEventListener('animationiteration', () => {
        span.style.color = colorAleatorio();
      });

      titulo.appendChild(span);
    });
  }

  // 2. Validación del nombre y redirección a main.html
  if (form && inputNombre) {
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Evita que la página se recargue por defecto

      const valorInput = inputNombre.value.trim();

      // Comprueba si el texto es "Sara" o "sara"
      if (valorInput === 'Sara' || valorInput === 'sara') {
        window.location.href = 'main.html';
      } else {
        alert('Mi vida, he dicho el nombre, SOLO EL NOMBRE, no los apellidos.\n\n\n(o eso o tienes sindrome y me has escrito cualquier pollada)');
      }
    });
  }

  // 3. Generador de palabras flotantes con colores aleatorios desde fuera de la pantalla
  function crearPalabraFlotante() {
    const palabras = ['SARA', 'RODRIGUEZ', 'OSPINA'];
    const span = document.createElement('span');
    span.classList.add('palabra-fondo');
    
    span.innerText = palabras[Math.floor(Math.random() * palabras.length)];

    // Color pastel aleatorio para cada palabra
    span.style.color = colorAleatorio();

    // Elige al azar la dirección: hacia arriba o hacia abajo
    const direccion = Math.random() > 0.5 ? 'diagonal-arriba' : 'diagonal-abajo';
    span.classList.add(direccion);

    // Posición inicial aleatoria en el eje horizontal
    const inicioX = Math.random() * 120 - 10;
    span.style.left = `${inicioX}vw`;

    // Tamaño y velocidad aleatorios
    const tamano = Math.random() * 1.5 + 1.2;
    const duracion = Math.random() * 5 + 6;
    
    span.style.fontSize = `${tamano}rem`;
    span.style.animationDuration = `${duracion}s`;

    document.body.appendChild(span);

    // Eliminar el elemento al finalizar la animación
    setTimeout(() => {
      span.remove();
    }, duracion * 1000);
  }

  // Genera una nueva palabra flotante cada 700 ms
  setInterval(crearPalabraFlotante, 700);
});