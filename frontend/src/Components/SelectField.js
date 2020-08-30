import { FieldProps } from 'formik';
import React from 'react';
import { Option, ReactSelectProps } from 'react-select';
import WindowedSelect from "react-windowed-select";

export const SelectField: React.SFC<ReactSelectProps & FieldProps> = ({
  options,
  list,
  field,
  form,
  disabled,
  }) => (
    <WindowedSelect
      options={options}
      name={field.name}
      value={options ? options.find(option => option.value === field.value) : ''}
      onChange={(option: Option) => form.setFieldValue(field.name, option.value)}
      onBlur={field.onBlur}
      isDisabled={disabled}
    />
  )
