import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-pure-black text-pure-white flex items-center justify-center p-6">
          <div className="max-w-2xl w-full">
            <div className="bg-gray-900/60 backdrop-blur-md border border-red-500/30 rounded-2xl p-8 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-500/50 flex items-center justify-center">
                  <AlertTriangle className="h-10 w-10 text-red-400" />
                </div>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-3">
                  Oops! Algo deu errado
                </h1>
                <p className="text-gray-400 text-lg">
                  Encontramos um erro inesperado. Não se preocupe, você pode tentar novamente.
                </p>
              </div>

              {/* Error Details (collapsible in production) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-6 bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <summary className="cursor-pointer text-gray-300 font-medium mb-2 hover:text-white transition-colors">
                    Detalhes técnicos (dev only)
                  </summary>
                  <div className="text-xs text-red-400 font-mono mt-3 space-y-2">
                    <div className="bg-gray-900/80 p-3 rounded border border-red-500/20">
                      <div className="text-gray-500 mb-1">Error:</div>
                      <div className="text-red-300">{this.state.error.toString()}</div>
                    </div>
                    {this.state.errorInfo && (
                      <div className="bg-gray-900/80 p-3 rounded border border-red-500/20 max-h-40 overflow-y-auto">
                        <div className="text-gray-500 mb-1">Stack trace:</div>
                        <pre className="text-red-300 whitespace-pre-wrap">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={this.handleReset}
                  className="inline-flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium"
                >
                  <RefreshCw className="h-5 w-5" />
                  <span>Tentar Novamente</span>
                </button>
                <button
                  onClick={this.handleGoHome}
                  className="inline-flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium"
                >
                  <Home className="h-5 w-5" />
                  <span>Voltar ao Início</span>
                </button>
              </div>

              {/* Help Text */}
              <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
                <p className="text-sm text-gray-500">
                  Se o problema persistir, tente{' '}
                  <button
                    onClick={() => window.location.reload()}
                    className="text-primary-400 hover:text-primary-300 underline transition-colors"
                  >
                    recarregar a página
                  </button>
                  {' '}ou entre em contato com o suporte.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
