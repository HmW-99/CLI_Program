const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let result = 0; // 계산 결과를 저장하기 위한 변수
let isFirstInput = true; // 첫 번째 입력 판단 변수

// 연산 시작 프로그램
function startProgram() {
  console.log('==============================================================================================================');
  console.log('※ 계산기 프로그램 ※  \n');
  console.log(' - 명령어 종류 - ')
  console.log(' 1. "esc" = 프로그램 종료           2. "change" = 연산 기호 변경           3. "clear" = 콘솔 화면 초기화')
  console.log(' 4. "reset" = 연산 초기화           5. "done" = 연산 종료 \n')

  rl.question(' 어떤 연산을 수행하시겠습니까? (+, -, *, /) : ', (operator) => {
    if (!isValidOperator(operator)) {
      console.log('\n 잘못된 입력값입니다. (현재 단계에선 명령어를 사용 할 수 없습니다.)');
      startProgram();
      return;
    }

    // 연산하기 위한 첫번째 숫자 입력
    if (isFirstInput) {
      rl.question('\n 첫 숫자를 입력하세요: ', (input) => {
        if (input.toLowerCase() === 'done') {
          console.log('\n ＠＠ 최종 결과 =', formatResult(result));
          confirmProgramExit();
          return;
        } else if (input.toLowerCase() === 'change') {
          OperationChange();
          return;
        } else if (input.toLowerCase() === 'esc') {
          confirmProgramExit();
          return;
        } else if (input.toLowerCase() === 'clear') {
          console.clear();
          startProgram();
          return;
        } else if (input.toLowerCase() === 'reset') {
          result = 0;
          console.log('\n☞ 계산값이 초기화되었습니다.');
          startProgram();
          return;
        }

        if (isNaN(parseFloat(input))) {
          console.log('\n 숫자를 입력해주세요.');
          startProgram();
          return;
        }

        console.log('\n    ＠ 입력받은 첫 숫자:', input);
        processNumbers(operator, parseFloat(input));
      });
    } else {
      processNumbers(operator);
    }
  });
}

// 연산 처리 함수
function processNumbers(operator, previousNumber) {
  rl.question('\n 연산하고자 하는 숫자를 입력하세요 : ', (input) => {
    if (input.toLowerCase() === 'done') {
      console.log('\n ＠＠ 최종 결과 =', formatResult(result));
      confirmProgramExit();
      return;
    } else if (input.toLowerCase() === 'change') {
      OperationChange();
      return;
    } else if (input.toLowerCase() === 'esc') {
      confirmProgramExit();
      return;
    } else if (input.toLowerCase() === 'clear') {
      console.clear();
      startProgram();
      return;
    } else if (input.toLowerCase() === 'reset') {
      result = 0;
      console.log('\n☞ 계산값이 초기화되었습니다.');
      startProgram();
      return;
    }

    const number = parseFloat(input);

    // 숫자가 아닌 입력값 예외처리.
    if (isNaN(number)) {
      console.log('\n 유효하지 않은 숫자입니다. 다시 입력하세요.');
      processNumbers(operator, previousNumber);
      return;
    }

    // 결과 출력
    result = performOperation(operator, previousNumber, number);
    console.log('\n    ＠ 현재 결과:', formatResult(result));

    processNumbers(operator, result);
  });
}

function isValidOperator(operator) {
  return ['+', '-', '*', '/'].includes(operator);
}

// 연산자에 따른 연산 수행, 결과 반환
function performOperation(operator, previousNumber, number) {
  switch (operator) {
    case '+':
      return previousNumber + number;
    case '-':
      return previousNumber - number;
    case '*':
      return previousNumber * number;
    case '/':
      if (number === 0) {
        console.log('\n 0으로 나눌 수 없습니다. 다시 입력하세요.');
        return previousNumber;
      }
      return previousNumber / number;
    default:
      return previousNumber;
  }
}

// 연산 기호 변경
function OperationChange() {
  rl.question('\n 새로운 연산을 수행하시겠습니까? (+, -, *, /) : ', (operator) => {
    if (!isValidOperator(operator)) {
      console.log('\n 잘못된 연산자입니다.');
      OperationChange();
      return;
    }

    processNumbers(operator, result);
  });
}

// 프로그램 종료 함수
function confirmProgramExit() {
  rl.question('\n 프로그램을 종료하시겠습니까? (yes/no): ', (input) => {
    if (input.toLowerCase() === 'yes') {
      console.log('프로그램을 종료합니다.');
      rl.close();
    } else if (input.toLowerCase() === 'no') {
      startProgram();
    } else {
      console.log('잘못된 입력입니다. 프로그램을 종료합니다.');
      rl.close();
    }
  });
}

// 결과값 출력 형태
function formatResult(value) {
  if (typeof value === 'number') {
    if (Number.isInteger(value)) {
      return value.toString();
    } else {
      return value.toFixed(4);
    }
  } else {
    return value;
  }
}

startProgram();