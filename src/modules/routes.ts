export const routes: Route[] = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "About",
        href: "/about",
    },
    {
        name: "Play",
        href: "/play",
    },
    {
        name: "Settings",
        href: "/play/settings",
    }
]

export interface Route {
    name: string,
    href: string,
    current?: boolean
}