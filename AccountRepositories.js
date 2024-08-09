/**
 * 계좌 관리 객체
 */
const fs = require('fs');
class AccountRepositories {
  constructor() {
    this.accounts = [];
  }
  // setter/getter
  // set accounts(accounts) {
  //   this._accounts = accounts;
  // }
  // get accounts() {
  //   return this._accounts;
  // }
  /**
   * 신규계좌
   * @param account
   */
  addAccount(account) {
    const is = this.accounts.some((is) => is.number === account.number);
    if (!is) {
      this.accounts.push(account);
    
      return true;
    } else {
      return false;
    }
  }
  /**
   * 전체계좌 목록
   */
  findByAll() {
    //  복사본 주기
    const copyAccount = [...this.accounts];
console.log(copyAccount);

    return copyAccount.map((item=>{
      if(item.loan === undefined){
        console.log("대출액이 없습니다.");
        return   (    {number : item.number,
          onwer : item.onwer,
          pw : item.pw,
          balance : item.balance,
         })
      }else{
        return   (    {number : item.number,
          onwer : item.onwer,
          pw : item.pw,
          balance : item.balance,
          loan : item.loan})

      }
    }))


  
      //pw:${'*'.repeat(String(item.pw).length)}
  
}

  // 검색기능 1. 계좌번호 조회
  findByInOut(number) {
    const findData = this.accounts.findIndex((is) => is.number === number);
    console.log(findData, 'accountRepository', number);
    return findData;
  }
  
  findByNumber(number) {
    const findData = this.accounts.filter((is) => is.number === number);
    console.log(findData, 'accountRepository', number);
    return findData;
  }
  // 검색기능 2. 예금주 조회
  findByName(name) {
    const findData = this.accounts.filter((is) => is.onwer === name);

    return findData;
  }
  /**
   *모든 계좌의 총금액 반환
   */
  AllAccountPrice() {
    const allPriceData = this.accounts.reduce((prev, next) => {
      return prev + next.balance;
    }, 0);
    return allPriceData;
  }
  /**
   *모든 계좌중의 최대금액 반환
   @returns account
   */
  MaxAccount() {
    const maxPrice = this.accounts.reduce((prev, next) => {
      return Math.max(prev, next.balance);
    }, this.accounts[0].balance);
    const maxAccount = this.accounts.filter(
      (price) => price.balance === maxPrice
    );
    return maxAccount;
  }
  /**
   *모든 계좌중의 최소금액 반환
   */
  MinAccount() {
    const minPrice = this.accounts.reduce((prev, next) => {
      return Math.min(prev, next.balance);
    }, this.accounts[0].balance);

    const minAccount = this.accounts.filter(
      (price) => price.balance === minPrice
    );
    return minAccount;
  }

  /**
   *  특정 범위 잔액 조회
   */
  RangeAccount(min, max) {
    const rangeAccount = this.accounts.filter(
      (price) => min <= price.balance && price.balance <= max
    );
    return rangeAccount;
  }
  /**
   *  계좌 수정
   */
  UpdateAccount(accounts) {
    const index = this._accounts.findIndex(
      (account) => account.number === accounts.number
    );
    if (index !== -1) {
      this._accounts[index] = accounts;
      return true;
    }
    return false;
  }
  /**
   *  계좌번호를 입력받아 해당 계좌 삭제
   */
  DeleteAccount(number) {
    const deleteAccount = this.accounts.filter(
      (item) => item.number !== number
    );
    return (this._accounts = deleteAccount);
  }
}
module.exports = AccountRepositories;