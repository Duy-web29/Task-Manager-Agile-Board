import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../store/slices/taskSlice';
import type { RootState, AppDispatch } from '../store';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, status, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading tasks...</div>;
  }

  if (status === 'failed') {
    return <div style={{ color: 'var(--danger)', padding: '1rem' }}>Error: {error}</div>;
  }

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
          No tasks yet. Create one above!
        </div>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))
      )}
    </div>
  );
};

export default TaskList;
