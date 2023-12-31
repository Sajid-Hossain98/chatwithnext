import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import Image from "next/image";
import SIgnOutButton from "@/components/SignOutButton";
import FriendRequestSidebarOption from "@/components/FriendRequestSidebarOption";
import { fetchRedis } from "@/helpers/redis";
import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import SideBarChatList from "@/components/SideBarChatList";
import MobileChatLayout from "@/components/MobileChatLayout";
import { SidebarOption } from "@/types/typings";

interface LayoutProps {
  children: ReactNode;
}

const sideBarOptions: SidebarOption[] = [
  { id: 1, name: "Add Friend", href: "/dashboard/add", Icon: "UserPlus" },
];

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const unseenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    )) as User[]
  ).length;

  const friends = await getFriendsByUserId(session.user.id);

  return (
    <div className="w-full flex h-screen">
      <div className="md:hidden">
        <MobileChatLayout
          friends={friends}
          session={session}
          sidebarOptions={sideBarOptions}
          unseenRequestCount={unseenRequestCount}
        />
      </div>

      <div className="md:flex h-full w-full max-w-sm grow flex-col gap-y-5 overflow-y-auto overflow-x-hidden border-r border-gray-200 px-6 pt-6 hidden text-lg">
        <Link href={"/dashboard"} className="flex shrink-0 items-center">
          <Icons.Logo className="text-indigo-600" height={50} width={50} />
        </Link>

        {friends.length > 0 ? (
          <div className="text-xs font-semibold leading-6 text-gray-400">
            Your chats
          </div>
        ) : null}

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <SideBarChatList sessionId={session.user.id} friends={friends} />
            </li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                overview
              </div>

              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {sideBarOptions.map((option) => {
                  const Icon = Icons[option.Icon];

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

                <li>
                  <FriendRequestSidebarOption
                    sessionId={session.user.id}
                    initialUnseenRequestCount={unseenRequestCount}
                  />
                </li>
              </ul>
            </li>

            <li className="-mx-6 mt-auto flex items-center justify-between">
              <div className="flex items-center gap-x-2 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
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
      <aside className="max-h-screen py-2 md:py-4 w-full md:px-4 overflow-y-auto">
        {children}
      </aside>
    </div>
  );
};

export default Layout;
