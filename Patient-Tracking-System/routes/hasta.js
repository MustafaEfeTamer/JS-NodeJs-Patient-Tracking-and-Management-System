const express = require("express");
const router = express.Router();
const Hasta = require("../models/hasta");
const Randevu = require("../models/randevu");

var ourPatient = 0;

router.get("/secim", (req, res, next) => {
  res.render("hasta/secim.pug");
});

router.get("/hastaFormKaydet", (req, res) => {
  res.render("hasta/hastaFormKaydet", { hastalar: {} });
});

router.post("/kaydetHasta", async (req, res, next) => {
  const { name, surname, birthDate, gender, phone, address } = req.body;
  try {
    const hasta = new Hasta(
      null,
      name,
      surname,
      birthDate,
      gender,
      phone,
      address
    );
    await hasta.patientSave();
    res.redirect("/hasta/secim");
  } catch (err) {
    console.error(err);
    // Hataları uygun şekilde yönetin
    res.redirect("/giris"); // veya hata sayfasına yönlendirin
  }
});

router.get("/giris", (req, res, next) => {
  res.render("hasta/login"); // Doktor giriş formunu render et
});

router.post("/giris", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const result = await Hasta.patientLogin(username, password);
    if (result.length > 0) {
      ourPatient = password;
      res.redirect("/hasta/randevular"); // Başarılı giriş, hastalar sayfasına yönlendir
    } else {
      res.redirect("/giris"); // Kullanıcı adı veya şifre hatalı, giriş sayfasına yönlendir
    }
  } catch (err) {
    console.error(err);
  }
});

router.get("/randevular", async (req, res, next) => {
  try {
    const randevular = await Randevu.patientAppointmentList(ourPatient);
    res.render("hasta/randevuListele", {
      title: "Randevular",
      randevular: randevular,
      path: req.path,
    });
  } catch (err) {
    console.error(err);
    // Hataları uygun şekilde yönetin
  }
});

module.exports = router;
