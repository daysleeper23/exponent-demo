import Button from '@/components/ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export interface ExpoDialogDrawerProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: React.ReactNode;
}

const ExpoDialog = ({
  open,
  onOpenChange,
  children,
  title,
  description,
  form,
}: ExpoDialogDrawerProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[767px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription> {description} </DialogDescription>
          )}
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  );
};
export default ExpoDialog;
