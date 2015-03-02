# Директива календаря (datapiker)

Для использования необходимо подключиль эту директиву

```html
<date-piker date="t" first-day="1"></date-piker>
```

*date* - это модель выбранной даты ( ```new Date()``` ) (обязательный папаметр)

*first-day* - необязательный параметр, первый день недели (число от 0 до 6)

Для того что бы локализовать календарь, можно подключить соответствующий файл локализации для Angular, например так:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-i18n/1.2.15/angular-locale_ru-ru.js"></script>
```

Для отображения укзателя на ячейке календаря необходимо в CSS прописать:

```css
.data-piker td:not(.text-muted){cursor:pointer;}
```


