# FinTrack

A modern, fast, and responsive web-based personal finance tracker built with **React**, **Vite**, and **Tailwind CSS**.

---

## 🚀 Tech Stack

- **React** – Component-driven UI library for building interactive user interfaces
- **Vite** – Next-generation build tool with instant Hot Module Replacement (HMR)
- **Tailwind CSS** – Utility-first CSS framework for rapid UI development
- **ESLint** – Code linting for quality and consistency

---

## 📦 Installation & Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### 1. Clone the repository

```bash
git clone https://github.com/rishavbarman-dev/FinTrack.git
cd fintrack
cd frontend
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Visit your application at:

```
http://localhost:5173
```

---

## 🏗️ Building for Production

### Build the application

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

The built files will be in the `dist/` directory, ready for deployment.

---

## 📂 Project Structure

```
fintrack/
 ├──frontend
    ├── public/              # Static assets
    ├── src/                 # Source code
    │   ├── assets/         # Images, fonts, etc.
    │   ├── components/     # React components
    │   ├── App.jsx         # Main App component
    │   └── main.jsx        # Application entry point
    ├── index.html          # HTML template
    ├── package.json        # Dependencies and scripts
    ├── vite.config.js      # Vite configuration
    ├── tailwind.config.js  # Tailwind CSS configuration
    └── README.md           # This file

├── backend
    ├── config
    │   ├── db.js
    ├── controllers
    │   ├── authController.js
    │   ├── dashboardController.js
    │   ├── expenseController.js
    │   └── incomeController.js
    ├── middleware
    │   ├── authMiddleware.js
    ├── models
    │   ├── Expense.js
    │   ├── Income.js
    │   ├── User.js
    ├── package-lock.json
    ├── package.json
    ├── routes
    │   ├── authRoutes.js
    │   ├── dashboardRoutes.js
    │   ├── expenseRoutes.js
    │   └── incomeRoutes.js
    ├── server.js
    └── utils
```
---

## 🧹 Code Quality

### Run ESLint checks

```bash
npm run lint
```

### Fix linting issues automatically

```bash
npm run lint:fix
```

---

## 📝 Available Scripts

| Script            | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint checks        |

---

## 🔧 Configuration

### Tailwind CSS

- Configuration: `tailwind.config.js`
- Custom styles: `src/index.css`

### Vite

- Configuration: `vite.config.js`
- Hot Module Replacement enabled by default

### ESLint

- Configuration: `.eslintrc.js` or `eslint.config.js`
- Rules for React and modern JavaScript

---

## 🚀 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `dist/` folder to Netlify

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

### Development Guidelines

- Follow the existing code style
- Run `npm run lint` before committing
- Update documentation for new features
- Write meaningful commit messages

---

## 🔮 Future Enhancements

- [ ] Convert project to TypeScript for better type safety
- [ ] Add comprehensive automated testing suite
- [ ] Implement Progressive Web App (PWA) features
- [ ] Add internationalization (i18n) support
- [ ] Performance optimization and code splitting

---

## 📞 Support

For questions, issues, or contributions:

- Email:rishavbarman.dev@gmail.com
- Contact the development team

---

**Developed for FinTrack** – Fast, modern, and scalable personal finance solutions.

---

## 🌟 Acknowledgments

- React team for the amazing framework
- Vite team for the lightning-fast build tool
- Tailwind CSS for the utility-first approach
