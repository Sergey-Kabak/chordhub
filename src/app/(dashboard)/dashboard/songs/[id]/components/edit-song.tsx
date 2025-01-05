'use client';

import { useRef, useState, useMemo } from 'react';
import { useForm, FromProvider } from 'react-hook-form';
import {Select, SelectItem, Button} from "@nextui-org/react";

import dynamic from 'next/dynamic'

const JoditEditor = dynamic(() => import('jodit-react'),  {
  ssr: false,
})

export const EditSong = ({ song, categories } : { song: Record<string, unknown>, categories: Record<string, unknown>[] }) => {
  console.log(song, categories);
  const form = useForm({
    defaultValues: song,
    mode: 'onChange',
    resolver: () => null,
  });

  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = useMemo(() => (
    {
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: 'Start typings...'
    }),
    []
  )

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-end border-b border-stroke px-6.5 py-4 dark:border-strokedark bg-white sticky top-[80px] z-1 dark:bg-boxdark">
        <Button color={'primary'}>Save</Button>
      </div>
      <div className="flex flex-col gap-5.5 p-6.5">

        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Name
          </label>
          <input
            {...form.register("name")}
            type="text"
            placeholder="Default Input"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Performer
          </label>
          <input
            disabled={true}
            defaultValue={song.performers.name}
            type="text"
            placeholder="Default Input"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="flex w-full max-w-xs flex-col gap-2">
          <Select
            className="max-w-xs"
            placeholder="Select category"
            selectedKeys={song.categories as 'all'}
            selectionMode="multiple"
            onSelectionChange={form.setValues}
          >
            {categories.map((category) => (
              <SelectItem key={category.id as number}>{category.name as string}</SelectItem>
            ))}
          </Select>
          {/*<p className="text-small text-default-500">Selected: {Array.from(song.categories).join(", ")}</p>*/}
        </div>

        <JoditEditor
          ref={editor}
          value={song.content}
          config={config}
          onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={newContent => {
          }}
        />
      </div>
    </div>
  )
}