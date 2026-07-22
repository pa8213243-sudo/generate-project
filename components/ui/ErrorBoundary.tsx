"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertOctagon, RefreshCcw } from "lucide-react";

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("PARVEJ OS System Error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-[#050816] min-h-[400px] rounded-2xl border border-red-500/30">
          <AlertOctagon className="w-12 h-12 text-red-500 mb-4 animate-pulse" />
          <h2 className="text-xl font-bold text-white mb-2">MODULE RENDER FAILURE</h2>
          <p className="text-white/50 font-mono text-sm mb-6 max-w-md">
            A UI module failed to compile. The core system remains operational.
          </p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-6 py-2 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20 rounded-lg flex items-center gap-2 transition-colors"
          >
            <RefreshCcw className="w-4 h-4" /> REBOOT MODULE
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}