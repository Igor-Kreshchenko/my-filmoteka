Вёрстка:

1. Шапка поверх секции search
2. В секции search форма, внутри формы label, внутри лейбла инпут и отдельно
   кнопка поиска(type=submit) Для секции search тоже 2 шаблона(main и my
   library)

3. Шаблон для каждого фильма ({{each this}}) = это li в котором картинка, h2 и
   абзац с жанрами(жанры по отдельному запросу) У некоторых фильмов вместо
   original_title стоит original_name. у фильмов должны быть id
4. В основной части: спинер, картинка на случай неудачной загрузки

5. Смена темы (localStorage)
