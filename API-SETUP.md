# Claude API Integration Setup

This document explains how to set up automated weekly content updates using the Claude API.

## Environment Variables

You need to add these environment variables in your Vercel dashboard:

### Required Variables

1. **CLAUDE_API_KEY**
   - Your Anthropic Claude API key
   - Get from: https://console.anthropic.com/

2. **UPDATE_SECRET**  
   - A random secret for authenticating update requests
   - Generate: `openssl rand -base64 32`

3. **CRON_SECRET**
   - A random secret for authenticating cron jobs
   - Generate: `openssl rand -base64 32`

## Setup Steps

### 1. Add Environment Variables

```bash
# Add to Vercel
vercel env add CLAUDE_API_KEY
vercel env add UPDATE_SECRET  
vercel env add CRON_SECRET
```

Or add them in the Vercel dashboard:
- Go to your project settings
- Click "Environment Variables"
- Add each variable for "Production" environment

### 2. Install Dependencies

```bash
npm install @anthropic-ai/sdk dotenv
```

### 3. Deploy

```bash
git add .
git commit -m "Add Claude API integration"
git push
```

## API Endpoints

### `/api/update-content`
- **Method:** POST
- **Auth:** Bearer token using UPDATE_SECRET
- **Purpose:** Updates content for specific category or all categories
- **Body:** `{ "category": "immigration" }` (optional, defaults to "all")

### `/api/cron-update`  
- **Method:** GET/POST
- **Auth:** Bearer token using CRON_SECRET
- **Purpose:** Scheduled weekly updates (runs Sundays at 9 AM UTC)
- **Called automatically by Vercel Cron**

## Manual Update

To trigger a manual update:

```bash
curl -X POST https://trump.riptonic.com/api/update-content \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_UPDATE_SECRET" \
  -d '{"category": "immigration"}'
```

## Monitoring

- Check Vercel Function logs for update status
- Cron jobs run every Sunday at 9 AM UTC
- Updates all 7 categories: immigration, maha, tariffs, energy, economy, foreign, potpourri

## Content Update Process

1. **Weekly Cron Trigger**: Runs every Sunday
2. **Claude API Call**: Generates updated analysis for each category
3. **Content Processing**: Structures new content with recent developments
4. **Response**: Returns updated policy analysis with:
   - Recent developments
   - Conservative perspectives
   - Liberal critiques  
   - Policy contradictions
   - Fresh supporting sources

## Error Handling

- API failures are logged to Vercel Functions
- Individual category failures don't stop other updates
- Retry logic built into cron job
- Authentication failures return 401 status

## Future Enhancements

- [ ] Database integration for persistent storage
- [ ] Admin dashboard for manual content management
- [ ] Email notifications for update status
- [ ] Content versioning and rollback
- [ ] A/B testing for different analysis styles