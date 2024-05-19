const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "springstudent",
  database: "Hasta_Takip_Sistemi",
  password: "springstudent",
});

module.exports = class TibbiRapor {
  constructor(reportDate, reportContent, patientId) {
    reportDate = this.reportDate;
    reportContent = this.reportContent;
    patientId = this.patientId;
  }

  static reportList(patientId) {
    return new Promise((resolve, reject) => {
      connection.execute(
        "SELECT t.rapor_id,t.rapor_tarihi,t.rapor_icerigi,l.lab_sonuc_id,l.url FROM tibbi_raporlar t,lab_sonuclari l WHERE hasta_id = ? AND l.rapor_id =t.rapor_id",
        [patientId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }
};
