import { LucideProps, UserPlus } from "lucide-react";

export const Icons = {
  Logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#068FFF"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-message-square-dashed"
    >
      <path d="M3 6V5c0-1.1.9-2 2-2h2" />
      <path d="M11 3h3" />
      <path d="M18 3h1c1.1 0 2 .9 2 2" />
      <path d="M21 9v2" />
      <path d="M21 15c0 1.1-.9 2-2 2h-1" />
      <path d="M14 17h-3" />
      <path d="m7 17-4 4v-5" />
      <path d="M3 12v-2" />
    </svg>
  ),
  UserPlus,
};

export type Icon = keyof typeof Icons;
