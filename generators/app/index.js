var Generator = require('yeoman-generator');

module.exports = class extends Generator {
	constructor(args, opts) {
		// Calling the super constructor is important so our generator is correctly set up
		super(args, opts)

		this.helperMethod = function() {
			console.log('won\'t be called automatically');
		};

        this.answers;
	}
	prompting() {
		return this.prompt([{
			type: 'input',
			name: 'name',
			message: 'Your project name',
			default: this.appname // Default to current folder name
		}]).then((answers) => {
			this.answers = answers;
		});
	}

    writing() {
        this.fs.copyTpl(
        	this.templatePath(this.sourceRoot()),
        	this.destinationPath(),
			{ name: this.answers.name }
        );
        this.fs.move(this.destinationPath() + '/babelrc', this.destinationPath() + '/.babelrc' )
    }


    install() {
      this.npmInstall();
    }

};
