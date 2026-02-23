const tasks = [
    { name: "Ledová koupel", time: "07:00", done: true },
    { name: "Meditace", time: "08:30", done: false },
    { name: "Deep Work", time: "10:00", done: false }
];

const taskList = document.getElementById('task-list');

function renderTasks() {
    taskList.innerHTML = tasks.map((task, index) => `
        <div class="task-item flex justify-between items-center p-4 rounded-2xl ${task.done ? 'opacity-30' : 'bg-white/5'}" onclick="toggleTask(${index})">
            <div>
                <p class="text-sm font-light">${task.name}</p>
                <p class="text-[9px] opacity-40 uppercase tracking-widest">${task.time}</p>
            </div>
            <div class="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center">
                ${task.done ? '<div class="w-2 h-2 bg-white rounded-full"></div>' : ''}
            </div>
        </div>
    `).join('');
}

window.toggleTask = (index) => {
    tasks[index].done = !tasks[index].done;
    renderTasks();
};

window.switchTab = (btn) => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Malá vibrace (pokud to telefon umí)
    if (window.navigator.vibrate) {
        window.navigator.vibrate(10);
    }
};

renderTasks();
