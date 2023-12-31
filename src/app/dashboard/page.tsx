import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { chatHrefConstructor } from "@/lib/utils";
import { ChevronRight, Users2 } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface pageProps {}

const page = async ({}) => {
  const session = await getServerSession(authOptions);

  if (!session) notFound();

  const friends = await getFriendsByUserId(session.user.id);

  const friendsWithLastMessage = await Promise.all(
    friends.map(async (friend) => {
      const [lastMessageRaw] = (await fetchRedis(
        "zrange",
        `chat:${chatHrefConstructor(session.user.id, friend.id)}:messages`,
        -1,
        -1
      )) as string[];

      let lastMessage = null;

      if (lastMessageRaw) {
        try {
          lastMessage = JSON.parse(lastMessageRaw) as Message;
        } catch (error) {
          console.error("Error parsing last message:", error);
        }
      }

      // const lastMessage = JSON.parse(lastMessageRaw) as Message;

      return {
        ...friend,
        lastMessage,
      };
    })
  );

  return (
    <div className="container py-8 mt-8 md:mt-0 px-4">
      <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-8">
        Recent Chats
      </h1>

      {friendsWithLastMessage.length === 0 ? (
        <>
          <p className="text-sm mb-2 text-zinc-500">No chats to show!</p>
          <div>
            <Link
              href="/dashboard/add"
              className="flex items-center gap-2 w-fit text-2xl font-medium underline decoration-green-400 underline-offset-4"
            >
              Add a Friend to chat
              <Users2 />
            </Link>

            <div className="relative max-w-sm h-[15rem] md:h-[25rem] mt-4">
              <Image
                fill
                src="https://i.ibb.co/n3bgkcZ/question-illustration.png"
                alt="no friends illustration"
                className="object-contain"
              />
            </div>
          </div>
        </>
      ) : (
        friendsWithLastMessage.map((friend) => (
          <div
            key={friend.id}
            className="relative bg-zinc-50 border border-zinc-200 rounded-md px-2 mb-2"
          >
            <div className="absolute right-4 inset-y-0 flex items-center">
              <ChevronRight className="h-7 w-7 text-zinc-400" />
            </div>

            <Link
              href={`/dashboard/chat/${chatHrefConstructor(
                session.user.id,
                friend.id
              )}`}
              className="relative sm:flex items-center gap-3 p-3"
            >
              <div className="flex-shrink-0">
                <div className="relative h-6 w-6">
                  <Image
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    alt={`${friend.name} profile picture`}
                    src={friend.image}
                    fill
                  />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold">{friend.name}</h4>
                <p className="mt-1 max-w-md">
                  <span className="text-zinc-400">
                    {friend.lastMessage?.senderId === session.user.id
                      ? "You: "
                      : ""}
                  </span>
                  {friend.lastMessage?.text}
                </p>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default page;
