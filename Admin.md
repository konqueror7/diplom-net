# Подробное описание работы страницы admin
Здесь дается подробное описание работы фронтэнда и бэкэнда страницы.

## Описание фронтэнда

Виджеты - отрисовывают информацию полученную из json-файлов и назначают обрабочики событий элементам управления - кнопкам и полям ввода форм.

Инициализацию страницы производит статический метод init() класса Admin.

Он инициализирует виджеты секций "conf-step" внутри тега main "conf-steps".
Им создается ассоциативный массив объектов this.widgets:

static init() {
  this.initWidgets();
  this.initModals();
}

static initWidgets() {
  this.widgets = {
    halls-management: new Halls(document.querySelector('.halls-management')),
    halls-config: new Halls(document.querySelector('.halls-config')),
    price-config: new Halls(document.querySelector('.price-config')),
    sessions-grid: new Halls(document.querySelector('.sessions-grid')),
    open-sales: new Halls(document.querySelector('.open-sales')),
  }
}

static initModals() {
  this.modals = {
    hall-add: ,
    hall-delete: ,
    movie-add: ,
    showtime-add: ,
    showtime-delete: ,
  };
}

После загрузки виджетов запускается статический метод проверки авторизации пользователя User.fetch() и если на сервере открыта PHP-сессия, то происходит дальнейшая загрузка иначе редирект на страницу client


Каждый виджет в соответствующую секцию "conf-step" производит:
- первоначальную загрузку данных из json-файлов
- обновление данных из json-файлов при добавлении или изменении
- создание обработчиков событий нажатия на кнопки

Каждая кнопка внутри "conf-step" вызывает асинхронный запрос к json-файлу

Описание фронтэнда "Управление залами":
Первоначальная загрузка происходит при инициализации страницы через метод Admin.initWidget
- "button.conf-step__button-trash" - удаление Entity.remove() и загрузка заново списка залов list()
- "button.conf-step__button-accent" - вызов модального окна с формой добавления зала Entity.create()
-

"Конфигурация залов":
Это форма кнопки с названием залов на самом деле теги "input type="radio""
-

>ВАЖНО! Необходимо добавить класс обозначающий этап администрирования (то есть "conf-step (halls-management|halls-config|price-config|sessions-grid|open-sales)" )



За первоначальную загрузку и данных в секции отвечают виджеты
В методе initWidgets()
