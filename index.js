var inquirer = require('inquirer');

inquirer.prompt([
    {
        name: 'q1',
        message: 'Which author details would you like to use with this repository?',
        type: 'list',
        choices: [
            'Jane Doe <jane.doe@example.com>',
            'Jane Doe <jdoe@business.com>',
            new inquirer.Separator(),
            'Add new author...',
            'Remove author...'
        ]
    }
]).then(console.log).catch(console.error);
