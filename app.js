const { createInterface } = require("readline");
const {Account, MinusAccount} = require("./Account");
const AccountRepositories = require("./AccountRepositories")
const fs = require('fs')
// 키보드 입력을 위한 인터페이스 생성
const consoleInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
});
// 키보드 입력 받기
const accountRepositories = new AccountRepositories();
const readLine = function (message) {
    return new Promise((resolve) => {
        consoleInterface.question(message, (userInput) => {
            resolve(userInput);
        });
    });
}

if(!fs.existsSync('./ams.json')){
    fs.writeFileSync('./ams.json',JSON.stringify([]))   
}else{

    const data =  fs.readFileSync('./ams.json','utf-8')
    console.log(data,"data");
    AccountRepositories.accounts = JSON.parse(data) ;
};
dsds

console.log(AccountRepositories.accounts,"23232");
    


// 메뉴 출력
const printMenu = function () {
    console.log("--------------------------------------------------------------------");
    console.log("1.계좌등록 | 2.계좌목록 | 3.예금 | 4.출금 | 5.검색 | 6.삭제 | 7.종료");
    console.log("--------------------------------------------------------------------");
}

const app = async function () {
    console.log(`====================================================================`);
    console.log(`--------------     KOSTA 은행 계좌 관리 프로그램     ---------------`);
    console.log(`====================================================================`);

    let running = true;
    while (running) {
        printMenu();
        let menuNum = parseInt(await readLine("> "));
        switch (menuNum) {
            case 1:
                // createAccount();
                console.log("■ 등록 계좌 종류 선택");
                const header =
                    "--------------------------------\n" +
                    "1. 입출금계좌 | 2. 마이너스 계좌\n" +
                    "--------------------------------";
                console.log(header);
                let account = null;
                let no = parseInt(await readLine("> "));
                let accountNum = await readLine("- 계좌번호 : ");
                let accountOwner = await readLine("- 예금주명 : ");
                let password = parseInt(await readLine("- 비밀번호 : "));
                let initMoney = parseInt(await readLine("- 입금액 : "));
                let rentMoney = 0;
                if (no === 1) {
                    account = new Account(accountNum, password, accountOwner, initMoney);
                    
                } else {
                    rentMoney = parseInt(await readLine("- 대출금액 : "));
                    account = new MinusAccount(accountNum, password, accountOwner,  initMoney, rentMoney);
                }
                console.log(accountNum, accountOwner, password, initMoney, rentMoney);
            
                
                accountRepositories.addAccount(account);
                
                // 신규 계좌 등록
                console.log(`"${accountOwner}님의 계좌가 생성되었습니다."`);
                break;
            case 2: // 전체계좌 목록 출력
            
console.log(AccountRepositories.accounts);
                console.log("-------------------------------------------------------");
                console.log("계좌구분 \t 계좌번호 \t 예금주 \t 잔액 \t 대출액");
                console.log("-------------------------------------------------------");
                console.log(accountRepositories.findByAll());
                break;
            case 3: // 입금
                // 계좌번호와 입금액 입력 받아 입금 처리
                let inputNo = await readLine("- 계좌번호 : ");
                let inputMoney = parseInt(await readLine("- 입금액 : "));
                let moreMoney = accountRepositories.findByInOut(inputNo);
                accountRepositories.accounts[moreMoney].Add(inputMoney);             
                console.log(`"${inputNo}계좌에 ${inputMoney}를 입금하였습니다."`);            
                break;
            case 4: // 출금
                // 계좌번호와 출금액 입력 받아 출금 처리
                let outputNo = await readLine("- 계좌번호 : ");
                let outputMoney = parseInt(await readLine("- 출금액 : "));
                let outMoney = accountRepositories.findByInOut(outputNo);
                accountRepositories.accounts[outMoney].out(outputMoney);
                console.log(`"${outputNo}계좌에 ${outputMoney}를 출금하였습니다."`);
                break;
            case 5: // 계좌번호로 검색
                // 계좌 번호 입력 받아 계좌 정보 출력
                let searchNum = await readLine("- 계좌번호 : ");
                let searchAccount = accountRepositories.findByNumber(searchNum);
                console.log(searchAccount);
              
        
                break;
            case 6:
                console.log("계좌 삭제");
                // 계좌 번호 입력 받아 계좌 해당 계좌 삭제
                let deleteNum = await readLine("- 계좌번호 : ");
                let deleteAccount = accountRepositories.DeleteAccount(deleteNum);
                console.log(deleteNum);
                break;
            case 7:
                fs.writeFileSync('./ams.json',JSON.stringify(accountRepositories.findByAll()))
                console.log(">>> 프로그램을 종료합니다.");
                consoleInterface.close();
                running = false;
                break;
            default: console.log("잘못 선택하셨습니다.");
        }
    }
}

app();