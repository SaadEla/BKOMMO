import * as moment from "moment";

export const NumberUtil = {
  Format: function (value, fractionDigitsCount) {
    if (isNaN(value)) return "-";
    return new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: fractionDigitsCount,
      maximumFractionDigits: fractionDigitsCount,
    }).format(value);
  },
  Parse: function (item) {
    return parseFloat(item);
  },
};
export const DateUtil = {
  months: [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ],
  Format: function (date, format = "DD/MM/YYYY") {
    if (!date) return undefined;
    return moment(String(date)).format(format);
  },
  FormatDate: function (date, format = "DD/MM/YYYY") {
    if (!date) return undefined;
    if (typeof date === "string") return moment(String(date), format);
    return moment(String(date)).format(format);
  },
  ToJsDate: function (string, format = "") {
    if (!string) return null;
    return moment(String(string), format).toDate();
  },
  parseDate: function (string, format = "") {
    if (!string) return null;
    return moment(String(string), format).toDate();
  },
  add: function (d, value, field = "D") {
    let newDate = d;
    if (field == "H") {
      newDate.dateUTC += 7 * value;
      newDate.setUTCDate(7 * value + newDate.getUTCDate());
      //newDate = moment(d).add(value,"months").toDate()
    } else if (field == "M") {
      newDate = moment(d).add(value, "months").toDate();
      //newDate.month+=value;
    } else if (field == "T") {
      // newDate.month+=3*value;
      newDate = moment(d)
        .add(3 * value, "months")
        .toDate();
    } else if (field == "A") {
      //newDate.fullYear+=value;
      newDate = moment(d).add(value, "years").toDate();
    } else {
      newDate.setUTCDate(value + newDate.getUTCDate());
      //newDate.dateUTC+=value;
    }
    return newDate;
  },
};
