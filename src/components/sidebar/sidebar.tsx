import { FC, PropsWithChildren } from "react";
import { getChildrenByDisplayName } from '@/utils/components.ts'

interface SidebarSubComponents {
    Header: FC<PropsWithChildren>,
    Body: FC<PropsWithChildren>,
    Footer: FC<PropsWithChildren>,
}

const Sidebar: FC<PropsWithChildren> & SidebarSubComponents = ({ children }) => {
    const header = getChildrenByDisplayName(children, 'Header');
    const body = getChildrenByDisplayName(children, 'Body');
    const footer = getChildrenByDisplayName(children, 'Footer');

    return (
        <div className='sticky top-[98px]'>
            {header}
            {body}
            {footer}
        </div>
    );
};

const Header = (props) => <div className='card-header'>{props.children}</div>;
Header.displayName = 'Header'
Sidebar.Header = Header;

const Body = (props) => <div className='card-body'>{props.children}</div>;
Body.displayName = 'Body'
Sidebar.Body = Body;

const Footer = (props) => <div className='card-footer'>{props.children}</div>;
Footer.displayName = 'Footer'
Sidebar.Footer = Footer;

export default Sidebar;