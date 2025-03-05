import { Loader2 } from 'lucide-react';

const LoadingDataView = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="text-sm text-primary/75">{message}</div>
      <Loader2 className="mt-4 animate-spin text-primary/80" size={16} />
    </div>
  );
};
export default LoadingDataView;
