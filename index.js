const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let result = 0;


function startProgram() {
    clearConsole();
    console.log('연산 중, 다른 사칙 연산을 진행하려면 "stop"을 입력하세요. (프로그램을 종료하려면 "esc" 입력)');

  rl.question('어떤 연산을 수행하시겠습니까? (+, -, *, /): ', (operator) => {
    if (!isValidOperator(operator)) {
      console.log('잘못된 연산자입니다.');
      startProgram();
      return;
    }

    processNumbers(operator);
  });
}

function processNumbers(operator) {
    rl.question('연산하고자 하는 숫자를 입력하세요: ', (input) => {
      if (input.toLowerCase() === 'done') {
        console.log('최종 결과:', result);
        confirmProgramExit();
        return;
      } else if (input.toLowerCase() === 'stop') {
        OperationChange();
        return;
      } else if (input.toLowerCase() === 'esc') {
        confirmProgramExit();
        return;
      } else if (input.toLowerCase() === 'clear') {
        clearConsole();
        startProgram();
        return;
      } else if (input.toLowerCase() === 'reset') {
        result = 0;
        console.log('계산값이 초기화되었습니다.');
        startProgram();
        return;
      }
  
      const number = parseFloat(input);
  
      if (isNaN(number)) {
        console.log('유효하지 않은 숫자입니다. 다시 입력하세요.');
        processNumbers(operator);
        return;
      }
  
      performOperation(operator, number);
    });
  }

  // 연산 함수
function performOperation(operator, number) {
  switch (operator) {
    case '+':
      result += number;
      break;
    case '-':
      result -= number;
      break;
    case '*':
      result *= number;
      break;
    case '/':
      if (number === 0) {
        console.log('0으로 나눌 수 없습니다. 다시 입력하세요.');
        processNumbers(operator);
        return;
      }
      result /= number;
      break;
  }

  console.log('현재 결과:', result);

  rl.question('다음 숫자를 입력하세요. (연산 마치기 = "done" 입력): ', (input) => {
    if (input.toLowerCase() === 'done') {
        console.log('최종 결과:', result);
        confirmProgramExit();
        return;
      } else if (input.toLowerCase() === 'stop') {
        OperationChange();
        return;
      } else if (input.toLowerCase() === 'esc') {
        confirmProgramExit();
        return;
      } else if (input.toLowerCase() === 'clear') {
        clearConsole();
        startProgram();
        return;
      } else if (input.toLowerCase() === 'reset') {
        result = 0;
        console.log('계산값이 초기화되었습니다.');
        startProgram();
        return;
      }
  
      const number = parseFloat(input);
  
      if (isNaN(number)) {
        console.log('유효하지 않은 숫자입니다. 다시 입력하세요.');
        processNumbers(operator);
        return;
      }
  
      performOperation(operator, number);
  });
}

function isValidOperator(operator) {
  return ['+', '-', '*', '/'].includes(operator);
}

// 연산 변경
function OperationChange() {
    rl.question('새로운 연산을 수행하시겠습니까? (+, -, *, /): ', (operator) => {
      if (!isValidOperator(operator)) {
        console.log('잘못된 연산자입니다.');
        OperationChange();
        return;
      }
  
      processNumbers(operator);
    });
  }

// 프로그램 종료.
function confirmProgramExit() {
  rl.question('정말 프로그램을 종료하시겠습니까? (yes/no): ', (input) => {
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

// 콘솔 클리어
function clearConsole() {
    if (process.platform === 'win32') {
      const command = 'cls';
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`clearConsole error: ${error}`);
        }
      });
    } else {
      console.clear();
    }
  }

startProgram();
