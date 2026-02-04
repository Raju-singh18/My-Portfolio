# 🚀 MERN Stack Portfolio Website with Admin Panel

A modern, responsive portfolio website built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Bootstrap. Features a comprehensive admin panel for content management and a professional frontend showcase.

## ✨ NEW PROFESSIONAL FEATURES

### 🌟 Enhanced Frontend Features
- **Skills Management** - Dynamic skills showcase with proficiency levels and categories
- **Experience Timeline** - Professional experience, education, and certifications display
- **Blog System** - Full-featured blog with categories, tags, and search functionality
- **Enhanced About Section** - Dynamic profile management with social links and resume download
- **Analytics Tracking** - User interaction tracking and analytics
- **Professional UI** - Enhanced design with Font Awesome icons and better UX
- **Search & Filter** - Advanced filtering for projects and blog posts
- **SEO Optimization** - Meta tags, structured data, and optimized performance

### 🔧 Enhanced Admin Panel Features
- **Analytics Dashboard** - Comprehensive analytics with charts and insights
- **Skills Management** - Add, edit, and organize technical skills
- **Experience Management** - Manage work experience, education, and certifications
- **Blog Management** - Create, edit, and publish blog posts with rich content
- **Profile Management** - Update personal information, social links, and resume
- **File Upload System** - Upload images and documents with validation
- **Enhanced Navigation** - Improved admin interface with better organization

### 🛠️ Enhanced Technical Features
- **File Upload** - Image and document upload with multer integration
- **Analytics System** - Track page views, project views, and user interactions
- **Email Notifications** - Contact form notifications (configurable)
- **Environment Configuration** - Proper environment variable management
- **API Optimization** - Structured API endpoints with better error handling
- **Security Enhancements** - Input validation, file type restrictions
- **Performance Optimization** - Lazy loading, code splitting, and caching

## 🏗️ Tech Stack

### Frontend
- **React.js** - Frontend framework with hooks and context
- **Bootstrap 5** - CSS framework for responsive design
- **React Router** - Client-side routing with lazy loading
- **Axios** - HTTP client with interceptors
- **Font Awesome** - Professional icons and UI elements

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework with middleware
- **MongoDB** - NoSQL database with Mongoose ODM
- **Multer** - File upload handling
- **JWT** - Authentication and authorization
- **Bcrypt** - Password hashing
- **Nodemailer** - Email notifications

### Additional Tools
- **Analytics** - Custom analytics tracking system
- **File Management** - Image and document upload system
- **SEO** - Meta tags and structured data
- **Validation** - Input validation and sanitization

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd portfolio-website
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

4. **Environment Setup**

Create `.env` file in the server directory:
```bash
cd ../server
cp .env.example .env
```

Update the `.env` file with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

5. **Start the development servers**

Terminal 1 (Server):
```bash
cd server
npm run dev
```

Terminal 2 (Client):
```bash
cd client
npm run dev
```

6. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:5173/admin/login

## 📋 Initial Setup

### Create Admin User
1. Register the first admin user at `/admin/login`
2. Use the registration form to create your admin account
3. Login with your credentials

### Configure Your Profile
1. Go to Admin Dashboard
2. Add your skills, experience, and profile information
3. Upload your resume and profile image
4. Configure social media links

### Add Content
1. **Projects**: Add your portfolio projects with images and descriptions
2. **Skills**: Add your technical skills with proficiency levels
3. **Experience**: Add work experience, education, and certifications
4. **Blog Posts**: Create blog posts to showcase your knowledge

## 🎯 Key Features Usage

### Skills Management
- Organize skills by categories (Frontend, Backend, Database, etc.)
- Set proficiency levels (1-100%)
- Add Font Awesome icons for visual appeal
- Control visibility and ordering

### Experience Timeline
- Add work experience with achievements
- Include education and certifications
- Support for current positions
- Technology tags for each role

### Blog System
- Rich text content with markdown support
- Categories and tags for organization
- SEO-friendly URLs with slugs
- View tracking and analytics

