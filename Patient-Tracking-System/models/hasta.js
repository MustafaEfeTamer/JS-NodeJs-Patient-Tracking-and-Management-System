const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "springstudent",
  database: "Hasta_Takip_Sistemi",
  password: "springstudent",
});

module.exports = class Hasta {
  constructor(patientId, name, surname, birthDate, gender, phone, address) {
    this.patientId = patientId;
    this.name = name;
    this.surname = surname;
    this.birthDate = birthDate;
    this.gender = gender;
    this.phone = phone;
    this.address = address;
  }

  static patientList() {
    return new Promise((resolve, reject) => {
      connection.execute("SELECT * FROM hastalar", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async patientSave() {
    return new Promise((resolve, reject) => {
      connection.execute(
        "INSERT INTO hastalar(hasta_ad,hasta_soyad,dogum_tarihi,cinsiyet,telefon,adres) VALUES (?, ?, ?, ?, ?, ?)",
        [
          this.name,
          this.surname,
          this.birthDate,
          this.gender,
          this.phone,
          this.address,
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

  static async patientDelete(id) {
    try {
      await connection.execute(
        "DELETE FROM lab_sonuclari WHERE rapor_id IN (SELECT rapor_id FROM tibbi_raporlar WHERE hasta_id = ?)",
        [id]
      );
      await connection.execute(
        "DELETE FROM tibbi_raporlar WHERE hasta_id = ?",
        [id]
      );
      await connection.execute("DELETE FROM randevular WHERE hasta_id = ?", [
        id,
      ]);
      await connection.execute("DELETE FROM hastalar WHERE hasta_id = ?", [id]);
      return true;
    } catch (err) {
      console.error(err);
      throw err; // Hata durumunda isteği reddedin
    }
  }

  async patientUpdate(hasta) {
    return new Promise((resolve, reject) => {
      connection.execute(
        "UPDATE hastalar SET hasta_ad = ?, hasta_soyad = ?, dogum_tarihi = ?, cinsiyet = ?, telefon = ?,adres = ? WHERE hasta_id = ?",
        [
          hasta.name,
          hasta.surname,
          hasta.birthDate,
          hasta.gender,
          hasta.phone,
          hasta.address,
          hasta.patientId,
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

  static async patientLogin(username, password) {
    return new Promise((resolve, reject) => {
      connection.execute(
        "SELECT * FROM hastalar WHERE hasta_ad = ? AND hasta_id = ? ",
        [username, password],

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
