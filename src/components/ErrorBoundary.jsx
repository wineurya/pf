import { Component } from "react";

const isDev = import.meta.env.DEV;

export class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    if (isDev) {
      console.error(error, info.componentStack);
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div
          role="alert"
          className="min-h-dvh p-6 font-body bg-[var(--color-bg)] text-[var(--color-fg)]"
        >
          <p className="text-sm font-medium">Something went wrong.</p>
          {isDev ? (
            <pre className="mt-4 max-h-[50vh] overflow-auto rounded-md bg-[var(--color-bg)] p-4 text-xs leading-relaxed whitespace-pre-wrap text-[var(--color-fg-secondary)]">
              {String(this.state.error)}
            </pre>
          ) : null}
        </div>
      );
    }
    return this.props.children;
  }
}
