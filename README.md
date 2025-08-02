# 📄 PDF Document Extractor - Frontend v0.1.0

AI-powered tool for extracting structured data from agricultural and environmental PDF reports with high accuracy.

## 🔗 Related Repositories

- **Backend**: [doc-extractor-tool-backend](https://github.com/aimoradajr/doc-extractor-tool-backend) - Express.js API server with AI processing
- **Frontend**: [doc-extractor-tool-frontend](https://github.com/aimoradajr/doc-extractor-tool-frontend) - Angular 19 client application (this repo)

## 🎯 Project Overview

This Angular 19 frontend provides a modern, user-friendly interface for uploading PDF documents and viewing extracted data. The tool specializes in parsing unstructured agricultural/environmental reports and organizing information into logical categories.

## 🛠️ Technology Stack

- **Framework**: Angular 19.2.14 (with Standalone Components)
- **Language**: TypeScript 5.7.2
- **Styling**: SCSS + Tailwind CSS 3.4.17
- **Architecture**: Standalone Components (Modern Angular)
- **HTTP Client**: Angular HttpClient with typed services
- **State Management**: Angular Signals (Angular 17+ pattern)
- **Features**: Routing, Hot Module Replacement (HMR)

## 🚀 Quick Start

### Prerequisites

- Node.js 18.19+ or 20.9+ (recommended: 20.15.0 LTS)
- npm 10.7+
- Angular CLI 19.2.15

### Development Server

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The app will auto-reload on file changes.

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                  # Core application modules
│   │   ├── interfaces/        # TypeScript interfaces
│   │   ├── models/           # Data models
│   │   └── services/         # Singleton services (API, etc.)
│   ├── shared/               # Shared modules
│   │   ├── components/       # Reusable components
│   │   ├── directives/       # Custom directives
│   │   └── pipes/           # Custom pipes
│   ├── features/            # Feature modules
│   │   ├── upload/          # File upload functionality
│   │   ├── dashboard/       # Main dashboard
│   │   └── results/         # Results display
│   ├── app.component.ts     # Main app component (standalone)
│   ├── app.config.ts        # App configuration
│   └── app.routes.ts        # Route definitions
├── environments/            # Environment configs
├── main.ts                  # Bootstrap application
└── styles.scss              # Global styles
```

## 🏗️ Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Generate component
ng generate component components/component-name --standalone

# Generate service
ng generate service services/service-name
```

## 🔧 Backend Integration

This frontend connects to a Node.js/Express backend with the following API endpoints:

### **API Configuration:**

- **Development**: `http://localhost:5000/api`
- **Production**: `https://doc-extractor-tool-backend.onrender.com/api`

### **Available Endpoints:**

- `POST /api/upload` - Upload PDF files (expects 'pdf' field in FormData)
- `GET /api/extract` - Extract data from uploaded PDFs
- `GET /` - Health check endpoint

### **Environment Management:**

The app uses Angular's standard environment configuration:

- `environment.ts` → Development settings
- `environment.prod.ts` → Production settings
- Automatic switching during build process

## 📊 Features

### **✅ Completed:**

- 📤 **PDF Upload Component** - Drag & drop file upload with validation
- 🎨 **Modern UI** - Tailwind CSS styling with responsive design
- 🔌 **Backend Integration** - HTTP client with typed API services
- 🌍 **Environment Management** - Separate dev/prod configurations
- ⚡ **Real-time Feedback** - Upload progress and error handling
- 🛡️ **File Validation** - PDF type and size validation (10MB limit)

### **🚧 In Progress:**

- 📊 **Data Visualization** - Display extraction results
- 📈 **Progress Tracking** - Real-time processing status

### **📋 Planned:**

- 📋 **Export Results** - JSON/CSV download functionality
- 🎯 **Accuracy Metrics** - Display confidence scores
- 📱 **Mobile Optimization** - Enhanced responsive design

## 🎨 Components Architecture

### **Core Components:**

- **PDF Extractor Component** (`/features/upload/pdf-extractor`)
  - File upload with drag & drop support
  - Real-time upload progress
  - Backend connectivity testing
  - Response display and error handling

### **Services:**

- **API Service** (`/core/services/api.service`)
  - Typed HTTP methods
  - Environment-aware endpoint configuration
  - File upload with proper FormData handling

### **Interfaces:**

- **API Interfaces** (`/core/interfaces/api.interfaces`)
  - TypeScript definitions for API responses
  - Enum for job status tracking
  - Structured data models

## 📈 Current Status

**Phase**: Core Functionality Complete ✅

### **✅ Completed:**

- Angular 19 project structure with best practices
- Standalone components architecture
- Scalable directory structure (core/shared/features)
- Tailwind CSS integration for modern styling
- PDF upload component with validation
- Typed API services with environment switching
- Backend connectivity (localhost:5000 ↔ Render production)
- Error handling and user feedback
- Production-ready build configuration

### **🎯 Current Capabilities:**

- Upload PDF files up to 10MB
- Test backend connectivity
- Display upload responses
- Environment-aware API calls (dev/prod)
- Responsive UI with Tailwind CSS

### **📋 Next Development Phase:**

1. Implement data visualization components
2. Add extraction results processing
3. Create export functionality
4. Enhance mobile responsiveness

## 🌐 Deployment

### **Frontend Deployment:**

- **Platform**: Vercel (Zero-config deployment)
- **Build**: Automatic production builds with environment switching
- **URL**: Auto-deployed on git push to main branch

### **Backend Integration:**

- **Development**: Express.js server on `localhost:5000`
- **Production**: Render deployment at `doc-extractor-tool-backend.onrender.com`
- **Repository**: [aimoradajr/doc-extractor-tool-backend](https://github.com/aimoradajr/doc-extractor-tool-backend)
- **API**: RESTful endpoints with FormData support

### **Deployment Notes:**

- No `vercel.json` needed (Vercel auto-detects Angular)
- Environment variables automatically switched during build
- Production builds use optimized settings

## 📝 Development Notes

### **Architecture Decisions:**

- **Standalone Components**: Using Angular 19's modern standalone approach
- **Signals**: Implementing Angular's reactive state management
- **Environment Management**: Standard Angular approach (no over-engineering)
- **Styling**: Tailwind CSS for utility-first styling approach

### **Key Implementation Details:**

- FormData uploads use 'pdf' field name for backend compatibility
- Environment switching via Angular's fileReplacements
- Type safety with TypeScript interfaces for API responses
- Component composition for maintainable code structure

### **Backend Communication:**

This frontend interfaces with an Express.js backend ([doc-extractor-tool-backend](https://github.com/aimoradajr/doc-extractor-tool-backend)) that handles PDF processing and AI-powered data extraction for agricultural/environmental reports.

---

_Generated with Angular CLI 19.2.15 | Last Updated: August 2, 2025_
