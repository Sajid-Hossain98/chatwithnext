import AddFriendButton from "@/components/AddFriendButton";
import { FC } from "react";

//metadata
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chatter-💬 | Add friend",
  description: "Send a friend request using email of an user!",
};

const page: FC = () => {
  return (
    <main className="py-8 px-4">
      <h1 className="font-bold mt-8 md:mt-0 mb-4 text-3xl sm:text-4xl md:text-5xl">
        Send a friend request!
      </h1>

      <AddFriendButton />
    </main>
  );
};

export default page;
