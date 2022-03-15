const path = require("path");
const fs = require("fs");
const handlebars = require("handlebars");

//console.log(path.normalize(__dirname + "../../views/email/register.hbs"));

const getTemplate = (template) => {
  const templatePath = path.normalize(
    __dirname + "../../views/email/" + template + ".hbs"
  );
  const source = fs.readFileSync(templatePath, "utf-8");
  const compiledTemplate = handlebars.compile(source); //compile the template
  return compiledTemplate;
};

module.exports = {
  getTemplate,
};