### Analytics Dashboard
- Track page views and user interactions
- Monitor popular projects and blog posts
- View daily traffic trends
- Export analytics data

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/profile` - Get public profile
- `GET /api/projects` - Get all projects
- `GET /api/skills/grouped` - Get skills by category
- `GET /api/experience/grouped` - Get experience by type
- `GET /api/blog` - Get published blog posts
- `POST /api/contact` - Submit contact form
- `POST /api/analytics/track` - Track user events

### Admin Endpoints (Protected)
- `GET /api/analytics/dashboard` - Get analytics data
- `POST /api/skills` - Create skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill
- `POST /api/experience` - Create experience
- `POST /api/blog` - Create blog post
- `POST /api/upload/single` - Upload file

## 🎨 Customization

### Styling
- Modify Bootstrap variables in `client/src/App.css`
- Add custom CSS classes for unique styling
- Update color scheme and typography

### Content
- Update profile information in the admin panel
- Customize section titles and descriptions
- Add your own images and content

### Features
- Enable/disable sections by modifying components
- Add new skill categories or experience types
- Customize analytics tracking events

## 📱 Responsive Design
- Mobile-first approach with Bootstrap
- Optimized for all screen sizes
- Touch-friendly navigation and interactions
- Fast loading with optimized images

## 🔒 Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- File upload restrictions
- CORS protection
- Rate limiting (configurable)

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the client: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables

### Backend (Heroku/Railway)
1. Set up MongoDB Atlas
2. Configure environment variables
3. Deploy server code
4. Update client API URLs

## 📊 Analytics & SEO
- Google Analytics integration ready
- SEO-optimized meta tags
- Structured data for better search visibility
- Social media sharing optimization
- Performance monitoring

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License
This project is licensed under the MIT License.

## 🆘 Support
For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code examples

---

**Built with ❤️ using the MERN Stack**
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Validator** - For Validation

## 📁 Project Structure

```
portfolio-website/
├── client/                     # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── ProjectCard.js
│   │   │   └── ContactForm.js
│   │   ├── pages/              # Page components
│   │   │   ├── Home.js
│   │   │   ├── Projects.js
│   │   │   ├── Contact.js
│   │   │   └── AdminDashboard.js
│   │   ├── context/            # React context
│   │   │   └── AuthContext.js
│   │   ├── utils/              # Utility functions
│   │   │   └── api.js
│   │   ├── styles/             # CSS files
│   │   │   └── custom.css
│   │   └── App.js
│   ├── package.json
│   └── README.md
├── server/                     # Node.js backend
│   ├── models/                 # Database models
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Contact.js
│   ├── routes/                 # API routes
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── contact.js
│   ├── middleware/             # Custom middleware
│   │   ├── auth.js
│   │   └── upload.js
│   ├── utils/                  # Utility functions
│   │   └── email.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── uploads/                    # Uploaded files
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ankitjhagithub21/mern-portfolio.git
   cd portfolio-website
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the server directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/portfolio
   
   # JWT Secret
   JWT_SECRET=your_super_secret_jwt_key_here
   
   # Server Configuration  
   PORT=5000
 


6. **Start the application**
   
   **Backend (Terminal 1):**
   ```bash
   cd server
   npm run dev
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd client
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Admin Panel: http://localhost:5173/admin/dashboard

## 📱 Usage

### For Visitors
1. Browse the portfolio showcase
2. View project details and live demos
3. Download resume/CV
4. Submit contact form for inquiries

### For Admin
1. Login at `/admin/login` with your credentials
2. Manage projects (add, edit, delete)
3. View and respond to contact messages
4. Update personal information and skills


## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b your-branch-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin your-branch-name`)
5. Open a Pull Request

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Create admin account
- `GET /api/auth/user` - Get User

### Project Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project By Id (auth required)
- `POST /api/projects` - Create project (auth required)
- `PUT /api/projects/:id` - Update project (auth required)
- `DELETE /api/projects/:id` - Delete project (auth required)

### Contact Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (auth required)
- `PUT /api/contact/:id/read` - Mark message as read (auth required)







