const ssamgoo = document.getElementById("ssamgoo_img")
const bar = document.getElementsByClassName("bar")
const leftBar = document.getElementById("leftBar")
const rightBar = document.getElementById("rightBar")

const win = document.getElementById("win")
const lose = document.getElementById("lose")
const gameover_img = document.getElementById("gameover_img")
const reset_img = document.getElementById("reset_img")

const audio_boing = new Audio("boing.mp3")
const audio_tick = new Audio("tick.mp3")
const audio_gameover = new Audio("gameover.mp3")



// 공 크기 설정
const ballWidth = 80
const ballHeight = 80




const leftBarBorder = 130
let leftBarTop = window.innerHeight/2-150
let leftBarButtom = leftBarTop+300
leftBar.style.left = `${leftBarBorder}px`
leftBar.style.top = `${leftBarTop}px`


const rightBarBorder = window.innerWidth-160
let rightBarTop = window.innerHeight/2-150
let rightBarButtom = rightBarTop+300
rightBar.style.left = `${rightBarBorder}px`
rightBar.style.top = `${rightBarTop}px`


const pressedKey = []

// 키를 누르면 키가 활성화됨
document.addEventListener('keydown', (event) => {
  pressedKey[event.key] = true
})

// 키를 떼면 키가 비활성화됨
document.addEventListener('keyup', (event) => {
  pressedKey[event.key] = false
})


// 키 입력 감지해서 바 이동
setInterval(() => {

  // 왼쪽 바 수직 이동
  if ((leftBarTop >= 0) && (pressedKey["w"] === true)) {
    leftBarTop = leftBarTop - 10
    leftBarButtom = leftBarTop + 300
    leftBar.style.top = `${leftBarTop}px`
  }
  if ((leftBarButtom <= window.innerHeight) && (pressedKey["s"] === true)) {
    leftBarTop = leftBarTop + 10
    leftBarButtom = leftBarTop + 300
    leftBar.style.top = `${leftBarTop}px`
    // 막대 오버플로우로 인한 스크롤 바 생성 방지
    if (leftBarButtom > window.innerHeight-8) {
      leftBarTop = window.innerHeight-308
      leftBarButtom = leftBarTop + 300
      leftBar.style.top = `${leftBarTop}px`
    }
  }

  // 오른쪽 바 수직 이동
  if ((rightBarTop >= 0) && (pressedKey["ArrowUp"] === true)) {
    rightBarTop = rightBarTop - 10
    rightBarButtom = rightBarTop + 300
    rightBar.style.top = `${rightBarTop}px`
  }
  if ((rightBarButtom <= window.innerHeight) && (pressedKey["ArrowDown"] === true)) {
    rightBarTop = rightBarTop + 10
    rightBarButtom = rightBarTop + 300
    rightBar.style.top = `${rightBarTop}px`
    // 막대 오버플로우로 인한 스크롤 바 생성 방지
    if (rightBarButtom > window.innerHeight-8) {
      rightBarTop = window.innerHeight-308
      rightBarButtom = rightBarTop + 300
      rightBar.style.top = `${rightBarTop}px`
    }
  }
}, 25)





// 이미지 요소 설정
ssamgoo.style.position = "fixed";
ssamgoo.style.left = String(window.innerWidth/2-ballWidth/2)+"px";
ssamgoo.style.top = String(window.innerHeight/2-ballHeight/2)+"px";
ssamgoo.style.width = String(ballWidth)+"px";
ssamgoo.style.height = String(ballHeight)+"px";


// 이미지가 움직이는 방향을 결정하는 변수
let dx = 2;
let dy = 2;

let gameover = 0

// 공 움직이는 함수
function moveImage() {
  let x = parseInt(ssamgoo.style.left);
  let y = parseInt(ssamgoo.style.top);
  x += dx;
  y += dy;

  // 공이 막대에 닿으면 튕겨나오도록 함
  if (x + ssamgoo.width <= rightBarBorder+3 && x + ssamgoo.width >= rightBarBorder) {
    if ((rightBarButtom >= y + ballHeight && y + ballHeight >= rightBarTop) || (rightBarButtom >= y && y >= rightBarTop)) {
      dx = -Math.abs(dx);
      x += 2 * dx;
      audio_boing.play();
    }
  }
  if (x <= leftBarBorder+30 && x >= leftBarBorder+27) {
    if ((leftBarButtom >= y + ballHeight && y + ballHeight >= leftBarTop) || (leftBarButtom >= y && y >= leftBarTop)) {
      dx = Math.abs(dx);
      x += 2 * dx;
      audio_boing.play();
    }
  }

  // 공이 천장과 바닥에 닿으면 튕겨나오도록 함
  if (y + ssamgoo.height >= window.innerHeight || y <= 0) {
    dy = -dy;
    y += 2 * dy;
    audio_tick.play();
  }

  if (x + ssamgoo.width >= window.innerWidth) {
    dx = 0
    dy = 0

    win.style.left = "20%"
    lose.style.right = "20%"
    win.style.display = "unset"
    lose.style.display = "unset"
    gameover_img.style.display = "unset"
    reset_img.style.display = "unset"

    gameover = gameover + 1

    if (gameover === 1) {
      audio_gameover.play()
    }
  }
  else if (x <= 0) {
    dx = 0
    dy = 0

    win.style.right = "20%"
    lose.style.left = "20%"
    win.style.display = "unset"
    lose.style.display = "unset"
    gameover_img.style.display = "unset"
    reset_img.style.display = "unset"

    gameover = gameover + 1
    
    if (gameover === 1) {
      audio_gameover.play()
      
    }
  }
  console.log(gameover)
  ssamgoo.style.top = y + "px";
  ssamgoo.style.left = x + "px";
}

// 일정 시간마다 공 위치 변경   
setInterval(moveImage, 1);