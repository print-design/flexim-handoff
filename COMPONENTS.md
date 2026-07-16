# Flexim Design System — каталог компонентов

> **Главное правило для AI и для человека:**  
> Любой новый экран собирается **только из компонентов этой библиотеки**.  
> Если нужного компонента нет — это повод не верстать с нуля, а сначала
> убедиться в Figma UI Kit, что его правда нет, и только потом обсудить
> добавление нового.

Этот файл — единственный источник правды по тому, **что у нас уже есть**
и **как этим пользоваться**. AI обязан сверяться с ним перед написанием
любого UI-кода.

---

## Где живут компоненты

Библиотека существует параллельно в двух стеках:

| Стек | Где лежат компоненты | Назначение |
|---|---|---|
| **React** (флакон-песочница) | `flexim-app/src/components/ui/` | Интерактивное превью, обучение, демо |
| **Bootstrap** (для прода) | `prod-mockups/_bootstrap-flexim-overrides.css` + секции `prod-mockups/components.html` | Реальная сборка экранов для PHP-программиста |

**Оба каталога эквивалентны** — каждый компонент существует в обеих версиях
и выглядит одинаково.

> **Для сборки моков под прод бери разметку из живого каталога
> `prod-mockups/components.html`** (открыть в браузере) — там точные актуальные
> классы и все состояния, копировать 1:1. Все иконки — `prod-mockups/icons.html`;
> в разметке только `<span data-flexim-icon="имя" data-size="24"></span>`
> + `fleximIcons.renderAll()`. Названия классов ниже могут отставать от каталога —
> при расхождении источник истины это `index.html` и Figma.

**Источник правды — Figma UI Kit:**  
<https://www.figma.com/design/UiLaH9DTg1eFx3d7tC7fyO/Flexim>

Перед правкой существующего компонента — обязательно сверь его с Figma
через MCP (`get_design_context` по `node-id`). Никаких «приблизительно».

---

## Общие принципы стилизации

1. **Только токены.** Никаких `#hex`, `rgb()`, `font-size: 14px` руками.
   Все значения берутся из `design-system/tokens.css` или из Tailwind preset
   `design-system/tailwind.config.js`.
2. **Никаких arbitrary px в Tailwind** (`text-[13px]`, `p-[7px]` и т.п.),
   если это не размер структурного контейнера (модалка 400/600/800, ширина
   sidebar 240/64 — это ок).
3. **Цвет текста и font-size — два разных класса.** Через `cn()` в проекте
   настроен расширенный tailwind-merge, который понимает наши кастомные
   `text-h1`, `text-body`, `text-note` как font-size, и не путает их с
   `text-info-contrast`/`text-text-primary` (color).
4. **pnpm only** в React-песочнице. Не `npm`, не `yarn`.
5. **Bootstrap версии — точно как в проде:** Bootstrap **4.0.0** + jQuery **3.5.1**.
   Не новее.

---

## Токены

### Цвета

**Бренд:**

| Класс Tailwind | CSS-переменная | Значение |
|---|---|---|
| `primary-main` | `--primary-main` | `#EC3A7A` |
| `primary-light` | `--primary-light` | `#FF0E65` |
| `primary-dark` | `--primary-dark` | `#D32564` |
| `primary-50` | `--primary-50` | `#FBEDF2` |
| `primary-contrast` | `--primary-contrast` | `#FFFFFF` |

**Семантика:**

| Класс | Назначение |
|---|---|
| `success-main` / `success-5` / `success-20` / `success-contrast` | OK, успех |
| `warning-main` / `warning-5` / `warning-20` / `warning-contrast` | Внимание |
| `error-main` / `error-light` / `error-dark` / `error-50…1100` | Ошибка / уничтожить |
| `info-main` / `info-5` / `info-20` / `info-contrast` | Информация, нейтральный счётчик |
| `neutral-main` / `neutral-5` / `neutral-20` | Нейтральные индикаторы |

**Текст:** `text-primary`, `text-secondary`, `text-tertiary`, `text-disabled`, `text-contrast`.

**Поверхности:** `surface-white`, `surface-disabled`, `surface-controls`,
`background-paper`, `background-bg`.

**Прочее:** `other-lines`, `other-table-hover`.

**Инфографика** (для аватарок, графиков, статусов): `infographic-blue`,
`infographic-purple`, `infographic-violet`, `infographic-pink`,
`infographic-orange`, `infographic-yellow`, `infographic-terracot`,
`infographic-brick`, `infographic-shrek`, `infographic-green`, `infographic-black`.  
У каждого есть `/5` (5% непрозрачности для фона) и `/20` (20%).

### Spacing (отступы)

| Класс | Значение |
|---|---|
| `xxs` | 4px |
| `xs` | 8px |
| `s` | 12px |
| `m` | 16px |
| `l` | 20px |
| `xl` | 24px |
| `xxl` | 32px |
| `xxxl` | 40px |
| `control-m` | 40px (высота кнопок/полей M) |
| `control-s` | 32px (высота кнопок/полей S) |

Применяются как `p-m`, `px-l`, `gap-xs`, `m-xxl`, `min-h-control-m`.

### Типографика

| Класс | Размер / line-height / weight | Назначение |
|---|---|---|
| `text-h1` | 30 / 36 / 700 | Главный заголовок |
| `text-h1-r` | 30 / 36 / 400 | H1 regular |
| `text-h2` | 24 / 28 / 700 | Раздел |
| `text-h2-r` | 24 / 28 / 500 | H2 medium |
| `text-h3` | 18 / 24 / 700 | Подраздел |
| `text-h3-r` | 18 / 24 / 400 | H3 regular |
| `text-h4` | 14 / 20 / 600 | Малый заголовок / lead |
| `text-body` | 14 / 20 / 400 | Основной текст |
| `text-btn` | 14 / 20 / 700 | Кнопки |
| `text-menu` | 14 / 16 / 600 | Меню, навигация |
| `text-tbl` | 14 / 16 / 400 | Таблицы |
| `text-label` | 11 / 12 / 400 | Подписи к полям |
| `text-label-b` | 12 / 14 / 700 (letter 0.04em) | Капс-теги |
| `text-note` | 9 / 8 / 500 | Микро-счётчики |

### Тени

| Класс | Назначение |
|---|---|
| `shadow-s` | Карточки, hover дефолтных полей |
| `shadow-m` | Поднятые элементы, модалки |
| `shadow-l` | Тосты, оверлеи |
| `shadow-brand-s` / `shadow-brand-m` | Брендовые тени для primary-кнопок |
| `shadow-hover` | Универсальная hover-тень полей |

### Радиусы

`rounded-sm` (4) · `rounded` (4) · `rounded-md` (6) · `rounded-lg` (8) ·
`rounded-xl` (12) · `rounded-2xl` (16) · `rounded-3xl` (24) · `rounded-full` (50%).

---

## Компоненты

### 🔘 Кнопки и ссылки

#### Button

`flexim-app/src/components/ui/button.tsx`

```tsx
import { Button } from '../../components/ui/button';
```

