import fs from 'fs/promises';
import path from 'path';

async function smartFix() {
  console.log('\n🔍 Checking your API Key and Google AI Studio Account...');

  try {
    // 1. Read the API Key from .env.local
    let envContent = '';
    try {
      envContent = await fs.readFile(path.join(process.cwd(), '.env.local'), 'utf8');
    } catch (e) {
      console.log('❌ Error: .env.local file not found in the root folder!');
      return;
    }

    const match = envContent.match(/GEMINI_API_KEY=(.*)/);
    if (!match || !match[1]) {
      console.log('❌ Error: GEMINI_API_KEY not found in .env.local');
      return;
    }
    const apiKey = match[1].trim();

    // 2. Fetch available models directly from Google for YOUR specific key
    console.log('📡 Contacting Google servers to find your allowed models...');
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();

    if (data.error) {
      console.log('\n❌ Google API Error:', data.error.message);
      console.log('⚠️ Please double-check that your API key is correct and has no extra spaces.');
      return;
    }

    // Filter models that support chat/text generation
    const validModels = data.models.filter(m => 
      m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')
    );

    if (validModels.length === 0) {
      console.log('❌ Your API key does not have access to any text generation models.');
      return;
    }

    console.log(`✅ Found ${validModels.length} compatible models for your account.`);

    // Prefer gemini-3.6-flash-8b or gemini-3.6-flash if available, otherwise pick the first valid one
    let selectedModel = validModels[0].name.replace('models/', '');
    const preferred = validModels.find(m => m.name.includes('gemini-3.6-flash'));
    
    if (preferred) {
      selectedModel = preferred.name.replace('models/', '');
    }

    console.log(`🚀 Automatically Selected Best Model: \x1b[32m${selectedModel}\x1b[0m`);

    // 3. Update the route.ts file with the exact working model
    const routePath = path.join(process.cwd(), 'app/api/chat/route.ts');
    let routeContent = await fs.readFile(routePath, 'utf8');

    // Regex to accurately replace the model name
    routeContent = routeContent.replace(/model:\s*"[^"]+"/g, `model: "${selectedModel}"`);

    await fs.writeFile(routePath, routeContent, 'utf8');
    console.log('✅ Updated app/api/chat/route.ts successfully!');
    
    console.log('\n🎉 ALL DONE! Please follow these exact steps now:');
    console.log('1. Stop your current dev server (Press Ctrl + C).');
    console.log('2. Run: npm run dev');
    console.log('3. Open the browser and test the AI CFO again.');

  } catch (err) {
    console.error('❌ An unexpected error occurred:', err.message);
  }
}

smartFix();