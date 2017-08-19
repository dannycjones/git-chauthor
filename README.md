# git-chauthor

_git-ch(ange)author..._

This is a command line tool that enables you to easily set the author for a project.

## How to use

Currently you need to manually create the config yourself. See config section.

With config setup, simply run `chauthor` in a git repository. A simple list selector will appear with all the available author details. Upon selecting, the changes will be made immediately.

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

## Known issues

- Does not handle not being in a Git repository very well
- No way to modify config without manually doing so
- No tests
- No way of interacting with signing keys