| Prop | Тип | По умолчанию |
|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'error'` | `primary` |
| `size` | `'m' \| 's' \| 'icon-m' \| 'icon-s'` | `m` |
| `asChild` | `boolean` | `false` |

```tsx
<Button variant="primary" size="m">Сохранить</Button>
<Button variant="secondary" size="s">Отмена</Button>
<Button variant="ghost" size="icon-m"><Plus /></Button>
<Button variant="error">Удалить</Button>
```

**Bootstrap:** `.btn .btn-primary .flexim-btn-m` (и аналоги `flexim-btn-s`,
`flexim-btn-icon-m` / `--icon-s`, `flexim-btn-ghost`, `flexim-btn-error`).

---

#### LinkButton

`flexim-app/src/components/ui/link-button.tsx`

```tsx
import { LinkButton } from '../../components/ui/link-button';
```

Размеры **m** (14/20 bold, gap 8) и **s** (11/12 regular, gap 4).
Цвета: default `--primary-main`, hover `--primary-light`, disabled `--text-disabled`.

**Bootstrap:** `<button class="btn btn-link flexim-link-button--m">…</button>`
(или `--s`).

---

### 📝 Формы

#### Input

`flexim-app/src/components/ui/input.tsx`

```tsx
import { Input } from '../../components/ui/input';
```

| Prop | Тип | Назначение |
|---|---|---|
| `label` | `string` | Лейбл сверху |
| `required` | `boolean` | Звёздочка перед лейблом |
| `error` | `string` | Подсветка ошибки + текст под shell |
| `leftAdornment` / `rightAdornment` | `ReactNode` | Иконки слева/справа |
| `suffix` | `string` | Текст внутри shell (например, «%») |
| `onClear` / `clearLabel` | `() => void` / `string` | Кнопка очистки |
| `filled` | `'on' \| 'off'` | Состояние shell (auto по значению) |
| `disabled` / `readOnly` | стандартные HTML |

```tsx
<Input label="Артикул" placeholder="Введите номер" required />
<Input label="Количество" suffix="шт" defaultValue={1500} />
<Input label="Email" error="Некорректный e-mail" />
```

**Bootstrap (каталог `#forms`):** `.flexim-input-field` + `.flexim-input-field__label`
+ `.flexim-input` (shell 40px). Лейбл — `text-primary`, 11/12; звёздочка `.req` —
`primary-main`. Модификатор **большого лейбла:** `.flexim-input-field--lg-label`
(H4 Semibold 14/20, звёздочка остаётся 11/12). Матрица состояний × вариантов в
`prod-mockups/components.html`.

---

#### Textarea

`flexim-app/src/components/ui/textarea.tsx`. Та же модель что Input
(label, error, required), shell 104px минимум, авто-resize.

```tsx
<Textarea label="Комментарий" rows={4} />
```

---

#### SearchField

`flexim-app/src/components/ui/search-field.tsx`. Поверх Input — с иконкой
лупы слева и crear по умолчанию. Используется в шапке, фильтрах, dropdown.

```tsx
<SearchField placeholder="Поиск…" onClear={() => setQuery('')} value={query} />
```

**Bootstrap-разметка** (`prod-mockups/_bootstrap-flexim-overrides.css`):
`.flexim-search` (колонка) → `.flexim-search__field` (40px shell с иконкой и
полем) → `.flexim-search__chips` (контейнер чипов внутри) → `.flexim-search__input`
→ `.flexim-search__clear-all` (×). См. подробнее «Search в топбаре» ниже.

---

#### Search в топбаре (collapsed-search)

Компактный поиск в шапке экрана: по умолчанию показывает только иконку лупы,
разворачивается в полноценное поле при фокусе или когда в нём есть чипы.

**Поведение:**

- **Default** (нет чипов, не в фокусе): только розовая иконка-лупа, без фона
  и бордера. На hover — иконка становится `primary-light`.
- **Focused / has chips**: поле разворачивается до min-width 220px, появляются
  фон `background-bg`, бордер `other-lines`, инпут с плейсхолдером «Поиск».
- **Чип не влезает в 220px**: поле «хагает» (растёт под содержимое).
- **Печать**: инпут растёт под текст (`field-sizing: content`), поле тоже растёт.
- **Enter в инпуте**: текст → новый чип, инпут очищается.
- **× на чипе**: снимает один чип. **× справа в поле**: снимает все.
- **Backspace в пустом инпуте**: снимает последний чип.
- **Клик по чипу (не по ×)**: toggle чип «выключен/включён» (is-off — не
  участвует в фильтре, но в DOM остаётся).

**Bootstrap-разметка** (статичная, см. шапку `prod-mockups/01-orders.html`):

```html
<div class="flexim-search-row flexim-search-row--fill" data-flexim-search>
  <div class="flexim-search flexim-search--fill">
    <div class="flexim-search__field">
      <span class="flexim-search__icon" data-flexim-icon="search" data-size="24" aria-hidden="true"></span>
      <div class="flexim-search__chips"></div>
      <input class="flexim-search__input" type="text" placeholder="Поиск">
      <button type="button" class="flexim-search__clear-all" aria-label="Очистить всё">
        <span data-flexim-icon="x-small" data-size="16" aria-hidden="true"></span>
      </button>
    </div>
  </div>
</div>
```

**Подключение поведения** (один тег в конце страницы):

```html
<script src="./_search-topbar.js"></script>
```

`_search-topbar.js` навешивает обработчики на любые `[data-flexim-search]` на
странице (add chip, remove, toggle, фильтр строк ближайшей `.flexim-table`).
Фильтр — substring AND по всем активным чипам.

**Где использовать:** топбар любого экрана-списка (заказы, склад, план,
упаковка и т.д.) — везде где над таблицей нужна шапка с быстрым поиском.

---

#### DatePickerField

`flexim-app/src/components/ui/date-picker-field.tsx`. Input с иконкой
календаря справа и масками. Реальный календарь подключается отдельно
(сейчас плейсхолдер).

---

#### Date picker (календарь)

Выпадающий календарь. **Bootstrap:** `.flexim-datepicker` в
`prod-mockups/_bootstrap-flexim-overrides.css` (базовый класс) + модификаторы.
Каталог: `prod-mockups/components.html` → секция `#datepicker`.

**Три варианта:**

| Модификатор | Назначение | Figma |
|---|---|---|
| без модификатора | Базовый — диапазон дат (`__range` с двумя полями `03.12.2023 – 03.12.2023`) | 4370:124074 |
| `--with-time` | Одиночная дата + селекты часов и минут в шапке | **8056:17909** |
| `--presets` | С колонкой пресетов слева (Сегодня, Вчера, Эта неделя, Этот месяц, Этот квартал, Этот год) | — |

##### Разметка `--with-time` (ширина 420, padding и radius 24)

```html
<div class="flexim-datepicker flexim-datepicker--with-time">
  <div class="flexim-datepicker__header">
    <div class="flexim-datepicker__nav-group">
      <button class="flexim-datepicker__nav">◀</button>
      <button class="flexim-datepicker__nav">▶</button>
    </div>
    <button class="flexim-datepicker__nav">×</button>
  </div>

  <div class="flexim-datepicker__month-time">
    <div class="flexim-datepicker__month">
      <span class="flexim-datepicker__month-label">Сентябрь 2024</span>
      <span data-flexim-icon="arrow-down-small" data-size="24"></span>
    </div>
    <div class="flexim-datepicker__time">
      <div class="flexim-datepicker__time-select is-empty"><span>ч</span><span data-flexim-icon="arrow-down-small" data-size="24"></span></div>
      <span class="flexim-datepicker__time-sep">:</span>
      <div class="flexim-datepicker__time-select is-empty"><span>м</span><span data-flexim-icon="arrow-down-small" data-size="24"></span></div>
    </div>
  </div>

  <div class="flexim-datepicker__calendar"><!-- weekdays + weeks --></div>
  <div class="flexim-datepicker__footer">
    <button class="btn btn-primary">Применить</button>
    <button class="btn btn-outline-primary">Сбросить</button>
  </div>
  <input type="hidden" class="flexim-datepicker__value-input" name="datetime" value="">
</div>
```

##### Состояния ячейки даты (`.flexim-datepicker__day`)

| Модификатор | Что выглядит |
|---|---|
| — (default) | Обычный день, `--text-primary` |
| `--weekend` | Сб/Вс, `--primary-main` (розовый) |
| `--muted` | Соседний месяц, `--text-disabled` (побеждает `--weekend`) |
| `--today` | Сегодня, border 1px `--other-lines` |
| `--selected` | Одиночный выбор, фон `--primary-50` + текст `--primary-main` |
| `--range` | Средняя ячейка диапазона, фон-полоса `--primary-50` |
| `--range-start` / `--range-end` | Концы диапазона, розовый кружок `--primary-main` + белый текст |

**Hover:** пустая ячейка → лёгкий `--other-table-hover`; `--today` → `--primary-50`;
`--selected` → чуть темнее (`--primary-100`). Muted/range — без hover.

##### Селекты HH:MM

