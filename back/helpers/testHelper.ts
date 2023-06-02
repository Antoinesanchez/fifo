export const doNTimes = (
  n: number,
  fn: string,
  instance: any,
  arg: string | null,
): void => {
  if (!fn) return;
  if (n === 0) return;
  instance[fn](arg);
  doNTimes(n - 1, fn, instance, arg);
};
