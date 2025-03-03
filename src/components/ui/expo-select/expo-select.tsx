import { Metadata } from "@/api/common"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React from "react"

/*
  this component needs to have the following props to work with react-hook-form:
  - value: string
  - onChange: (value: string) => void
*/
export function ExpoSelect({
  items,
  value,
  onChange,
}: {
  items: Metadata[],
  value: string,
  onChange: (value: string) => void
}) {

  return (
    
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={
          <div className="flex items-center gap-2">
            {items.find(item => item.value.toString() === value) ? React.createElement(items.find(item => item.value.toString() === value)!.icon) : null}
            {items.find(item => item.value.toString() === value)?.label}
          </div>
        }/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            items.map((item) => (
              <SelectItem key={item.value} value={item.value.toString()}>
                {React.createElement(item.icon)}
                {item.label}
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}