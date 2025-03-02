import {FC, PropsWithChildren} from "react";

type SectionProps = {
    title: string,
}

export const Section: FC<PropsWithChildren<SectionProps>> = ({ children, title }) => {
    return (
        <div className={'page-section [&:not(:first-child)]:mt-10 [&:not(:last-child)]:pb-10 [&:not(:last-child)]:border-b-1'}>
            <h2 className={'mb-4 font-medium capitalize'}>{title}</h2>
            {children}
        </div>
    )
}