import './style.css';
import TaskList from './tasklist-class.js';

const listName = "Today's To Do";
const label = document.querySelector('label');
label.innerHTML = listName;

const TASK_LIST = new TaskList();
TASK_LIST.init();
