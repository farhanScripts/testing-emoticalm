const https = require('https');

const getAffirmation = () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.affirmations.dev',
      path: '/',
      method: 'GET'
    };

    const req = https.request(options, (res) => {
      let data = '';


      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch affirmation, status code: ${res.statusCode}`));
        return;
      }

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const affirmation = JSON.parse(data).affirmation;
          resolve(affirmation);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
};

module.exports = {
  getAffirmation
};
