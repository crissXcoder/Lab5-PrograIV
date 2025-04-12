import { Task } from './types';

// Generar ID único
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Formatear fecha en formato legible
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  }).format(date);
};

// Ordenar tareas: pendientes primero, luego completadas
export const sortTasks = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    // Si una tarea está completada y la otra no, la no completada va primero
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    
    // Si ambas tienen el mismo estado, ordenar por fecha límite
    if (!a.completed && !b.completed) {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    
    // Si ambas están completadas, ordenar por fecha de completado
    if (a.completedAt && b.completedAt) {
      return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
    }
    
    return 0;
  });
};

// Guardar tareas en localStorage
export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem('educationalTasks', JSON.stringify(tasks));
    console.log('Tareas guardadas en localStorage:', tasks);
  } catch (error) {
    console.error('Error al guardar tareas en localStorage:', error);
  }
};

// Cargar tareas desde localStorage
export const loadTasks = (): Task[] => {
  try {
    const tasksString = localStorage.getItem('educationalTasks');
    if (!tasksString) {
      console.log('No se encontraron tareas en localStorage');
      return [];
    }
    const tasks = JSON.parse(tasksString);
    console.log('Tareas cargadas desde localStorage:', tasks);
    return Array.isArray(tasks) ? tasks : [];
  } catch (error) {
    console.error('Error al cargar tareas desde localStorage:', error);
    return [];
  }
};