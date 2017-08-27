# git-chauthor

_git-ch(ange)author..._

This is a command line tool that enables you to easily set the author for a project.

## How to use

I recommend installing this package globally so that you can use it in any directory with just `chauthor`.

Follow the interface to create your configuration file. You will need to run it once to create the config file, then again to start adding author details. For more info about the file itself, see the config section.

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

I've created a few known issues in the issues tab on GitHub.

If you find other problems, feel free to submit an issue on the GitHub repository.
