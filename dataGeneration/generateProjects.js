const fs = require('fs');

const countries = ['CA', 'UK', 'US', 'AU', 'NZ', 'NL', 'DK', 'IE', 'NO', 'SE', 'DE',
  'FR', 'ES', 'IT', 'AT', 'BE', 'CH', 'LU', 'HK', 'SG', 'MS', 'JP'];

const records = 10 * 1000000;
const stream = fs.createWriteStream('projects.csv');
let i = 1;

stream.write('id,location\n');

const write = () => {
  while (i <= records) {
    const project = {};
    const randIdx = Math.floor(Math.random() * countries.length);

    if (i % 5 === 0) {
      project.location = countries[randIdx];
    } else {
      project.location = 'US';
    }
    stream.write(`${i},${project.location}\n`);
    if (i % 100000 === 0) {
      console.log(`${i} entries logged`);
    }
    i += 1;
  }
};

stream.on('drain', write);
write();
