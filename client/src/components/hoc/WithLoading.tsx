import React from "react";

interface WithLoadingProps {
  isLoading: boolean;
}

export const withLoading = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithLoadingProps> => {
  function HOC({ isLoading, ...props }: WithLoadingProps) {
    return (
      <>{isLoading ? <p>Loading..</p> : <Component {...(props as P)} />}</>
    );
  }
  return HOC;
};
export default withLoading;
