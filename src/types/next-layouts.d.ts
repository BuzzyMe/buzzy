import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

declare module "next" {
    // eslint-disable-next-line @typescript-eslint/ban-types
    type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
        getLayout?: (page: ReactElement) => ReactNode
    }
}
