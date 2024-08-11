const { createInterface } = require("readline");

class readline {
  constructor() {}

  // 키보드 입력을 위한 인터페이스 생성
  consoleInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // 키보드 입력 받기
  readLine = (message) => {
    return new Promise((resolve) => {
      this.consoleInterface.question(message, (userInput) => {
        resolve(userInput);
      });
    });
  };
}
module.exports = readline;
