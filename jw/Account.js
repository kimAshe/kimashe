class Account {
  categoryNo;
  category;
  accountNo; //계좌번호
  owner; // 소유자
  balance; // 잔고
  password; // 비밀번호

  constructor(category, accountNo, owner, password, balance, rent) {
    if (category == 1) {
      this.category = "입출금 계좌";
      this.balance = balance;
    } else {
      this.category = "마이너스 계좌";
      this.balance = balance - rent;
    }
    this.categoryNo = category;
    this.accountNo = accountNo;
    this.owner = owner;
    this.password = password;
  }

  getAccountNo = () => {
    return this.accountNo;
  };
  getOwner = () => {
    return this.owner;
  };
  getBalance = () => {
    return this.balance;
  };
  getCategory = () => {
    return this.category;
  };
  getRent = () => {
    return this.rent;
  };

  deposit = (amount) => {
    this.balance += amount;

    return `${amount}원을 입금하여 잔액은 ${this.balance}원 입니다.`;
  };

  withdraw = (amount) => {
    if (this.categoryNo == 1) {
      if (this.balance < amount) {
        return "잔액이 부족합니다";
      }
    }

    this.balance -= amount;
    return `${amount}원을 출금하여 잔액이 ${this.balance}원 남았습니다.`;
  };
}

module.exports = Account;
