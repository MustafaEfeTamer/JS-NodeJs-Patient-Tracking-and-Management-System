const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "springstudent",
  database: "Hasta_Takip_Sistemi",
  password: "springstudent",
});

module.exports = class Doktor {
  constructor(doctorId, name, surname, profession, workingHospital) {
    this.doctorId = doctorId;
    this.name = name;
    this.surname = surname;
    this.profession = profession;
    this.workingHospital = workingHospital;
  }

  static doctorList() {
    return new Promise((resolve, reject) => {
      connection.execute("SELECT * FROM doktorlar", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async doctorSave() {
    return new Promise((resolve, reject) => {
      connection.execute(
        "INSERT INTO doktorlar (doktor_ad, doktor_soyad, calistigi_hastane, uzmanlik_alani) VALUES (?, ?, ?, ?)",
        [this.name, this.surname, this.workingHospital, this.profession],
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

  static async doctorDelete(id) {
    try {
      await connection.execute("DELETE FROM Randevular where doktor_id = ?", [
        id,
      ]);
      await connection.execute("DELETE FROM Doktorlar where doktor_id = ?", [
        id,
      ]);
      return true;
    } catch (err) {
      console.error(err);
      throw err; // Hata durumunda isteği reddedin
    }
  }

  async doctorUpdate(doktor) {
    return new Promise((resolve, reject) => {
      connection.execute(
        "UPDATE doktorlar SET doktor_ad = ?, doktor_soyad = ?, uzmanlik_alani = ?, calistigi_hastane = ? WHERE doktor_id = ?",
        [
          doktor.name,
          doktor.surname,
          doktor.profession,
          doktor.workingHospital,
          doktor.doctorId,
        ],
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

  static async doctorLogin(usarname, password) {
    return new Promise((resolve, reject) => {
      connection.execute(
        "SELECT * FROM doktorlar WHERE doktor_ad = ? AND doktor_id = ? ",
        [usarname, password],

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
