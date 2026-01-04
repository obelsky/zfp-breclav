const fs = require('fs');
const path = require('path');

// Check all layout.tsx files
const checkDir = (dir) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory() && !file.name.startsWith('.') && file.name !== 'node_modules') {
      checkDir(fullPath);
    } else if (file.name === 'layout.tsx') {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check for common issues
      if (!content.includes('export const metadata') && !content.includes('export default')) {
        console.log(`⚠️  Missing export in: ${fullPath}`);
      }
      
      // Check for syntax issues
      const openBraces = (content.match(/{/g) || []).length;
      const closeBraces = (content.match(/}/g) || []).length;
      
      if (openBraces !== closeBraces) {
        console.log(`❌ Brace mismatch in: ${fullPath}`);
        console.log(`   Open: ${openBraces}, Close: ${closeBraces}`);
      }
    }
  }
};

console.log('🔍 Checking TypeScript files...\n');
checkDir('./app');
console.log('\n✅ Check complete!');
