import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/slices/taskSlice';
import type { AppDispatch } from '../store';
import { taskSchema } from '../schemas/taskSchema';
import type { Task } from '../schemas/taskSchema';

const TaskForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const formData: Task = {
      title,
      description: description || undefined,
      due_date: dueDate || undefined,
      status: 'todo',
    };

    const validation = taskSchema.safeParse(formData);

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    dispatch(addTask(validation.data));
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Create New Task</h2>
      {error && <div style={{ color: 'var(--danger)', fontSize: '0.875rem' }}>{error}</div>}
      
      <div className="form-group">
        <label htmlFor="title">Task Title *</label>
        <input 
          id="title"
          className="form-control"
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea 
          id="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Details..."
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input 
          id="dueDate"
          className="form-control"
          type="date" 
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button type="submit" className="btn">
        + Add Task
      </button>
    </form>
  );
};

export default TaskForm;
