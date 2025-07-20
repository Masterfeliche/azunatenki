// Script to fix all remaining color inconsistencies for amber gold theme
const fs = require('fs');

// Read the HTML file
fs.readFile('index.html', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Replace all color inconsistencies
  let updatedContent = data;
  
  // Fix azu-amber_alt references (should be azu-accent)
  updatedContent = updatedContent.replace(/azu-amber_alt/g, 'azu-accent');
  
  // Fix any remaining purple references that should be amber
  updatedContent = updatedContent.replace(/bg-azu-purple/g, 'bg-azu-amber');
  updatedContent = updatedContent.replace(/text-azu-purple/g, 'text-azu-amber');
  updatedContent = updatedContent.replace(/border-azu-purple/g, 'border-azu-amber');
  updatedContent = updatedContent.replace(/hover:text-azu-purple/g, 'hover:text-azu-amber');
  updatedContent = updatedContent.replace(/hover:bg-azu-purple/g, 'hover:bg-azu-amber');
  updatedContent = updatedContent.replace(/hover:border-azu-purple/g, 'hover:border-azu-amber');
  updatedContent = updatedContent.replace(/focus:ring-azu-purple/g, 'focus:ring-azu-amber');
  
  // Fix gradient references
  updatedContent = updatedContent.replace(/from-azu-purple to-azu-accent/g, 'from-azu-amber to-azu-accent');
  updatedContent = updatedContent.replace(/from-azu-purple via-azu-indigo to-azu-accent/g, 'from-azu-amber via-azu-indigo to-azu-accent');
  
  // Fix the skip link to use dark background instead of white
  updatedContent = updatedContent.replace(
    /class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black/g,
    'class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-azu-darker text-azu-amber'
  );
  
  // Write the updated content back to the file
  fs.writeFile('index.html', updatedContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('✅ Successfully fixed all color inconsistencies!');
    console.log('🎨 Your website now has a consistent amber gold theme with dark backgrounds.');
    console.log('🔧 Fixed issues:');
    console.log('   - Replaced azu-amber_alt with azu-accent');
    console.log('   - Updated remaining purple references to amber');
    console.log('   - Fixed skip link background from white to dark');
  });
});