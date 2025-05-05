## Question
實作 Generic 工具型別：RemoveIndexSignature

題目：實作一個型別 RemoveIndexSignature<T>，它能移除 T 上所有索引簽名 (index signature)，只保留明確宣告過的屬性。


## Solution 1
```tsx
type RemoveIndexSignature<T> = { readonly
  // 遍歷 T 的每個鍵 K
  [K in keyof T as
    // 如果 string 能 assign 給 K（代表它是 [key: string] ），就扔掉
    string extends K ? never :
    // 如果 number 能 assign 給 K（代表它是 [key: number] ），也扔掉
    number extends K ? never :
    // 如果 symbol 能 assign 給 K（代表它是 [key: symbol]），也扔掉
    symbol extends K ? never :
    // 否則就保留這個鍵
    K
  ]: T[K]
}

// Example usage
type A = {
  readonly [key: string]: any;
  readonly id: number;
  readonly name: string;
};

type R = RemoveIndexSignature<A>;
// R = { id: number; name: string; }

```

## Note
1. keyof T 會拿到什麼？
    對一個型別 T，keyof T 的結果是它所有屬性鍵（keys）的聯集，包括：

    明確定義的屬性，例如 id、name、0、foo。

    索引簽名，如果你的型別裡寫了 [key: string]: any，那麼 keyof T 裡會多出一個 string；如果有 [idx: number]: boolean，就會多出一個 number；同理對 symbol。

2. 映射型別＋鍵重新映射
    ```javascript
    [K in keyof T as /* 新的鍵名 */ ]: T[K]
    ```

    K in keyof T：把所有 keyof T 的每個成員（例如 "id"、string、number、symbol）都當成映射的「舊鍵」。

    as <條件式>：就是把「舊鍵」重新映射到「新鍵」。如果 as 的結果是 never，這個鍵就會被丟棄，不出現在最終型別裡；否則就用它當作保留下來的鍵名。

3. string extends K ? never : K 這句在幹嘛？
    直覺：在整個 keyof T 裡，只有「string 本身」才會讓 string extends K 成立（因為任何型別都可被賦值給 string → string is supertype）。

    如果 K 恰好就是 string（也就是那個索引簽名），那麼 string extends string 為真，就把這個鍵映射成 never → 等於「丟棄這個索引簽名鍵」。

    其它像字面量 "id"、"name"、或者數字字面量 0，string extends "id"、string extends 0 都不成立，會保留下來。

同理：

```javascript
number extends K ? never : K
```
只會攔截 K = number（數字索引簽名）

```javascript
symbol extends K ? never : K
```
只會攔截 K = symbol（符號索引簽名）

4. 為什麼要同時檢查三種 string、number、symbol？
TypeScript 支援三種索引簽名：

```javascript
{ [key: string]: any }    // 字串索引
{ [idx: number]: T }      // 數字索引
{ [s: symbol]: U }        // 符號索引
```
如果你想把所有「不明確列出的那些動態鍵」一次過剔除，就要把 string、number、symbol 三種都 cover 到。

5. 完整流程示例
假設

```javascript
type A = {
  [key: string]: any;
  [idx: number]: boolean;
  id: number;
  name: string;
  0: "zero";
}
```
keyof A 會是：

```javascript
string   // 索引簽名
| number // 索引簽名
| "id"
| "name"
| 0
```
映射時：

遇到 K = string → string extends string → 映成 never → 丟棄

遇到 K = number → number extends number → 映成 never → 丟棄

遇到 "id"、"name"、0 → 都不會被上述三個條件攔截 → 保留

最終結果就只剩下：

```javascript
{
  id: number;
  name: string;
  0: "zero";
}
```
小結
Mapped Types ([K in ...]: ...) 讓我們可以「遍歷型別的所有鍵」並重建一個新型別。

Key Remapping (as) 可以依條件把某些鍵映射成 never（丟棄）或改成新名字。

Conditional Types (string extends K ? ...) 則是用來檢測「這個鍵是不是索引簽名」——如果是，就消掉它。

如此一來，RemoveIndexSignature<T> 就能做到——「剔除所有動態索引簽名，只保留明確定義的屬性」。
