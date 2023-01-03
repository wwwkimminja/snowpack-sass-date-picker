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
        this.monthContentEl = this.calendarMonthEl.querySelector('#content');
        this.nextBtnEl = this.calendarMonthEl.querySelector('#next');
        this.prevBtnEl = this.calendarMonthEl.querySelector('#prev');
        this.calendarDatesEl = this.calendarEl.querySelector('#dates')
    }

    addEvent() {
        this.dateInputEl.addEventListener('click', this.toggleCalendar.bind(this));
    }

    toggleCalendar() {
        this.calendarEl.classList.toggle('active');
        this.updateMonth();
        this.updateDates();
    }
    updateMonth() {
        this.monthContentEl.textContent = `${this.#calendarDate.year} ${this.monthData[this.#calendarDate.month]}`
    }
    updateDates() {
        this.calendarDatesEl.innerHTML = '';
        const numberOfDates = new Date(this.#calendarDate.year, this.#calendarDate.month + 1, 0,).getDate();
        const fragment = new DocumentFragment();

        for (let i = 0; i < numberOfDates; i++) {
            const dateEl = document.createElement('div');
            dateEl.classList.add('date');
            dateEl.textContent = i + 1;
            dateEl.dataset.date = i + 1;
            fragment.appendChild(dateEl);
        }
        fragment.firstChild.style.gridColumnStart = new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay() + 1
        this.calendarDatesEl.appendChild(fragment);
        this.colorSaturday();
        this.colorSunday();
        this.markToday();

    }
    markToday() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const today = currentDate.getDate();
        if (currentYear === this.#calendarDate.year && currentMonth === this.#calendarDate.month) {
            this.calendarDatesEl.querySelector(`[data-date='${today}']`).classList.add('today')
        }
    }

    colorSaturday() {
        const saturdayEls = this.calendarDatesEl.querySelectorAll(`.date:nth-child(7n+${7 - new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay()})`);
        for (let i = 0; i < saturdayEls.length; i++) {
            saturdayEls[i].style.color = "blue";
        }
    }
    colorSunday() {
        const sundayEls = this.calendarDatesEl.querySelectorAll(`.date:nth-child(7n+${(8 - new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay()) % 7})`)
        for (let i = 0; i < sundayEls.length; i++) {
            sundayEls[i].style.color = "red";

        }
    }

}

new DatePicker()