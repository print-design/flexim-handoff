/**
 * Живая логика для .flexim-datepicker--with-time:
 *   - селект месяца (12 месяцев + смена года стрелками)
 *   - селект часов (00..23)
 *   - селект минут (00..59, шаг 5)
 *   - кнопки навигации ◀ ▶ (смена месяца)
 *   - клик по ячейке даты (одиночный выбор → --selected)
 *   - крест закрывает overlay (если календарь внутри .flexim-popup / .flexim-modal)
 *
 * Работает автономно на любой странице, где подключён этот файл + tokens.css + overrides.
 * Ищет все .flexim-datepicker--with-time и подключает к каждому.
 * Внутри hidden input .flexim-datepicker__value-input="datetime" получает ISO-строку.
 */
(function () {
  'use strict';

  var MONTHS = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
  var WEEKDAYS_SHORT = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  function pad2(n) { return n < 10 ? '0' + n : '' + n; }

  function closeAllDropdowns(except) {
    document.querySelectorAll('.flexim-datepicker__dropdown.is-open').forEach(function (dd) {
      if (dd !== except) dd.classList.remove('is-open');
    });
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.flexim-datepicker__dropdown') &&
        !e.target.closest('.flexim-datepicker__time-select') &&
        !e.target.closest('.flexim-datepicker--with-time .flexim-datepicker__month')) {
      closeAllDropdowns(null);
    }
  });

  function attachDropdown(trigger, items, onSelect, initialValue) {
    if (!trigger) return;
    // Popup (переиспользуем если уже есть)
    var dropdown = trigger.querySelector(':scope > .flexim-datepicker__dropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'flexim-datepicker__dropdown';
      trigger.appendChild(dropdown);
    }
    dropdown.innerHTML = '';
    items.forEach(function (it) {
      var el = document.createElement('div');
      el.className = 'flexim-datepicker__dropdown-item';
      el.textContent = it.label;
      el.dataset.value = String(it.value);
      if (String(it.value) === String(initialValue)) el.classList.add('is-active');
      el.addEventListener('click', function (ev) {
        ev.stopPropagation();
        dropdown.classList.remove('is-open');
        onSelect(it.value, it.label, el);
      });
      dropdown.appendChild(el);
    });

    // Триггер: клик по любой части (кроме самого popup) → toggle
    trigger.addEventListener('click', function (e) {
      if (e.target.closest('.flexim-datepicker__dropdown')) return;
      var isOpen = dropdown.classList.contains('is-open');
      closeAllDropdowns(dropdown);
      if (isOpen) {
        dropdown.classList.remove('is-open');
      } else {
        dropdown.classList.add('is-open');
        var active = dropdown.querySelector('.is-active');
        if (active) active.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  function renderCalendarGrid(root, year, month, selectedISO) {
    var calendar = root.querySelector('.flexim-datepicker__calendar');
    if (!calendar) return;
    // Оставляем только weekdays; всё остальное перерисовываем
    var weekdays = calendar.querySelector('.flexim-datepicker__weekdays');
    calendar.innerHTML = '';
    calendar.appendChild(weekdays);

    var firstDay = new Date(year, month, 1);
    // JS Sunday=0, Monday=1... Хотим Пн=0
    var startWeekday = (firstDay.getDay() + 6) % 7;
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var daysInPrev  = new Date(year, month, 0).getDate();

    var today = new Date();
    var todayISO = today.getFullYear() + '-' + pad2(today.getMonth()+1) + '-' + pad2(today.getDate());

    var totalCells = Math.ceil((startWeekday + daysInMonth) / 7) * 7;
    var week = null;

    for (var i = 0; i < totalCells; i++) {
      if (i % 7 === 0) {
        week = document.createElement('div');
        week.className = 'flexim-datepicker__week';
        calendar.appendChild(week);
      }
      var cell = document.createElement('span');
      cell.className = 'flexim-datepicker__day';

      var dayNum, cellYear, cellMonth;
      if (i < startWeekday) {
        dayNum = daysInPrev - (startWeekday - 1 - i);
        cellMonth = month - 1;
        cellYear = year;
        if (cellMonth < 0) { cellMonth = 11; cellYear--; }
        cell.classList.add('flexim-datepicker__day--muted');
      } else if (i >= startWeekday + daysInMonth) {
        dayNum = i - (startWeekday + daysInMonth) + 1;
        cellMonth = month + 1;
        cellYear = year;
        if (cellMonth > 11) { cellMonth = 0; cellYear++; }
        cell.classList.add('flexim-datepicker__day--muted');
      } else {
        dayNum = i - startWeekday + 1;
        cellMonth = month;
        cellYear = year;
      }

      var weekdayIdx = i % 7; // 0=Пн, 6=Вс
      if (weekdayIdx >= 5) cell.classList.add('flexim-datepicker__day--weekend');

      var cellISO = cellYear + '-' + pad2(cellMonth+1) + '-' + pad2(dayNum);
      if (cellISO === todayISO) cell.classList.add('flexim-datepicker__day--today');
      if (cellISO === selectedISO) cell.classList.add('flexim-datepicker__day--selected');

      cell.textContent = dayNum;
      cell.dataset.date = cellISO;
      week.appendChild(cell);
    }
  }

  function initInstance(root) {
    if (root.dataset.dtInit === '1') return;
    root.dataset.dtInit = '1';

    // Начальное состояние: hidden input ISO → или сегодняшний день, время пустое.
    var hidden = root.querySelector('.flexim-datepicker__value-input');
    var today = new Date();
    var state = {
      year: today.getFullYear(),
      month: today.getMonth(),
      day: today.getDate(),
      hour: null,     // null = не выбрано, показываем «ч»
      minute: null    // null = не выбрано, показываем «м»
    };
    if (hidden && hidden.value) {
      var m = hidden.value.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/);
      if (m) {
        state.year = parseInt(m[1], 10);
        state.month = parseInt(m[2], 10) - 1;
        state.day = parseInt(m[3], 10);
        if (m[4]) state.hour = parseInt(m[4], 10);
        if (m[5]) state.minute = parseInt(m[5], 10);
      }
    }

    var monthTrigger = root.querySelector('.flexim-datepicker__month');
    var monthLabel   = root.querySelector('.flexim-datepicker__month-label');
    var timeSelects  = root.querySelectorAll('.flexim-datepicker__time-select');
    var hourTrigger  = timeSelects[0];
    var minTrigger   = timeSelects[1];
    var navButtons   = root.querySelectorAll('.flexim-datepicker__nav-group .flexim-datepicker__nav');
    var closeButton  = root.querySelector('.flexim-datepicker__header > .flexim-datepicker__nav[aria-label="Закрыть"]');
    var applyBtn     = root.querySelector('.flexim-datepicker__footer .btn-primary');
    var resetBtn     = root.querySelector('.flexim-datepicker__footer .btn-outline-primary');

    function selectedISO() {
      return state.year + '-' + pad2(state.month+1) + '-' + pad2(state.day);
    }
    function writeHidden() {
      if (!hidden) return;
      // Дата всегда, время — только если оба поля заполнены
      if (state.hour !== null && state.minute !== null) {
        hidden.value = selectedISO() + 'T' + pad2(state.hour) + ':' + pad2(state.minute);
      } else {
        hidden.value = selectedISO();
      }
    }
    function updateMonthLabel() {
      if (monthLabel) monthLabel.textContent = MONTHS[state.month] + ' ' + state.year;
    }
    function updateTimeLabels() {
      if (hourTrigger) {
        var hSpan = hourTrigger.querySelector(':scope > span:first-child');
        if (state.hour === null) {
          hSpan.textContent = 'ч';
          hourTrigger.classList.add('is-empty');
        } else {
          hSpan.textContent = pad2(state.hour);
          hourTrigger.classList.remove('is-empty');
        }
      }
      if (minTrigger) {
        var mSpan = minTrigger.querySelector(':scope > span:first-child');
        if (state.minute === null) {
          mSpan.textContent = 'м';
          minTrigger.classList.add('is-empty');
        } else {
          mSpan.textContent = pad2(state.minute);
          minTrigger.classList.remove('is-empty');
        }
      }
    }
    function rerenderGrid() {
      renderCalendarGrid(root, state.year, state.month, selectedISO());
    }

    // Селект месяца: 12 месяцев + быстрый переход на пред/след год
    if (monthTrigger) {
      var monthItems = MONTHS.map(function (name, idx) {
        return { label: name + ' ' + state.year, value: idx };
      });
      attachDropdown(monthTrigger, monthItems, function (val) {
        state.month = val;
        updateMonthLabel();
        rerenderGrid();
        writeHidden();
      }, state.month);
    }

    // HH: 00..23
    var hourItems = [];
    for (var h = 0; h < 24; h++) hourItems.push({ label: pad2(h), value: h });
    attachDropdown(hourTrigger, hourItems, function (val) {
      state.hour = val;
      updateTimeLabels();
      writeHidden();
    }, state.hour);

    // MM: 00..55, шаг 5
    var minItems = [];
    for (var mi = 0; mi < 60; mi += 5) minItems.push({ label: pad2(mi), value: mi });
    attachDropdown(minTrigger, minItems, function (val) {
      state.minute = val;
      updateTimeLabels();
      writeHidden();
    }, state.minute);

    // Кнопки навигации ◀ ▶
    if (navButtons.length >= 2) {
      navButtons[0].addEventListener('click', function () {
        state.month--;
        if (state.month < 0) { state.month = 11; state.year--; }
        updateMonthLabel();
        rerenderGrid();
      });
      navButtons[1].addEventListener('click', function () {
        state.month++;
        if (state.month > 11) { state.month = 0; state.year++; }
        updateMonthLabel();
        rerenderGrid();
      });
    }

    // Крест закрытия — если календарь внутри overlay/popup — просто спрятать через display:none
    if (closeButton) {
      closeButton.addEventListener('click', function () {
        var host = root.closest('.flexim-popup, .flexim-modal, [data-datepicker-host]');
        if (host) host.style.display = 'none';
      });
    }

    // Клик по ячейке даты
    root.querySelector('.flexim-datepicker__calendar').addEventListener('click', function (e) {
      var cell = e.target.closest('.flexim-datepicker__day');
      if (!cell || cell.classList.contains('flexim-datepicker__day--muted')) return;
      var iso = cell.dataset.date;
      if (!iso) return;
      var parts = iso.split('-');
      state.year = parseInt(parts[0], 10);
      state.month = parseInt(parts[1], 10) - 1;
      state.day = parseInt(parts[2], 10);
      updateMonthLabel();
      rerenderGrid();
      writeHidden();
    });

    // Reset — сбрасываем на дефолт: сегодня + время пусто
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        var now = new Date();
        state.year = now.getFullYear();
        state.month = now.getMonth();
        state.day = now.getDate();
        state.hour = null;
        state.minute = null;
        updateMonthLabel();
        updateTimeLabels();
        rerenderGrid();
        writeHidden();
      });
    }
    // Apply — просто dispatch custom event для интеграции
    if (applyBtn) {
      applyBtn.addEventListener('click', function () {
        writeHidden();
        root.dispatchEvent(new CustomEvent('flexim:datepicker-apply', {
          bubbles: true,
          detail: { value: hidden ? hidden.value : null }
        }));
      });
    }

    // Первичная отрисовка
    updateMonthLabel();
    updateTimeLabels();
    rerenderGrid();
    writeHidden();
  }

  function initAll() {
    document.querySelectorAll('.flexim-datepicker--with-time').forEach(initInstance);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
