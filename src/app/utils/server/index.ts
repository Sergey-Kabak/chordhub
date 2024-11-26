import { headers } from 'next/headers';

export const currentDomain = async () => {
    const headersList = await headers();
    const protocol = headersList.get('x-forwarded-proto')
    const domain = headersList.get('host') || "";

    return protocol + '://' + domain;
}