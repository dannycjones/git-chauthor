# git-author-switcher

This is a command line tool that enables you to easily set the author for a project.

## Config

The config for this tool (an array of authors) should lie in `~/.gitauthors.json`, and takes the following format:

```
[
    {
        alias (optional string),
        email (string),
        name (string)
    }
]
```

For example, my config file looks something like this:

```json
[
    {
        "email": "danny@danielcarl.info",
        "name": "Daniel Carl Jones"
    },
    {
        "alias": "Uni",
        "email": "not.sharing@sorry.ac.uk",
        "name": "Daniel Carl Jones"
    }
]
```
