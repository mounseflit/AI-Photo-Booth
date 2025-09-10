# ✨ AI Magical Photo Booth

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Express](https://img.shields.io/badge/Express-5.1+-orange.svg)
![AI](https://img.shields.io/badge/AI-Powered-purple.svg)

**Transform yourself into any character with the magic of AI! 🎭**

*Capture a photo, choose your transformation, and watch the AI work its magic in seconds.*

[🚀 Quick Start](#quick-start) • [📸 Features](#features) • [🛠️ API](#api-endpoints) • [🤝 Contributing](#contributing)

</div>

---

## 🌟 What is AI Magical Photo Booth?

AI Magical Photo Booth is a revolutionary web application that transforms your photos using cutting-edge AI technology. Simply take a photo with your camera or upload one, describe how you want to look, and watch as artificial intelligence creates stunning transformations while preserving your facial features and expression.

### ✨ Key Features

- **🎭 Character Transformation**: Become a superhero, fantasy character, historical figure, or anything you can imagine
- **📱 Live Camera Integration**: Take photos directly in your browser with real-time preview
- **🎨 Multiple AI Providers**: Powered by Runware, fal.ai FLUX, and Google Imagen for best results
- **📧 Email Sharing**: Send your transformations directly via email with beautiful formatting
- **⚡ Real-time Processing**: Fast AI generation with automatic fallback systems
- **🔒 Privacy First**: No photos stored on servers - processed and delivered instantly

### 🎯 Perfect For

- **Content Creators** - Generate unique profile pictures and avatars
- **Social Media** - Create engaging posts and stories
- **Gaming** - Design custom character representations
- **Fun & Entertainment** - Share laughs with friends and family
- **Creative Projects** - Prototype character designs and concepts

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **AI Provider API Keys** - Get your keys from:
  - [Runware](https://runware.ai/) (Primary - recommended)
  - [fal.ai](https://fal.ai/) (Fallback)
  - [Google AI Studio](https://aistudio.google.com/) (Alternative)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mounseflit/AI-Photo-Booth.git
   cd AI-Photo-Booth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Required: Primary AI Provider
   RUNWARE_API_KEY=sk_live_your_runware_key_here
   
   # Optional: Fallback Providers
   FAL_API_KEY=fal_xxx_your_key_here
   GEMINI_API_KEY=your_google_gemini_key_here
   
   # Optional: Image Hosting (for sharing)
   IMGBB_API_KEY=your_imgbb_key_here
   
   # Optional: Email Features
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   SMTP_FROM="AI Photo Booth <noreply@yourdomain.com>"
   ```

4. **Start the application**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000` and start transforming! 🎉

---

## 📸 How It Works

1. **📷 Capture or Upload** - Use your camera or select an existing photo
2. **✍️ Describe Your Vision** - Type what you want to become (e.g., "a medieval knight")
3. **🤖 AI Magic** - Watch as AI transforms your photo while keeping your face
4. **📱 Share & Save** - Download your creation or email it to friends

### 🎨 Transformation Examples

- "a superhero with a cape and mask"
- "a Victorian-era aristocrat"
- "a space astronaut in a futuristic suit"
- "a fantasy elf with pointed ears"
- "a 1920s jazz musician"

---

## 🛠️ API Endpoints

### Health Check
```http
GET /api/health
```
Returns the status of all configured AI providers and services.

### Face Transformation
```http
POST /api/transform/runware
POST /api/transform/fal
POST /api/transform/google
```

**Request Body:**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA...",
  "prompt": "transform me into a superhero"
}
```

**Response:**
```json
{
  "success": true,
  "image_url": "https://...",
  "prompt_used": "enhanced prompt with technical details",
  "provider": "runware"
}
```

### Email Sharing
```http
POST /api/send-email
```

**Request Body:**
```json
{
  "to": "friend@example.com",
  "imageUrl": "base64_image_data"
}
```

---

## 🔧 Configuration

### AI Providers

The application supports multiple AI providers with automatic fallback:

1. **Runware (Primary)** - High-quality, fast processing
   - Model: `runware:97@1`
   - Best for: Photo-realistic transformations
   
2. **fal.ai FLUX (Fallback)** - Alternative processing
   - Model: `flux-pro/kontext`
   - Best for: Creative and artistic styles
   
3. **Google Imagen (Alternative)** - Google's AI technology
   - Model: `gemini-2.5-flash-image-preview`
   - Best for: Experimental features

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `RUNWARE_API_KEY` | Yes | Primary AI provider API key |
| `FAL_API_KEY` | No | Fallback AI provider API key |
| `GEMINI_API_KEY` | No | Google Imagen API key |
| `IMGBB_API_KEY` | No | Image hosting service key |
| `SMTP_*` | No | Email configuration for sharing |

---

## 🚀 Deployment

### Vercel (Recommended)
1. Fork this repository
2. Connect to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Railway
1. Click "Deploy on Railway"
2. Connect your GitHub account
3. Set environment variables
4. Deploy automatically

### Docker
```bash
docker build -t ai-photo-booth .
docker run -p 3000:3000 --env-file .env ai-photo-booth
```

### Traditional Hosting
```bash
npm run build
npm start
```

---

## 🤝 Contributing

We love contributions! Here's how you can help make AI Magical Photo Booth even better:

### 🐛 Bug Reports
- Use the [issue tracker](https://github.com/mounseflit/AI-Photo-Booth/issues)
- Include steps to reproduce
- Mention your browser and OS

### ✨ Feature Requests
- Open an issue with the "enhancement" label
- Describe your use case
- Explain how it would help users

### 💻 Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages
6. Push and create a Pull Request

### 📝 Development Setup
```bash
git clone https://github.com/mounseflit/AI-Photo-Booth.git
cd AI-Photo-Booth
npm install
cp .env.example .env  # Add your API keys
npm run dev
```

---

## 🔒 Privacy & Security

- **No Storage**: Photos are processed in real-time and not stored on our servers
- **API Security**: All AI provider communications are encrypted
- **Local Processing**: Camera access happens entirely in your browser
- **Email Privacy**: Email addresses are not stored or shared

---

## 🐛 Troubleshooting

### Common Issues

**"No AI provider configured"**
- Make sure you have at least one API key set in your `.env` file
- Verify your API key is valid and has sufficient credits

**"Camera not working"**
- Ensure you're using HTTPS (required for camera access)
- Check browser permissions for camera access
- Try a different browser (Chrome/Firefox recommended)

**"Transformation failed"**
- Check your internet connection
- Verify your image is under 10MB
- Try a different transformation prompt

**"Email not sending"**
- Verify SMTP configuration in `.env`
- Check if your email provider requires app-specific passwords
- Ensure "Less secure app access" is enabled (Gmail)

### Support

- 📧 **Email**: [Support](mailto:support@example.com)
- 💬 **Discord**: [Join our community](https://discord.gg/example)
- 📖 **Documentation**: [Full API docs](https://docs.example.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/mounseflit/AI-Photo-Booth/issues)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **AI Providers**: Thanks to Runware, fal.ai, and Google for their amazing AI APIs
- **Open Source**: Built with love using Node.js, Express, and modern web technologies
- **Community**: Special thanks to all contributors and users who make this project better

---

<div align="center">

**Made with ❤️ by the AI Magical Photo Booth Team**

[⭐ Star us on GitHub](https://github.com/mounseflit/AI-Photo-Booth) • [🐦 Follow on Twitter](https://twitter.com/example) • [🌐 Visit Website](https://example.com)

</div>