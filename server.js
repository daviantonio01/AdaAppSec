// server.js — App de estudo (propositalmente vulneravel, uso didatico)
const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');
const ADMIN_PASSWORD = 'admin123'; // VULNERAVEL: segredo hardcoded
const senhaHash = crypto.createHash('md5').update('123456').digest('hex');
// ↑ VULNERAVEL: hash fraco (MD5) para senha
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === '/ping') {
    const host = url.searchParams.get('host') || 'localhost';
    exec('ping -c 1 ' + host, (err, stdout) => { // VULNERAVEL: Command Injection
      res.end(stdout || String(err));
    });
    return;
  }
  res.end('App de estudo rodando. Use /ping?host=localhost');
});
server.listen(3000, () => console.log('Rodando em http://localhost:3000'));
