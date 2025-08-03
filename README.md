# Portfolio Website - React & TailwindCSS

A modern, responsive portfolio website built with React and TailwindCSS. Showcases projects, skills, and provides a professional online presence for web developers.

![Portfolio Preview](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjM0I4MkY2Ii8+Cjx0ZXh0IHg9IjQwMCIgeT0iMjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI0MCIgZm9udC1mYW1pbHk9IkFyaWFsIj5QT1JURk9MSU8gUFJFVklFVzwvdGV4dD4KPHN2Zz4=)

## 🚀 Features

- **Modern Design**: Clean, minimalist design with smooth animations
- **Fully Responsive**: Works perfectly on all devices and screen sizes
- **Fast Performance**: Optimized images and code splitting
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Contact Form**: Working contact form with EmailJS integration
- **Project Showcase**: Detailed project pages with galleries
- **Skills Display**: Interactive skills section with progress bars
- **Dark/Light Mode**: (Optional - can be implemented)

## 🛠️ Tech Stack

- **Frontend**: React 19.x
- **Styling**: TailwindCSS 3.4.0
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Forms**: EmailJS for contact functionality
- **Notifications**: React Toastify
- **Build Tool**: Create React App

## 📁 Project Structure

```
portfolio-website/
├── public/
│   ├── images/           # Static images
│   │   ├── profile.jpg
│   │   ├── projects/     # Project screenshots
│   │   └── skills/       # Skill icons
│   ├── files/           # Documents (resume, etc.)
│   └── index.html
├── src/
│   ├── components/
│   │   ├── layout/       # Header, Footer
│   │   ├── sections/     # Hero, About, Skills, etc.
│   │   ├── ui/          # Reusable components
│   │   └── forms/       # Contact form
│   ├── data/            # JSON data files
│   │   ├── profile.json
│   │   ├── skills.json
│   │   ├── projects.json
│   │   └── social.json
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Helper functions
│   ├── pages/           # Page components
│   ├── App.js
│   └── index.js
├── package.json
├── tailwind.config.js
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3001
   ```

## ⚙️ Configuration

### 1. Personal Information

Edit the JSON files in `src/data/` to customize your information:

- `profile.json` - Personal details, bio, contact info
- `skills.json` - Technical skills and proficiency levels
- `projects.json` - Portfolio projects with descriptions
- `social.json` - Social media links and contact details

### 2. EmailJS Setup

To enable the contact form, follow the detailed guide in `EMAILJS_SETUP.md` or:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Create a `.env` file in the project root:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

**Note**: The contact form will work without setup but won't send emails.

### 3. Images

Add your images to the `public/images/` directory:

- `profile.jpg` - Your profile photo
- `projects/` - Project screenshots
- `skills/` - Technology icons (optional)

### 4. Colors & Styling

Customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your brand colors
      }
    }
  }
}
```

## 📱 Responsive Design

The website is built with a mobile-first approach and includes breakpoints for:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎨 Customization

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Import and add it to `src/pages/HomePage.js`
3. Add navigation link in `src/components/layout/Header.js`

### Adding New Projects

Add project data to `src/data/projects.json`:

```json
{
  "id": 1,
  "title": "Project Name",
  "description": "Short description",
  "longDescription": "Detailed description",
  "techStack": ["React", "Node.js"],
  "features": ["Feature 1", "Feature 2"],
  "images": {
    "thumbnail": "/images/projects/thumb.jpg",
    "gallery": ["/images/projects/1.jpg"]
  },
  "links": {
    "demo": "https://demo.com",
    "github": "https://github.com/user/repo"
  },
  "status": "Completed",
  "date": "2024-01-01",
  "client": "Client Name",
  "duration": "2 months",
  "featured": true
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Netlify

1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Configure redirects for React Router

### Other Platforms

The website can be deployed to any static hosting service:
- GitHub Pages
- AWS S3
- Firebase Hosting
- Surge.sh

## 📊 Performance

- **Lighthouse Score**: 95+ on all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run analyze` - Analyze bundle size
- `npm run preview` - Preview production build

## 🐛 Troubleshooting

### Common Issues

1. **TailwindCSS not working**: Ensure `tailwind.config.js` is properly configured
2. **Images not loading**: Check file paths and ensure images are in `public/images/`
3. **Contact form not working**: Verify EmailJS configuration
4. **Routing issues**: Ensure proper deployment configuration for SPA

### Getting Help

- Check the [Issues](https://github.com/yourusername/portfolio-website/issues) page
- Create a new issue if you find a bug
- Contact: Set up your EmailJS account to enable the contact form
- Check the [EMAILJS_SETUP.md](EMAILJS_SETUP.md) for detailed instructions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Library
- [TailwindCSS](https://tailwindcss.com/) - CSS Framework
- [Lucide](https://lucide.dev/) - Icon Library
- [EmailJS](https://www.emailjs.com/) - Email Service
- [Create React App](https://create-react-app.dev/) - Build Tool

---

**⭐ If you like this project, please give it a star on GitHub! ⭐**

Made with ❤️ by [Your Name](https://github.com/yourusername)
