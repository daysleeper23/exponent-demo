import { Frown } from 'lucide-react';
import Button from '../ui/button';

const ServerError = () => {
  
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen gap-6">
      <Frown className="mt-4 text-primary/80" size={24} />
      <div className="px-12 text-center text-primary/80 max-w-xl">
        Some error occurred. Please go back to the Home page.
      </div>
      <Button className="mt-4" onClick={() => window.location.replace('/')}>
        Go back
      </Button>
    </div>
  );
};
export default ServerError;
