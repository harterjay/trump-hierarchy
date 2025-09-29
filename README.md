# Trump Policy Information Hub

A hierarchical web application providing multi-perspective analysis of Trump administration policies with automated content updates via Claude AI integration.

## Features

- **Hierarchical Navigation**: Browse from high-level categories down to detailed policy analysis
- **Multi-Perspective Analysis**: Conservative views, liberal critiques, and policy contradictions
- **Interactive Interface**: Clean, modern design with smooth transitions and political party icons
- **Mobile Responsive**: Works on all device sizes with optimized container layouts
- **Fast Loading**: Static site with optimized performance
- **Automated Updates**: Claude AI integration for weekly content refreshes
- **Manual Content Updates**: Admin shortcuts for real-time content management
- **Sticky Headers**: Enhanced UX with improved detail page layouts

## Policy Categories

- 🛂 Immigration Policy
- 🇺🇸 Make America Healthy Again (MAHA)
- 💼 Trade & Tariffs
- ⚡ Energy Policy
- 📈 Economic Policy
- 🌍 Foreign Policy
- ⚖️ First Amendment Issues
- 🏛️ Judicial Policy
- 🎯 Potpourri (Miscellaneous Policies)
- 📋 Project 2025 (Implementation Tracker)

## Project Structure

```
trump-hierarchy/
├── index.html          # Main SPA with hierarchical policy navigation
├── vercel.json         # Vercel deployment config with cron jobs
├── package.json        # Node.js dependencies (Anthropic SDK, Vercel)
├── .gitignore         # Git ignore rules
├── README.md          # This file
├── API-SETUP.md        # API configuration documentation
└── api/               # Serverless functions for content management
    ├── update-content.js   # Manual content update endpoint
    └── cron-update.js      # Weekly automated content updates
```

## Development

### Local Development
```bash
# Install Vercel CLI
npm install -g vercel

# Run locally
vercel dev
```

### Deployment
```bash
# Deploy to production
vercel --prod
```

## Current Features

- [x] Claude API integration for automated content updates
- [x] Weekly automated content refresh via cron jobs
- [x] Manual content update endpoints with authentication
- [x] Political party visual indicators on policy spectrum
- [x] Responsive design with optimized container layouts
- [x] Sticky navigation headers for better UX
- [x] Project 2025 implementation tracker with progress dashboard
- [x] Russell Vought profile and Heritage Foundation connections

## Future Enhancements

- [ ] Real-time news feed integration
- [ ] User authentication and personalization
- [ ] Advanced search and filtering
- [ ] Data export capabilities
- [ ] Full admin panel for content management
- [ ] Policy timeline and historical tracking

## Domain Setup

Deployed at: `trump.riptonic.com`

### DNS Configuration (Squarespace)
- Type: CNAME
- Host: trump
- Points to: cname.vercel-dns.com

## Environment Variables

Required for automated content updates:
```bash
vercel env add CLAUDE_API_KEY          # Anthropic API key for content generation
vercel env add UPDATE_SECRET           # Auth token for manual content updates
vercel env add CRON_SECRET            # Auth token for cron job security
vercel env add VERCEL_URL             # Your deployment URL for API calls
```

## API Endpoints

### Manual Content Update
```bash
POST /api/update-content
Authorization: Bearer ${UPDATE_SECRET}
Content-Type: application/json

{
  "category": "immigration" // or "all" for bulk update
}
```

### Automated Weekly Updates
Configured via `vercel.json` cron job:
- **Schedule**: Every Sunday at 9 AM UTC
- **Endpoint**: `/api/cron-update`
- **Categories**: All policy categories updated automatically

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see LICENSE file for details