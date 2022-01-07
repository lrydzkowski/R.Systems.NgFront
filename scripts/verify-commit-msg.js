var scriptArgs = process.argv.slice(2);
if (scriptArgs.length === 0) {
  process.exit(1);
}

var commitMsgFilePath = scriptArgs[0];
var fs = require('fs');
var commitMsg = fs.readFileSync(commitMsgFilePath, 'utf-8');

var regex = /^(?<type>build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|version)(?<scope>\(\w+\))?(?<breaking>!)?(?<subject>:\s.+)?|^(?<merge>Merge \w+)/
if (!regex.test(commitMsg)) {
  console.log('');
  console.log('Your commit message is incorrectly formatted!');
  console.log('You should follow conventional commits specification:');
  console.log('https://www.conventionalcommits.org/en/v1.0.0/');
  console.log('');
  process.exit(1);
}
