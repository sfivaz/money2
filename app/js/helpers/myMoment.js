export class MyMoment {

    static digit2(number) {
        return ("0" + number).slice(-2);
    }

    static now() {
        const date = new Date();
        return MyMoment.formatDateEN(date)
    }

    static formatDateEN(date) {
        return date.getFullYear() + "-" + MyMoment.digit2(date.getMonth() + 1) + "-" + MyMoment.digit2(date.getDate());
    }

    static formatDateFR(date) {
        return MyMoment.digit2(date.getDate()) + "/" + MyMoment.digit2(date.getMonth() + 1) + "/" + date.getFullYear();
    }

//TODO try to use this later
    /*
     buildDate(date) {
        let date10 = date.substring(0, 10);
        let arrayDate = date10.split('-');
        let arrayFixed = arrayDate.map((item, index) => item - index % 2);
        return new Date(...arrayFixed);
    }
    */

    static thisMonth() {
        return new Date().getMonth();
    }

    static thisYear() {
        return new Date().getFullYear();
    }

    static getLastDate(year, month) {
        return new Date(year, month + 1, 0);
    }

    static getFirstDate(year, month) {
        return new Date(year, month, 1);
    }

    static getMonthTxt(month) {
        const months = [
            "January",
            "February",
            "Mars",
            "April",
            "May",
            "June",
            "Jully",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        return months[month - 1];
    }
}


