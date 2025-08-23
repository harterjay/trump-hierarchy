// Vercel Cron job for weekly content updates
// This will run every Sunday at 9 AM UTC

export default async function handler(req, res) {
  // Verify this is a cron request
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const categories = ['immigration', 'maha', 'tariffs', 'energy', 'economy', 'foreign', 'potpourri'];
    const updatePromises = [];

    // Update each category
    for (const category of categories) {
      const updatePromise = fetch(`${process.env.VERCEL_URL}/api/update-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.UPDATE_SECRET}`
        },
        body: JSON.stringify({ category })
      });
      
      updatePromises.push(updatePromise);
    }

    // Wait for all updates to complete
    const results = await Promise.allSettled(updatePromises);
    
    // Process results
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    // Log results
    console.log(`Weekly update completed: ${successful} successful, ${failed} failed`);

    res.status(200).json({
      success: true,
      message: `Weekly update completed`,
      stats: {
        successful,
        failed,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Cron update error:', error);
    res.status(500).json({ 
      error: 'Cron update failed',
      details: error.message 
    });
  }
}