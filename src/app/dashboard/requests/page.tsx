import FriendRequests from "@/components/FriendRequests";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

//metadata
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chatter-💬 | Friend requests",
  description:
    "Get all the incoming friend request and either accept or delete them!",
};

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  //getting the id of people who sent friend requests to the current user
  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  const incomingFriendRequests = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = (await fetchRedis("get", `user:${senderId}`)) as string;
      const parsedSender = JSON.parse(sender) as User;

      return {
        senderId,
        senderEmail: parsedSender.email,
      };
    })
  );
  return (
    <main className="py-8 px-4">
      <h1 className="font-bold mt-8 md:mt-0 mb-4 md:mb-8 text-3xl sm:text-4xl md:text-5xl">
        Friend requests
      </h1>

      <div className="flex flex-col gap-4">
        <FriendRequests
          incomingFriendRequests={incomingFriendRequests}
          sessionId={session.user.id}
        />
      </div>
    </main>
  );
};

export default page;
