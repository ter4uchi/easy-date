import test from "node:test";
import assert from "node:assert/strict";

import {
  formatEasyDateJa,
  formatEasyDateTimeJa,
  formatEasyTimeJa,
} from "../src/index.js";

test("same-day afternoon time uses a relative day and evening label", () => {
  const referenceDate = new Date(2026, 2, 11, 9, 0);
  const targetDate = new Date(2026, 2, 11, 16, 0);

  assert.equal(formatEasyDateTimeJa(targetDate, { referenceDate }), "今日の夕方4時");
});

test("next-day morning time uses 明日 and 半", () => {
  const referenceDate = new Date(2026, 2, 11, 9, 0);
  const targetDate = new Date(2026, 2, 12, 9, 30);

  assert.equal(formatEasyDateTimeJa(targetDate, { referenceDate }), "明日の朝9時半");
});

test("far future dates fall back to month and day text", () => {
  const referenceDate = new Date(2026, 2, 11, 9, 0);
  const targetDate = new Date(2026, 3, 5, 18, 5);

  assert.equal(formatEasyDateTimeJa(targetDate, { referenceDate }), "4月5日の夜6時5分");
});

test("date-only formatter includes year when the year changes", () => {
  const referenceDate = new Date(2026, 11, 28, 9, 0);
  const targetDate = new Date(2027, 0, 1, 9, 0);

  assert.equal(formatEasyDateJa(targetDate, { referenceDate }), "2027年1月1日");
});

test("time-only formatter uses 午前 for midnight", () => {
  const targetDate = new Date(2026, 2, 11, 0, 15);

  assert.equal(formatEasyTimeJa(targetDate), "午前12時15分");
});

test("invalid dates are rejected", () => {
  assert.throws(
    () => formatEasyDateTimeJa(new Date("invalid date")),
    /date must be a valid Date instance/u,
  );
});
