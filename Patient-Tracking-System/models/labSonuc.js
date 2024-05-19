const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "springstudent",
  database: "Hasta_Takip_Sistemi",
  password: "springstudent",
});

module.exports = class LabSonuc {
  constructor(reportId, url) {
    this.reportId = reportId;
    this.url = url;
  }
};
