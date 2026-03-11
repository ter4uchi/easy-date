export interface FormatEasyDateOptions {
  referenceDate?: Date;
}

export interface FormatEasyDateTimeOptions {
  referenceDate?: Date;
}

export declare function formatEasyDateTimeJa(
  date: Date,
  options?: FormatEasyDateTimeOptions,
): string;

export declare function formatEasyDateJa(
  date: Date,
  options?: FormatEasyDateOptions,
): string;

export declare function formatEasyTimeJa(date: Date): string;
