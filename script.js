
src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"

        // Seleciona o botão de currículo pelo ID
        const downloadButton = document.getElementById('download-curriculum');
    
        // URL do arquivo PDF
        const pdfUrl = 'Arquivos/curriculo.pdf';
    
        // Função para iniciar o download ao clicar no botão
        downloadButton.addEventListener('click', () => {
            // Cria um link temporário
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.target = '_blank'; // Abre o link em uma nova aba, se necessário
            link.setAttribute('download', 'curriculo.pdf'); // Nome do arquivo a ser baixado
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        });
            // script de carrosel 

            const container = document.querySelector(".container");
const containercarrossel = container.querySelector(".container-carrossel");
const carrossel = container.querySelector(".carrossel");
const carrosselItems = carrossel.querySelectorAll(".carrossel-item");

// Iniciamos variables que cambiaran su estado.
let isMouseDown = false;
let currentMousePos = 0;
let lastMousePos = 0;
let lastMoveTo = 0;
let moveTo = 0;

const createcarrossel = () => {
  const carrosselProps = onResize();
  const length = carrosselItems.length; // Longitud del array
  const degress = 360 / length; // Grados por cada item
  const gap = 20; // Espacio entre cada item
  const tz = distanceZ(carrosselProps.w, length, gap);

  const fov = calculateFov(carrosselProps);
  const height = calculateHeight(tz);

  container.style.width = tz * 2 + gap * length + "px";
  container.style.height = height + "px";

  carrosselItems.forEach((item, i) => {
    const degressByItem = degress * i + "deg";
    item.style.setProperty("--rotatey", degressByItem);
    item.style.setProperty("--tz", tz + "px");
  });
};

// Funcion que da suavidad a la animacion
const lerp = (a, b, n) => {
  return n * (a - b) + b;
};

// https://3dtransforms.desandro.com/carousel
const distanceZ = (widthElement, length, gap) => {
  return widthElement / 2 / Math.tan(Math.PI / length) + gap; // Distancia Z de los items
};

// Calcula el alto del contenedor usando el campo de vision y la distancia de la perspectiva
const calculateHeight = (z) => {
  const t = Math.atan((90 * Math.PI) / 180 / 2);
  const height = t * 2 * z;

  return height;
};

// Calcula el campo de vision del carrossel
const calculateFov = (carrosselProps) => {
  const perspective = window
    .getComputedStyle(containercarrossel)
    .perspective.split("px")[0];

  const length =
    Math.sqrt(carrosselProps.w * carrosselProps.w) +
    Math.sqrt(carrosselProps.h * carrosselProps.h);
  const fov = 2 * Math.atan(length / (2 * perspective)) * (180 / Math.PI);
  return fov;
};

// Obtiene la posicion X y evalua si la posicion es derecha o izquierda
const getPosX = (x) => {
  currentMousePos = x;

  moveTo = currentMousePos < lastMousePos ? moveTo - 2 : moveTo + 2;

  lastMousePos = currentMousePos;
};

const update = () => {
  lastMoveTo = lerp(moveTo, lastMoveTo, 0.05);
  carrossel.style.setProperty("--rotatey", lastMoveTo + "deg");

  requestAnimationFrame(update);
};

const onResize = () => {
  // Obtiene la propiedades del tamaño de carrossel
  const boundingcarrossel = containercarrossel.getBoundingClientRect();

  const carrosselProps = {
    w: boundingcarrossel.width,
    h: boundingcarrossel.height,
  };

  return carrosselProps;
};

const initEvents = () => {
  // Eventos del mouse
  carrossel.addEventListener("mousedown", () => {
    isMouseDown = true;
    carrossel.style.cursor = "grabbing";
  });
  carrossel.addEventListener("mouseup", () => {
    isMouseDown = false;
    carrossel.style.cursor = "grab";
  });
  container.addEventListener("mouseleave", () => (isMouseDown = false));

  carrossel.addEventListener(
    "mousemove",
    (e) => isMouseDown && getPosX(e.clientX)
  );

  // Eventos del touch
  carrossel.addEventListener("touchstart", () => {
    isMouseDown = true;
    carrossel.style.cursor = "grabbing";
  });
  carrossel.addEventListener("touchend", () => {
    isMouseDown = false;
    carrossel.style.cursor = "grab";
  });
  container.addEventListener(
    "touchmove",
    (e) => isMouseDown && getPosX(e.touches[0].clientX)
  );

  window.addEventListener("resize", createcarrossel);

  update();
  createcarrossel();
};

initEvents();



document.getElementById('openProjects').addEventListener('click', function(event) {
  event.preventDefault();
  var newWindow = window.open('', '_blank');
  var newContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Projects</title>
          <style>
              body {
                  margin: 0;
                  background-color: black;
                  display: grid;
                  height: 100vh;
                  grid-template-columns: repeat(3, 1fr);
                  grid-template-rows: repeat(3, 1fr);
              }

              .grid-item {
                  position: relative;
                  border: 1px solid white;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-size: 24px;
                  color: white;
                  text-decoration: none;
                  overflow: hidden;
              }

              .grid-item img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  position: absolute;
                  z-index: -1;
              }

              .grid-item div {
                  z-index: 1;
              }

          </style>
      </head>
      <body>
          <a href="https://github.com/Leoyzs" class="grid-item"><img src="https://via.placeholder.com/300x300" alt="Image"><div>Projeto 1</div></a>
          <a href="https://github.com/Leoyzs" class="grid-item"><img src="https://via.placeholder.com/300x300" alt="Image"><div>Projeto 2</div></a>
          <a href="https://github.com/Leoyzs" class="grid-item"><img src="https://via.placeholder.com/300x300" alt="Image"><div>Projeto 3</div></a>
          <a href="https://github.com/Leoyzs" class="grid-item"><img src="https://via.placeholder.com/300x300" alt="Image"><div>Projeto 4</div></a>
          <a href="https://github.com/Leoyzs" class="grid-item"><img src="https://via.placeholder.com/300x300" alt="Image"><div>Projeto 5</div></a>
          <a href="https://github.com/Leoyzs" class="grid-item"><img src="https://via.placeholder.com/300x300" alt="Image"><div>Projeto 6</div></a>
          <a href="https://github.com/Leoyzs" class="grid-item"><img src="https://via.placeholder.com/300x300" alt="Image"><div>Projeto 7</div></a>
          <a href="https://github.com/Leoyzs" class="grid-item"><img src="https://via.placeholder.com/300x300" alt="Image"><div>Projeto 8</div></a>
          <a href="https://github.com/Leoyzs" class="grid-item"><img src="https://via.placeholder.com/300x300" alt="Image"><div>Projeto 9</div></a>
      </body>
      </html>
  `;
  newWindow.document.write(newContent);
  newWindow.document.close();
});

document.getElementById('openCurriculo').addEventListener('click', function(event) {
  event.preventDefault();
  window.open('Arquivos/curriculo.pdf');
});

var modal = document.getElementById("aboutMeModal");

// Obter o botão que abre o modal
var btn = document.getElementById("openAboutMe");

// Obter o elemento <span> que fecha o modal
var span = document.getElementById("closeModal");

// Quando o usuário clicar no botão, abre o modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// Quando o usuário clicar no <span> (x), fecha o modal
span.onclick = function() {
    modal.style.display = "none";
}

// Quando o usuário clicar em qualquer lugar fora do modal, fecha o modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}