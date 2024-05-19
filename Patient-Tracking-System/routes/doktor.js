const express = require("express");
const router = express.Router();

const Doktor = require("../models/doktor");
const Randevu = require("../models/randevu");
const TibbiRapor = require("../models/tibbiRapor");

var ourDoctor = 0;

router.get("/giris", (req, res, next) => {
  res.render("doktor/login"); // Doktor giriş formunu render et
});

router.post("/giris", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const result = await Doktor.doctorLogin(username, password);
    if (result.length > 0) {
      ourDoctor = password;
      res.redirect("/doktor/randevular"); // Başarılı giriş, hastalar sayfasına yönlendir
    } else {
      res.redirect("/giris"); // Kullanıcı adı veya şifre hatalı, giriş sayfasına yönlendir
    }
  } catch (err) {
    console.error(err);
  }
});

router.get("/randevular", async (req, res, next) => {
  try {
    const randevular = await Randevu.doctorAppointmentList(ourDoctor);
    res.render("doktor/randevuListele", {
      title: "Randevular",
      randevular: randevular,
      path: req.path,
    });
  } catch (err) {
    console.error(err);
    // Hataları uygun şekilde yönet!!
  }
});

//

router.post("/hastaRaporGoster", async (req, res, next) => {
  const { patientId } = req.body;
  try {
    const result = await TibbiRapor.reportList(patientId);
    if (result.length > 0) {
      res.render("doktor/raporListele", {
        title: "Raporlar",
        result: result,
        path: req.path,
      });
    } else {
      res.redirect("/giris");
      // Bu hastanın raporu yok rapor ekle kısmına yönlendirilicek
    }
  } catch (err) {
    console.error(err);
    next(err); // Hata varsa bunu next ile hata işleyiciye gönder
  }
});

module.exports = router;
