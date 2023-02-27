const express = require("express");
const path = require("path");
const port = 80;
const app = express();

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));

app.get("/", (req, res) => {
  res.render("home", {
    title: 'Strona główna'
  });
});

app.get("/firmy/:name", (req, res) => {
  const { name } = req.params;
  const companies = [
    { slug: "tworcastron", name: "Tworca Stron.pl" },
    { slug: "brukmode", name: "Bruk Mode" },
  ];

  const company = companies.find((x) => x.slug === name);

  res.render("company", {
    name: company?.name,
    companies,
    title: company?.name ?? 'Brak wyników'
  });
});

app.get("*", (req, res) => {
  res.render("errors/404");
});

app.listen(port);
