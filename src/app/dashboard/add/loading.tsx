import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  return (
    <div className="w-full flex flex-col gap-3 py-8">
      <Skeleton className="mb-4" height={60} width={450} />

      <Skeleton height={20} width={150} />
      <div className="flex items-center gap-3">
        <Skeleton height={50} width={380} />
        <Skeleton height={50} width={70} />
      </div>
    </div>
  );
};

export default loading;
