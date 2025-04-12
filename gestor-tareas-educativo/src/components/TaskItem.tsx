import React from 'react';
import { Task } from '../types';
import { formatDate } from '../utils';
import '../styles/TaskItem.css';

interface TaskItemProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete, onDelete }) => {
  return (
    <li className={`task-item ${task.completed ? 'completed-task' : ''}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className="task-subject">{task.subject}</span>
      </div>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      
      <div className="task-footer">
        {!task.completed ? (
          <div className="task-deadline">
            <span>📅</span> {formatDate(task.deadline)}
          </div>
        ) : (
          <div className="task-completion-date">
            <span>✅</span> Completada el {formatDate(task.completedAt || '')}
          </div>
        )}
        
        <div className="task-actions">
          {!task.completed && (
            <button 
              className="task-btn complete-btn" 
              onClick={() => onComplete(task.id)}
              title="Marcar como completada"
            >
              ✓
            </button>
          )}
          
          <button 
            className="task-btn delete-btn" 
            onClick={() => onDelete(task.id)}
            title="Eliminar tarea"
          >
            ×
          </button>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;