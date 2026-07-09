const submitBtn = document.querySelector('.main_submit');
const dateInput = document.querySelector('input[type="date"]');
const opSelect = document.querySelector('#op');
const amountInput = document.querySelector('input[type="number"]');
const descInput = document.querySelector('input[type="text"]');
const historyList = document.querySelector('.history_list');

// Загружаем сохранённые данные при открытии страницы
function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    historyList.innerHTML = '';
    entries.forEach(entry => renderEntry(entry));
}

// Отображаем одну запись в списке
function renderEntry(entry) {
    const li = document.createElement('li');
    const sign = entry.operation === 'earn' ? '+' : '-';
    const opText = entry.operation === 'earn' ? 'Доход' : 'Расход';
    li.textContent = `${entry.date} — ${opText}: ${sign}${entry.amount} (${entry.description || 'без описания'})`;
    historyList.appendChild(li);
}

submitBtn.addEventListener('click', () => {
    const date = dateInput.value;
    const operation = opSelect.value;
    const amount = amountInput.value;
    const description = descInput.value;

    if (!date || !operation || !amount) {
        alert('Заполни дату, тип операции и сумму');
        return;
    }

    const entry = { date, operation, amount, description };

    // Достаём старые записи, добавляем новую, сохраняем обратно
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));

    renderEntry(entry);

    // Очищаем поля после добавления
    dateInput.value = '';
    opSelect.value = '';
    amountInput.value = '';
    descInput.value = '';

     alert('Запись добавлена!'); // необязательно, просто подтверждение
});
clearListBtn.addEventListener('click', () => {
  localStorage.removeItem('entries'); // замени 'myListItems' на свой ключ, если он другой
  location.reload();
});
const burgerBtn = document.getElementById('burgerBtn');
const shapkaList = document.getElementById('shapkaList');

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    shapkaList.classList.toggle('active');
});
loadEntries();