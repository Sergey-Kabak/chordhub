import {Children, ReactNode} from "react";

export const getChildrenByDisplayName = (children: ReactNode, displayName: string) =>
    Children.map(children, (child) => child?.type?.displayName === displayName ? child : null)