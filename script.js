alert("JS Loaded");

const app = document.getElementById("app");

const habitInput = document.getElementById("habitInput");

const addHabitBtn = document.getElementById("addHabitBtn");

let habits = [];

addHabitBtn.addEventListener("click", addHabit);

function addHabit() {

  const habitName = habitInput.value;

  if (habitName === "") {
    return;
  }

  habits.push(habitName);

  renderHabits();

  habitInput.value = "";
}

function renderHabits() {

  let html = "";

  habits.forEach(function(habit) {

    html += `
      <div class="habit-card">
        ${habit}
      </div>
    `;

  });

  app.innerHTML = html;
}