import { SIZES } from "./constants";

export const selectSizeHelper = (size, xs, sm, md, lg, xl) => {
    switch (size) {
        case SIZES.XS: return xs;
        case SIZES.SM: return sm;
        case SIZES.MD: return md;
        case SIZES.LG: return lg;
        case SIZES.XL: return xl;
        default: return null;
    }
};

export const getTimeFromNumber = number => {
    var sign = (number >= 0) ? 1 : -1;
    number = number * sign;
    var hour = Math.floor(number);
    var decpart = number - hour;
    var min = 1 / 60;
    decpart = min * Math.round(decpart / min);
    var minute = Math.floor(decpart * 60) + '';
    if (minute.length < 2) {
        minute = '0' + minute;
    }
    sign = sign == 1 ? '' : '-';
    const time = sign + hour + ':' + minute;
    return time;
};

export function convertTimestamtToDate(timestamp) {
    var brDate = new Date(timestamp);
    var year = brDate.getFullYear();
    var month = brDate.getMonth() + 1;
    var date = brDate.getDate();
    var hour = brDate.getHours();
    var min = brDate.getMinutes();
    var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min;
    return time;
};