//ams ==> Amount Management System
const fs = require("fs");
const path = require("path");

class Ams {
  directory = "./ams/";
  filename = "ams.json";
  readData = null;
  constructor() {}
  readAMS = () => {
    const dirPath = path.resolve(this.directory);
    const filePath = path.join(dirPath, this.filename);
    if(fs.existsSync(filePath)){
      const data = fs.readFileSync(filePath);
      this.readData = JSON.parse(data);
    }else{
      fs.writeFileSync(filePath,"");
    }
    
  };

  saveAMS = (item) => {
    let data = JSON.stringify(item);
    const dirPath = path.resolve(this.directory);
    const filePath = path.join(dirPath, this.filename);
    fs.writeFileSync(filePath, data);
  };

  getData() {
    return this.readData;
  }
}

module.exports = Ams;
