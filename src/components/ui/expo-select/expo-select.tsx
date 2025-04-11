import { memo } from 'react';
import { TaskPropertyMap } from '@/api/static/common';
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

const ExpoSelect = memo(
  ({
    items,
    value,
    onChange,
    className,
    ...props
  }: {
    items: TaskPropertyMap;
    value: string;
    onChange: (value: string) => void;
    className?: string;
  }) => {
    console.log('value', value);

    return (
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className={className || ''} {...props}>
          <SelectValue
            placeholder={
              value !== null ? (
                <div className="flex items-center gap-2">
                  {items[value].icon}
                  {items[value].label}
                </div>
              ) : (
                'Select an option'
              )
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.values(items).map((item) => (
              <SelectItem key={item.value} value={item.value.toString()}>
                {item.icon}
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
);
export default ExpoSelect;
