export interface DateCalculationResult {
  startDate: Date;
  endDate: Date;
  days: number;
  weekday: string;
}

export interface DateAddSubtractResult {
  date: Date;
  days: number;
  weekday: string;
}

export type CalculationType = 'add' | 'subtract';
