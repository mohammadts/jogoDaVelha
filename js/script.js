let x = document.querySelector('.x')
let o = document.querySelector('.o')
let boxes = document.querySelectorAll('.box')
let buttons = document.querySelectorAll('#buttons-container button')
let messageContainer = document.querySelector('#message')
let messageText = document.querySelector('#message p')
let inputs = document.querySelectorAll('.inputNomes')

let secondPlayer
//tema dark
let toggle = document.getElementById('toggle')
let imgButton = document.getElementById('img-button')
let theme = window.localStorage.getItem('theme')
if (theme == null) {
  localStorage.setItem('theme', 'light')
  imgButton.src = 'icons/themel.png'
}

if (theme === 'dark') {
  document.body.classList.add('dark')
  imgButton.src = 'icons/themed.png'
}

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  theme = window.localStorage.getItem('theme')
  //se o theme esta como dark, seta para light e vice versa, pra alternar
  if (theme === 'dark') {
    window.localStorage.setItem('theme', 'light')
    imgButton.src = 'icons/themel.png'
    console.log('entrou no if')
  } else {
    window.localStorage.setItem('theme', 'dark')
    imgButton.src = 'icons/themed.png'
    console.log('entrou no else')
  }
})

//contando jogadas
let player1 = 0
let player2 = 0

// adicionando o evento de click ao box
for (let i = 0; i < boxes.length; i++) {
  // quando alguem clica na caixa
  boxes[i].addEventListener('click', function () {
    let el = checkEl(player1, player2)

    //if para verificar se o box já foi preenchido com x ou o
    if (this.childNodes.length == 0) {
      let cloneEl = el.cloneNode(true)

      this.appendChild(cloneEl)

      //computar jogada
      if (player1 == player2) {
        player1++
        if (secondPlayer == 'ai-player') {
          //funcao executar a jogada
          computerPlay()
          player2++
        }
      } else {
        player2++
      }

      //verifica quem venceu
      checkWinCondition()
    }
  })
}

//saber se é 2 players ou ia
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    secondPlayer = this.getAttribute('id')
    for (let j = 0; j < buttons.length; j++) {
      buttons[j].style.display = 'none'
    }
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style.display = 'none'
    }
    //salvando nomes para 2players
    p1 = document.getElementById('nomePlayer1') // elemento p no placar que vai receber o nome do player 1
    let p2 = document.getElementById('nomePlayer2')
    let nomep1 = document.querySelector('#player1') //pegando o valor do input do nome do player 1
    let nomep2 = document.querySelector('#player2')
    nomep1Texto = document.createTextNode(nomep1.value.trim()) //criando textnode para inserir no placar
    nomep2Texto = document.createTextNode(nomep2.value.trim())
    p1.appendChild(nomep1Texto) //inserindo no elemento p do placar o nome do player1
    p2.appendChild(nomep2Texto)

    setTimeout(function () {
      let container = document.querySelector('#container')
      let scoreBoard = document.querySelector('#scoreboard-container')
      container.classList.remove('hide')
      scoreBoard.classList.remove('hide')
    }, 500)
  })
}

//funçao para ver quem vai jogar
function checkEl(player1, player2) {
  if (player1 == player2) {
    //x
    el = x
  } else {
    //o
    el = o
  }
  return el
}

