// components/combo-box.tsx
"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

type Option = {
  label: string;
  value: string;
};

interface ComboBoxProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
}

export const ComboBox = ({ options, value, onChange }: ComboBoxProps) => {
  const selected = options.find((option) => option.value === value) ?? null;

  return (
    <Combobox
      items={options}
      value={selected}
      onValueChange={(option) => onChange(option?.value ?? "")}
      itemToStringValue={(option) => option.label}
    >
      <ComboboxInput placeholder="Select option..." />
      <ComboboxContent>
        <ComboboxEmpty>No option found.</ComboboxEmpty>
        <ComboboxList>
          {(option) => (
            <ComboboxItem key={option.value} value={option}>
              {option.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};