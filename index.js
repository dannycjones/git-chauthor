const
    fs = require('fs'),
    inquirer = require('inquirer');

const
    configFilePath = process.env.HOME + '/.gitauthors.json',
    authors = loadConfig(),
    choices = createChoices(authors);

if (authors) {
    inquirer.prompt([
        {
            name: 'q1',
            message: 'Which author details would you like to use with this repository?',
            type: 'list',
            choices
        }
    ]).then(console.log).catch(console.error);
} else {
    console.log('No authors found!')
    inquirer.prompt([
        {
            name: 'createConfig',
            message: 'Would you like to create a new authors config file?',
            type: 'confirm',
            default: true
        }
    ]).then(answers => {
        if (answers.createConfig) {
            console.log('TODO: Show prompts for creating config...');
        }
    }).catch(console.error);
}

function loadConfig() {
    if (fs.existsSync(configFilePath)) {
        return JSON.parse(fs.readFileSync(configFilePath));
    }
    return false;
}

function createChoices(authors) {
    let choices;

    if (authors) {
        choices = authors.map(author => {
            if (typeof author.email !== 'string') { throw new Error('Expected type string for email') }
            if (typeof author.name !== 'string') { throw new Error('Expected type string for name') }

            return {
                name: author.alias || `${author.name} <${author.email}>`,
                value: {
                    email: author.email,
                    name: author.name
                }
            };
        }).concat(
            [
                new inquirer.Separator(),
                'Add new author...',
                'Remove author...'
            ]
        );
    }

    return choices;
}
