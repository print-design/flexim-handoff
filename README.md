# Flexim Design System

Дизайн-система для проекта **Flexim** (внутреннее «Раскроитель», публично
«Принт-Дизайн»). Перекрашивает Bootstrap 4 в фирменные цвета и добавляет
дополнительные компоненты, которых нет в Bootstrap из коробки.

Создаётся параллельно реальной разработке как замена текущего визуала.
Подключается двумя `<link>`-тегами, без изменений в существующем PHP-коде.

---

## TL;DR

1. Скопировать содержимое этого репозитория в `assets/flexim/` твоего проекта.
2. В master-шаблон (header.php / layout.php), **после** подключения Bootstrap,
   добавить две строки:
   ```html
   <link rel="stylesheet" href="/assets/flexim/tokens.css">
   <link rel="stylesheet" href="/assets/flexim/flexim-overrides.css">
   ```
3. Готово. Все существующие `.btn-primary`, `.card`, `.form-control`, `.table`
   и т.п. уже стали брендовыми Flexim. Никаких правок HTML/PHP не требуется.

---

## Что в репозитории

| Файл / папка | Назначение |
|---|---|
| `tokens.css` | CSS-переменные: цвета, отступы, шрифты, тени, радиусы. Источник правды. |
| `flexim-overrides.css` | Перекрашивает Bootstrap 4 в Flexim. Использует переменные из `tokens.css`. |
| `components.html` | Визуальный каталог всех компонентов (открыть в браузере). HTML-разметку копировать **1:1**. |
| `01-orders.html` | Эталон экрана-списка: рейка + шапка-воронка + page-header + полная таблица + пагинация. |
| `02-order-card.html` | Эталон карточки заказа: вкладки + левая сводка + правый расчёт. |
| `icons.html` | Все иконки реестра в одном месте — для поиска нужной. |
| `_template.html` | Пустая болванка для новых страниц с уже подключёнными CSS. |
| `icons/icons.js` | JS-помощник: рендерит `<span data-flexim-icon="…">` в SVG. |
| `icons/svg/` | Сами SVG-иконки (если нужно вставить напрямую без JS). |
| `RULES.md` | Свод правил и частых ошибок (hover-конвенция, пагинация, full-height таблицы и т.д.). |
| `COMPONENTS.md` | Список компонентов с описаниями и пропсами. |

---

## Иконки (через JS-помощник)

В разметке иконки задаются тегом-плейсхолдером:

```html
<span data-flexim-icon="search" data-size="24" aria-hidden="true"></span>
```

После загрузки страницы вызывается `fleximIcons.renderAll()`, и плейсхолдеры подменяются на готовые `<svg>`. Подключение:

```html
<!-- Перед </body>, после jQuery -->
<script src="/assets/flexim/icons/icons.js"></script>
<script>if (window.fleximIcons) window.fleximIcons.renderAll();</script>
```

Список доступных имён иконок и поиск — в `icons.html`.

---

## Требования

- **Bootstrap 4.0.0** (точно эта версия — overrides настроены под неё).
- **jQuery 3.5.1** (только для интерактивных компонентов: модалки, табы, dropdown).
- Никаких сборщиков не нужно — CSS подключается напрямую `<link>`.
- Никаких зависимостей от React/Tailwind/Node — это чистый CSS.

---

## Шаги подключения

### 1. Скопировать файлы

Положить содержимое репозитория в директорию проекта, например
`public/assets/flexim/`:

```
public/
└── assets/
    └── flexim/
        ├── tokens.css
        ├── flexim-overrides.css
        ├── components.html      ← можно убрать с прода, оставить локально
        ├── _template.html       ← можно убрать с прода, оставить локально
        └── icons/
```

### 2. Подключить в master-шаблоне

В файле, где собирается `<head>` (header.php, layout.php, master.tpl),
**после** строк с Bootstrap CSS:

```html
<head>
  ...
  <!-- Bootstrap (как было) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">

  <!-- Flexim — добавить эти две строки -->
  <link rel="stylesheet" href="/assets/flexim/tokens.css">
  <link rel="stylesheet" href="/assets/flexim/flexim-overrides.css">
  ...
</head>
```

**Важно**: порядок имеет значение. Сначала Bootstrap, потом Flexim — иначе
переопределения не сработают.

### 3. Проверить

