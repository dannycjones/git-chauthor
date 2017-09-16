const inquirer = require('inquirer');
const _ = require('lodash');

const config = require('../config.js');

const authors = config.load();
const authorChoices = createChoices(authors);

module.exports = () => inquirer.prompt([{
    name: 'authors',
    message: 'Which authors should be removed?',
    type: 'checkbox',
    choices: authorChoices
}]).then((res) => {
    _.pullAll(authors, res.authors);
    config.save(authors);
});

function createChoices(authorsForChoices) {
    let choices;

    if (authorsForChoices) {
        choices = authorsForChoices.map((author) => {
            if (typeof author.email !== 'string') { throw new Error('Expected type string for email'); }
            if (typeof author.name !== 'string') { throw new Error('Expected type string for name'); }

            return {
                name: author.alias || `${author.name} <${author.email}>`,
                value: author
            };
        });
    }

    return choices;
}
