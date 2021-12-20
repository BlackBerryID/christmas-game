const styles = [
  'font-size: 30px; color: rgb(2, 120, 151); text-decoration: underline;',
  'font-size: 14px; color: rgb(2, 120, 151);',
  'font-size: 14px; color: #fff; background-color: #8AB4F8; border-radius: 35%; padding: 2px;',
  'font-size: 12px; color: rgb(2, 120, 151);',
];

console.log('%cСамооценка', styles[0]);
console.log(
  '%c!Внимание: Колонка с фильтрами и область карточек прокручиваются скроллом колёсика мыши. Если у вас небольшой монитор и вы не видите часть фильтров, пожалуйста, поскрольте колонку с фильтрами вниз.',
  styles[1]
);
console.log(
  '%c1. Страница с игрушками содержит карточки всех игрушек а также фильтры, строку поиска, поле для сортировки. Выполняются требования к вёрстке %c+10',
  styles[1],
  styles[2]
);
console.log(
  '%c2. Карточка игрушки содержит её изображение, название, текстом или условным значком обозначено количество экземпляров, год покупки, форма, цвет, размер, является ли игрушка любимой %c+10',
  styles[1],
  styles[2]
);
console.log('%c3. Добавление игрушек в избранное %c+20', styles[1], styles[2]);
console.log(
  '%cКликая по карточке с игрушкой или по кнопке на ней игрушку можно добавлять в избранное или удалять из избранного. Карточки добавленных в избранное игрушек внешне отличаются от остальных. на странице отображается количество добавленных в избранное игрушек. При попытке добавить в избранное больше 20 игрушек, выводится всплывающее уведомление с текстом "Извините, все слоты заполнены"',
  styles[3]
);
console.log('%c4. Сортировка %c+20', styles[1], styles[2]);
console.log(
  '%cСортировка игрушек по названию в возрастающем и спадающем порядке. Сортировка игрушек по году их приобретения в возрастающем и спадающем порядке',
  styles[3]
);
console.log('%c5. Фильтры в указанном диапазоне от и до %c+30', styles[1], styles[2]);
console.log(
  '%cФильтры по количеству экземпляров. Фильтры по году покупки. Для фильтрации в указанном диапазоне используется range slider с двумя ползунками. При перемещении ползунков отображается их текущее значение, разный цвет слайдера до и после ползунка',
  styles[3]
);
console.log('%c6. Фильтры по значению %c+30', styles[1], styles[2]);
console.log(
  '%cФильтры по форме, фильтры по цвету, фильтры по размеру, фильтры по размеру, можно отобразить только любимые игрушки. Можно отфильтровать игрушки по нескольким фильтрам одного типа',
  styles[3]
);
console.log('%c7. Можно отфильтровать игрушки по нескольким фильтрам разного типа %c+20', styles[1], styles[2]);
console.log('%c8. Сброс фильтров %c+20', styles[1], styles[2]);
console.log(
  '%cEсть кнопка reset для сброса фильтров. При сбросе фильтров кнопкой reset, ползунки range slider сдвигаются к краям, значения ползунков возвращаются к первоначальным, range slider закрашивается одним цветом',
  styles[3]
);
console.log('%c9. Сохранение настроек в local storage %c+10', styles[1], styles[2]);
console.log(
  '%cВыбранные пользователем фильтры, порядок сортировки, добавленные в избранное игрушки сохраняются при перезагрузке страницы. Есть кнопка сброса настроек, которая очищает local storage',
  styles[3]
);
console.log('%c10. Поиск %c+30', styles[1], styles[2]);
console.log(
  '%cПри открытии приложения курсор находится в поле поиска. Автозаполнение поля поиска отключено. Есть placeholder. В поле поиска есть крестик, позволяющий очистить поле поиска. Если нет совпадения последовательности букв в поисковом запросе с названием игрушки, выводится уведомление в человекочитаемом формате, например "Извините, совпадений не обнаружено". При вводе поискового запроса на странице остаются только те игрушки, в которых есть указанные в поиске буквы в указанном порядке. При этом не обязательно, чтобы буквы были в начале слова. Регистр символов при поиске не учитывается. Если очистить поле поиска, на странице отображаются игрушки, соответствующие всем выбранным фильтрам и настройкам сортировки',
  styles[3]
);
console.log('%cИтого: 200/220', styles[0]);
console.log(
  '%cНадеюсь вам понравилось моя работа. Буду рад видеть ваши замечания и предложения по улучшению в дискорд BlackBerryID #3277. Хорошего дня!',
  styles[3]
);