import React from 'react';
import type { Task } from '../schemas/taskSchema';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../store/slices/taskSlice';
import type { AppDispatch } from '../store';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    if (task.id) {
      dispatch(deleteTask(task.id));
    }
  };

  const toggleStatus = () => {
    if (task.id) {
      const nextStatus = task.status === 'todo' ? 'in_progress' : task.status === 'in_progress' ? 'done' : 'todo';
      dispatch(updateTask({ id: task.id, data: { status: nextStatus } }));
    }
  };

  return (
    <div className="task-item">
      <div className="task-content">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        {task.due_date && <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#a855f7' }}>📅 Due: {new Date(task.due_date).toLocaleDateString()}</p>}
        <span className={`status-badge status-${task.status}`}>
          {task.status.replace('_', ' ')}
        </span>
      </div>
      <div className="task-actions">
        <button className="btn-icon" onClick={toggleStatus} title="Change Status">
          🔄
        </button>
        <button className="btn-icon danger" onClick={handleDelete} title="Delete Task">
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
