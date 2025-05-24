# EdTech Platform

A modern educational technology platform built with Next.js, TypeScript, and Tailwind CSS. This platform provides a comprehensive learning management system for students, teachers, and administrators.

## Features

- **Multi-role Authentication System**
  - Student, Teacher, School Admin, and System Admin roles
  - Secure login with password protection
  - Password recovery system
  - Role-based access control

- **Dashboard System**
  - Personalized dashboards for each user role
  - Student performance tracking
  - Course management
  - Analytics and reporting

- **Modern UI/UX**
  - Responsive design
  - Clean and intuitive interface
  - Dark/Light mode support
  - Accessible components

## Tech Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Hooks
- **Notifications**: React Hot Toast

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/behram40/EdTech.git
cd EdTech
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following variables:
```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Mock Data

The application currently uses mock data for demonstration purposes. The mock data includes:
- User profiles (students, teachers, administrators)
- Course information
- Performance metrics
- Analytics data

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   └── api/               # API routes
├── components/            # Reusable components
├── lib/                   # Utility functions
└── types/                # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- All contributors who have helped shape this project
