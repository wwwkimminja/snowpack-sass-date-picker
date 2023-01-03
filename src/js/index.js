class DatePicker {
    monthData = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    #calendarDate = {
        data: '',
        date: 0,
        month: 0,
        year: 0,
    }
    selectedData = {
        data: '',
        date: 0,
        month: 0,
        year: 0,

    }

    datePickerEl;
    dateInputEl;
    calendarEl;
    calendarMonthEl;
    monthContent;
    nextBtnEl;
    prevBtnEl;
    calendarDatesEl;
    constructor() {
        this.initCalendarDate();
        this.assignElement();
        this.addEvent();

    }
    initCalendarDate() {
        const data = new Date();
        const date = data.getDate();
        const month = data.getMonth();
        const year = data.getFullYear();
        this.#calendarDate = {
            data,
            date,
            month,
            year,
        };
    };
    assignElement() {
        this.datePickerEl = document.getElementById("date-picker");
        this.dateInputEl = this.datePickerEl.querySelector("#date-input")
        this.calendarEl = this.datePickerEl.querySelector("#calendar");
        this.calendarMonthEl = this.calendarEl.querySelector('#month');
        this.monthContent = this.calendarMonthEl.querySelector('#content');
        this.nextBtnEl = this.calendarMonthEl.querySelector('#next');
        this.prevBtnEl = this.calendarMonthEl.querySelector('#prev');
        this.calendarDatesEl = this.calendarEl.querySelector('#dates')
    }

    addEvent() {
        this.dateInputEl.addEventListener('click', this.toggleCalendar.bind(this));
    }

    toggleCalendar() {
        this.calendarEl.classList.toggle('active');
    }

}

new DatePicker()