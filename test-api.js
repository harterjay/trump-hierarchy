// Test script for the API update endpoint

async function testAPIUpdate() {
  const response = await fetch('https://trump.riptonic.com/api/update-content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.UPDATE_SECRET // Will use your actual secret
    },
    body: JSON.stringify({
      category: 'immigration' // Test with immigration category
    })
  });

  if (response.ok) {
    const data = await response.json();
    console.log('✅ API Update Success:', data);
  } else {
    const error = await response.text();
    console.error('❌ API Update Failed:', response.status, error);
  }
}

// Run the test
testAPIUpdate().catch(console.error);