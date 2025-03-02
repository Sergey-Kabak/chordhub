'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useForm, FormProvider } from "react-hook-form";
import { Input, Button } from "@heroui/react";

export const Search = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const createQueryString =
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        }

    const form = useForm({
        defaultValues: {
            query: ''
        }
    });

    const handleSubmitForm = form.handleSubmit((values) => {
        router.push('/search?' + createQueryString('query', values.query))
    });

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmitForm} className={'flex gap-2 max-w-[640px]'}>
                <Input {...form.register('query')} />
                <Button type={'submit'}>Search</Button>
            </form>
        </FormProvider>
    )
}