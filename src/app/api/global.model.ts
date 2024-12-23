export type Response<T, K extends string> = {
  limit: number;
  skip: number;
  total: number;
} & {
  [key in K]: T[];
};

export type Params = {
  limit?: number;
  select?: string;
}
