import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  return (
    <div className="w-full flex flex-col gap-3 pt-8">
      <Skeleton className="mb-4" height={60} width={500} />
      <div className="flex items-center justify-start gap-3">
        <Skeleton height={35} width={400} />
        <Skeleton className="rounded-full" height={35} width={35} />
        <Skeleton className="rounded-full" height={35} width={35} />
      </div>
      <div className="flex items-center justify-start gap-3">
        <Skeleton height={35} width={400} />
        <Skeleton className="rounded-full" height={35} width={35} />
        <Skeleton className="rounded-full" height={35} width={35} />
      </div>
      <div className="flex items-center justify-start gap-3">
        <Skeleton height={35} width={400} />
        <Skeleton className="rounded-full" height={35} width={35} />
        <Skeleton className="rounded-full" height={35} width={35} />
      </div>
    </div>
  );
};

export default loading;
