import ChatInput from "@/components/ChatInput";
import Messages from "@/components/Messages";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { messageArrayValidator } from "@/lib/validations/message";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: {
    chatId: string;
  };
}

async function getChatMessages(chatId: string) {
  try {
    const results: string[] = await fetchRedis(
      "zrange",
      `chat:${chatId}:messages`,
      0,
      -1
    );

    const dbMessages = results.map((message) => JSON.parse(message) as Message);

    const reversedDbMessages = dbMessages.reverse();

    const messages = messageArrayValidator.parse(reversedDbMessages);

    return messages;
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({ params }: pageProps) {
  const { chatId } = params;
  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const { user } = session;
  const [userId1, userId2] = chatId.split("--");

  //to determine which of the chat id is your chat partner's
  const chatPartnerId = user.id === userId1 ? userId2 : userId1;

  //getting chatPartners info
  const chatPartnerRaw = (await fetchRedis(
    "get",
    `user:${chatPartnerId}`
  )) as string;
  const chatPartner = JSON.parse(chatPartnerRaw) as User;

  return {
    title: `Chatter-💬 | ${chatPartner.name}`,
    description: `chat with ${chatPartner.email}`,
  };
}

const page: FC<pageProps> = async ({ params }: pageProps) => {
  const { chatId } = params;

  const session = await getServerSession(authOptions);

  if (!session) notFound();

  const { user } = session;

  const [userId1, userId2] = chatId.split("--");

  //if none of the user id is yours, you can not view the chat
  if (user.id !== userId1 && user.id !== userId2) {
    notFound();
  }

  //to determine which of the chat id is your chat partner's
  const chatPartnerId = user.id === userId1 ? userId2 : userId1;

  //getting chatPartners info
  const chatPartnerRaw = (await fetchRedis(
    "get",
    `user:${chatPartnerId}`
  )) as string;
  const chatPartner = JSON.parse(chatPartnerRaw) as User;

  const initialMessages = await getChatMessages(chatId);

  // console.log(initialMessages);

  return (
    <div className="flex flex-1 justify-between flex-col h-full max-h-[calc(100vh-6rem)]">
      <div className="flex sm:items-center justify-between mt-12 md:mt-0 px-5 py-2 md:py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <div className="relative w-8 sm:w-12 h-8 sm:h-12">
              <Image
                fill
                referrerPolicy="no-referrer"
                src={chatPartner.image}
                alt={`${chatPartner.name} profile picture`}
                className="rounded-full"
              />
            </div>
          </div>

          <div className="flex flex-col leading-tight">
            <div className="text-left flex items-center">
              <span className="text-gray-700 mr-3 font-semibold">
                {chatPartner.name}
              </span>
            </div>

            <span className="text-sm text-gray-600">{chatPartner.email}</span>
          </div>
        </div>
      </div>

      <Messages
        initialMessages={initialMessages}
        sessionId={session.user.id}
        chatId={chatId}
        sessionImg={session.user.image}
        chatPartner={chatPartner}
      />
      <ChatInput chatPartner={chatPartner} chatId={chatId} />
    </div>
  );
};

export default page;
