import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './index.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app-container">
        <header className="header">
          <h1>Agile Task Board</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your workflow efficiently</p>
        </header>
        
        <main>
          <TaskForm />
          <TaskList />
        </main>
      </div>
    </Provider>
  );
};

export default App;
