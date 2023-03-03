const Company = require('../db/models/Company')

class CompanyController {
  
  async showCompanies(req, res) {

    const companies = await Company.find({})

    res.render("pages/companies", {
      companies,
      url: req.url
    });
  }

  async showCompany(req, res) {
    const { name } = req.params;

    const company = await Company.findOne({slug:name})

    res.render("pages/company", {
      name: company?.name,
      title: company?.name ?? "Brak wyników",
      url: req.url,
    });
  }
}

module.exports = new CompanyController()