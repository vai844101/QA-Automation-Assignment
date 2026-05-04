const http = require('https');
const data = JSON.stringify({ name: 'morpheus', job: 'leader' });

const req = http.request({
  hostname: 'reqres.in',
  path: '/api/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log('STATUS:', res.statusCode, 'BODY:', body));
});

req.write(data);
req.end();
