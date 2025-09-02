import { initializeLoveUrl, LoveUrlConfig } from "../internal/config";
import { createContext, useContext, useRef, ReactNode, PropsWithChildren } from "react";

export type LoveUrlProviderProps = {
    options: Partial<LoveUrlConfig>
}

export type LoveUrlContextApi = {}

const LoveUrlContext = createContext<LoveUrlContextApi>({});

export const useLoveUrlProvider = () => useContext<LoveUrlContextApi>(LoveUrlContext);

/** A config provider for using loveUrl with react  */
export const LoveUrlProvider = ({ options, children }: LoveUrlProviderProps & PropsWithChildren) => {
    const configRef = useRef(initializeLoveUrl(options))

    return <LoveUrlContext.Provider value={configRef.current}>
        {(children as ReactNode)}
    </LoveUrlContext.Provider>;




}