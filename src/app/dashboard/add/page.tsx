import AddFriendButton from "@/components/AddFriendButton";
import { FC } from "react";

const page: FC = () => {
  return (
    <main className="py-8">
      <h1 className="font-bold text-5xl mb-4">Send a friend request!</h1>

      <AddFriendButton />
    </main>
  );
};

export default page;