- Ширина 80px, высота 40, `padding 4/12`, `border-radius 8`. Между HH и MM — `«:»` gap 4.
- **Placeholder-состояние:** класс `.is-empty` → текст `«ч»` / `«м»` цветом `--text-tertiary`.
  Как только пользователь выбрал значение — класс снимается, показывается число (`pad2`).
- Hover → бордер `--primary-main`. Focus/open → бордер + 3px розовое кольцо `--primary-50`.
- Список часов 00..23, минут — 00..55 с шагом 5.

##### Живая логика (`_datepicker-time.js`)

Подключён в каталоге и в превью. Автоматически находит все
`.flexim-datepicker--with-time` и оживляет их:

- селекты месяца / часов / минут открывают dropdown списком;
- стрелки ◀ ▶ переключают месяц (с перескоком года);
- клик по ячейке (кроме `--muted`) выбирает дату;
- крест закрывает overlay-хост (`.flexim-popup` / `.flexim-modal` / `[data-datepicker-host]`);
- «Сбросить» — сегодня + время пусто;
- «Применить» — обновляет hidden input + диспатчит `flexim:datepicker-apply`;
- **По умолчанию: сегодняшний день выбран, время «ч/м» пустое.**

**Скрытый input** `.flexim-datepicker__value-input` пишется в ISO 8601:
- без времени: `2024-09-09`
- с временем: `2024-09-09T14:30` (только если оба поля заполнены).

##### React

Полноценный компонент календаря в React пока не реализован (есть
`DatePickerField` — только input с маской). Для новых экранов брать
Bootstrap-вариант из каталога.

---

#### SelectField

`flexim-app/src/components/ui/select.tsx`

```tsx
import { SelectField, type SelectOption } from '../../components/ui/select';
```

| Prop | Тип |
|---|---|
| `options` | `SelectOption[]` (`{ value, label }`) |
| `value` / `onChange` | `string` / `(v: string) => void` |
| `label` / `required` / `error` / `disabled` | как у Input |
| `placeholder` | `string` |

```tsx
<SelectField
  label="Машина"
  options={[{ value: 'soma', label: 'Soma' }, { value: 'fischer', label: 'Fischer' }]}
  value={machine}
  onChange={setMachine}
/>
```

---

#### Checkbox / RadioGroup / Switch

`checkbox.tsx`, `radio-group.tsx`, `switch.tsx`.

```tsx
<Checkbox label="Подписаться на рассылку" checked={agreed} onChange={...} />

<RadioGroup value={size} onChange={setSize} name="size">
  <RadioItem value="m" label="M" />
  <RadioItem value="l" label="L" />
</RadioGroup>

<Switch label="Авто-резерв плёнки" checked={auto} onChange={...} />
```

**Bootstrap:** `.flexim-checkbox`, `.flexim-radio`, `.flexim-switch`.

---

#### FieldLabel / FieldError / FieldShell (атомы)

`flexim-app/src/components/ui/field.tsx`. Низкоуровневые блоки, на которых
построены Input/Textarea/Select. Использовать **только**, если собираешь
кастомное поле, которого нет в библиотеке.

---

### 🏷️ Индикаторы

#### ChipTag

`flexim-app/src/components/ui/chip-tag.tsx`. Цветные «теги»: пастельный фон + цветной текст.

| Prop | Тип |
|---|---|
| `variant` | один из инфографических цветов (`blue`/`pink`/…) |
| `size` | `'m' \| 's'` |
| `onRemove` | `() => void` (показывает крестик) |

```tsx
<ChipTag variant="pink" size="m">Pantone 219C</ChipTag>
<ChipTag variant="blue" size="s" onRemove={() => …}>Удалимо</ChipTag>
```

---

#### ChipStatus

`flexim-app/src/components/ui/chip-status.tsx`. Статусные плашки.
12 предопределённых вариантов: `new`, `inProgress`, `done`, `paused`,
`canceled`, `urgent`, `approved`, `rejected`, `draft`, `archived`,
`waiting`, `attention`.

```tsx
<ChipStatus variant="inProgress">В работе</ChipStatus>
<ChipStatus variant="done">Готово</ChipStatus>
```

---

#### StatusBanner

`flexim-app/src/components/ui/status-banner.tsx`. **Карточный** баннер статуса
на всю ширину карточки заказа (max 520px, radius 12, pad 12×16, gap 8px,
иконка 24px, text-h4). Не путать с табличным `ChipStatus` в списке заказов.

**Визуальный эталон прод-статусов:** `prod-mockups/_status-banners-column.html`.
Стиль **outline** — белый фон, цветной бордер 1px, цветной текст и иконка,
пара «иконка + текст» по центру.

**15 продовых статусов** (порядок по ходу заказа; цвета — как на проде, не Figma):

| # | Ключ | Подпись | Цвет | Иконка | Прогресс |
|---|---|---|---|---|---|
| 1 | `draft` | Черновик | neutral | `Pencil` | — |
| 2 | `calc-done` | Сделан расчёт | infographic-blue | `Check` | — |
| 3 | `tech-card` | Составлена тех. карта | infographic-terracot | `FileText` | — |
| 4 | `wait-approval` | Ждём подтверждения | warning | `Clock` | — |
| 5 | `wait-plan` | Ждём постановки в план | success | `CheckCheck` | — |
| 6 | `rejected` | Отклонено | error | `XCircle` | — |
| 7 | `plan-print` | В плане печати | infographic-violet | `Printer` | — |
| 8 | `plan-lam` | В плане ламинации | infographic-violet | `Layers` | — |
| 9 | `plan-cut` | В плане резки | infographic-indigo* | `Scissors` | — |
| 10 | `cutting` | Режется | infographic-pink | `Scissors` | да |
| 11 | `cut-stopped` | Сняли с резки | infographic-pink | `XCircle` | подзаголовок |
| 12 | `ready-pack` | Готово к упаковке | infographic-blue | `Boxes` | да |
| 13 | `wait-ship` | Ждёт отгрузки | infographic-mauve* | `Package` | да |
| 14 | `shipped` | Отгружено | warning | `Package` | да |
| 15 | `in-trash` | В корзине | infographic-black | `Trash2` | — |

\* `infographic-indigo`, `infographic-mauve`, `infographic-cyan` — токены сняты
на глаз с прода; **TODO: уточнить в Figma**.

```tsx
<StatusBanner type="calc-done" />
<StatusBanner type="shipped" progress="767,71 из 700 кг" />
```

| Prop | Тип | Описание |
|---|---|---|
| `type` | `StatusBannerType` | Ключ статуса |
| `progress` | `string?` | «X из Y кг/шт» или подзаголовок (напр. «: дошнга») |
| `action` | `{ label, onClick? }?` | Кнопка справа (Figma «Пересчитать») |

Все 15 статусов — outline: белый фон, цветной бордер и текст, без заливки.

**Bootstrap-зеркало:** `.flexim-status-banner` + модификатор цвета
(`--success`, `--warning`, `--error`, `--neutral`, `--info`, `--blue`, `--terracot`,
`--violet`, `--indigo`, `--mauve`, `--black`, …) + `.flexim-status-banner--outline`
для прод-стиля. Прогресс: `<span class="flexim-status-banner__progress">`.
Полный набор — `prod-mockups/components.html` → секция Statuses.

---

#### Notificator

`flexim-app/src/components/ui/notificator.tsx`. Счётчик-капля.

| Prop | Тип |
|---|---|
| `size` | `'m' \| 's'` (20×20 / 12×12) |
| `count` | `number \| string` |
| `max` | `number` (например, `99` → выведет `99+`) |

```tsx
<Notificator count={4} size="m" />
<Notificator count={150} size="m" max={99} /> // → 99+
```

Цвет фона — `info-main` (фиолетовый), текст — белый.

---

#### Loader

`flexim-app/src/components/ui/loader.tsx`. Кружок-крутилка из бренд-цветов.
Пропс `size`: `s` / `m` / `l`.

```tsx
<Loader size="m" />
```

---

### 📦 Контейнеры

#### Card

`flexim-app/src/components/ui/card.tsx`

```tsx
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
} from '../../components/ui/card';
```

