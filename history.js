const historyList = document.querySelector('.history_list');
const emptyMessage = document.querySelector('.empty-message');

function renderEntry(entry) {
  const li = document.createElement('li');
  const sign = entry.operation === 'earn' ? '+' : '-';
  const opText = entry.operation === 'earn' ? 'Доход' : 'Расход';
  li.textContent = `${entry.date} — ${opText}: ${sign}${entry.amount} (${entry.description || '-'})`;
  historyList.appendChild(li);
}

function updateUI(entries) {
  // Очищаем список
  historyList.innerHTML = '';

  if (entries.length === 0) {
    // Если пусто — показываем сообщение, скрываем список (или оставляем пустым)
    emptyMessage.style.display = 'block';
    return;
  }

  // Если не пусто — скрываем сообщение, рисуем список
  emptyMessage.style.display = 'none';
  entries.forEach(entry => renderEntry(entry));
}

// Читаем данные и обновляем интерфейс
const entries = JSON.parse(localStorage.getItem('entries')) || [];
updateUI(entries);

// Кнопка очистки (без перезагрузки)
clearListBtn.addEventListener('click', () => {
  localStorage.removeItem('entries');
  updateUI([]); // сразу обновляем UI пустым массивом
});

const burgerBtn = document.getElementById('burgerBtn');
const shapkaList = document.getElementById('shapkaList');

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    shapkaList.classList.toggle('active');
});