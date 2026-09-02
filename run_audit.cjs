const fs = require('fs');
const content = fs.readFileSync('src/components/opal/ThreeOpalViewer.tsx', 'utf8');

const regex = /g_greenFireMask|g_blueFireMask|g_totalFireMask|g_preciousOpalMask|outGreenDomain|outBlueDomain/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const lineNo = content.substring(0, match.index).split('\n').length;
  const lineStart = content.lastIndexOf('\n', match.index) + 1;
  const lineEnd = content.indexOf('\n', match.index);
  console.log(`Line ${lineNo}: ${content.substring(lineStart, lineEnd)}`);
}
