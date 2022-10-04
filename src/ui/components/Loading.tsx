import * as React from 'react';

const Loading = ({
  message = 'Loading...',
  children,
}: {
  message: string;
  children?: React.ReactNode;
}) => (
  <h1>
    {message}...
    {children}
  </h1>
);
export default Loading;
