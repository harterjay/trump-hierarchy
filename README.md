# Trump Policy Information Hub

A hierarchical web application providing multi-perspective analysis of Trump administration policies.

## Features

- **Hierarchical Navigation**: Browse from high-level categories down to detailed policy analysis
- **Multi-Perspective Analysis**: Conservative views, liberal critiques, and policy contradictions
- **Interactive Interface**: Clean, modern design with smooth transitions
- **Mobile Responsive**: Works on all device sizes
- **Fast Loading**: Static site with optimized performance

## Policy Categories

- 🛂 Immigration Policy
- 🇺🇸 Make America Healthy Again (MAHA)
- 💼 Trade & Tariffs
- ⚡ Energy Policy
- 📈 Economic Policy
- 🌍 Foreign Policy

## Project Structure

```
trump-hierarchy/
├── index.html          # Main application file
├── vercel.json         # Vercel deployment config
├── package.json        # Node.js dependencies
├── .gitignore         # Git ignore rules
├── README.md          # This file
└── api/               # Future API endpoints (Claude integration)
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

## Future Enhancements

- [ ] Claude API integration for automated content updates
- [ ] Real-time news feed integration
- [ ] User authentication and personalization
- [ ] Advanced search and filtering
- [ ] Data export capabilities
- [ ] Admin panel for content management

## Domain Setup

Deployed at: `trump.riptonic.com`

### DNS Configuration (Squarespace)
- Type: CNAME
- Host: trump
- Points to: cname.vercel-dns.com

## Environment Variables

For Claude API integration:
```bash
vercel env add CLAUDE_API_KEY
vercel env add CLAUDE_API_URL
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see LICENSE file for details