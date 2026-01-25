import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

class ErrorBoundaryCore extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (this.props.onError) {
      this.props.onError(error, info);
    }
  }

  reset = () => {
    this.setState({ hasError: false });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    const { hasError } = this.state;
    const { fallback } = this.props;
    if (hasError) {
      return typeof fallback === 'function' ? fallback({ onReset: this.reset }) : fallback || null;
    }
    return this.props.children;
  }
}

const ErrorFallback = ({ onReset }) => {
  const { theme } = useTheme();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className={`max-w-2xl mx-auto glass-effect rounded-2xl p-8 border ${theme.border || 'border-white/10'} text-center`}>
        <AlertTriangle className={`w-12 h-12 ${theme.text || 'text-blue-400'} mx-auto mb-4`} aria-hidden="true" />
        <h1 className="text-3xl font-bold text-white mb-3">Something went wrong</h1>
        <p className="text-gray-300 mb-6">
          Please refresh the page or head back to the recipe hub.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className={`px-6 py-2 rounded-lg ${theme.highlight || 'bg-blue-900/40'} border ${theme.border || 'border-blue-500/20'} ${theme.text || 'text-blue-400'} font-semibold hover-lift transition-all-smooth`}
          >
            Try again
          </button>
          <Link
            to="/"
            className="px-6 py-2 rounded-lg border border-white/10 text-gray-200 hover:bg-white/10 transition-all-smooth"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

const ErrorBoundary = ({ children, fallback, onError, onReset }) => (
  <ErrorBoundaryCore fallback={fallback || (({ onReset }) => <ErrorFallback onReset={onReset} />)} onError={onError} onReset={onReset}>
    {children}
  </ErrorBoundaryCore>
);

export default ErrorBoundary;
