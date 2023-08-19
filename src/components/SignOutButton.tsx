"use client";

import { ButtonHTMLAttributes, FC, useState } from "react";
import Button from "./ui/Button";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Loader2, LogOut } from "lucide-react";

interface SIgnOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SIgnOutButton: FC<SIgnOutButtonProps> = ({ ...props }) => {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  return (
    <Button
      {...props}
      variant="ghost"
      onClick={async () => {
        setIsSigningOut(true);
        try {
          await signOut();
        } catch (error) {
          toast.error("Can't sign out, try later!");
        } finally {
          setIsSigningOut(false);
        }
      }}
    >
      {isSigningOut ? (
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
    </Button>
  );
};

export default SIgnOutButton;
