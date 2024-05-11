export function sum(num) {
  // num2 是下一個參數，num 則是存在上一個 closure 中先前參數的綜合
  const fn = num2 => sum(num + num2);
  // 需要將 fn 轉換為原始值
  fn.valueOf = () => num;
  return fn;
}