Открыть любую страницу проекта, где есть кнопка `.btn-primary`. Она должна
стать **розовой `#EC3A7A`** вместо синей Bootstrap-овой по умолчанию.

Если кнопка осталась синей — проверить:
- Файлы реально загрузились (DevTools → Network → нет 404).
- Порядок `<link>`: tokens.css и flexim-overrides.css **после** bootstrap.css.
- `tokens.css` подключён **раньше** `flexim-overrides.css`.

---

## Что меняется в визуале

После подключения автоматически перекрашиваются:

- **Кнопки** (`.btn-primary`, `.btn-secondary`, `.btn-success`, `.btn-danger`, ...).
- **Формы** (`.form-control`, `.form-text`, `.form-check`, `.custom-select`).
- **Карточки** (`.card`, `.card-header`, `.card-body`, `.card-footer`).
- **Таблицы** (`.table`, `.table-hover`, шапки и строки).
- **Модалки** (`.modal`, `.modal-header`, footer, overlay).
- **Бейджи и алерты** (`.badge`, `.alert-*`).
- **Табы и навигация** (`.nav-tabs`, `.nav-pills`).
- **Списки** (`.list-group`, `.list-group-item`).
- Текст, ссылки, заголовки — переходят на шрифт SF Pro Text и цвета Flexim.

**Кастомные классы Flexim** (для новых компонентов, которых нет в Bootstrap):

`.flexim-link-button--m` · `.flexim-chip-tag` · `.flexim-chip-status` ·
`.flexim-status-banner` · `.flexim-notificator` · `.flexim-loader` ·
`.flexim-dropzone-*` · `.flexim-segment-control` · `.flexim-pagination` ·
`.flexim-tabs-*` · `.flexim-sidebar` · `.flexim-menu-item` ·
`.flexim-avatar` · `.flexim-tooltip` · `.flexim-accordion-*` ·
`.flexim-alert` (новая версия) · `.flexim-list-*` · `.flexim-scrollbar`
и др.

Полный список с примерами разметки — в `components.html`.

---

## Использование новых компонентов

Если в существующем экране нужен компонент, которого нет в Bootstrap
(например, фирменный статусный бейдж или нотификатор):

1. Открыть локально `components.html` (двойной клик в файловом менеджере).
2. Найти нужный компонент в боковом оглавлении.
3. Скопировать его HTML-разметку прямо из секции каталога.
4. Вставить в свой PHP-шаблон.

Пример для статуса заказа:

```html
<!-- Из components.html, секция «Chip Status» -->
<span class="flexim-chip-status flexim-chip-status--info">В работе</span>
```

---

## Чего НЕ делать

❌ **Не переопределять CSS-переменные руками.** Если нужен новый цвет —
напиши Маше, мы добавим переменную в `tokens.css`.

❌ **Не использовать inline `style="color: #..."`, `style="font-size: ..."`.**
Только классы или `style="color: var(--primary-main)"`, если очень надо.

❌ **Не менять `flexim-overrides.css` напрямую.** Этот файл генерируется
из дизайн-системы и при следующем обновлении твои правки будут затёрты.
Если что-то требуется поправить — сообщи Маше.

❌ **Не обновлять Bootstrap до 5.x.** Overrides сделаны под Bootstrap 4.
Переход на 5 потребует перевыпуска overrides.

---

## Обновления

Когда в дизайн-систему добавляются новые компоненты или приходят
исправления, новые версии файлов появляются в этом же репозитории:

```bash
cd /path/to/flexim-design-system
git pull
```

После этого скопировать обновлённые файлы в `assets/flexim/` твоего
проекта (или настроить symlink один раз).

История изменений — в коммитах. По возможности будем писать
содержательные сообщения вида «added Modal component / fixed switch
alignment».

---

## Вопросы и обратная связь

Контакт: **Маша Пономарёва**, [p4eela@gmail.com](mailto:p4eela@gmail.com).

Всё, что непонятно или работает не так — лучше напиши, чем додумывай.
Особенно если:
- какой-то Bootstrap-класс не перекрасился, как ожидалось;
- нужен компонент, которого нет в `components.html`;
- хочется получить иконку, которой нет в `icons/`;
- понадобилось переопределить цвет/размер — это значит, что в дизайн-системе
  есть пробел, который надо закрыть централизованно.

---

## Лицензия и происхождение

Внутренний инструмент проекта Flexim. Не использовать для других проектов
без согласования.
