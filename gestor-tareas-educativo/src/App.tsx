import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types';
import { generateId, saveTasks, loadTasks, sortTasks } from './utils';
import './styles/App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Cargar tareas desde localStorage al iniciar
  useEffect(() => {
    if (!isInitialized) {
      const savedTasks = loadTasks();
      setTasks(savedTasks);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Guardar tareas en localStorage cuando cambien
  useEffect(() => {
    if (isInitialized) {
      saveTasks(tasks);
    }
  }, [tasks, isInitialized]);

  // Añadir nueva tarea
  const handleAddTask = (title: string, description: string, subject: string, deadline: string) => {
    const newTask: Task = {
      id: generateId(),
      title,
      description,
      subject,
      deadline,
      completed: false
    };

    setTasks(prevTasks => sortTasks([...prevTasks, newTask]));
  };

  // Marcar tarea como completada
  const handleCompleteTask = (id: string) => {
    setTasks(prevTasks => 
      sortTasks(prevTasks.map(task => 
        task.id === id 
          ? { ...task, completed: true, completedAt: new Date().toISOString() } 
          : task
      ))
    );
  };

  // Eliminar tarea
  const handleDeleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <div className="App">
      <header>
        <div className="logo-container">
          <span className="app-icon">📚</span>
          <h1>
            Gestor de Tareas Educativo
            <span className="subtitle">Organiza tus tareas escolares de manera eficiente</span>
          </h1>
        </div>
      </header>

      <main>
        <TaskForm onAddTask={handleAddTask} />
        <TaskList 
          tasks={tasks} 
          onCompleteTask={handleCompleteTask} 
          onDeleteTask={handleDeleteTask}
        />
      </main>

      <footer>
        <p>2025 Gestor de Tareas Educativo | Desarrollado con ❤️ para estudiantes</p>
        <p>© By Criss & Danny</p>
      </footer>
    </div>
  );
};

export default App;