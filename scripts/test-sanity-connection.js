import 'dotenv/config';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2023-05-03',
});

async function testConnection() {
  try {
    console.log('Testing Sanity connection...');
    console.log('Project ID:', process.env.SANITY_PROJECT_ID);
    console.log('Dataset:', process.env.SANITY_DATASET);
    
    // Test basic query
    const result = await client.fetch('*[_type == "event"]');
    console.log('Connection successful!');
    console.log('Current events in dataset:', result.length);
    
    // Test project info
    const projectInfo = await client.request({
      url: `/projects/${process.env.SANITY_PROJECT_ID}`,
      method: 'GET',
    });
    console.log('Project name:', projectInfo.displayName);
    
    return true;
  } catch (error) {
    console.error('Connection failed:', error.message);
    return false;
  }
}

testConnection();