Карточка с радиусом 12, тенью `shadow-s`, бордером `other-lines`.
Использовать для всего что «контент в рамке»: заказ, спецификация, фильтр.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Заказ № 5821</CardTitle>
    <CardDescription>Создан 14 мая</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>
    <Button variant="primary">В работу</Button>
  </CardFooter>
</Card>
```

---

#### Alert

`flexim-app/src/components/ui/alert.tsx`. Всплывающее уведомление-карточка.

| Prop | Тип |
|---|---|
| `variant` | `'success' \| 'warning' \| 'error' \| 'info'` |
| `title` | `string` |
| `description` | `string` |
| `action` | `ReactNode` (кнопка/ссылка) |
| `onClose` | `() => void` |

```tsx
<Alert
  variant="success"
  title="Сохранено"
  description="Изменения применены"
  onClose={() => …}
/>
```

---

#### Accordion + AccordionItem

`flexim-app/src/components/ui/accordion.tsx`.

| Prop | Тип |
|---|---|
| `type` | `'row' \| 'panel'` (плоский ряд / карточка) |
| `title` / `description` / `children` | контент |
| `defaultOpen` | `boolean` |

```tsx
<Accordion>
  <AccordionItem type="panel" title="Параметры печати">
    …содержимое…
  </AccordionItem>
</Accordion>
```

---

#### Dropzone

`flexim-app/src/components/ui/dropzone.tsx`.

`variant: 'line' | 'area'` (компактная строка / большая зона).
Поддерживает drag-and-drop и file picker.

```tsx
<Dropzone variant="area" label="Перетащите файл сюда" accept="image/*" />
```

**Bootstrap:** `.flexim-dropzone-line`, `.flexim-dropzone-area`.

---

#### Attachment (вложения)

Bootstrap: атомы в `_bootstrap-flexim-overrides.css`, каталог
`components.html` → секция `#attachment`. Figma `7183:62796`
(атомы) и `7183:53855` (полный флоу с модалкой удаления и Lightbox).

**Назначение:** прикрепление файлов в формах — карточка «Ручей»,
ТЗ, комментарии заказа. Одна прикреплённая роль (например, «С подписью
заказчика» / «Без подписи заказчика») = одна пара **[кнопка upload,
миниатюра]**. Пока файла нет — показывается кнопка; после загрузки на
её месте появляется миниатюра.

**Атомы:**

