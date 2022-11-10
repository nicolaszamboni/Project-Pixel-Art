const buttonRandomColor = document.querySelector('#button-random-color');
const colorDiv = document.querySelectorAll('.color');
const sectionQuadro = document.querySelector('#pixel-board');
const body = document.querySelector('body');
let selectedColor = 'rgb(0 , 0 , 0)';

window.onload = function () {
  if (localStorage.getItem('boardSize') !== null) {
    quadroPixel(localStorage.getItem('boardSize'));
  } else {
    quadroPixel(5);
  }
  const arrayPixelLocalStorage = JSON.parse(localStorage.getItem('pixelBoard'));
  if (arrayPixelLocalStorage !== null) {
    getLocalStoragePixel();
  }
  const randomColorLocalStorage = JSON.parse(
    localStorage.getItem('colorPalette'));
  if (randomColorLocalStorage !== null) {
    getLocalStorageRandomColor();
  } else {
    buttonColorRandom();
  }
  setGradient()
};

function buttonColorRandom() {
  for (let index = 1; index < colorDiv.length; index += 1) {
    const array = [];
    const colors = 3;
    for (let rgbIndex = 0; rgbIndex < colors; rgbIndex += 1) {
      array.push(Math.floor(Math.random() * 254));
    }
    colorDiv[index].style.backgroundColor = `rgb(${array})`;
    colorDiv[0].style.backgroundColor = 'rgb(0, 0, 0)';
    colorDiv[0].classList.add('selected');
  }
  location.reload();
  setLocalStorageRandomColor();
}
buttonRandomColor.addEventListener('click', buttonColorRandom);

function classSelection() {
  for (let index = 0; index < colorDiv.length; index += 1) {
    colorDiv[index].addEventListener('click', () => {
      selectedColor = colorDiv[index].style.backgroundColor;
      colorDiv[index].classList.add('selected');
      for (let index2 = 0; index2 < colorDiv.length; index2 += 1) {
        if (
          colorDiv[index] !== colorDiv[index2] &&
          colorDiv[index2].classList.contains('selected')
        ) {
          colorDiv[index2].classList.remove('selected');
        }
      }
    });
  }
}
classSelection();

function pintandoPixel() {
  const pixelDiv = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixelDiv.length; index += 1) {
    pixelDiv[index].addEventListener('click', () => {
      pixelDiv[index].style.backgroundColor = selectedColor;
      setLocalStoragePixel();
    });
  }
}

function clearDraw() {
  const clear = document.querySelector('#clear-board');
  const pixelDiv = document.querySelectorAll('.pixel');
  clear.addEventListener('click', () => {
    for (let index = 0; index < pixelDiv.length; index += 1) {
      pixelDiv[index].style.backgroundColor = 'rgb(255, 255, 255)';
      pixelDiv[index].style.borderColor = 'rgb(0, 0, 0)';
    }
    setLocalStoragePixel();
  });
}

function quadroPixel(quadro) {
  sectionQuadro.style.gridTemplateColumns = `repeat(${quadro}, 1fr)`;
  for (let index = 0; index < quadro; index += 1) {
    for (let index2 = 0; index2 < quadro; index2 += 1) {
      const divQuadro = document.createElement('div');
      divQuadro.className = `pixel`;
      divQuadro.style.backgroundColor = 'white';
      sectionQuadro.appendChild(divQuadro);
    }
    localStorage.setItem('boardSize', quadro);
    pintandoPixel();
    clearDraw();
  }
}

function input(boardSize) {
  if (boardSize < 5) {
    boardSize = 5;
  } else if (boardSize > 50) {
    boardSize = 50;
  }
  quadroPixel(boardSize);
}

const tabelaDinamica = document.querySelector('#generate-board');
tabelaDinamica.addEventListener('click', () => {
  const boardSize = document.querySelector('#board-size').value;
  if (boardSize === '') {
    alert('Board inválido!');
  } else {
    sectionQuadro.innerHTML = '';
    input(boardSize);
  }
});

function setLocalStoragePixel() {
  const pixelPosition = document.querySelectorAll('.pixel');
  const arrayPixelLocalStorage = [];
  for (let index = 0; index < pixelPosition.length; index += 1) {
    arrayPixelLocalStorage.push(pixelPosition[index].style.backgroundColor);

  }
  localStorage.setItem('pixelBoard', JSON.stringify(arrayPixelLocalStorage));
}

function getLocalStoragePixel() {
  const pixelPosition = document.querySelectorAll('.pixel');
  const arrayPixelLocalStorage = JSON.parse(localStorage.getItem('pixelBoard'));
  for (let index = 0; index < pixelPosition.length; index += 1) {
    pixelPosition[index].style.backgroundColor = arrayPixelLocalStorage[index];
  }
}

function setLocalStorageRandomColor() {
  const randomColorLocalStorage = [];
  for (let index = 0; index < colorDiv.length; index += 1) {
    randomColorLocalStorage.push(colorDiv[index].style.backgroundColor);
    console.log(colorDiv[index].style.backgroundColor);
  }
  localStorage.setItem('colorPalette', JSON.stringify(randomColorLocalStorage));
}

function getLocalStorageRandomColor() {
  const randomColorLocalStorage = JSON.parse(
    localStorage.getItem('colorPalette')
  );
  for (let index = 0; index < colorDiv.length; index += 1) {
    colorDiv[index].style.backgroundColor = randomColorLocalStorage[index];
  }
}


// function setGradient() {
//   body.style.background = 
//   "linear-gradient(to bottom right, " 
//   + colorDiv[0].style.backgroundColor
//   + ", " 
//   // + colorDiv[1].style.backgroundColor
//   // + ", " 
//   // + colorDiv[2].style.backgroundColor
//   // + ", " 
//   // + colorDiv[3].style.backgroundColor
//   // + ", " 
//   + colorDiv[4].style.backgroundColor
//   + ", " 
//   + colorDiv[5].style.backgroundColor
//   + ", " 
//   // + colorDiv[6].style.backgroundColor
//   // + ", " 
//   // + colorDiv[7].style.backgroundColor
//   // + ", " 
//   // + colorDiv[8].style.backgroundColor
//   // + ", " 
//   + colorDiv[9].style.backgroundColor
//   // + ", " 
//   + ")";
//  }
// document.body.style.backgroundCOlor = linear-gradient(180deg, document.getElementsByClassName('.color')[0].backgroundColor, colorDiv[0].style.backgroundColor, colorDiv[colorDiv.length -1].style.backgroundColor);