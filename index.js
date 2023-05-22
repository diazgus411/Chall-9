const inquirer = require("inquirer");
const fs = require("fs");

// Array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Enter the title of your application:'
  },
  {
    type: 'input',
    name: 'Description',
    message: 'Enter the description here:'
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Enter the installation instructions:'
  },
  {
    type: 'input',
    name: 'TableOfContents',
    message: 'Enter the table of contents:'
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Enter the application usage:'
  },
  {
    type: 'input',
    name: 'license',
    message: 'Enter the license:'
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Enter the contributors:'
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Enter the tests:'
  },
  {
    type: 'input',
    name: 'githubUsername',
    message: 'Enter your GitHub username:'
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address:'
  },
  {
    type: 'input',
    name: 'questions',
    message: 'Enter any questions:'
  }
];

// Function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`README.md created successfully!`);
    }
  });
}

// Function to generate markdown content
function generateMarkdown(answers) {
  const licenseBadge = renderLicenseBadge(answers.license);

  // Add the GitHub profile link
  const githubLink = `https://github.com/diazgus411`;

  // Generate anchor links for the table of contents
  const tableOfContents = answers.TableOfContents.split(',').map(section => {
    const anchorLink = section.toLowerCase().replace(/\s/g, '-');
    return `- [${section}](#${anchorLink})`;
  }).join('\n');

  return `# ${answers.title}

${licenseBadge}

## Description

${answers.Description}

## Table of Contents

${tableOfContents}

## Installation

${answers.installation}

## Usage

${answers.usage}

## License

${answers.license}

## Contributing

${answers.contributing}

## Tests

${answers.tests}

## Questions

${answers.questions}

For more information, visit my GitHub profile: [${answers.githubUsername}](${githubLink})

To contact me, send an email to: "diazgus411@gmail.com"
`;
}

// Function to initialize app
function init() {
  inquirer.prompt(questions).then(function(answers) {
    const markdownText = generateMarkdown(answers);
    writeToFile('README.md', markdownText);
  });
}

// Function call to initialize app
init();

function renderLicenseBadge(license) {
  if (license === "None") {
    return "";
  } 
  else {
    return `![GitHub license](https://img.shields.io/badge/license-${license}-blue.svg)`
  };
}