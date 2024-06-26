## Question: 0020-error-boundary
```javascript
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

function renderWithError() {
  throw new Error('error');
}

function A() {
  return <ErrorBoundary name="boundary-2">{renderWithError()}</ErrorBoundary>;
}

function App() {
  return (
    <ErrorBoundary name="boundary-1">
      <A />
    </ErrorBoundary>
  )
}


class ErrorBoundary extends Component<
  { name: string; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    console.log(this.props.name);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
```

## Solution 1
```tsx
"boundary-1"
```

## Note
`<ErrorBoundary/>`  captures the error from children only and not even from itself. Since the error is thrown from "boundary-2", the parent "boundary-1" catches it.
