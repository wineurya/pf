import { Component } from "react";

export class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div
          role="alert"
          className="min-h-dvh p-6 font-body bg-[var(--color-bg)] text-[var(--color-fg)]"
        >
          <p className="text-sm">Error</p>
        </div>
      );
    }
    return this.props.children;
  }
}
