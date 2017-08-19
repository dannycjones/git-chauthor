#! /usr/bin/env node

const
    git = require('simple-git')(),
    inquirer = require('inquirer'),
    config = require('../config.js');

const
    authors = config.load(),
    choices = createChoices(authors);

if (authors) {
    inquirer.prompt([
        {
            name: 'author',
            message: 'Which author details would you like to use with this repository?',
            type: 'list',
            choices
        },
        {
            name: 'action',
            message: 'What would you like to do?',
            type: 'list',
            choices: [
                'Add author',
                'Remove authors'
            ],
            when: answers => answers.author === 'Manage authors...'
        },
        {
            name: 'name',
            message: 'Author name:',
            when: answers => answers.action === 'Add author'
        },
        {
            name: 'email',
            message: 'Author email:',
            when: answers => answers.action === 'Add author'
        },
        {
            name: 'alias',
            message: 'Author alias:',
            when: answers => answers.action === 'Add author'
        }
    ]).then(answers => {
        if (answers.action) {
            switch (answers.action) {
                case 'Add author':
                    authors.push({
                        alias: answers.alias,
                        email: answers.email,
                        name: answers.name
                    });
                    config.save(authors);
                default:
                    console.log('TODO: Take action when user wants to manage authors...');
            }
        } else {
            git.addConfig('user.name', answers.author.name);
            git.addConfig('user.email', answers.author.email);
            console.log('Git author config set.');
        }
    }).catch(console.error);
} else {
    console.log('No authors found!');
    inquirer.prompt([
        {
            name: 'createConfig',
            message: 'Would you like to create a new authors config file?',
            type: 'confirm',
            default: true
        }
    ]).then(answers => {
        if (answers.createConfig) {
            config.save([]);
        }
    }).catch(console.error);
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
                'Manage authors...'
            ]
        );
    }

    return choices;
}
