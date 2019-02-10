#! /usr/bin/env node

const
    git = require('simple-git/promise')(),
    inquirer = require('inquirer'),
    _ = require('lodash'),
    config = require('../config.js');

const
    authors = config.load(),
    authorChoices = createChoices(authors);

function main() {
    if (authors) {
        git.checkIsRepo().then(inRepo => {
            if (inRepo) {
                manageRepoAuthor();
            } else {
                console.log('You are not in a git repository.');
                manageAuthors();
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
}

function createChoices(authors) {
    let choices;

    if (authors) {
        choices = authors.map(author => {
            if (typeof author.email !== 'string') { throw new Error('Expected type string for email') }
            if (typeof author.name !== 'string') { throw new Error('Expected type string for name') }

            return {
                name: author.alias || `${author.name} <${author.email}>`,
                value: author
            };
        });
    }

    return choices;
}

main();

function manageAuthors() {
    inquirer.prompt([
        {
            name: 'action',
            message: 'What would you like to do?',
            type: 'list',
            choices: [
                'Add author',
                'Remove authors',
                new inquirer.Separator(),
                'Nothing'
            ]
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
        switch (answers.action) {
            case 'Cancel':
                break;
            case 'Add author':
                authors.push({
                    alias: answers.alias,
                    email: answers.email,
                    name: answers.name
                });
                config.save(authors);
                break;
            case 'Remove authors':
                inquirer.prompt([{
                    name: 'authors',
                    message: 'Which authors should be removed?',
                    type: 'checkbox',
                    choices: authorChoices
                }]).then(answers => {
                    _.pullAll(authors, answers.authors);
                    config.save(authors);
                }).catch(console.error);
                break;
        }
    }).catch(console.error);
}

function manageRepoAuthor() {
    inquirer.prompt([
        {
            name: 'author',
            message: 'Which author details would you like to use with this repository?',
            type: 'list',
            choices: authorChoices.concat([
                new inquirer.Separator(),
                'Manage authors...'
            ])
        }
    ]).then(answers => {
        if (answers.author !== 'Manage authors...') {
            Promise.all([
                git.addConfig('user.name', answers.author.name),
                git.addConfig('user.email', answers.author.email)
            ]).then(() => console.log('Git author config set.'), console.error);
        } else {
            manageAuthors();
        }
    }).catch(console.error);
}
