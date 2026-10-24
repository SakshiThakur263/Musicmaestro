const http = require('http');

function post(path, data) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const req = http.request({
      hostname: '127.0.0.1',
      port: 5000,
      path: '/api' + path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function run() {
  console.log('Testing Contact form API...');
  const contact = await post('/contact', {
    name: 'Aarav Mehta',
    email: 'aarav@example.com',
    phone: '+919876500000',
    subject: 'Corporate Gala Booking',
    message: 'Need a 5-piece live band for our annual conference in Mumbai.'
  });
  console.log('Contact status:', contact.status, 'Success:', contact.data?.success);

  console.log('Testing User Registration API...');
  const ts = Date.now();
  const email = 'client.' + ts + '@example.com';
  const reg = await post('/auth/register', {
    username: 'pooja_' + ts,
    email,
    password: 'Password@123',
    role: 'client'
  });
  console.log('Register status:', reg.status, 'User:', reg.data?.data?.user?.email);

  console.log('Testing User Login API...');
  const login = await post('/auth/login', {
    email,
    password: 'Password@123'
  });
  console.log('Login status:', login.status, 'Token returned:', !!login.data?.data?.token);

  console.log('All smoke tests completed successfully!');
}

run().catch(err => {
  console.error('Smoke test failed:', err);
  process.exit(1);
});
