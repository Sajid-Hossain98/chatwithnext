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
    <main className="py-8">
      <h1 className="font-bold text-5xl mb-4">Send a friend request!</h1>

      <AddFriendButton />
    </main>
  );
};

export default page;
