import { Loader2 } from 'lucide-react';
import Button from '../ui/button';

const ServerError = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen gap-6">
      <Loader2 className="mt-4 animate-spin text-primary/80" size={24} />
      <div className="px-12 text-lg text-center text-primary/80 max-w-xl">
        Backend server (hosted on Render) is being warmed up. Please wait for a
        few minutes.
      </div>
      <Button
        variant="outline"
        className="mt-4"
        onClick={() => window.location.reload()}
      >
        Reload
      </Button>
    </div>
  );
};
export default ServerError;
