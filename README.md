# React Dashboard Authentication  Crypto App

A modern, full-stack React dashboard application with complete authentication system, built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- **Complete Authentication System**
  - User Registration with Email Verification
  - Secure Login/Logout
  - Password Reset via Email
  - JWT-based Authentication
  - Protected Routes

- **Modern Dashboard**
  - Responsive Design with Tailwind CSS
  - Interactive Components with Chakra UI
  - Real-time Data Display
  - Transaction Management
  - Support System

- **Backend API**
  - RESTful API with Express.js
  - MongoDB Database Integration
  - Email Service Integration
  - Input Validation with Joi
  - Secure Password Hashing

## 📸 Screenshots

### Sign In Page
![Sign In Page](./images/signin-page.png)
*Clean and modern sign-in interface with form validation*

### Dashboard Overview
![Dashboard](./images/dashboard.png)
*Main dashboard with analytics, portfolio overview, and recent transactions*

### Transaction Management
![Transactions](./images/transactions.png)
*Comprehensive transaction history and management interface*

### Support System
![Support](./images/support.png)
*User support and contact management system*

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Chakra UI** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Framer Motion** - Animation library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **Nodemailer** - Email service
- **Passport.js** - Authentication middleware

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd React-Dashboard-Authentication
```

### 2. Install Dependencies

#### Frontend (React App)
```bash
cd app
npm install
```

#### Backend (Node.js Server)
```bash
cd server
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `server` directory:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/dashboard-auth
# or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/database

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server
PORT=5000
NODE_ENV=development
```

### 4. Database Setup

Make sure MongoDB is running:
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env file
```

## 🏃‍♂️ Running the Application

### Development Mode

#### Start the Backend Server
```bash
cd server
npm run dev
```
The server will run on `http://localhost:5000`

#### Start the Frontend App
```bash
cd app
npm run dev
```
The React app will run on `http://localhost:5173`

### Production Mode

#### Build the Frontend
```bash
cd app
npm run build
```

#### Start the Backend
```bash
cd server
npm start
```

## 📱 Usage Guide

### 1. User Registration
1. Navigate to `/signup`
2. Fill in your details (name, email, password)
3. Check your email for verification link
4. Click the verification link to activate your account

### 2. User Login
1. Go to `/signin`
2. Enter your email and password
3. Click "Sign In" to access the dashboard

### 3. Dashboard Features
- **Overview**: View your portfolio summary and analytics
- **Transactions**: Manage and view transaction history
- **Support**: Access help and contact support

### 4. Password Reset
1. Go to `/forgot-password`
2. Enter your email address
3. Check your email for reset link
4. Follow the link to reset your password

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password
- `GET /api/auth/verify-email/:token` - Verify email

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `DELETE /api/user/account` - Delete user account

## 🎨 Customization

### Styling
The app uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Components in `src/components/`
- Global styles in `src/index.css`

### Theme
Chakra UI theme can be customized in `src/theme/index.js`

## 🧪 Testing

### Frontend Testing
```bash
cd app
npm run lint
```

### Backend Testing
```bash
cd server
npm test
```

## 📦 Deployment

### Frontend (Vercel/Netlify)
1. Build the app: `npm run build`
2. Deploy the `dist` folder to your hosting service

### Backend (Heroku/Railway)
1. Set environment variables in your hosting platform
2. Deploy the server directory
3. Ensure MongoDB connection is configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed description
3. Contact support through the app's support system

## 🙏 Acknowledgments

- React team for the amazing framework
- Chakra UI for beautiful components
- Tailwind CSS for utility-first styling
- Express.js community for robust backend tools

---

**Happy Coding! 🚀**
