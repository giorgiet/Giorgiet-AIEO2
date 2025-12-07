# GiftWizard Frontend

A modern Next.js application for the GiftWizard gift recommendation system, built with TypeScript, Tailwind CSS, and Radix UI components.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** or **pnpm**

## Getting Started

### 1. Navigate to the Frontend Directory

From the project root directory:

```bash
cd frontend-giftwizard
```

### 2. Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install all dependencies listed in `package.json`, including:
- Next.js 16.0.7
- React 19.2.0
- TypeScript
- Tailwind CSS
- Radix UI components
- And other required packages

### 3. Start the Development Server

Run the development server:

```bash
npm run dev
```

The application will start and be available at:
- **Local**: [http://localhost:3000](http://localhost:3000)
- The page will automatically reload when you make changes to the code

## Available Scripts

The following scripts are available in `package.json`:

### Development

```bash
npm run dev
```
Starts the Next.js development server with hot-reload enabled. The server will automatically restart when you make code changes.

### Production Build

```bash
npm run build
```
Creates an optimized production build of the application. This compiles TypeScript, optimizes assets, and prepares the app for deployment.

### Start Production Server

```bash
npm start
```
Starts the production server. **Note**: You must run `npm run build` first before using this command.

### Linting

```bash
npm run lint
```
Runs ESLint to check for code quality issues and potential bugs.

## Project Structure

```
frontend-giftwizard/
├── app/                    # Next.js App Router directory
│   ├── page.tsx           # Main home page
│   ├── layout.tsx         # Root layout component
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── gift-wizard.tsx    # Main GiftWizard component
│   ├── gift-results.tsx   # Gift results display component
│   ├── wizard-step.tsx    # Individual wizard step component
│   └── ui/               # Reusable UI components (shadcn/ui)
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       └── progress.tsx
├── lib/                   # Utility functions
│   └── utils.ts          # Helper functions (e.g., cn for className merging)
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── next.config.ts        # Next.js configuration
└── tailwind.config       # Tailwind CSS configuration
```

## Features

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Radix UI** components for accessible UI primitives
- **React Hook Form** for form management
- **Zod** for schema validation
- **Responsive Design** - Works on desktop and mobile devices

## Development Tips

### Hot Reload
The development server automatically reloads when you:
- Modify files in the `app/` directory
- Change components in the `components/` directory
- Update styles or configuration files

### TypeScript
The project uses TypeScript. If you encounter type errors:
- Check the TypeScript compiler output in your terminal
- Ensure all imports are correctly typed
- Use the TypeScript language server in your IDE for better error detection

### Styling
- Uses Tailwind CSS utility classes
- Custom styles can be added to `app/globals.css`
- Component-specific styles can use Tailwind's `@apply` directive

## Building for Production

To create a production build:

```bash
# Build the application
npm run build

# Start the production server
npm start
```

The production build will be optimized and minified for best performance.

## Troubleshooting

### Port 3000 Already in Use

If port 3000 is already in use, Next.js will automatically try the next available port (3001, 3002, etc.). You can also specify a custom port:

```bash
npm run dev -- -p 3001
```

### Module Not Found Errors

If you encounter module not found errors:

```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

**On Windows (PowerShell):**
```powershell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

### TypeScript Errors

If you see TypeScript compilation errors:
- Ensure all dependencies are installed: `npm install`
- Check that your TypeScript version is compatible (v5+)
- Restart your IDE/editor to refresh the TypeScript language server

### Build Errors

If the production build fails:
- Check for TypeScript errors: `npm run lint`
- Ensure all environment variables are set (if required)
- Review the error messages in the terminal for specific issues

## Environment Variables

If the application requires environment variables (e.g., API endpoints), create a `.env.local` file in the `frontend-giftwizard` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Note**: Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never expose sensitive keys or secrets.

## Backend Integration

This frontend is designed to work with the FastAPI backend. Ensure the backend is running:

1. **Backend Server**: Should be running on `http://localhost:8000`
2. **CORS**: The backend should have CORS enabled to allow requests from the frontend
3. **API Endpoints**: Check the main project README for available API endpoints

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev/) - Learn React
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn Tailwind CSS
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Learn TypeScript

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the main project README.md for full-stack setup instructions
3. Ensure all prerequisites are installed correctly
4. Verify the backend server is running (if required)

---

Happy coding! 🎁✨
