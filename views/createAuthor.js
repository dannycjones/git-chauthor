const inquirer = require('inquirer');

const config = require('../config.js');

const authors = config.load();

module.exports = () => inquirer.prompt([
    {
        name: 'name',
        message: 'Author name:'
    },
    {
        name: 'email',
        message: 'Author email:'
    },
    {
        name: 'alias',
        message: 'Author alias:'
    }
]).then((answers) => {
    authors.push({
        alias: answers.alias,
        email: answers.email,
        name: answers.name
    });
    config.save(authors);
});
