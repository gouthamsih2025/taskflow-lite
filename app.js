// app.js
// Main entry point for TaskFlow Lite

import { loadTasks, saveTasks } from './modules/storage.js';
import { validateTaskInput } from './modules/validation.js';
import { renderTaskList } from './modules/render.js';

// --- State Management ---
let tasks = loadTasks();
let activeFilter = 'all'; // 'all' | 'active' | 'completed'

// --- Task Factory ---
function createTask(text) {
  return {
    id: Date.now(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
}

// --- DOM References ---
const taskForm     = document.getElementById('task-form');
const taskInput    = document.getElementById('task-input');
const taskListEl   = document.getElementById('task-list');
const filterBtns   = document.querySelectorAll('.filter-btn');
const clearDoneBtn = document.getElementById('clear-done-btn');

// Stats Counters
const statTotal     = document.getElementById('stat-total');
const statCompleted = document.getElementById('stat-completed');
const statRemaining = document.getElementById('stat-remaining');

// Badge counts on filters
const countAll       = document.getElementById('count-all');
const countActive    = document.getElementById('count-active');
const countCompleted = document.getElementById('count-completed');

// Footer status info
const bulkInfo = document.getElementById('bulk-info');

// --- Update UI Stats helper ---
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const remaining = total - completed;

  // Global Cards
  statTotal.textContent = total;
  statCompleted.textContent = completed;
  statRemaining.textContent = remaining;

  // Filter badges
  countAll.textContent = total;
  countActive.textContent = remaining;
  countCompleted.textContent = completed;

  // Status info
  bulkInfo.textContent = total === 0 
    ? 'No objectives yet' 
    : `${total} objective${total !== 1 ? 's' : ''} total`;

  // Clear completed button state
  clearDoneBtn.disabled = completed === 0;
}

// --- Filter logic ---
function getFilteredTasks() {
  if (activeFilter === 'active') return tasks.filter(t => !t.completed);
  if (activeFilter === 'completed') return tasks.filter(t => t.completed);
  return tasks;
}

// --- Master Render Coordinator ---
function refreshAppView() {
  const filtered = getFilteredTasks();
  renderTaskList(taskListEl, filtered);
  updateStats();
}

// --- Event Listeners ---

// 1. Add Task Form Submit
taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const rawValue = taskInput.value;

  if (validateTaskInput(rawValue)) {
    const newTask = createTask(rawValue);
    tasks.unshift(newTask); // Add to the top of the list
    saveTasks(tasks);
    refreshAppView();
    taskInput.value = '';
    taskInput.focus();
  }
});

// Clear error state dynamically on input typing
taskInput.addEventListener('input', () => {
  const errorMsgEl = document.getElementById('error-msg');
  const inputWrap = document.querySelector('.input-wrap');
  if (errorMsgEl.classList.contains('show')) {
    errorMsgEl.classList.remove('show');
    inputWrap.style.borderColor = '';
    inputWrap.style.boxShadow = '';
    inputWrap.style.animation = '';
  }
});

// 2. Task List Clicks (Event Delegation)
taskListEl.addEventListener('click', e => {
  const taskElement = e.target.closest('.task-item');
  if (!taskElement) return;

  const taskId = Number(taskElement.dataset.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) return;

  // Toggle checkbox completion
  if (e.target.type === 'checkbox') {
    tasks[taskIndex].completed = e.target.checked;
    saveTasks(tasks);
    refreshAppView();
    return;
  }

  // Delete task
  if (e.target.classList.contains('delete-btn')) {
    taskElement.style.animation = 'taskOut 0.3s ease forwards';
    setTimeout(() => {
      tasks = tasks.filter(t => t.id !== taskId);
      saveTasks(tasks);
      refreshAppView();
    }, 280);
    return;
  }

  // Edit task (Optional Enhancement)
  if (e.target.classList.contains('edit-btn')) {
    const currentText = tasks[taskIndex].text;
    const newText = prompt('Edit your task objective:', currentText);
    
    if (newText === null) return; // user cancelled
    if (newText.trim().length === 0) {
      alert('Objective cannot be empty!');
      return;
    }
    if (newText.trim().length > 100) {
      alert('Objective is too long (max 100 characters)!');
      return;
    }
    
    tasks[taskIndex].text = newText.trim();
    saveTasks(tasks);
    refreshAppView();
    return;
  }
});

// 3. Filter Buttons Switching
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    refreshAppView();
  });
});

// 4. Bulk Delete Completed Objectives
clearDoneBtn.addEventListener('click', () => {
  const completedCount = tasks.filter(t => t.completed).length;
  if (completedCount === 0) return;

  const confirmed = confirm(`Are you sure you want to clear ${completedCount} completed objective${completedCount !== 1 ? 's' : ''}?`);
  if (confirmed) {
    tasks = tasks.filter(t => !t.completed);
    saveTasks(tasks);
    refreshAppView();
  }
});

// --- Initialize App ---
document.addEventListener('DOMContentLoaded', () => {
  refreshAppView();
});
