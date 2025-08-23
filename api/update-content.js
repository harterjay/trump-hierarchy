import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Basic auth check (optional)
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.UPDATE_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Get the category to update (or update all)
    const { category = 'all' } = req.body;

    // Prompt Claude to generate updated policy content
    const prompt = `You are updating a Trump policy analysis website. Generate updated, balanced policy analysis for the ${category} category.

Current date: ${new Date().toLocaleDateString()}

Please provide updated analysis that includes:
1. Recent developments or policy statements
2. Conservative perspective analysis
3. Liberal critique analysis  
4. Policy contradictions or tensions
5. Recent supporting sources

Format the response as JSON with the structure:
{
  "category": "${category}",
  "lastUpdated": "${new Date().toISOString()}",
  "summary": "updated policy summary...",
  "perspectives": {
    "supportive": [
      {
        "title": "Analysis Point Title",
        "description": "Detailed analysis...",
        "tag": "Tag Name"
      }
    ],
    "critical": [...],
    "contradictions": [...]
  },
  "sources": [
    {
      "title": "Source Title",
      "description": "Source description...",
      "meta": "Source metadata..."
    }
  ]
}

Focus on factual, balanced analysis. Include both positive developments and legitimate concerns.`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const updatedContent = JSON.parse(message.content[0].text);

    // In a real implementation, you'd save this to a database or update your HTML
    // For now, return the generated content
    res.status(200).json({
      success: true,
      content: updatedContent,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Content update error:', error);
    res.status(500).json({ 
      error: 'Failed to update content',
      details: error.message 
    });
  }
}