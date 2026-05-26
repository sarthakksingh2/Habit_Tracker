const app = document.getElementById("app");
const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabitBtn");
const prevWeekBtn = document.getElementById("prevWeek");
const nextWeekBtn = document.getElementById("nextWeek");
const currentWeekBtn = document.getElementById("currentWeekBtn");
const weekLabel = document.getElementById("weekLabel");

// DATA

let habits = JSON.parse(localStorage.getItem("habits")) || [];

let completions =
  JSON.parse(localStorage.getItem("completions")) || {};

let currentDate = new Date();

// SAVE DATA

function saveData() {

  localStorage.setItem(
    "habits",
    JSON.stringify(habits)
  );

  localStorage.setItem(
    "completions",
    JSON.stringify(completions)
  );

}

// DATE HELPERS

function formatDate(date) {

  return date.toISOString().split("T")[0];

}


function getStartOfWeek(date) {

  const d = new Date(date);

  const day = d.getDay();

  const diff =
    d.getDate() - day + (day === 0 ? -6 : 1);

  return new Date(d.setDate(diff));

}


function getWeekDates(date) {

  const start = getStartOfWeek(date);

  const week = [];

  for (let i = 0; i < 7; i++) {

    const d = new Date(start);

    d.setDate(start.getDate() + i);

    week.push(d);

  }

  return week;

}


function isToday(date) {

  return (
    formatDate(date) ===
    formatDate(new Date())
  );

}


// ADD HABIT

function addHabit() {

  const habitName =
    habitInput.value.trim();

  if (habitName === "") return;

  const newHabit = {

    id: Date.now().toString(),

    name: habitName

  };

  habits.push(newHabit);

  habitInput.value = "";

  saveData();

  render();

}


// DELETE HABIT

function deleteHabit(id) {

  habits = habits.filter(
    (habit) => habit.id !== id
  );

  Object.keys(completions).forEach((date) => {

    if (completions[date][id]) {

      delete completions[date][id];

    }

  });

  saveData();

  render();

}

// RENAME HABIT

function renameHabit(id, newName) {

  habits = habits.map((habit) => {

    if (habit.id === id) {

      return {
        ...habit,
        name: newName
      };

    }

    return habit;

  });

  saveData();

  render();

}
// TOGGLE COMPLETION

function toggleCompletion(habitId, date) {

  if (!completions[date]) {

    completions[date] = {};

  }

  completions[date][habitId] =
    !completions[date][habitId];

  saveData();

  render();

}

// STREAK CALCULATION

function calculateStreak(habitId) {

  let streak = 0;

  let date = new Date();

  while (true) {

    const key = formatDate(date);

    if (
      completions[key] &&
      completions[key][habitId]
    ) {

      streak++;

      date.setDate(date.getDate() - 1);

    } else {

      break;

    }

  }

  return streak;

}


// ENABLE EDIT

function enableEdit(id, currentName) {

  const span =
    document.getElementById(`habit-${id}`);

  span.innerHTML = `

    <input
      class="edit-input"
      type="text"
      id="edit-${id}"
      value="${currentName}"
    />

  `;

  const input =
    document.getElementById(`edit-${id}`);

  input.focus();

  input.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

      const value = input.value.trim();

      if (value !== "") {

        renameHabit(id, value);

      }

    }

    if (e.key === "Escape") {

      render();

    }

  });

}


// RENDER UI
function render() {

  const weekDates =
    getWeekDates(currentDate);

  weekLabel.innerText =

    `${weekDates[0].toDateString()}
     -
     ${weekDates[6].toDateString()}`;


  // EMPTY STATE

  if (habits.length === 0) {

    app.innerHTML = `

      <div class="empty-state">

        <h2>No habits yet</h2>

        <p>
          Add your first habit and
          start building streaks.
        </p>

      </div>

    `;

    return;

  }


  // TABLE START

  let html = `

    <div class="tracker-wrapper">

      <table>

        <thead>

          <tr>

            <th>Habit</th>

  `;


  // DAYS HEADER

  weekDates.forEach((date) => {

    html += `

      <th class="${isToday(date) ? "today" : ""}">

        ${date.toLocaleDateString(
          "en-US",
          {
            weekday: "short"
          }
        )}

        <br>

        ${date.getDate()}

      </th>

    `;

  });


  html += `

      <th>Streak</th>

      </tr>

      </thead>

      <tbody>

  `;


  // HABITS

  habits.forEach((habit) => {

    html += `

      <tr>

        <td>

          <div class="habit-name">

            <span
              id="habit-${habit.id}"
              ondblclick="
                enableEdit(
                  '${habit.id}',
                  '${habit.name}'
                )
              "
            >

              ${habit.name}

            </span>

            <div class="habit-actions">

              <button
                class="icon-btn"
                onclick="
                  enableEdit(
                    '${habit.id}',
                    '${habit.name}'
                  )
                "
              >

                Write

              </button>

              <button
                class="icon-btn"
                onclick="
                  deleteHabit('${habit.id}')
                "
              >
                Delete
              </button>

            </div>

          </div>

        </td>

    `;


    // CHECKBOXES

    weekDates.forEach((date) => {

      const key = formatDate(date);

      const checked =
        completions[key] &&
        completions[key][habit.id];

      html += `

        <td class="${isToday(date) ? "today" : ""}">

          <button
            class="
              check-btn
              ${checked ? "checked" : ""}
            "

            onclick="
              toggleCompletion(
                '${habit.id}',
                '${key}'
              )
            "
          >

            ${checked ? "✓" : ""}

          </button>

        </td>

      `;

    });


    // STREAK

    html += `

      <td>

        <span class="streak">

           ${calculateStreak(habit.id)}

        </span>

      </td>

      </tr>

    `;

  });


  html += `

      </tbody>

      </table>

    </div>

  `;


  app.innerHTML = html;

}


// EVENT LISTENERS

addHabitBtn.addEventListener(
  "click",
  addHabit
);


habitInput.addEventListener(
  "keydown",
  (e) => {

    if (e.key === "Enter") {

      addHabit();

    }

  }
);


prevWeekBtn.addEventListener(
  "click",
  () => {

    currentDate.setDate(
      currentDate.getDate() - 7
    );

    render();

  }
);


nextWeekBtn.addEventListener(
  "click",
  () => {

    currentDate.setDate(
      currentDate.getDate() + 7
    );

    render();

  }
);


currentWeekBtn.addEventListener(
  "click",
  () => {

    currentDate = new Date();

    render();

  }
);

render();