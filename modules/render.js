// render.js
// DOM rendering functions for TaskFlow Lite

/**
 * Escapes special HTML characters to prevent XSS attacks.
 * @param {string} str 
 * @returns {string}
 */
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Dynamically renders the list of tasks into the taskListElement.
 * @param {HTMLElement} taskListElement - The UL container element
 * @param {Array} tasks - Array of task objects to render
 */
export function renderTaskList(taskListElement, tasks) {
  taskListElement.innerHTML = '';
  
  if (tasks.length === 0) {
    taskListElement.innerHTML = `
      <li class="empty-state" role="status" aria-live="polite">
        <span class="empty-icon" aria-hidden="true">📋</span>
        <p class="empty-title">Add your first task!</p>
        <p class="empty-sub">Your workspace is clean and empty.</p>
      </li>
    `;
    return;
  }
  
  tasks.forEach(task => {
    const taskElement = document.createElement('li');
    taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
    taskElement.dataset.id = task.id;
    
    // Formatting the date nicely
    const dateStr = task.createdAt 
      ? new Date(task.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) 
      : 'Today';

    taskElement.innerHTML = `
      <label class="task-checkbox" aria-label="Mark objective as ${task.completed ? 'incomplete' : 'complete'}">
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span class="checkbox-ui"></span>
        <span class="task-text">${escapeHTML(task.text)}</span>
      </label>
      <span class="task-meta">${dateStr}</span>
      <div class="task-actions">
        <button class="action-btn edit-btn" aria-label="Edit task" title="Edit task">✏️</button>
        <button class="action-btn delete-btn" aria-label="Delete task" title="Delete task">🗑️</button>
      </div>
    `;
    
    taskListElement.appendChild(taskElement);
  });
}
