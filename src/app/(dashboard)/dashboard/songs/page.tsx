'use client'

import {FormProvider, useForm} from "react-hook-form";
import {Button, Input, Textarea} from "@nextui-org/react";

export default function DashboardSongs () {

    const form = useForm({
        defaultValues: {
            authorName: '',
            songName: '',
            content: ''
        },
        mode: 'onChange',
    });

    const handleFormSubmit = form.handleSubmit((values) => {
        fetch('/api/songs', {
            method: 'POST',
            body: JSON.stringify(values)
        })
            .then(res => res.json().then(data => console.log(data)));
    })

    return (
        <FormProvider {...form}>
            <form onSubmit={handleFormSubmit} className={'grid gap-2 p-4'}>
                <Input type="text" {...form.register('authorName')} placeholder="Author" />
                <Input type="text" {...form.register('songName')} placeholder="Song name" />
                <Textarea {...form.register('content')}></Textarea>
                <Button type="submit">Submit</Button>
            </form>
        </FormProvider>
    )
}