| Класс | Что делает |
|---|---|
| `.flexim-attachment-upload` | Кнопка «Загрузить» — pill h-40, тень M, иконка `upload` 24px + текст Bold 14/20 `--primary-main`. Триггер `<input type="file">` (скрытый). |
| `.flexim-attachment-card` | Миниатюра 80×84, radius 10, border 2px `--primary-main`, `overflow: hidden`. Внутри `.flexim-attachment-card__img`. |
| `.flexim-attachment-card--loading` | Модификатор: картинка `opacity: 0.5`, поверх — `.flexim-attachment-card__spinner` (CSS-анимация, 16px). |
| `.flexim-attachment-card--error` | Модификатор: **фон `--error-20`** (розовая заливка), border `--error-main`, картинка приглушена (`opacity: 0.5`), поверх — `.flexim-attachment-card__error-x` (24px крестик, цвет `--error-main`). |
| `.flexim-attachment--error` | Модификатор обёртки: `max-width: 120px` (перенос длинной ошибки) + красит подпись в `--error-dark` (#E2223B). |
| `.flexim-attachment-card--interactive` | Добавляет `cursor: pointer` — карточка кликабельна (открывает Lightbox). |
| `.flexim-attachment-caption` | Подпись под карточкой: текст 11/12 + крестик 16px удалить. |
| `.flexim-attachment` | Обёртка карточка + подпись, `flex-direction: column`, `gap: 8`. |
| `.flexim-attachment-progress-text` | Двухстрочная подпись под loading-карточкой: имя файла + «X% загружено». |
| `.flexim-attachment-row` | Ряд миниатюр, `gap: 20`, `flex-wrap: wrap`. |
| `.flexim-attachment-buttons` | Ряд кнопок upload, `gap: 16`, `flex-wrap: wrap`. |

**Разметка одной ячейки (уже загруженный файл):**

```html
<div class="flexim-attachment">
  <div class="flexim-attachment-card flexim-attachment-card--interactive">
    <img class="flexim-attachment-card__img" src="/uploads/original.png" alt="С подписью заказчика">
  </div>
  <span class="flexim-attachment-caption">
    С подписью
    <button type="button" class="flexim-attachment-caption__dismiss" aria-label="Удалить файл">
      <span data-flexim-icon="x-small" data-size="16" aria-hidden="true"></span>
    </button>
  </span>
</div>
```

**Loading (в момент загрузки):**

```html
<div class="flexim-attachment">
  <div class="flexim-attachment-card flexim-attachment-card--loading">
    <img class="flexim-attachment-card__img" src="[preview-data-url]" alt="">
    <div class="flexim-attachment-card__spinner" role="progressbar" aria-label="Загрузка"></div>
  </div>
  <span class="flexim-attachment-progress-text">
    <span class="flexim-attachment-progress-text__filename">image (33).png</span>
    <span class="flexim-attachment-progress-text__status">61% загружено</span>
  </span>
</div>
```

**Error:** обёртка получает модификатор `--error` (перенос длинной подписи +
красный цвет), карточка — `--error` (розовая заливка + красная рамка + крестик
удалить в центре). В подписи **нет крестика удалить** — только текст, красным.

```html
<div class="flexim-attachment flexim-attachment--error">
  <div class="flexim-attachment-card flexim-attachment-card--error">
    <img class="flexim-attachment-card__img" src="[preview-data-url]" alt="">
    <button type="button" class="flexim-attachment-card__error-x" aria-label="Ошибка, удалить">
      <span data-flexim-icon="x" data-size="24" aria-hidden="true"></span>
    </button>
  </div>
  <span class="flexim-attachment-caption">Ошибка.<br>Максимум 20 mb</span>
</div>
```

**Полный флоу (форма «Ручей»):**

```html
<div class="card" style="padding: 20px;">
  <h3>Ручей 1 (400 мм)</h3>

  <div class="flexim-input-field">
    <label class="flexim-input-field__label">Наименование</label>
    <div class="flexim-input">…Input…</div>
  </div>

  <div class="flexim-input-field__label" style="font-weight:600">Загрузите файл оригинал-макета</div>

  <div class="flexim-attachment-buttons">
    <button type="button" class="flexim-attachment-upload">
      <span data-flexim-icon="upload" data-size="24"></span>
      С подписью заказчика
    </button>
    <button type="button" class="flexim-attachment-upload">
      <span data-flexim-icon="upload" data-size="24"></span>
      Без подписи заказчика
    </button>
  </div>

  <div class="flexim-attachment-row">
    <!-- Миниатюры уже загруженных файлов -->
  </div>
</div>
```

**Флоу и правила:**

- **Одна роль = одна пара [кнопка, миниатюра].** После загрузки роль
  «С подписью заказчика» — на её месте миниатюра; до загрузки —
  кнопка. Не показывать оба одновременно.
- **Роль в подписи** («С подписью» / «Без подписи») определяется формой,
  а не именем файла. Пользователь не переименовывает роль.
- **Клик по картинке** (карточка с `--interactive`) → открывает Lightbox
  (используй существующий `.flexim-modal` с большим изображением
  внутри, полноэкранный, тёмный backdrop).
- **Клик по крестику подписи** → открывает модалку подтверждения
  удаления (обычный `.flexim-modal` с двумя кнопками: «Удалить»
  primary, «Отмена» ghost). После подтверждения роль возвращается в
  состояние «кнопка upload».
- **Валидация размера файла** — на клиенте до отправки на сервер.
  Превышен максимум — сразу рисуем `--error`, XHR не начинаем.
- **Тип файла** — валидировать через `accept` на `<input type="file">`
  + бэкенд-проверку. Если не соответствует — `--error` с текстом
  «Формат не поддерживается».
- **Прогресс загрузки** — тянуть из события `xhr.upload.progress` или
  `fetch` с `ReadableStream`, обновлять текст `.__status`.
- **Клавиатурная доступность:** все кликабельные части — `<button
  type="button">` (кнопка upload, крестик подписи, крестик ошибки,
  сама карточка `--interactive`). НЕ `<div>` с `onClick`.
- **Порядок в ряду:** `flex-wrap: wrap` — при узком экране переносятся,
  ширина карточки не растягивается.

**Модалка удаления и Lightbox** — не отдельные компоненты, а типовое
применение `.flexim-modal`. См. секцию **Modal** в этом файле.

**React** — компонент `flexim-app/src/components/ui/attachment.tsx`
пока не реализован. Для новых экранов брать Bootstrap-разметку из
каталога.

---

#### Filter

Кнопка-пилюля в панели фильтров таблицы. Стили в
`prod-mockups/_bootstrap-flexim-overrides.css`: `.flexim-filter`,
`.flexim-filter__arrow`.

**Filter-dropdown:** `.flexim-filter-dd` оборачивает кнопку и поповер
`.flexim-filter-dd__menu` (тот же `.flexim-dropdown`). Сверху — опционально
`.flexim-filter-dd__search` с `.flexim-search__field`; для свободного ввода —
`.flexim-filter-dd__footer` с «Применить / Сбросить». Открытие: класс
`is-open` на `.flexim-filter-dd`, jQuery как на `01-orders.html`.

```html
<div class="flexim-filter-dd">
  <button type="button" class="flexim-filter" aria-haspopup="true" aria-expanded="false">
    Шт / кг <span class="flexim-filter__arrow" data-flexim-icon="arrow-down-small" data-size="24"></span>
  </button>
  <div class="flexim-filter-dd__menu flexim-dropdown" role="menu">…</div>
</div>
```

Каталог: `prod-mockups/components.html` → секция **Filter**.

---

#### List + ListItem

`flexim-app/src/components/ui/list.tsx`. Двух-колоночные списки «лейбл — значение».

| Prop | Тип |
|---|---|
| `align` | `'left' \| 'right'` (выравнивание значения) |
| `separator` | `boolean` |
| `chevron` | `boolean` (стрелка справа) |
| `onEdit` | `() => void` (иконка-карандаш) |

```tsx
<List separator>
  <ListItem label="Тираж" value="5 000 шт" />
  <ListItem label="Плёнка" value="ПЭТ 30 мкм" chevron onEdit={…} />
</List>
```

---

### 🧭 Навигация

#### Pagination

`flexim-app/src/components/ui/pagination.tsx`. Постраничная навигация.

| Prop | Тип |
|---|---|
| `page` / `total` | `number` |
| `onChange` | `(page: number) => void` |
| `size` | `'m' \| 's'` |

```tsx
<Pagination page={3} total={42} onChange={setPage} />
```

---

#### Tabs

`flexim-app/src/components/ui/tabs.tsx`.

| Prop | Тип |
|---|---|
| `options` | `TabOption[]` (`{ value, label, count? }`) |
| `value` / `onChange` | controlled |
| `variant` | `'underline' \| 'pill'` |
| `size` | `'m' \| 's'` |

```tsx
<Tabs
  variant="underline"
  options={[
    { value: 'open', label: 'Открытые', count: 12 },
    { value: 'done', label: 'Закрытые' },
  ]}
  value={tab}
  onChange={setTab}
/>
```

Если в табе есть счётчик — он будет использовать `ChipTag size="s"` под капотом.

---

#### SegmentControl

`flexim-app/src/components/ui/segment-control.tsx`. Группа из 2–4 переключателей.

| Prop | Тип |
|---|---|
| `options` | `SegmentOption[]` |
| `variant` | `'filled' \| 'outline'` |
| `value` / `onChange` | controlled |

```tsx
<SegmentControl
  variant="filled"
  options={[{ value: 'day', label: 'День' }, { value: 'week', label: 'Неделя' }]}
  value={view}
  onChange={setView}
/>
```

---

#### DropdownMenu

`flexim-app/src/components/ui/dropdown-menu.tsx`. Меню-оверлей.

```tsx
<DropdownMenu>
  <DropdownMenuHeader title="Сергей" subtitle="Технолог" />
  <DropdownItem icon={<User />}>Профиль</DropdownItem>
  <DropdownItem icon={<Settings />}>Настройки</DropdownItem>
  <DropdownDivider />
  <DropdownItem icon={<LogOut />}>Выйти</DropdownItem>
  <DropdownFooter>
    <DropdownFooterButton>Все настройки</DropdownFooterButton>
  </DropdownFooter>
</DropdownMenu>
```

---

#### MenuItem / MenuItemLink

`flexim-app/src/components/ui/menu-item.tsx`. Атомарный пункт меню.
Используется внутри Sidebar и DropdownMenu.

```tsx
<MenuItemLink to="/orders" icon={<List />} count={12}>Заказы</MenuItemLink>
<MenuItem icon={<Plus />} onClick={…}>Создать</MenuItem>
```

Состояния: default, hover, active (фон primary-50, текст primary-main), disabled.

---

### 📊 Данные

#### Table

`flexim-app/src/components/ui/table.tsx`

```tsx
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter,
  TableEmptyState,
} from '../../components/ui/table';
```

| Компонент | Ключевые пропсы |
|---|---|
| `Table` | `stickyHeader`, `density: 'm' \| 's'` |
| `TableRow` | `selected`, `disabled` |
| `TableHead` | `sortable`, `sortDirection: 'asc' \| 'desc' \| null`, `onSort`, `align` |
| `TableCell` | `align: 'left' \| 'right' \| 'center'` |
| `TableFooter` | пагинатор внутри |
| `TableEmptyState` | `icon`, `title`, `description`, `action` |

```tsx
<Table density="m" stickyHeader>
  <TableHeader>
    <TableRow>
      <TableHead sortable sortDirection="asc" onSort={…}>№</TableHead>
      <TableHead>Заказ</TableHead>
      <TableHead align="right">Тираж</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow selected>
      <TableCell>5821</TableCell>
      <TableCell>Майонез «Махеев»</TableCell>
      <TableCell align="right">5 000</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <Pagination page={1} total={5} onChange={…} />
  </TableFooter>
</Table>
```

Пустое состояние:

```tsx
<TableEmptyState
  icon={<Inbox />}
  title="Нет заказов"
  description="Создайте новый или измените фильтр"
  action={<Button>Создать заказ</Button>}
/>
```

**Высоты строк** (Bootstrap):
- `.flexim-table--m` — head и body 40px (компактные таблицы)
- `.flexim-table--rich` — head 48px фиксировано, body по контенту (для
  «богатых» таблиц с двухстрочными ячейками, свитчами, кнопками — список
  заказов и т.п.)

**Боковые отступы внутри рамки** (Bootstrap, экраны-списки):
`.flexim-table-wrap--page-fill` имеет симметричные `padding-left/right: 16px`,
чтобы первая колонка (ID) и последняя (action `›`) не липли к бордеру таблицы.

**Статус заказа в таблице — обязательно чипом.**
Статус в таблицах-списках показывается **только чипом** `.flexim-chip-status`
(кликабельный, вариант — по цвету статуса, см. «Chip status — статусы заказа»),
а **не** цветной точкой `.flexim-table__status`. Под чипом — **опциональная**
подпись прогресса «X из Y кг/шт» (`.flexim-table__stack-sub`), если она есть на
реальном экране. Обёртка — `.flexim-table__status-cell` (вертикальный стек,
влево). Клик по статусу открывает трекинг заказа.

```html
<td class="flexim-table__cell">
  <span class="flexim-table__status-cell">
    <span class="flexim-chip-status flexim-chip-status--warning flexim-chip-status--clickable">Отгружено
      <span data-flexim-icon="arrow-right" data-size="16" aria-hidden="true"></span></span>
    <span class="flexim-table__stack-sub">767,71 из 700 кг</span><!-- опционально -->
  </span>
</td>
```

Эталоны: `01-orders.html`, `05-pack.html`, `06-order-tracking.html`.

---

#### Order tracking (таймлайн статусов)

Bootstrap: `.flexim-order-tracking`, `.flexim-timeline-status`, `.flexim-tracking-head`.
Правая панель — `.flexim-side-panel--narrow` (400px). Демо: `06-order-tracking.html`,
каталог `#flexim-order-tracking`.

**Назначение:** история статусов заказа в сайдбаре «Трекинг заказа». Новые события
**сверху**; верхняя строка — `--current` (жирное имя статуса).

**Классы:**
| Класс | Назначение |
|---|---|
| `.flexim-order-tracking` | контейнер списка |
| `.flexim-timeline-status` | одна строка (rail + content) |
| `.flexim-timeline-status--current` | последнее по времени событие (жирный name) |
| `.flexim-timeline-status__rail` | колонка точки + линии |
| `.flexim-timeline-status__dot` | точка 12px |
| `.flexim-timeline-status__dot--{color}` | цвет точки (см. карту ниже) |
| `.flexim-timeline-status__line` | соединитель `--other-lines`, скрыт у `:last-child` |
| `.flexim-timeline-status__content` | name + time (+ опционально `__desc`) |
| `.flexim-tracking-head` | шапка заказа над таймлайном |

**Карта «статус → цвет точки»** (палитра снята из прод-трекинга `StatusTrack`, токены `--status-*` в `tokens.css` — не Figma, не chip-status):

| Статус | модификатор | токен |
|---|---|---|
| Черновик | `--draft` | `--status-draft` |
| Сделан расчёт | `--calc-done` | `--status-calc-done` |
| Составлена тех. карта | `--tech-card` | `--status-tech-card` |
| Ждём подтверждения | `--wait-approval` | `--status-wait-approval` |
| Ждём постановки в план | `--wait-plan` | `--status-wait-plan` |
| В плане печати | `--plan-print` | `--status-plan-print` |
| В плане ламинации | `--plan-lam` | `--status-plan-lam` |
| В плане резки | `--plan-cut` | `--status-plan-cut` |
| Приладка на резке | `--makeready-cut` | `--status-makeready-cut` |
| Режется | `--cutting` | `--status-cutting` |
| Готово к упаковке | `--ready-pack` | `--status-ready-pack` |
| Ждёт отгрузки | `--wait-ship` | `--status-wait-ship` |
| Отгружено | `--shipped` | `--status-shipped` |

```html
<div class="flexim-timeline-status flexim-timeline-status--current">
  <div class="flexim-timeline-status__rail">
    <span class="flexim-timeline-status__dot flexim-timeline-status__dot--shipped" aria-hidden="true"></span>
    <span class="flexim-timeline-status__line" aria-hidden="true"></span>
  </div>
  <div class="flexim-timeline-status__content">
    <div class="flexim-timeline-status__header">
      <span class="flexim-timeline-status__name">Отгружено</span>
    </div>
    <span class="flexim-timeline-status__time">24.06.2026, 18:33</span>
  </div>
</div>
```

---

#### Filter panel (быстрая фильтрация)

Bootstrap: рейка из атомов `.flexim-chip-tag` + `.flexim-filter-dd`.
Каталог `#biz-filter-quick`, live-демо там же (клик по пункту меню превращает
триггер в chip-tag, клик по крестику — возвращает).

**Назначение:** быстрая фильтрация над таблицей на страницах-списках —
Заказы (`01-orders.html`), Упаковка (`05-pack.html`), Трекинг заказа
(`06-order-tracking.html`, `06b-order-tracking-lamination.html`). Отличается
от **Filter side panel** (см. ниже) — тот сайдбар применяется только для
складского контура; здесь же вся фильтрация «в строке».

**Инвариант:** **выбранные значения** — chip-tag с крестиком (`.flexim-chip-dismiss`),
**невыбранные** — кнопка-триггер `.flexim-filter` с шевроном + вложенный
дропдаун `.flexim-filter-dd__menu`. Клик по пункту меню превращает триггер
в chip-tag. Клик по крестику chip-tag возвращает триггер с полным списком
опций. **Порядок фиксированный:** фильтр остаётся на своём месте — триггер
заменяется на chip-tag НА МЕСТЕ (`replaceWith`), а не переносится в начало;
соседи не сдвигаются. Выбранные вперёд НЕ выносить. Источник — Figma 4398-81740.

**Разметка контейнера:**

```html
<div id="biz-filter-quick-panel" class="d-flex flex-wrap align-items-center"
     style="gap: var(--size-m);">
  <!-- выбранные значения (chip-tag) -->
  <span class="flexim-chip-tag flexim-chip-tag--m"
        data-filter-name="manager"
        data-filter-value="О. Снесарева"
        data-filter-label="Менеджер">
    О. Снесарева
    <button type="button" class="flexim-chip-dismiss" aria-label="Удалить фильтр">
      <span data-flexim-icon="x-small" data-size="16" aria-hidden="true"></span>
    </button>
  </span>

  <!-- невыбранные фильтры (триггер + меню) -->
  <div class="flexim-filter-dd" data-filter-name="customer" data-filter-label="Заказчик">
    <button type="button" class="flexim-filter" aria-haspopup="true" aria-expanded="false">
      Заказчик
      <span class="flexim-filter__arrow" data-flexim-icon="arrow-down-small" data-size="24" aria-hidden="true"></span>
    </button>
    <div class="flexim-filter-dd__menu flexim-dropdown" role="menu">
      <div class="flexim-dropdown__items">
        <button type="button" class="flexim-dropdown__item">ООО «Ромашка»</button>
        <button type="button" class="flexim-dropdown__item">ООО «Славконд»</button>
        <!-- … -->
      </div>
    </div>
  </div>
</div>
```

**Атрибуты (обязательные):**

| Атрибут | На чём | Назначение |
|---|---|---|
| `data-filter-name` | и на chip-tag, и на `.flexim-filter-dd` | ключ фильтра (`manager`, `customer`, `work`, …). Используется как ключ в опциях. |
| `data-filter-label` | и на chip-tag, и на `.flexim-filter-dd` | человеческое название категории (что показывать на триггере после восстановления). |
| `data-filter-value` | только на chip-tag | выбранное значение (то же что текст chip'а). Полезно для сериализации в форму / query-string. |

**Опции меню** для каждого `data-filter-name` в live-демо хардкод в JS в
`components.html` (переменная `BIZ_QUICK_OPTS`). В проде — приходят из БД
или инжектятся PHP-шаблоном; JS-обработчик восстановления фильтра при
клике по крестику должен уметь их подтягивать.

**JS-логика (уже в footer-script каталога — на всех страницах где нужна
быстрая фильтрация, надо подключить те же обработчики):**

```js
// 1. Клик по пункту меню → триггер → chip-tag с крестиком.
$(document).on('click',
  '#biz-filter-quick-panel .flexim-filter-dd__menu .flexim-dropdown__item',
  function (e) {
    e.stopPropagation();
    var $dd = $(this).closest('.flexim-filter-dd');
    var name  = $dd.attr('data-filter-name')  || '';
    var label = $dd.attr('data-filter-label') || '';
    var value = $(this).text().trim();
    var $chip = $('<span class="flexim-chip-tag flexim-chip-tag--m" ' +
                    'data-filter-name="' + name + '" ' +
                    'data-filter-value="' + value + '" ' +
                    'data-filter-label="' + label + '">' +
                    value +
                    ' <button type="button" class="flexim-chip-dismiss" ' +
                        'aria-label="Удалить фильтр">' +
                      '<span data-flexim-icon="x-small" data-size="16" aria-hidden="true"></span>' +
                    '</button>' +
                  '</span>');
    $dd.replaceWith($chip);
    if (window.fleximIcons) window.fleximIcons.renderAll();
  });

// 2. Клик по крестику chip-tag → chip-tag → триггер с полным списком опций.
var BIZ_QUICK_OPTS = {
  'manager':  ['О. Снесарева', 'Ю. Корнилова', 'Н. Миловидова', 'С. Пономарёв'],
  'customer': ['ООО «Ромашка»', 'ООО «Славконд»', 'ООО «Сласти»', 'Матяш'],
  'work':     ['Плёнка с печатью', 'Плёнка без печати', 'Пакеты']
};
$(document).on('click',
  '#biz-filter-quick-panel .flexim-chip-tag .flexim-chip-dismiss',
  function (e) {
    e.stopPropagation();
    var $chip = $(this).closest('.flexim-chip-tag');
    var name  = $chip.attr('data-filter-name')  || '';
    var label = $chip.attr('data-filter-label') || name;
    var opts  = BIZ_QUICK_OPTS[name] || [];
    var itemsHtml = opts.map(function (v) {
      return '<button type="button" class="flexim-dropdown__item">' + v + '</button>';
    }).join('');
    var $dd = $('<div class="flexim-filter-dd" ' +
                  'data-filter-name="'  + name  + '" ' +
                  'data-filter-label="' + label + '">' +
                  '<button type="button" class="flexim-filter" ' +
                    'aria-haspopup="true" aria-expanded="false">' +
                    label +
                    ' <span class="flexim-filter__arrow" data-flexim-icon="arrow-down-small" data-size="24" aria-hidden="true"></span>' +
                  '</button>' +
                  '<div class="flexim-filter-dd__menu flexim-dropdown" role="menu">' +
                    '<div class="flexim-dropdown__items">' + itemsHtml + '</div>' +
                  '</div>' +
                '</div>');
    $chip.replaceWith($dd);
    if (window.fleximIcons) window.fleximIcons.renderAll();
  });
```

Открытие / закрытие дропдауна и обработка «клик вне закрывает всё» —
глобальные, уже привязаны к `.flexim-filter-dd` в футере каталога.
Отдельно писать не нужно.

**Как добавить новый фильтр** (например, «Дата расчёта»):

1. В контейнер `#biz-filter-quick-panel` добавь блок:

   ```html
   <div class="flexim-filter-dd" data-filter-name="calc-date" data-filter-label="Дата расчёта">
     <button type="button" class="flexim-filter" aria-haspopup="true" aria-expanded="false">
       Дата расчёта
       <span class="flexim-filter__arrow" data-flexim-icon="arrow-down-small" data-size="24" aria-hidden="true"></span>
     </button>
     <div class="flexim-filter-dd__menu flexim-dropdown" role="menu">
       <div class="flexim-dropdown__items">
         <button type="button" class="flexim-dropdown__item">Сегодня</button>
         <button type="button" class="flexim-dropdown__item">Вчера</button>
         <!-- … -->
       </div>
     </div>
   </div>
   ```

2. В `BIZ_QUICK_OPTS` добавь массив опций под тем же ключом:

   ```js
   'calc-date': ['Сегодня', 'Вчера', 'На этой неделе', 'В прошлом месяце'],
   ```

Больше ничего не нужно — обработчики универсальны через `data-filter-name`.

**Реальное приложение (сервер, PHP) — как на «Заказах» (`calculation/index.php`):**

В проде «выбран / не выбран» решает СЕРВЕР, а не клиентский toggle каталога.
PHP в фиксированном порядке полей рендерит для каждого фильтра либо chip-tag
(значение в GET задано), либо триггер (не задано) — на его месте. Отличия от
демо:

- Обёртка — `<form method="get" class="flexim-filters">`; на каждое поле —
  скрытый `<input type="hidden" name="<field>">` с текущим значением.
- Ключ — `data-filter="<field>"` (имя GET-параметра) на chip-tag и на
  `.flexim-filter-dd` (вместо демошного `data-filter-name`).
- Пункт меню несёт `data-value="<id>"`. Клик по пункту выставляет hidden и
  сабмитит форму; крестик chip'а чистит hidden и сабмитит. Логика — общий
  `flexim-ds/filters.js` (НЕ демо-JS каталога), в footer, guarded.
- Триггеры без пункта «Все»: сброс — только крестиком chip'а.
- Порядок полей фиксированный (пилюля↔chip на месте); серверная фильтрация по
  GET не меняется — это оболочка поверх легаси.

Тот же паттерн переиспользуем на Упаковке/Плане: меняется только состав полей.

**Правила и ошибки:**

- **Не путать `data-filter-label` и `data-filter-value`.** `label` — название
  категории («Заказчик»), пишется на триггере. `value` — конкретное значение
  выбора («ООО «Ромашка»»), пишется в chip.
- **Не менять текст chip'а через `.text()` уже после превращения** — сериализация
  для формы (или query-string) читает `data-filter-value`, а не текст.
- **`data-filter-name` должен быть уникальным** внутри одной панели.
  Если в форме несколько одноимённых фильтров — использовать суффикс
  (`customer-a`, `customer-b`).
- **Опции меню длиной больше 7** — добавлять поиск в меню (`.flexim-filter-dd__search`),
  как в компоненте Filter (базовом). Пример — в каталоге, секция `#filter`.
- **Не рендерить chip-tag без крестика** — если фильтр в принципе неудаляемый
  (например, «Только мои заказы» с ролью пользователя), не использовать этот
  паттерн; сделать читаемую подсказку иначе.

**Множественный выбор** (сейчас не реализован, но паттерн допускает):
один `data-filter-name` может дать несколько chip'ов (по одному на значение);
при клике на крестик каждого — восстанавливается **тот же** триггер (не
удаляется). Если добавляешь — учти дедупликацию при повторном открытии
триггера (в `BIZ_QUICK_OPTS` фильтровать уже выбранные значения).

---

#### Filter side panel (фильтр склада)

Bootstrap: `.flexim-side-panel` (600px) + `.flexim-filter-form`.
Каталог `#flexim-filter-panel`, живое демо — `prod-mockups/_preview-filter-sklad.html`.

**Назначение:** сайдбар-фильтр складского контура (`roll/`, `pallet/`,
`cut_source/`, `utilized/` + два экрана миграции плёнки — 6 файлов с
`filterModal` в проде). Применяется **только** там, где фильтр в проде
сайдбаром; Заказы / Упаковка / План — быстрые фильтры-пилюли (см. Filters).
Концепт «все фильтры сайдбарами» отложен и пока не используется:
`prod-mockups/_archive/filters-all-sidebars-concept.html`.

**Классы:**

| Класс | Назначение |
|---|---|
| `.flexim-filter-form` | стек групп полей в `__body`: gap 32, поля во всю ширину |
| `.flexim-filter-form__actions` | «Применить» (primary) + «Сбросить» (ghost) сразу под полями, gap 16 — НЕ `__footer` |
| `.flexim-filter-range` | пара полей «От/До» в строку, gap 8 |

**Поведение:** селект длинного справочника — с поиском внутри меню
(`.flexim-filter-dd__search` + `.flexim-select__search-input`, substring-фильтр);
меню не выше 7 пунктов (внутренний скролл), при нехватке места снизу — drop-up.
«Отменить» нет: закрытие — ✕, Esc, клик по подложке. «Сбросить» возвращает
дефолты («Все …», пустые поля). Диапазон «От/До» валидируется: отрицательные
значения и «От» &gt; «До» — error-состояние Input (`--error` + hint c `error-circle`),
сабмит блокируется.

```html
<form class="flexim-side-panel__body" method="get">
  <div class="flexim-filter-form">
    <div class="flexim-input-field">…Select «Марка плёнки» с поиском…</div>
    <div class="flexim-input-field">…Select «Толщина, мкм»…</div>
    <div class="flexim-input-field">
      <div class="flexim-input-field__label">Ширина, мм</div>
      <div class="flexim-filter-range">…Input «От»…Input «До»…</div>
    </div>
    <div class="flexim-filter-form__actions">
      <button type="submit" class="btn btn-primary">Применить</button>
      <button type="button" class="btn btn-flexim-ghost">Сбросить</button>
    </div>
  </div>
</form>
```

---

### 🪟 Оверлеи

#### Modal

`flexim-app/src/components/ui/modal.tsx` (Radix Dialog).

```tsx
import {
  Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalBody, ModalFooter,
} from '../../components/ui/modal';
```

| Prop | Тип |
|---|---|
| `ModalContent.size` | `'s' \| 'm' \| 'l'` (400 / 600 / 800px) |
| `ModalFooter.preset` | `'single' \| 'dual' \| 'destructive'` |

```tsx
<Modal>
  <ModalTrigger asChild>
    <Button>Открыть</Button>
  </ModalTrigger>
  <ModalContent size="m">
    <ModalHeader>
      <ModalTitle>Подтверждение</ModalTitle>
    </ModalHeader>
    <ModalBody>Точно перенести заказ в архив?</ModalBody>
    <ModalFooter preset="dual">
      <Button variant="secondary">Отмена</Button>
      <Button variant="primary">Перенести</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

Закрытие — Esc, клик по overlay, focus trap внутри.

---

#### Tooltip

`flexim-app/src/components/ui/tooltip.tsx` (Radix Tooltip).
Обязательно обернуть приложение в `<TooltipProvider>` (уже сделано в `AppLayout`).

| Prop | Тип |
|---|---|
| `content` | `ReactNode` |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` |
| `theme` | `'dark' \| 'light'` |
| `maxWidth` | `'default' \| 'wide'` (240 / 320px) |
| `delayDuration` | `number` (мс, default 200) |

```tsx
<Tooltip content="Сохранить черновик" side="bottom">
  <Button variant="ghost" size="icon-s"><Save /></Button>
</Tooltip>
```

---

### ⚛️ Атомы

#### Avatar / AvatarGroup

`flexim-app/src/components/ui/avatar.tsx`.

| Prop | Тип |
|---|---|
| `size` | `'xs' \| 's' \| 'm' \| 'l'` (24 / 28 / 32 / 40) |
| `src` | URL фото |
| `name` | имя (для инициалов и палитры) |
| `status` | `'online' \| 'offline' \| 'busy' \| null` |

```tsx
<Avatar name="Сергей Пономарёв" status="online" />
<AvatarGroup max={4}>
  <Avatar name="С П" />
  <Avatar name="М П" />
  <Avatar name="И В" />
  <Avatar name="О Б" />
  <Avatar name="А Н" />
</AvatarGroup>
```

Цвет фона инициалов — детерминированно по имени из палитры инфографики.

---

#### Icon

`flexim-app/src/components/ui/icon.tsx`. Обёртка над `lucide-react`
(на момент написания — плейсхолдеры до экспорта SVG из Figma).

| Prop | Тип |
|---|---|
| `name` | имя иконки (см. `icon-map.ts`) |
| `size` | `'xs' \| 's' \| 'm' \| 'l'` (12 / 16 / 20 / 24) |
| `tone` | `'muted' \| 'primary' \| 'success' \| 'warning' \| 'error'` |

```tsx
<Icon name="check" size="m" tone="success" />
```

В большинстве компонентов используется прямой импорт из `lucide-react`
(`<Save />`, `<Trash />` и т.п.) — это нормально.

---

#### Slider

`flexim-app/src/components/ui/slider.tsx` (Radix Slider).

| Prop | Тип |
|---|---|
| `size` | `'s' \| 'm'` |
| `label` / `showValue` / `formatValue` | подписи |
| `ticks` | массив значений-меток |
| `min` / `max` / `step` | стандарт |
| `value` / `defaultValue` / `onValueChange` | массив (для range — 2 числа) |

```tsx
<Slider label="Ширина ручья, мм" min={10} max={50} step={5} defaultValue={[25]} />
```

Thumb 24×24, иконка-grip `text-primary-main`.

**Bootstrap:** `.flexim-slider`, `.flexim-slider__track`, `.flexim-slider__thumb`.

---

#### Stat

Показатель в карточке расчёта (колонки «Стоимость», «Материалы»). Не отдельный
React-компонент — только Bootstrap-разметка.

| Класс | Назначение |
|---|---|
| `.flexim-stat` | Стопка: лейбл → значение → подстрока |
| `.flexim-stat__label` | Мелкий лейбл (12/16) |
| `.flexim-stat__value` | Жирное значение (14/20 Semibold) |
| `.flexim-stat__unit` | Единица рядом со значением |
| `.flexim-stat__sub` | Подстрока (12/16 secondary) |

Часто внутри `.flexim-header-h4` (подзаголовок колонки). Образец:
`02-order-card.html`, каталог `prod-mockups/components.html` → **Stat**.

---

#### Lapki (курсоры)

`flexim-app/src/components/ui/lapki.tsx`. SVG-курсоры Flexim:
`pointer` (24×24) и `grabbing` (20×18). Используются как `cursor: url(...)`
через утилиты `cursor-lapki-pointer` / `cursor-lapki-grabbing`.

---

#### ScrollArea

`flexim-app/src/components/ui/scroll-area.tsx`. Обёртка с кастомными
скроллбарами Flexim. Используется в DropdownMenu, Sidebar.

```tsx
<ScrollArea orientation="vertical" className="h-[300px]">
  <List>…</List>
</ScrollArea>
```

---

### 🏠 Layout-компоненты

Это не «компоненты библиотеки», а **структурные блоки** приложения.
В новых экранах они уже подставлены через `AppLayout` — отдельно их
рендерить не нужно.

| Компонент | Файл | Что делает |
|---|---|---|
| `AppLayout` | `components/layout/AppLayout.tsx` | Sidebar + TopBar + `<Outlet />` |
| `Sidebar` | `components/layout/Sidebar.tsx` | Левая навигация, свёртываемая |
| `TopBar` | `components/layout/TopBar.tsx` | Шапка, поиск, уведомления, UserMenu |
| `UserMenu` | `components/layout/user-menu.tsx` | Аватар + dropdown |
| `BrandLogo` | `components/BrandLogo.tsx` | Логотип `full`/`icon-only`, размеры m/s |

**Bootstrap-разметка** (для prod-mockups):
композит `.flexim-user-menu` оборачивает обычный `.flexim-user-chip` (как
`<button>`-триггер) и `.flexim-user-menu__menu` с `.flexim-dropdown` внутри.
Меню прижато к правому краю чипа (`right: 0; top: 100% + 4px`). Поведение —
тогглит `.is-open` на обёртке, паттерн полностью идентичен `.flexim-filter-dd`.
Подключение поведения — один тег `<script src="./_user-menu.js"></script>`
в конце страницы. Эталон применения — шапка в `01-orders.html` /
`02-order-card.html`. Демо в каталоге — секция «User menu → Интерактивный
composite».

---

## Чек-лист перед сборкой нового экрана

1. **Открыл `COMPONENTS.md`** и проверил, какие компоненты уже есть?
2. Если экран есть в Figma — открыл фрейм и **снял из Figma точные числа**
   (padding, font-size, цвета — должны совпадать с токенами)?
3. Использую только компоненты из библиотеки (никакого «верстаю сам с нуля»)?
4. Если работаю в **React** — все классы из Tailwind preset (`text-h1`,
   `bg-primary-main`, `p-l`, `gap-xs`) или CSS-переменные `var(--*)`?
5. Если работаю в **Bootstrap** — только классы `.flexim-*`, `.btn-primary`,
   `.form-control` и т.п. Никаких inline `style="font-size: 13px"` или
   `style="color: #..."` (кроме `style="color: var(--*)"`).
6. Все UI-тексты — **по-русски**?
7. PHP-вставки в Bootstrap-мок помечены **HTML-комментариями** для
   программиста?
8. Перед коммитом — `pnpm build` в `flexim-app/` проходит?

---

## Когда чего-то не хватает

Сначала **проверь в Figma UI Kit** — возможно, компонент есть, но в нашем
каталоге его пропустили. Если действительно нет:

1. Опиши, что не хватает, и для какого экрана.
2. Обсудить с Машей перед тем как добавлять — иначе библиотека разрастётся
   хаотично.
3. После согласования — собрать компонент **сразу в обоих стеках**
   (React + Bootstrap) и **добавить в этот файл**.

---

## История версий

- **Май 2026** — первая полная версия после сборки 8 батчей UI Kit.
  В библиотеке 36+ компонентов, покрытие Figma UI Kit ~100%.
