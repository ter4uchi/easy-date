const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * @typedef {Object} FormatEasyDateOptions
 * 相対表現の基準日です。省略時は現在日時を使います。
 *
 * @property {Date} [referenceDate]
 */

/**
 * @typedef {Object} FormatEasyDateTimeOptions
 * 相対表現の基準日です。省略時は現在日時を使います。
 *
 * @property {Date} [referenceDate]
 */

/**
 * Date を受け取り、やさしい日本語の日時表現に変換します。
 *
 * @param {Date} date
 * @param {FormatEasyDateTimeOptions} [options]
 * @returns {string}
 */
export function formatEasyDateTimeJa(date, options = {}) {
  assertDate(date, "date");

  const dateLabel = formatEasyDateJa(date, options);
  const timeLabel = formatEasyTimeJa(date);

  return `${dateLabel}の${timeLabel}`;
}

/**
 * 日付部分だけを相対表現を含む日本語で返します。
 *
 * @param {Date} date
 * @param {FormatEasyDateOptions} [options]
 * @returns {string}
 */
export function formatEasyDateJa(date, options = {}) {
  assertDate(date, "date");

  const referenceDate = options.referenceDate ?? new Date();
  assertDate(referenceDate, "options.referenceDate");

  const dayDifference = diffCalendarDays(date, referenceDate);

  switch (dayDifference) {
    case -2:
      return "おととい";
    case -1:
      return "昨日";
    case 0:
      return "今日";
    case 1:
      return "明日";
    case 2:
      return "あさって";
    default:
      return formatAbsoluteDate(date, referenceDate);
  }
}

/**
 * 時刻部分だけを時間帯ラベル付きの日本語で返します。
 *
 * @param {Date} date
 * @returns {string}
 */
export function formatEasyTimeJa(date) {
  assertDate(date, "date");

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const { label, hour } = describeHour(hours);
  const minuteLabel = formatMinutes(minutes);

  return `${label}${hour}時${minuteLabel}`;
}

function assertDate(value, name) {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
    throw new TypeError(`${name} must be a valid Date instance.`);
  }
}

function diffCalendarDays(target, reference) {
  const targetStart = startOfDay(target);
  const referenceStart = startOfDay(reference);

  return Math.round((targetStart - referenceStart) / MILLISECONDS_PER_DAY);
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function formatAbsoluteDate(date, referenceDate) {
  const yearPrefix =
    date.getFullYear() === referenceDate.getFullYear() ? "" : `${date.getFullYear()}年`;

  return `${yearPrefix}${date.getMonth() + 1}月${date.getDate()}日`;
}

function describeHour(hours) {
  if (hours <= 3) {
    return {
      label: "午前",
      hour: to12Hour(hours),
    };
  }

  if (hours <= 10) {
    return {
      label: "朝",
      hour: hours,
    };
  }

  if (hours === 11) {
    return {
      label: "午前",
      hour: 11,
    };
  }

  if (hours <= 15) {
    return {
      label: "午後",
      hour: to12Hour(hours),
    };
  }

  if (hours <= 17) {
    return {
      label: "夕方",
      hour: hours - 12,
    };
  }

  return {
    label: "夜",
    hour: hours - 12,
  };
}

function to12Hour(hours) {
  return hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
}

function formatMinutes(minutes) {
  if (minutes === 0) {
    return "";
  }

  if (minutes === 30) {
    return "半";
  }

  return `${minutes}分`;
}
