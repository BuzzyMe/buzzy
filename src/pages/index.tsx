import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
    return (
        <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 pt-16">
            <h1 className="text-5xl font-extrabold mb-6 md:text-[5rem] wrap">
                Buzzy!
            </h1>
            <p className="text-2xl">Have some fun :3</p>
            <div className="mt-3 grid gap-3 pt-3 text-center md:grid-cols-2 lg:w-2/3">
                <CardLink
                    name="Play"
                    description="Play using your connected devices."
                    documentation="/play"
                />
                <CardLink
                    name="Settings"
                    description="Connect your devices..."
                    documentation="/play/settings"
                />
            </div>
        </main>
    );
};

export default Home;

type CardLinkProps = {
  name: string;
  description: string;
  documentation: string;
};

const CardLink = ({
    name,
    description,
    documentation,
}: CardLinkProps) => {
    return (
        <section className="card duration-500 motion-safe:hover:scale-105">
            <h2 className="text-lg">{name}</h2>
            <p className="text-sm">{description}</p>
            <Link href={documentation}>
                <a
                    className="m-auto mt-3 w-fit text-sm text-primary underline decoration-dotted underline-offset-2"
                >
                    Click Here!
                </a>
            </Link>
        </section>
    );
};
