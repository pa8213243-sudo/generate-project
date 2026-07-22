import fs from 'fs/promises';
import path from 'path';

async function fixDataImages() {
  const dataPath = path.join(process.cwd(), 'services/dataService.ts');
  try {
    let content = await fs.readFile(dataPath, 'utf8');
    
    // Replace Uber images with your new images
    content = content.replace(
      /image:\s*['"]https:\/\/images\.unsplash\.com\/photo-1549317661-bd32c8ce0db2[^'"]*['"]/g, 
      `image: "/flipcart.jpeg"`
    );
    content = content.replace(
      /image:\s*['"]https:\/\/images\.unsplash\.com\/photo-1551288049-bebda4e38f71[^'"]*['"]/g, 
      `image: "/sales dashboard.jpeg"` // Make sure you have this image in your public folder too
    );

    await fs.writeFile(dataPath, content, 'utf8');
    console.log('✅ Uber images successfully replaced in dataService.ts!');
    console.log('⚠️ IMPORTANT: Make sure you MOVE "flipcart.jpeg" into your "public" folder!');
  } catch (err) {
    console.log('Error updating images:', err.message);
  }
}

fixDataImages();