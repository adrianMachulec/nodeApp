const Company = require('../db/models/Company')

class CompanyController {
  
  async showCompanies(req, res) {

    const companies = await Company.find({})

    res.render("pages/companies/companies", {
      companies
    });
  }

  async showCompany(req, res) {
    const { name } = req.params;

    const company = await Company.findOne({slug:name})

    res.render("pages/companies/company", {
      name: company?.name,
      title: company?.name ?? "Brak wyników"
    });
  }

  showCreateCompanyForm(req, res) {
    res.render('pages/companies/create')
  }

  async createCompany(req, res) {
    const company = new Company({
      name: req.body.name,
      slug: req.body.slug,
      employeesCount: req.body.employeesCount || undefined
    });

    try{
      await company.save()
      res.redirect('/firmy')
    } catch(e){
      res.render('pages/companies/create' ,{
        errors: e.errors,
        form: req.body
      })
    }
  }
}

module.exports = new CompanyController()