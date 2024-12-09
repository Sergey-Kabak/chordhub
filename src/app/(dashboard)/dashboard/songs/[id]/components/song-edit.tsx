'use client'

import React, { useState, useRef, useMemo } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { Button, Pagination, Divider } from "@nextui-org/react";
import dynamic from "next/dynamic";

import { FormInput } from "@/components/form/form-input";
import { SongType } from "@/types/song.ts";

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false }) ;

export const SongEdit = ({ data }: { data: SongType} ) => {
  const editor = useRef(null);
  const [content, setContent] = useState(data.content);
  const [currentPage, setCurrentPage] = useState(1);

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    form.setValue(`tonalities.[${currentPage - 1}]`, value);
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
        <div className={'grid grid-cols-3 gap-2'}>
          <div>
            name
            <FormInput name={'name'}/>
          </div>

          <div>
            performer
            <FormInput name={'performer.name'} isDisabled/>
          </div>

          <div>
            album
            <FormInput name={'album'} />
          </div>
        </div>


        <Divider className="my-4" />
        tonalities:
        <Pagination
          key={'flat'}
          total={data.content.length}
          variant={'flat'}
          page={currentPage}
          onChange={setCurrentPage}
        />

        <Divider className="my-4" />

        <JoditEditor
          className={'grid'}
          ref={editor}
          value={content[currentPage - 1]}
          config={config}
          onBlur={() => setContent((prev) => {
            return prev
          })} // preferred to use only this option to update the content for performance reasons
          onChange={handleTextEditor}
        />
        <Divider className="my-4" />
        <Button type={'submit'}>Submit</Button>
      </form>
    </FormProvider>
  )
}