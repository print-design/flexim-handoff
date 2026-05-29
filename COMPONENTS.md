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

---

#### DatePickerField

`flexim-app/src/components/ui/date-picker-field.tsx`. Input с иконкой
календаря справа и масками. Реальный календарь подключается отдельно
(сейчас плейсхолдер).

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

`flexim-app/src/components/ui/status-banner.tsx`. «Полосы» статуса на всю
ширину карточки (вверху или внутри). 7+ типов под бизнес-сценарии
(`production`, `ready`, `blocked`, …).

```tsx
<StatusBanner type="ready">Заказ готов к отгрузке</StatusBanner>
```

**Bootstrap:** `.flexim-status-banner` + модификатор варианта (`--success`,
`--warning`, …). **Outline** (белый фон, цветная рамка и текст):
`.flexim-status-banner--outline` вместе с вариантом, напр.
`.flexim-status-banner--warning.flexim-status-banner--outline` — карточка заказа.

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
