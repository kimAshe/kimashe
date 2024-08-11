// 메뉴 출력
const RL = require("./readline"); // 여기가 클래스의 모듈화
const rlObj = new RL(); // 클래스로 객체를 뽑는거
const Account = require("./Account");
const Ams = require("./ams");
const amsObj = new Ams();
const printMenu = () => {
  console.log(
    "--------------------------------------------------------------------"
  );
  console.log(
    "1.계좌등록 | 2.계좌목록 | 3.예금 | 4.출금 | 5.검색 | 6.삭제 | 7.종료"
  );
  console.log(
    "--------------------------------------------------------------------"
  );
};

const welcome = () => {
  console.log(
    "===================================================================="
  );
  console.log(
    "--------------     KOSTA 은행 계좌 관리 프로그램     ---------------"
  );
  console.log(
    "===================================================================="
  );
};

let accountList = [];

const app = async function () {
  let running = true;
  welcome();
  amsObj.readAMS();
  if (amsObj.readData != null) {
    accountList = amsObj.readData.map(
      (obj) =>
        new Account(
          obj.categoryNo,
          obj.accountNo,
          obj.owner,
          obj.password,
          obj.balance,
          0
        )
    );
  }
  while (running) {
    printMenu();
    let menuNum = parseInt(await rlObj.readLine("> "));
    switch (menuNum) {
      case 1:
        console.log("■ 등록 계좌 종류 선택(1. 입출금계좌 | 2. 마이너스 계좌)");
        let no = 0;
        while (no != 1 && no != 2) {
          //이런식으로 예외처리를 고려해서 짜는 습관을 길러야함
          no = parseInt(await rlObj.readLine("> "));
          if (no != 1 && no != 2) {
            console.log("1 또는 2 만 입력해주세요.");
          }
        }

        let accountNum = await rlObj.readLine("- 계좌번호 : ");
        let accountOwner = await rlObj.readLine("- 예금주명 : ");
        let password = parseInt(await rlObj.readLine("- 비밀번호 : "));
        let initMoney = parseInt(await rlObj.readLine("- 입금액 : "));
        let rentMoney = 0;
        if (no == 2) {
          rentMoney = parseInt(await rlObj.readLine("- 대출금 : "));
        }

        let account = new Account(
          no,
          accountNum,
          accountOwner,
          password,
          initMoney,
          rentMoney
        );

        // 신규 계좌 등록
        accountList.push(account);
        break;
      case 2: // 전체계좌 목록 출력
        if (accountList.length > 0) {
          console.log(
            "-------------------------------------------------------"
          );
          accountList.forEach((item) => {
            console.log(
              `계좌구분: ${item.getCategory()} \t 계좌번호: ${item.getAccountNo()} \t 예금주: ${item.getOwner()} \t 잔액: ${item.getBalance()}`
            );
          });
          console.log(
            "-------------------------------------------------------"
          );
        } else {
          console.log("계좌 리스트가 없습니다.");
        }

        break;
      case 3: // 입금
        // 계좌번호와 입금액 입력 받아 입금 처리
        let inputNo = await rlObj.readLine("- 계좌번호 : ");
        let inputMoney = parseInt(await rlObj.readLine("- 입금액 : "));
        accountList.forEach((item) => {
          if (item.accountNo === inputNo) {
            console.log(item.deposit(inputMoney));
          }
        });
        break;
      case 4: // 출금
        // 계좌번호와 출금액 입력 받아 출금 처리
        let outputNo = await rlObj.readLine("- 계좌번호 : ");
        let outputMoney = parseInt(await rlObj.readLine("- 출금액 : "));
        accountList.forEach((item) => {
          if (item.accountNo === outputNo) {
            console.log(item.withdraw(outputMoney));
          }
        });

        break;
      case 5: // 계좌번호로 검색
        // 계좌 번호 입력 받아 계좌 정보 출력
        let searchNum = await rlObj.readLine("- 계좌번호 : ");

        accountList.forEach((item) => {
          if (item.accountNo === searchNum) {
            console.log(
              `계좌구분: ${item.getCategory()} \t 계좌번호: ${item.getAccountNo()} \t 예금주: ${item.getOwner()} \t 잔액: ${item.getBalance()}`
            );
          }
        });

        break;
      case 6:
        console.log("계좌 삭제");
        // 계좌 번호 입력 받아 계좌 해당 계좌 삭제
        let deleteNum = await rlObj.readLine("- 계좌번호 : ");

        accountList = accountList.filter((item) => {
          if (item.accountNo != deleteNum) {
            return true;
          }
        });

        break;
      case 7:
        console.log(">>> 프로그램을 종료합니다.");
        amsObj.saveAMS(accountList);
        rlObj.consoleInterface.close();
        running = false;
        break;
      default:
        console.log("잘못 선택하셨습니다.");
    }
  }
};
app();
