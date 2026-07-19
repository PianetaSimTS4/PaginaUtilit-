const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((line, index) => {
  if (line.includes('navigateToCreators') || line.includes('switchTab')) {
    console.log(`${index + 1}: ${line.trim()}`);
  }
});
