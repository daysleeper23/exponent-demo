import { createElement } from 'react';
import { Metadata } from '@/api/api-common';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/*
  this component needs to have the following props to work with react-hook-form:
  - value: string
  - onChange: (value: string) => void
*/

const ExpoSelect = ({
  items,
  value,
  onChange,
  className,
  ...props
}: {
  items: Metadata[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className={className || ''} {...props}>
        <SelectValue
          placeholder={
            <div className="flex items-center gap-2">
              {items.find((item) => item.value.toString() === value)
                ? createElement(
                    items.find((item) => item.value.toString() === value)!.icon
                  )
                : null}
              {items.find((item) => item.value.toString() === value)?.label}
            </div>
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value.toString()}>
              {createElement(item.icon)}
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default ExpoSelect;
