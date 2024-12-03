'use client'

import React, { useState, useRef, useMemo } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@nextui-org/react";
import dynamic from "next/dynamic";

import { FormInput } from "@/components/form/form-input";

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false }) ;

export const SongEdit = ({ data }: { data: Record<string, string>} ) => {
  const editor = useRef(null);
  const [content, setContent] = useState(data.content);

  console.log(data);

  const config = useMemo(() => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: 'Start typings...'
    }),
    []
  );

  const form = useForm({
    defaultValues: data,
    mode: 'onChange',
  });

  const handleTextEditor = (value: string) => {
    form.setValue('content', value);
  }

  const handeFormSubmit = form.handleSubmit((values) => {
    fetch('/api/songs', {
        method: 'PUT',
        body: JSON.stringify(values)
      })
        .then(res => res.json().then(data => console.log(data)));
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={handeFormSubmit}>
        name
        <FormInput name={'name'}/>

        <br/>

        album
        <FormInput name={'album'}/>

        content
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={handleTextEditor}
        />
        <Button type={'submit'}>Submit</Button>
      </form>
    </FormProvider>
  )
}