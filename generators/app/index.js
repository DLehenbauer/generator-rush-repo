const Generator = require("yeoman-generator");
const chalk = require("chalk");
const gitRemoteOriginUrl = require('git-remote-origin-url');
const { spawn } = require("child_process");

module.exports = class extends Generator {
    async _shellCmd(command, args) {
        return new Promise((accept, reject) => {
            console.log(`> ${command}${args ? args.join(" ") : ""}`)
            const proc = spawn(command, args);
            
            proc.stdout.on("data", data => { this.log.write(data.toString()); });
            proc.stderr.on("data", data => { this.log.error(data.toString()); });
            proc.on("error", (error) => { this.log.error(`error: ${error.message}`); });
            proc.on("close", code => {
                if (code === 0) { accept() }
                else { reject(); }
            });
        });
    }
    
    async prompting() {
        function sanitize(input, separator) {
            const capitalize = (str) => {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }

            return input
                .split(/[ _-]+/)
                .filter((part) => part.length > 0)
                .join(separator)
                .replace(/\W/g, "");
        }

        function maybeMatch(regex, input) {
            const matches = regex.match(input);
        }

        let defaultRepoUrl = (answers) => `https://github.com/<username>/${answers.project}.git`;
        let defaultUser = "anonymous";
        let defaultProject = this.appname;

        try {
            defaultRepoUrl = await gitRemoteOriginUrl();
            const matches = defaultRepoUrl.match(/\/([^/]+)\/([^/]+)\.git$/);
            if (matches) {
                [, defaultUser, defaultProject] = matches;
            }
        } catch (error) {
            console.error(error);
        }

        this.answers = await this.prompt([{
            type: "input",
            name: "repoUrl",
            message: "Github repo",
            default: defaultRepoUrl,
        }, {
            type: "input",
            name: "author",
            message: "Author",
            default: defaultUser,
            store: true
        }, {
            type: "input",
            name: "npmScope",
            message: "NPM scope",
            filter: input => `@${sanitize(input)}`,
            default: (answers) => `@${sanitize(defaultProject).toLowerCase()}`,
        }, {
            type: "input",
            name: "license",
            message: "License",
            default: "MIT"
        }]);
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath("./**"),
            this.destinationPath("."),
            /* context: */ this.answers,
            /* templateOptions: */ undefined,
            { globOptions: { dot: true }}
        );
    }

    async install() {
        await this._shellCmd("node", ["common/scripts/install-run-rush.js", "update"]);

        this.log("Installing dependencies. This may take a minute.");
        this.npmInstall();
    }

    async end() {
        this.log("\n");
        this.log(chalk.green("Success."));
    }
};
