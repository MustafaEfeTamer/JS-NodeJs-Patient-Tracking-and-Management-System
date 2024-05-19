const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "springstudent",
  database: "Hasta_Takip_Sistemi",
  password: "springstudent",
});

module.exports = class Yonetici {
  constructor(name, surname) {
    name = this.name;
    surname = this.surname;
  }
};
