import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Icon, Icons } from "@/components/Icons";
import Image from "next/image";
import SIgnOutButton from "@/components/SignOutButton";

interface LayoutProps {
  children: ReactNode;
}

interface SideBarOptions {
  id: number;
  name: string;
  href: string;
  icon: Icon;
}

const sideBarOptions: SideBarOptions[] = [
  { id: 1, name: "Add Friend", href: "/dashboard/add", icon: "UserPlus" },
];

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  return (
    <div className="w-full flex h-screen">
      <div className="flex h-full w-full max-w-sm grow flex-col gap-y-5 overflow-y-auto overflow-x-hidden border-r border-gray-200 px-6">
        <Link
          href={"/dashboard"}
          className="flex h-16 w-fit shrink-0 items-center"
        >
          <Icons.Logo className="h-8 w-fit text-indigo-600" />
        </Link>

        <div className="text-xs font-semibold leading-6 text-gray-400">
          Your chats
        </div>

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>/chats/</li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                overview
              </div>

              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {sideBarOptions.map((option) => {
                  const Icon = Icons[option.icon];

                  return (
                    <li key={option.id}>
                      <Link
                        href={option.href}
                        className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded p-2 text-sm leading-6 font-semibold"
                      >
                        <span className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
                          <Icon className="h-4 w-4" />
                        </span>

                        <span className="truncate">{option.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>

            <li className="-mx-6 mt-auto flex items-center">
              <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                <div className="relative h-8 w-8">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={session.user.image || ""}
                    alt="Your profile pic"
                  />
                </div>

                <span className="sr-only">Your profile</span>
                <div className="flex flex-col">
                  <span area-hidden="true">{session?.user.name}</span>
                  <span className="text-xs text-zinc-400" area-hidden="true">
                    {session?.user.email}
                  </span>
                </div>
              </div>

              <SIgnOutButton className="h-full aspect-square" />
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Layout;