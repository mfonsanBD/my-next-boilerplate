module.exports = (plop) => {
  plop.setGenerator('template', {
    description: 'Create a template',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your template name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/app/{{lowerCase name}}/page.tsx',
        templateFile: 'templates/template.tsx.hbs',
      },
    ],
  })
}
