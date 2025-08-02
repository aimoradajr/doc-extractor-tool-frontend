# 📄 PDF Document Extractor - Frontend v0.1.0

AI-powered tool for extracting structured data from agricultural and environmental PDF reports with high accuracy.

## 🎯 Project Overview

This Angular 19 frontend provides a modern, user-friendly interface for uploading PDF documents and viewing extracted data. The tool specializes in parsing unstructured agricultural/environmental reports and organizing information into logical categories.

## 🛠️ Technology Stack

- **Framework**: Angular 19.2.14 (with Standalone Components)
- **Language**: TypeScript 5.7.2
- **Styling**: SCSS
- **Architecture**: Standalone Components (Modern Angular)
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
│   ├── app.component.ts      # Main app component (standalone)
│   ├── app.config.ts         # App configuration
│   └── app.routes.ts         # Route definitions
├── main.ts                   # Bootstrap application
└── styles.scss               # Global styles
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

This frontend connects to a Node.js/Express backend running on:

- **Development**: `http://localhost:5000`
- **Production**: TBD

## 📊 Features (Planned)

- [ ] Drag & drop PDF upload
- [ ] Real-time extraction progress
- [ ] Data visualization dashboard
- [ ] Export results (JSON/CSV)
- [ ] Accuracy testing UI
- [ ] Responsive design

## 🎨 UI Components (To Be Added)

- [ ] File upload component
- [ ] Progress indicators
- [ ] Data tables and charts
- [ ] Accuracy metrics display

## 📈 Current Status

**Phase**: Initial Setup ✅

- Angular 19 project structure created
- Standalone components architecture
- Development server running
- Basic routing configured

**Next Steps**:

1. Add Tailwind CSS for styling
2. Create file upload component
3. Set up API service for backend communication
4. Build dashboard components

## 🌐 Deployment

- **Frontend**: Vercel (static deployment)
- **Backend**: Render (Node.js server)

## 📝 Notes

This is the frontend portion of a full-stack PDF extraction tool. The backend handles PDF processing and LLM integration for intelligent data extraction.

---

_Generated with Angular CLI 19.2.15 | Last Updated: August 2, 2025_
