# 📝 React JS Learning Project - Hummatech Internship

Proyek pembelajaran React JS Dasar yang mencakup implementasi lengkap Props, State, Hooks, dan Component Composition.

## 🎯 Project Overview

**Program:** Magang Frontend Hummatech  
**Materi:** 3.2 React JS Dasar  
**Durasi:** 5 Hari Kerja  
**Status:** ✅ Completed (100%)

## 🚀 Features

### 1. Mini Task Tracker (App.jsx)
- ✅ Add, complete, and delete tasks
- ✅ LocalStorage persistence
- ✅ Dynamic document title
- ✅ Conditional rendering
- ✅ Form validation

### 2. Dashboard with Props (Dashboard.jsx)
- ✅ Stats cards (Total, Completed, Pending)
- ✅ Task management with TaskCard components
- ✅ Complete Props implementation
- ✅ PropTypes validation
- ✅ Clean, simple design

## 📦 Tech Stack

- **React** 18.3.1
- **Vite** 6.0.3
- **React Bootstrap** 2.10.6
- **PropTypes** 15.8.1

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navbar.jsx      # Navigation with props
│   ├── Footer.jsx      # Footer with props
│   ├── Card.jsx        # Reusable card (children props)
│   └── TaskCard.jsx    # Task display with all props types
├── pages/
│   └── Dashboard.jsx   # Dashboard with props demo
├── App.jsx             # Task tracker (useState, useEffect)
└── main.jsx            # Entry point with props data
```

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📚 What I Learned

### React Fundamentals
- ✅ JSX syntax
- ✅ Functional components
- ✅ Component architecture

### Hooks
- ✅ `useState` - State management
- ✅ `useEffect` - Side effects & lifecycle

### Props
- ✅ Basic props (string, number, boolean)
- ✅ Array props
- ✅ Object props
- ✅ Function props (callbacks)
- ✅ Children props
- ✅ PropTypes validation
- ✅ Default props

### Other Concepts
- ✅ Event handling
- ✅ Conditional rendering
- ✅ List rendering with `map()`
- ✅ Immutable state updates
- ✅ LocalStorage API
- ✅ Form handling

## 💡 Key Components

### Navbar Component
```javascript
<NavbarComponent 
  brandName="📝 Mini Task Tracker"
  menuItems={[
    { label: "Home", href: "#home" },
    { label: "Dashboard", href: "#dashboard" }
  ]}
/>
```

### Dashboard Component
```javascript
<Dashboard 
  userName="Dzaky"
  totalTasks={10}
  completedTasks={7}
  recentTasks={[...]}
/>
```

### TaskCard Component
```javascript
<TaskCard 
  id={1}
  title="Learn Props"
  description="Master props in React"
  status="completed"
  priority="high"
  onDelete={handleDelete}
  onStatusChange={handleToggle}
/>
```

## 📊 Props Implementation

All components use **PropTypes** for type validation:

```javascript
Component.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAction: PropTypes.func.isRequired
};

Component.defaultProps = {
  title: 'Default Title'
};
```

## 🎨 Component Features

### Card Component (Children Props Demo)
```javascript
<Card title="My Card" variant="primary">
  <p>This is children props!</p>
  <button>Click Me</button>
</Card>
```

### TaskCard Component (All Props Types)
- String props: `title`, `description`
- Enum props: `status`, `priority`
- Function props: `onDelete`, `onStatusChange`, `onClick`
- Number props: `id`

## 📖 Documentation

- **DOKUMENTASI PROJECT MANAGER** - Complete learning progress report
- **Participant Documents** - Technical concepts & syntax guide
- **backlog-day-11.md** - Day 1-2 learning notes
- **backlog-day-12.md** - Day 3 task tracker project

## 🎯 Next Steps

- [ ] React Router for multi-page navigation
- [ ] Context API for global state
- [ ] Custom Hooks
- [ ] API Integration
- [ ] Form Libraries (React Hook Form)

## 👨‍💻 Author

**Achmad Dzaky Habibullah Al Azhar**  
SMK Negeri 1 Probolinggo  
Program Magang Frontend - Hummatech

## 📝 License

This project is part of the Hummatech Internship Program learning materials.

---

**Built with ❤️ and React**
