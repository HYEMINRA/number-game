// 랜덤번호 지정 clear
// 유저가 번호를 입력한다 그리고 go 라는 버튼을 누른다 clear
// 만약에 유저가 랜덤번호를 맞추면. 맞췄습니다! clear
// 랜덤번호가 < 유저번호 down! clear
// 랜덤번호가 > 유저번호 up! clear
// reset 버튼을 누르면 게임이 리셋된다 clear
// 5번의 기회를 다 쓰면 게임이 끝난다 (더이상 추측불가, 버튼이 disable) clear
// 유저가 1~100범위를 벗어나면 알려준다. 기회를 깎지 않는다. clear
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깎지 않는다. clear

let computernumber = 0;
let playbutton = document.getElementById('play-button');
let userinput = document.getElementById('user-input');
let resultarea = document.getElementById('result-area');
let resetbutton = document.getElementById('reset-button');
let chances = 5;
let gameover = false;
let chancearea = document.getElementById('chance-area');
let history = [];

playbutton.addEventListener('click', play); // 이벤트를 더해주는 것. 뒤에는 이벤트 실행했을때 어떤 함수를 play할 것인지 적어준다.
resetbutton.addEventListener('click', reset);
userinput.addEventListener('focus', function () {
  // 커서를 놓았을때 리셋되는 것
  userinput.value = '';
});

function pickrandomnum() {
  computernumber = Math.floor(Math.random() * 100) + 1; // Math.random 0~1사이에 있는 숫자를 pick 랜덤해주는 함수, Math.floor 뒤에 소수점 버리는 함수
  console.log('정답', computernumber);
}

function play() {
  let uservalue = userinput.value;

  if (uservalue < 1 || uservalue > 100) {
    resultarea.textContent = '1과 100사이의 숫자를 입력해주세요';
    return;
  }

  if (history.includes(uservalue)) {
    resultarea.textContent = '이미 입력한 숫자입니다 다른 숫자를 입력해주세요';
    return;
  }
  chances--;
  chancearea.textContent = `남은기회:${chances}번`; //정적인 숫자 넣을때 사용하는 함수
  console.log('chance', chances);

  if (uservalue < computernumber) {
    resultarea.textContent = 'UP!';
  } else if (uservalue > computernumber) {
    resultarea.textContent = 'DOWN!';
  } else {
    resultarea.textContent = '정답입니다!';
    gameover = true;
  }

  history.push(uservalue);
  console.log(history);

  if (chances < 1) {
    gameover = true;
  }
  if (gameover == true) {
    playbutton.disabled = true;
  }
}

function reset() {
  userinput.value = '';
  pickrandomnum();

  resultarea.textContent = '결과값이 여기 나옵니다';
}

pickrandomnum();
