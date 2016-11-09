var cors = require('cors');
var express = require('express');

var app = express();
app.use(cors());

app.get('/', function (req, res) {
  let fn = req.query.fullname;

  if (fn.length === 0) {
    console.log('Invalid string. Invalid fullname.');
    return res.send('Invalid fullname');
  }
  console.log(fn);
  fn = fn.replace(/  +/g, ' ');
  fn = fn.replace(/^ /, '');
  console.log(fn);

  // Проверим на недопустимые символы.
  // Хотя в условии этого нет
  const re = new RegExp('[0-9_\/]');
  if (re.test(fn)) {
    console.log('Invalid string. Invalid fullname.');
    return res.send('Invalid fullname');
  }

  let ar = fn.split(' ');
  if (ar.length > 3) {
    return res.send('Invalid fullname');
  }

  let result = ar[ar.length - 1];
  result = result.toLowerCase();
  result = result[0].toUpperCase() + result.substring(1);

  for (let i = 0; i <= ar.length - 2; i++) {
    result = result + ' ' + ar[i][0].toUpperCase() + '.';
  }
  res.send(String(result));
});

app.listen(3001, function() {
  console.log('Listening on 3001 port.');
});
