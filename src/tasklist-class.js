import clearCompleted from './clear-completed.js';
import addTask from './add-item.js';
import completedIsFalse from './completed-filter.js';
import Drag from './icons/drag-handle-minor-svgrepo-com.svg';
import Bin from './icons/bin-svgrepo-com.svg';

class TaskList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('To-Do List')) || [];
  }

  init() {
    const addButton = document.getElementById('add-btn');
    addButton.addEventListener('click', (event) => {
      event.preventDefault();
      const description = document.getElementById('add-task').value;
      if (description !== '') {
        addTask(description, this.tasks);
      }
    });

    document.getElementById('add-task').addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const description = document.getElementById('add-task').value;
        if (description !== '') {
          addTask(description, this.tasks);
        }
      }
    });

    const clearBtn = document.getElementById('clear');
    clearBtn.addEventListener('click', () => {
      clearCompleted(this.tasks);
      this.tasks = JSON.parse(localStorage.getItem('To-Do List'));
    });

    window.addEventListener('load', () => {
      this.renderList();
    });
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.renderList();
    localStorage.setItem('To-Do List', JSON.stringify(this.tasks));
  }

  clearCompleted() {
    this.tasks = this.tasks.filter(completedIsFalse);
    this.renderList();
    localStorage.setItem('To-Do List', JSON.stringify(this.tasks));
  }

  renderList() {
    const ul = document.querySelector('ul');
    ul.innerHTML = '';

    const sortedArr = [...this.tasks];
    sortedArr.sort((a, b) => a.index - b.index);

    for (let i = 0; i < sortedArr.length; i += 1) {
      this.tasks[i].index = i + 1;
      const li = document.createElement('li');
      const input = document.createElement('input');

      const checkmark = document.createElement('span');
      checkmark.classList.add('checkmark');
      if (this.tasks[i].completed === true) {
        checkmark.classList.add('checked');
      }

      const moveBtn = document.createElement('button');
      const deleteBtn = document.createElement('button');

      const moveIcon = document.createElement('img');
      moveIcon.src = Drag;
      moveBtn.appendChild(moveIcon);

      const deleteIcon = document.createElement('img');
      deleteIcon.src = Bin;
      deleteBtn.appendChild(deleteIcon);
      deleteBtn.classList.add('hidden');

      deleteBtn.addEventListener('click', () => {
        this.deleteTask(i);
      });

      input.addEventListener('click', () => {
        document.querySelectorAll('li').forEach((element) => {
          element.classList.remove('on-edit');
        });
        li.classList.add('on-edit');
        checkmark.classList.add('darken');
        moveBtn.classList.add('hidden');
        deleteBtn.classList.remove('hidden');
      });

      input.addEventListener('blur', () => {
        document.querySelectorAll('li').forEach((element) => {
          element.classList.remove('on-edit');
        });
        setTimeout(() => {
          deleteBtn.classList.add('hidden');
          moveBtn.classList.remove('hidden');
        }, 500);
      });

      li.appendChild(checkmark);
      li.appendChild(input);
      input.value = `${sortedArr[i].description}`;
      input.addEventListener('keyup', () => {
        sortedArr[i].description = input.value;
        localStorage.setItem('To-Do List', JSON.stringify(this.tasks));
      });
      li.appendChild(deleteBtn);
      li.appendChild(moveBtn);
      ul.appendChild(li);

      checkmark.addEventListener('click', () => {
        checkmark.classList.toggle('checked');
        if (checkmark.classList.contains('checked')) {
          this.tasks[i].completed = true;
        } else {
          this.tasks[i].completed = false;
        }
        localStorage.setItem('To-Do List', JSON.stringify(this.tasks));
      });
    }
  }
}

export default TaskList;