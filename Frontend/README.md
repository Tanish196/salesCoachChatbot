# Aria Chat Interface

A modern, responsive chat interface built with React, TypeScript, and Tailwind CSS. Features a collapsible sidebar, file attachments, and a clean user experience designed for document-based AI interactions.

## Features

- 🎨 **Modern UI Design** - Clean, minimalist interface with smooth animations

- 📱 **Responsive Layout** -Works seamlessly on desktop and mobile devices
- 📁 **File Attachments** - Drag & drop or click to attach documents and images
- 🔄 **Collapsible Sidebar** - Expandable navigation with chat history
- ⚡ **Real-time Chat** -Instant message sending with typing indicators
- 🎯 **TypeScript Support** - Full type safety and IntelliSense

## Technologies Used

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful icon library
- **Heroicons** - Additional UI icons

## Project Structure

```
src/
├── components/          # React components
│   ├── ChatHeader.tsx   # Top navigation bar
│   ├── ChatInput.tsx    # Message input with file attachments
│   ├── ChatMessages.tsx # Message display area
│   ├── Sidebar.tsx      # Collapsible navigation sidebar
│   └── WelcomeScreen.tsx # Initial landing screen
├── hooks/               # Custom React hooks
│   └── useChat.ts       # Chat state management
├── types/               # TypeScript type definitions
│   └── chat.ts          # Chat-related types
├── assets/              # Static assets
└── App.tsx              # Main application component
```

## Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 16.x or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tanish196/salesCoachChatbot.git
   cd thinklyLabs/Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage Guide

### Basic Chat Interaction

1. **Starting a Conversation**
   - Type your message in the input field at the bottom
   - Press Enter or click the send button
   - Use Shift+Enter for line breaks

2. **Using Suggested Prompts**
   - Click on any suggested prompt card on the welcome screen
   - Prompts are designed for common use cases

### Sidebar Navigation

1. **Desktop**
   - Sidebar starts expanded by default
   - Click the collapse button to minimize to icons only
   - Click icons in collapsed mode for quick navigation

2. **Mobile**
   - Sidebar starts collapsed
   - Tap hamburger menu to open
   - Tap outside or close button to hide

## Development

### Code Style

This project follows modern React patterns:
- Functional components with hooks
- TypeScript for type safety
- Custom hooks for state management
- Responsive design with mobile-first approach

### Component Architecture

- **App.tsx** - Main application layout and routing
- **Sidebar** - Navigation with chat history and user controls
- **ChatHeader** - Top bar with title and controls
- **WelcomeScreen** - Landing page with suggested prompts
- **ChatMessages** - Message display with proper formatting
- **ChatInput** - Input field with file attachment capabilities

### State Management

The application uses React's built-in state management:
- `useState` for component-level state
- Custom `useChat` hook for chat state
- Props drilling for component communication

## Customization

### Adding New Features

1. **New Components**: Add to `src/components/`
2. **Types**: Define in `src/types/`
3. **Hooks**: Create in `src/hooks/`
4. **Styling**: Use Tailwind classes

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance

- Fast loading with Vite
- Optimized bundle size
- Lazy loading for better performance
- Responsive images and assets

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue in the repository or contact the development team.

---

## License
This project is available for educational and personal use.
