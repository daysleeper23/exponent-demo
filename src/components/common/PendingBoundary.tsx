const PendingBoundary = ({ isPending, children }: {
  isPending: boolean;
  children: React.ReactNode;
}) => {
  if (isPending) {
    // Throw an unresolved Promise to trigger Suspense
    throw new Promise(() => {});
  }
  return <>{children}</>;
};
export default PendingBoundary;