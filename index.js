const
    inquirer = require('inquirer');

const
    fakeAuthorLs = [
        {
            email: 'jane.doe@example.com',
            name: 'Jane Doe'
        },
        {
            alias: 'Work',
            email: 'jdoe@business.com',
            name: 'Jane Doe'
        }
    ],
    choices = fakeAuthorLs.map(author => {
        return {
            name: author.alias || `${author.name} <${author.email}>`,
            value: {
                email: author.email,
                name: author.name
            }
        }
    }).concat(
        [
            new inquirer.Separator(),
            'Add new author...',
            'Remove author...'
        ]
    );


inquirer.prompt([
    {
        name: 'q1',
        message: 'Which author details would you like to use with this repository?',
        type: 'list',
        choices
    }
]).then(console.log).catch(console.error);
