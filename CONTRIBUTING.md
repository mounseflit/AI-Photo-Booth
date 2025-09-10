# Contributing to AI Magical Photo Booth

First off, thank you for considering contributing to AI Magical Photo Booth! 🎉

## How Can You Contribute?

### 🐛 Reporting Bugs
- Use the [issue tracker](https://github.com/mounseflit/AI-Photo-Booth/issues)
- Search existing issues first to avoid duplicates
- Include as much detail as possible:
  - Steps to reproduce
  - Expected vs actual behavior
  - Browser and OS information
  - Screenshots if applicable

### ✨ Suggesting Features
- Open an issue with the "enhancement" label
- Clearly describe the feature and its benefits
- Explain your use case
- Consider if it fits the project's scope

### 💻 Code Contributions

#### Development Setup
```bash
# Fork and clone the repository
git clone https://github.com/yourusername/AI-Photo-Booth.git
cd AI-Photo-Booth

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Add your API keys to .env
# Start development server
npm run dev
```

#### Pull Request Process
1. **Fork** the repository
2. **Create a feature branch** from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Test your changes thoroughly
4. **Commit** with clear, descriptive messages
   ```bash
   git commit -m "Add: new transformation style for anime characters"
   ```
5. **Push** to your fork and create a Pull Request
6. **Describe** your changes in the PR description

#### Code Style Guidelines
- Use meaningful variable and function names
- Add JSDoc comments for new functions
- Follow existing indentation (2 spaces)
- Keep functions small and focused
- Handle errors appropriately

#### Testing Your Changes
- Test the camera functionality
- Try different transformation prompts
- Verify email functionality (if configured)
- Test on different browsers
- Check mobile responsiveness

### 🎨 Design Contributions
- UI/UX improvements
- Icon and graphic designs
- CSS animations and transitions
- Mobile-first responsive design

### 📖 Documentation
- Improve README sections
- Add API documentation
- Create tutorials and guides
- Fix typos and grammar

## Development Notes

### Project Structure
```
├── server.js          # Main server file
├── public/            # Frontend files
│   ├── index.html     # Main HTML
│   ├── css/           # Stylesheets
│   └── js/            # Client-side JavaScript
├── package.json       # Dependencies and scripts
└── README.md          # Project documentation
```

### Key Technologies
- **Backend**: Node.js, Express
- **Frontend**: Vanilla HTML/CSS/JS
- **AI Providers**: Runware, fal.ai, Google Imagen
- **Email**: Nodemailer

### Common Development Tasks

#### Adding a New AI Provider
1. Add provider configuration to server.js
2. Create provider-specific transformation function
3. Add new API endpoint
4. Update environment variables documentation
5. Test integration thoroughly

#### Improving UI/UX
1. Modify files in the `public/` directory
2. Test across different devices and browsers
3. Ensure accessibility standards
4. Maintain consistent design language

#### Bug Fixes
1. Reproduce the issue locally
2. Identify the root cause
3. Implement the minimal fix
4. Test to ensure no regression
5. Document the fix in commit message

## Getting Help

- 💬 **Discord**: [Join our community](https://discord.gg/example)
- 📧 **Email**: [Contact maintainers](mailto:support@example.com)
- 🐛 **Issues**: Use GitHub issues for technical problems
- 📖 **Documentation**: Check README for setup help

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help newcomers learn and contribute
- Focus on what's best for the community
- Show empathy towards other contributors

## Recognition

Contributors will be:
- Listed in our contributors section
- Acknowledged in release notes
- Invited to our contributors' Discord channel

Thank you for helping make AI Magical Photo Booth better for everyone! 🚀