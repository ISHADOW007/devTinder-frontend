# 🚀 devTinder Frontend

This frontend is part of the **devTinder** MERN‑stack platform—a developer-focused networking app where devs can create profiles, browse others, send connection requests, and build meaningful developer relationships.

---

## 📌 Overview

Built with **React**, **Vite**, **Redux Toolkit**, and **Tailwind CSS**, devTinder provides a polished, responsive interface that communicates with the backend via JWT authentication and secure API calls.

---

## 🧩 Tech Stack

- **Framework**: React with Vite  
- **Styling**: Tailwind CSS (possibly with DaisyUI)  
- **State Management**: Redux Toolkit  
- **HTTP**: Axios for API requests  
- **Auth**: JWT stored in HTTP-only cookies  
- **Routing**: React Router DOM  
- **Build Tools**: Vite, PostCSS  

---

## ⚙️ Features

- **User Authentication**: Sign-up and login with secure token handling  
- **Profile Management**: Create & edit profile details and skills  
- **Developer Feed**: Browse other developer profiles via paginated feed  
- **Connection Requests**: Send interest or ignore profiles; accept or reject incoming requests  
- **Protected Routes**: Redirect unauthorized users to login  
- **Responsive UI**: Compatible across desktop and mobile devices  

---

## 🧱 Project Structure

```
src/
├── components/      # Reusable UI components (cards, modals, etc.)
├── pages/           # Route-based pages (Login, Feed, Profile, Connections, Requests)
├── store/           # Redux Toolkit slices and store configuration
├── services/        # Axios API modules (auth, profile, feed, notifications)
├── routes/          # Client‑side routing setup
├── utils/           # Helper functions (constants, formatters, etc.)
├── App.jsx
└── main.jsx         # Vite entry point
public/
├── index.html
└── assets/          # Images/logos/static files
```

---

## 🛠️ Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/ISHADOW007/devTinder-frontend.git
cd devTinder-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file at the root:

```
VITE_API_BASE_URL=http://localhost:7777/api
```

### 4. Run in Development
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

---

## ⚡ Usage Flow

1. Start backend server (e.g. on `http://localhost:7777`).
2. Open the frontend in your browser (`npm run dev`).
3. Register or log in.
4. Build or edit your profile.
5. Browse feed to connect with other developers.
6. Manage incoming/outgoing connection requests via your dashboard.

---

## 🌐 Deployment

For example, to deploy on AWS EC2 + Nginx:

- Build the project (`npm run build`)
- Serve the `dist/` folder via Nginx
- Configure routing and proxy for the backend under `/api` path
- Ensure CORS is handled in backend and `withCredentials` is true in Axios for JWT-cookie flow

---

## 📎 API Endpoints

Frontend interacts with your backend through RESTful API endpoints like:

| Feature         | Endpoint                               |
|----------------|----------------------------------------|
| Signup / Login | `POST /auth/signup`, `POST /auth/login` |
| Logout         | `POST /auth/logout`                    |
| Fetch Feed     | `GET /user/feed?page=&limit=`         |
| Profile View/Edit | `GET /profile/view`, `PATCH /profile/edit`, `PATCH /profile/password` |
| Requests       | `POST /request/send/:status/:toUserId`, `POST /request/review/:status/:requestId` |
| Connections    | `GET /user/connections`, `GET /user/requests/received` |

Ensure your backend server supports these routes.

---

## 🛡️ Security & UX Details

- Protects routes when no JWT token is present
- Automatically handles token refresh or redirects on authentication failure
- Axios is configured with `withCredentials: true` to pass cookies
- Form validation and feedback via toast notifications  
- Error handling for API failures to enhance user experience

---

## 💡 Future Enhancements

- Add profile picture uploads (e.g. Cloudinary integration)  
- Integrate real-time updates (Socket.IO for live chat or connections)  
- Write E2E tests using tools like Cypress or Playwright  
- Implement accessible UI components and adhere to ARIA standards  
- Add CI/CD pipeline and auto–deployment workflows  

---

## 📢 Contributing

Contributions are welcome! If you'd like to help:

1. Fork the repository  
2. Create a branch (`feature/your-feature`)  
3. Make your changes and commit (`git commit -m "Add new feature"`)  
4. Push to your branch and open a pull request  

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🧑‍💻 Maintainer

Built with ❤️ by [ISHADOW007](https://github.com/ISHADOW007)