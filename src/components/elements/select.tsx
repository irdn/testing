import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface ElementProps {
  value: string;
  label: string;
  labelId: string;
  name: string;
  onChange: (event: SelectChangeEvent) => void;
  items: { value: string; name: string }[];
}

export default function SelectElement({
  value,
  label,
  labelId,
  name,
  onChange,
  items,
}: ElementProps) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        value={value}
        label={label}
        name={name}
        onChange={onChange}
      >
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
