import { usePathname, useSearchParams } from "next/navigation";
import { LoveUrlProvider, LoveUrlProviderProps } from "../react";
import { PropsWithChildren } from "react";


/** A config provider for using loveUrl with next automatically providing search & path  */
export const LoveUrlSSRProvider = ({ options, children }: LoveUrlProviderProps & PropsWithChildren) => {
    const searchParams = useSearchParams();
    const path = usePathname();

    return <LoveUrlProvider options={{
        urlProvider: () => `${path}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`,
        ...options,
    }}>
        {children}
    </LoveUrlProvider>;




}