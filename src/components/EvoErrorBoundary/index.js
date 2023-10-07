import React from "react";
import {ErrorBoundary} from "react-error-boundary";
import { ErrorFallback, ErrorFallback2 } from "./Fallback";

const EvoErrorBoundary = ({ children, small }) => {
  return (
    <ErrorBoundary FallbackComponent={small ? ErrorFallback2 : ErrorFallback}>
     {children}
    </ErrorBoundary>
  );
};

export default EvoErrorBoundary;
