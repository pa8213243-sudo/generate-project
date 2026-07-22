import fs from 'fs/promises';
import path from 'path';

async function fixImagePaths() {
  const dataPath = path.join(process.cwd(), 'services/dataService.ts');
  try {
    let content = await fs.readFile(dataPath, 'utf8');
    
    // 1. Agar abhi bhi Unsplash link hai toh usko projects folder ke path se replace karo
    content = content.replace(/image:\s*['"]https:\/\/images\.unsplash\.com\/photo-1549317661-bd32c8ce0db2[^'"]*['"]/g, 'image: "/projects/flipcart.jpeg"');
    content = content.replace(/image:\s*['"]https:\/\/images\.unsplash\.com\/photo-1551288049-bebda4e38f71[^'"]*['"]/g, 'image: "/projects/sales dashboard.jpeg"');

    // 2. Agar pichli script ne root path set kar diya tha, toh usko bhi fix karo
    content = content.replace(/image:\s*['"]\/flipcart\.jpeg['"]/g, 'image: "/projects/flipcart.jpeg"');
    content = content.replace(/image:\s*['"]\/sales dashboard\.jpeg['"]/g, 'image: "/projects/sales dashboard.jpeg"');

    await fs.writeFile(dataPath, content, 'utf8');
    console.log('✅ Success! Image paths have been updated to point to the "/projects" folder.');
    console.log('➡️ Croma will now show "/projects/sales dashboard.jpeg"');
    console.log('➡️ Flipkart will now show "/projects/flipcart.jpeg"');
  } catch (err) {
    console.log('❌ Error updating paths:', err.message);
  }
}

fixImagePaths();