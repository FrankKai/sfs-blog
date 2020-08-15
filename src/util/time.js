import moment from "moment";

function formatTimestampToDate(time, type = "sign") {
  if (type === "sign") {
    return {
      day: moment(time).format("YYYY-MM-DD"),
      minute: moment(time).format("YYYY-MM-DD HH:mm"),
      second: moment(time).format("YYYY-MM-DD HH:mm:ss")
    };
  }
  if (type === "char") {
    return {
      day: moment(time).format("YYYY年MM月DD日"),
      minute: moment(time).format("YYYY年MM月DD日 HH时mm分"),
      second: moment(time).format("YYYY年MM月DD日 HH时mm分ss秒")
    };
  }
}

export default {
  formatTimestampToDate
};
