# eady-date

`Date` を受け取って、やさしい日本語の日時表現を返す小さな npm パッケージです。

厚生労働省の「わかりやすい情報提供のための手引き」を参考に、少なくとも次の方針を反映しています。

- 漢数字ではなく算用数字を使う
- 時刻は 24 時間表記ではなく、`朝`、`午後`、`夕方`、`夜` などで表す
- `本日` のような硬い表現より、`今日` のような日常語を優先する

参考資料:
[わかりやすい情報提供のための手引き（厚生労働省, PDF）](https://www.mhlw.go.jp/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/dl/171020-01.pdf)

## Install

```bash
npm install eady-date
```

## Usage

```js
import { formatEasyDateTimeJa } from "eady-date";

const referenceDate = new Date(2026, 2, 11, 9, 0);
const eventDate = new Date(2026, 2, 11, 16, 0);

console.log(formatEasyDateTimeJa(eventDate, { referenceDate }));
//=> 今日の夕方4時
```

## API

### `formatEasyDateTimeJa(date, options?)`

日時を `今日の夕方4時` のような形で返します。

### `formatEasyDateJa(date, options?)`

日付部分だけを返します。

- `今日`
- `明日`
- `あさって`
- `3月15日`
- `2027年1月1日`

### `formatEasyTimeJa(date)`

時刻部分だけを返します。

- `午前12時15分`
- `朝9時半`
- `午後2時`
- `夕方4時`
- `夜8時5分`

## Options

`referenceDate?: Date`

相対表現の基準日です。省略時は `new Date()` を使います。

入力された `Date` のローカル時刻をそのまま使います。

## Development

```bash
npm test
```
