let currentDate = new Date();

const monthLabel = document.getElementById('monthLabel');
const grid = document.getElementById('calendarGrid');
const monthNames = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];

function getEntries() {
    return JSON.parse(localStorage.getItem('entries')) || [];
}

// Считаем доход/расход за конкретный день
function getDayTotals(dateStr, entries) {
    let income = 0;
    let expense = 0;
    entries.forEach(entry => {
        if (entry.date === dateStr) {
            const amount = parseFloat(entry.amount) || 0;
            if (entry.operation === 'earn') income += amount;
            else expense += amount;
        }
    });
    return { income, expense };
}

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    monthLabel.textContent = `${monthNames[month]} ${year}`;

    const entries = getEntries();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Пустые ячейки до начала месяца (смещение по дню недели)
    let startOffset = firstDay.getDay();
    startOffset = startOffset === 0 ? 6 : startOffset - 1; // понедельник = начало недели

    grid.innerHTML = '';

    for (let i = 0; i < startOffset; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar_day empty';
        grid.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const { income, expense } = getDayTotals(dateStr, entries);

        const cell = document.createElement('div');
        cell.className = 'calendar_day';

        if (income > 0 || expense > 0) {
            cell.classList.add(income >= expense ? 'day_income' : 'day_expense');
        }

        cell.innerHTML = `<span class="day_number">${day}</span>`;
        if (income > 0) cell.innerHTML += `<span class="day_amount">+${income}</span>`;
        if (expense > 0) cell.innerHTML += `<span class="day_amount">-${expense}</span>`;

        grid.appendChild(cell);
    }
}

document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();

const burgerBtn = document.getElementById('burgerBtn');
const shapkaList = document.getElementById('shapkaList');

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    shapkaList.classList.toggle('active');
});