import fs from 'fs/promises';
import path from 'path';

async function autoTestAndFix() {
  console.log('\n🔍 [PHASE 1] Reading API Key from .env.local...');
  let envContent = '';
  try {
    envContent = await fs.readFile(path.join(process.cwd(), '.env.local'), 'utf8');
  } catch (e) {
    console.log('❌ Error: .env.local file not found!');
    return;
  }
  
  const match = envContent.match(/GEMINI_API_KEY=(.*)/);
  if (!match || !match[1]) {
    console.log('❌ Error: GEMINI_API_KEY not found in .env.local');
    return;
  }
  const apiKey = match[1].trim();
  console.log('✅ API Key found.');

  console.log('\n📡 [PHASE 2] Fetching model list from Google...');
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const data = await response.json();

  if (data.error) {
    console.log('❌ Google API Error:', data.error.message);
    return;
  }

  // Get only models that support generation
  const validModels = data.models
    .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
    .map(m => m.name.replace('models/', ''));

  console.log(`✅ Found ${validModels.length} potential models. Starting Live Testing...\n`);

  console.log('🔬 [PHASE 3] Testing models one by one (Please wait)...');
  let workingModel = null;

  for (const modelName of validModels) {
    process.stdout.write(`⏳ Testing ${modelName}... `);
    try {
      // Send a dummy "Hi" request to test if it ACTUALLY works
      const testRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: "Hi" }] }] })
      });
      const testData = await testRes.json();

      if (testData.error) {
         console.log(`❌ Failed (${testData.error.message.split('.')[0]})`);
      } else if (testData.candidates) {
         console.log(`✅ SUCCESS! It works!`);
         workingModel = modelName;
         break; // Stop at the first working model
      }
    } catch (e) {
       console.log(`❌ Failed (Network/Fetch error)`);
    }
  }

  if (!workingModel) {
    console.log('\n❌ CRITICAL: None of the models worked. Your API key might be completely restricted by Google.');
    return;
  }

  console.log(`\n💾 [PHASE 4] Saving the working model (${workingModel}) to your code...`);
  const routePath = path.join(process.cwd(), 'app/api/chat/route.ts');
  let routeContent = await fs.readFile(routePath, 'utf8');
  
  // Update the model string in your API route
  routeContent = routeContent.replace(/model:\s*"[^"]+"/g, `model: "${workingModel}"`);
  
  await fs.writeFile(routePath, routeContent, 'utf8');
  
  console.log('\n🎉 ALL DONE! We finally nailed it.');
  console.log('➡️ Restart your dev server (Ctrl+C, then npm run dev) and test the AI CFO!');
}

autoTestAndFix();