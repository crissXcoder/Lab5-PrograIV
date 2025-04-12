import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onCompleteTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onCompleteTask, onDeleteTask }) => {
  // Filtrar tareas pendientes y completadas
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="tasks-container">
      <div className="pending-tasks">
        <h2>📋 Tareas Pendientes</h2>
        {pendingTasks.length > 0 ? (
          <ul className="tasks-list">
            {pendingTasks.map(task => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onComplete={onCompleteTask} 
                onDelete={onDeleteTask} 
              />
            ))}
          </ul>
        ) : (
          <p className="task-empty">No hay tareas pendientes. ¡Buen trabajo! ✨</p>
        )}
      </div>

      <div className="completed-tasks">
        <h2>✅ Tareas Completadas</h2>
        {completedTasks.length > 0 ? (
          <ul className="tasks-list">
            {completedTasks.map(task => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onComplete={onCompleteTask} 
                onDelete={onDeleteTask} 
              />
            ))}
          </ul>
        ) : (
          <p className="task-empty">No hay tareas completadas aún. ¡Manos a la obra! 💪</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;