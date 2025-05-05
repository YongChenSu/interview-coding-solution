## 使用 intersection 
- 交叉類型（Intersection Type）：
使用 & 可以將多個類型合併成一個新的類型
- 新的類型會包含所有被合併類型的特性

Intersection Type:
- Using & combines multiple types into a new type
- The new type will include all properties from the merged types

## Solution 1
```tsx
interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface Post {
  id: string;
  title: string;
  body: string;
}

/**
 * How do we type this return statement so it's both
 * User AND { posts: Post[] }
 */
type DefaultUserAndProps = User & { posts: Post[] }

// 也可以不用 DefaultUserAndProps 直接用 User & { posts: Post[] }
export const getDefaultUserAndPosts = (): DefaultUserAndProps => {
  return {
    id: '1',
    firstName: 'Matt',
    lastName: 'Pocock',
    posts: [
      {
        id: '1',
        title: 'How I eat so much cheese',
        body: "It's pretty edam difficult",
      },
    ],
  };
};

const userAndPosts = getDefaultUserAndPosts();

console.log(userAndPosts.posts[0]);
```
