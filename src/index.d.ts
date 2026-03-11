export interface FormatEasyDateOptions {
  /** 相対表現の基準日です。省略時は現在日時を使います。 */
  referenceDate?: Date;
}

export interface FormatEasyDateTimeOptions {
  /** 相対表現の基準日です。省略時は現在日時を使います。 */
  referenceDate?: Date;
}

/** Date を受け取り、やさしい日本語の日時表現に変換します。 */
export declare function formatEasyDateTimeJa(
  date: Date,
  options?: FormatEasyDateTimeOptions,
): string;

/** 日付部分だけを相対表現を含む日本語で返します。 */
export declare function formatEasyDateJa(
  date: Date,
  options?: FormatEasyDateOptions,
): string;

/** 時刻部分だけを時間帯ラベル付きの日本語で返します。 */
export declare function formatEasyTimeJa(date: Date): string;