function checkWinCondition() {
  let b1 = document.getElementById('block-1')
  let b2 = document.getElementById('block-2')
  let b3 = document.getElementById('block-3')
  let b4 = document.getElementById('block-4')
  let b5 = document.getElementById('block-5')
  let b6 = document.getElementById('block-6')
  let b7 = document.getElementById('block-7')
  let b8 = document.getElementById('block-8')
  let b9 = document.getElementById('block-9')

  //Linha 1,2,3
  if (
    b1.childNodes.length > 0 &&
    b2.childNodes.length > 0 &&
    b3.childNodes.length > 0
  ) {
    let b1Child = b1.childNodes[0].className
    let b2Child = b2.childNodes[0].className
    let b3Child = b3.childNodes[0].className

    if (b1Child == 'x' && b2Child == 'x' && b3Child == 'x') {
      declareWinner('x')
    } else if (b1Child == 'o' && b2Child == 'o' && b3Child == 'o') {
      declareWinner('o')
    }
  }

  //Linha 4,5,6
  if (
    b4.childNodes.length > 0 &&
    b5.childNodes.length > 0 &&
    b6.childNodes.length > 0
  ) {
    let b4Child = b4.childNodes[0].className
    let b5Child = b5.childNodes[0].className
    let b6Child = b6.childNodes[0].className

    if (b4Child == 'x' && b5Child == 'x' && b6Child == 'x') {
      declareWinner('x')
    } else if (b4Child == 'o' && b5Child == 'o' && b6Child == 'o') {
      declareWinner('o')
    }
  }

  //Linha 7,8,9
  if (
    b7.childNodes.length > 0 &&
    b8.childNodes.length > 0 &&
    b9.childNodes.length > 0
  ) {
    let b7Child = b7.childNodes[0].className
    let b8Child = b8.childNodes[0].className
    let b9Child = b9.childNodes[0].className

    if (b7Child == 'x' && b8Child == 'x' && b9Child == 'x') {
      declareWinner('x')
    } else if (b7Child == 'o' && b8Child == 'o' && b9Child == 'o') {
      declareWinner('o')
    }
  }

  //Coluna 1
  if (
    b1.childNodes.length > 0 &&
    b4.childNodes.length > 0 &&
    b7.childNodes.length > 0
  ) {
    let b1Child = b1.childNodes[0].className
    let b4Child = b4.childNodes[0].className
    let b7Child = b7.childNodes[0].className

    if (b1Child == 'x' && b4Child == 'x' && b7Child == 'x') {
      declareWinner('x')
    } else if (b1Child == 'o' && b4Child == 'o' && b7Child == 'o') {
      declareWinner('o')
    }
  }
  //Coluna 2
  if (
    b2.childNodes.length > 0 &&
    b5.childNodes.length > 0 &&
    b8.childNodes.length > 0
  ) {
    let b2Child = b2.childNodes[0].className
    let b5Child = b5.childNodes[0].className
    let b8Child = b8.childNodes[0].className

    if (b2Child == 'x' && b5Child == 'x' && b8Child == 'x') {
      declareWinner('x')
    } else if (b2Child == 'o' && b5Child == 'o' && b8Child == 'o') {
      declareWinner('o')
    }
  }
  //Coluna 3
  if (
    b3.childNodes.length > 0 &&
    b6.childNodes.length > 0 &&
    b9.childNodes.length > 0
  ) {
    let b3Child = b3.childNodes[0].className
    let b6Child = b6.childNodes[0].className
    let b9Child = b9.childNodes[0].className

    if (b3Child == 'x' && b6Child == 'x' && b9Child == 'x') {
      declareWinner('x')
    } else if (b3Child == 'o' && b6Child == 'o' && b9Child == 'o') {
      declareWinner('o')
    }
  }
  //Diagonal 1
  if (
    b1.childNodes.length > 0 &&
    b5.childNodes.length > 0 &&
    b9.childNodes.length > 0
  ) {
    let b1Child = b1.childNodes[0].className
    let b5Child = b5.childNodes[0].className
    let b9Child = b9.childNodes[0].className

    if (b1Child == 'x' && b5Child == 'x' && b9Child == 'x') {
      declareWinner('x')
    } else if (b1Child == 'o' && b5Child == 'o' && b9Child == 'o') {
      declareWinner('o')
    }
  }
  //Diagonal 2
  if (
    b3.childNodes.length > 0 &&
    b5.childNodes.length > 0 &&
    b7.childNodes.length > 0
  ) {
    let b3Child = b3.childNodes[0].className
    let b5Child = b5.childNodes[0].className
    let b7Child = b7.childNodes[0].className

    if (b3Child == 'x' && b5Child == 'x' && b7Child == 'x') {
      declareWinner('x')
    } else if (b3Child == 'o' && b5Child == 'o' && b7Child == 'o') {
      declareWinner('o')
    }
  }

  //deu velha
  let counter = 0
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].childNodes[0] != undefined) {
      counter++
    }
  }
  if (counter == 9) {
    declareWinner()
  }
}

function declareWinner(winner) {
  let scoreboardX = document.querySelector('#scoreboard-1')
  let scoreboardO = document.querySelector('#scoreboard-2')
  let msg = ''
  if (winner == 'x') {
    scoreboardX.textContent = parseInt(scoreboardX.textContent) + 1
    if (nomep1Texto.data == '') {
      jogador1 = 'Jogador 1'
    } else {
      jogador1 = nomep1Texto.data
    }
    msg = `${jogador1} Venceu`
  } else if (winner == 'o') {
    scoreboardO.textContent = parseInt(scoreboardO.textContent) + 1
    if (nomep2Texto.data == '') {
      jogador2 = 'Jogador 2'
    } else {
      jogador2 = nomep2Texto.data
    }

    msg = `${jogador2} Venceu`
  } else {
    msg = 'Deu velha!'
  }

  //exibir msg
  messageText.innerHTML = msg
  messageContainer.classList.remove('hide')

  //esconde msg
  setTimeout(function () {
    messageContainer.classList.add('hide')
  }, 500)

  // zerar as jogadas
  player1 = 0
  player2 = 0
  let boxesToRemove = document.querySelectorAll('.box div')
  for (let i = 0; i < boxesToRemove.length; i++) {
    boxesToRemove[i].parentNode.removeChild(boxesToRemove[i])
  }
}

function computerPlay() {
  let cloneO = o.cloneNode(true)
  counter = 0
  filled = 0

  //só preencher se o childnode estiver vazio
  for (let i = 0; i < boxes.length; i++) {
    let randomNumber = Math.floor(Math.random() * 5)

    if (boxes[i].childNodes[0] == undefined) {
      if (randomNumber <= 1) {
        boxes[i].appendChild(cloneO)
        counter++
        break
      }
    }
    //verificar quantas estão preenchidas
    else {
      filled++
    }
  }
  if (counter == 0 && filled < 9) {
    computerPlay()
  }
}
