'use client'

import { Input, InputProps } from '@heroui/react';
import { useController } from 'react-hook-form';

interface FormInputProps extends InputProps {
  name: string;
}

export const FormInput = ({ name, ...otherProps }: FormInputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name });

  return (
    <>
      <Input {...field} {...otherProps} isInvalid={!!error} size={'sm'} variant={'bordered'}/>
      {error && (<span className={`text-xs text-danger`}>{error.message}</span>)}
    </>
  );
};