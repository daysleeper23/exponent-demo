'use client';

import * as React from 'react';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import Button from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TaskPropertyMap } from '@/api/static/common';

const ExpoCombobox = ({
  items,
  value,
  onChange,
  className,
  searchable = true,
  ...props
}: {
  items: TaskPropertyMap;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  searchable?: boolean;
}) => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          className={cn('justify-between gap-2', className)}
          {...props}
        >
          {value ? (
            <div className="flex items-center gap-2 text-xs font-normal text-muted-foreground">
              {items[value].icon} {items[value].label}
            </div>
          ) : (
            'Select'
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left" className="w-[200px] p-0">
        <Command
          filter={(value, search) => {
            if (
              items[value].label.toLowerCase().includes(search.toLowerCase())
            ) {
              return 1;
            } else return 0;
          }}
        >
          {searchable && (
            <CommandInput placeholder="Search..." className="h-9" />
          )}
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {Object.values(items).map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value.toString()}
                  onSelect={(currentValue: string) => {
                    setSelected(currentValue);
                    setOpen(false);
                    onChange(currentValue);
                  }}
                >
                  {item.icon}
                  {item.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      item.value === parseInt(selected)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default ExpoCombobox;
