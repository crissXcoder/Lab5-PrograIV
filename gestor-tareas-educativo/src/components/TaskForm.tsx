import React, { useState } from 'react';
import '../styles/TaskForm.css';

interface TaskFormProps {
  onAddTask: (title: string, description: string, subject: string, deadline: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    onAddTask(title, description, subject, deadline);
    
    // Limpiar el formulario
    setTitle('');
    setDescription('');
    setSubject('');
    setDeadline('');
  };

  return (
    <div className="task-form-container">
      <form id="task-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="task-title">📝 Título de la Tarea</label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Añade un título para tu tarea"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="task-subject">📚 Asignatura</label>
            <select
              id="task-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            >
                <option value="" disabled selected>Selecciona la materia</option>
                <option value="Matemáticas">Matemáticas</option>
                <option value="Español">Español</option>
                <option value="Ciencias">Ciencias</option>
                <option value="Estudios Sociales">Estudios Sociales</option>
                <option value="Inglés">Inglés</option>
                <option value="Física">Física</option>
                <option value="Química">Química</option>
                <option value="Historia">Historia</option>
                <option value="Geografía">Geografía</option>
                <option value="Educación Física">Educación Física</option>
                <option value="Arte">Arte</option>
                <option value="Música">Música</option>
                <option value="Informática">Informática</option>
                <option value="Otra">Otra</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="task-description">📋 Descripción</label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe tu tarea (opcional)"
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="task-deadline">📅 Fecha límite</label>
          <input
            id="task-deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="add-task-btn">
          <span>✨</span> Añadir Tarea <span>✨</span>
        </button>
      </form>
    </div>
  );
};

export default TaskForm;