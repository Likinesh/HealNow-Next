# 🏥 Doctors Appointment Platform

A **full-stack doctors appointment and tele-health platform** built using modern web technologies such as **Next.js**, **Tailwind CSS**, **Prisma**, and **Vonage API**.  
This platform allows patients to book appointments with doctors, manage schedules, and join **video consultations** seamlessly.

---

## 🌟 Features

### 👩‍⚕️ User Features
- Role-based access for **patients** and **doctors**
- Browse available doctors and their specialties
- Schedule, reschedule, or cancel appointments
- Join **secure video consultations** directly from the app
- Receive appointment confirmation and reminders

### ⚙️ Technical Features
- Real-time video/audio calling via **Vonage Video API**
- **Next.js 13+ App Router** for SSR and optimized routing
- **Prisma ORM** for type-safe database access
- **Tailwind CSS** + **shadcn/ui** for modern and responsive UI
- Authentication & Authorization (JWT / NextAuth)
- Fully modular and scalable architecture
- RESTful API integration for backend services

---

## 🛠️ Tech Stack
-----------------------------------------------------------------------------------------------------
| Layer                     | Technology                                                            |
|:--------------------------|:----------------------------------------------------------------------|
| Frontend Framework        | [Next.js](https://nextjs.org/)                                        |
| UI Components             | [shadcn/ui](https://ui.shadcn.com/)                                   |
| Styling                   | [Tailwind CSS](https://tailwindcss.com/)                              |
| Database ORM              | [Prisma](https://www.prisma.io/)                                      |
| Video/Audio Communication | [Vonage Video API](https://www.vonage.com/communications-apis/video/) |
| Deployment                | [Vercel](https://vercel.com/) or Node.js server                       |
| Language                  | JavaScript                                                            |
-----------------------------------------------------------------------------------------------------
---

## 📁 Project Structure

``` 
doctors-appointment-platform/
│
├── app/ # Next.js app router pages and layouts
├── components/ # Reusable UI components
├── hooks/ # Custom React hooks
├── lib/ # Helper and utility functions
├── prisma/ # Prisma schema and migrations
├── public/ # Static assets
├── styles/ # Global styles
└── package.json # Dependencies and scripts
```
---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Likinesh/HealNow-Next.git
cd HealNow-Next
```

2️⃣ Install dependencies
```bash
npm install
# or
yarn install
```

3️⃣ Configure environment variables

Create a .env.local file in the project root:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/yourdb"
VONAGE_API_KEY="your_vonage_api_key"
NEXT_PUBLIC_VONAGE_APPLICATION_ID="your_vonage_app_id"
VONAGE_PRIVATE_KEY="your_vonage_private_key"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```
4️⃣ Run Prisma migrations
```bash
npx prisma migrate dev --name init
```
5️⃣ Start the development server
```bash
npm run dev
```
# Visit http://localhost:3000

🚀 Deployment
You can deploy this app easily using Vercel or any Node.js hosting platform.

```bash
npm run build
npm run start
```

Make sure your environment variables are properly configured on the hosting platform.

## 🌍 Live Demo
[https://heal-now-next.vercel.app](https://heal-now-next.vercel.app)
