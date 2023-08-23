"use client";

import { chatHrefConstructor } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface SideBarChatListProps {
  friends: User[];
  sessionId: string;
}

const SideBarChatList: FC<SideBarChatListProps> = ({ friends, sessionId }) => {
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  const router = useRouter();

  const pathName = usePathname();

  useEffect(() => {
    if (pathName.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathName.includes(msg.senderId));
      });
    }
  }, [pathName]);

  return (
    <ul role="list" className="max-h-[25rem] overflow-y-auto -mx-2 space-y-1">
      {friends.sort().map((friend) => {
        const unseenMessagesCount = unseenMessages.filter((unseenMsg) => {
          return unseenMsg.senderId === friend.id;
        }).length;

        return (
          <li key={friend.id}>
            <a
              href={`/dashboard/chat/${chatHrefConstructor(
                sessionId,
                friend.id
              )}`}
              className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
            >
              <span className="flex items-center gap-2">
                <div className="relative h-8 w-8">
                  <Image
                    fill
                    src={friend.image}
                    alt={`${friend.name} profile pic`}
                    className="rounded-full h-full w-full"
                  />
                </div>

                {friend.name}
              </span>

              {unseenMessagesCount > 0 ? (
                <div className="bg-indigo-600 font-medium text-xs text-white w-4 h-4 rounded-full flex items-center justify-center">
                  {unseenMessagesCount}
                </div>
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SideBarChatList;
