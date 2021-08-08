try {
  var replaceTool = require('replace-in-file');
  var currentDate = new Date();
  var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  var days = currentDate.getDate().toString().padStart(2, '0');
  var hours = currentDate.getHours().toString().padStart(2, '0');
  var minutes = currentDate.getMinutes().toString().padStart(2, '0');
  var seconds = currentDate.getSeconds().toString().padStart(2, '0');
  var build = currentDate.getFullYear() + '-' + month + '-' + days + 'T' + hours + ':' + minutes + ':' + seconds;
  var options = {
    files: ['src/environments/environment.ts', 'src/environments/environment.prod.ts'],
    from: /build: '(.*)'/g,
    to: "build: '"+ build + "'"
  };
  var changedFiles = replaceTool.sync(options);
  var isNotChanged = function(element) {
    return !element.hasChanged;
  };
  if (changedFiles.findIndex(isNotChanged) > -1) {
    throw "Please make sure that files " + options.files.join(', ') + " have \"build: ''\"";
  }
  console.log('Build set: ' + build);
} catch (error) {
  console.error('Error occured:', error);
}
