const express = require("express");
const router = new express.Router();

router.get("/", (req, res) => {
  res.render("pages/home", {
    title: "Strona główna",
    url: req.url,
  });
});

router.get("/firmy/:name", (req, res) => {
  const { name } = req.params;
  const companies = [
    { slug: "tworcastron", name: "Tworca Stron.pl" },
    { slug: "brukmode", name: "Bruk Mode" },
  ];

  const company = companies.find((x) => x.slug === name);

  res.render("pages/company", {
    name: company?.name,
    companies,
    title: company?.name ?? "Brak wyników",
    url: req.url,
  });
});

router.get("*", (req, res) => {
  res.render("errors/404", {
    title: "Nie znaleziono",
    layout: "./layouts/minimalistic",
    url: req.url,
  });
});

module.exports = router