import type {FunctionComponent} from "react";

export const SkeletonLoader: FunctionComponent = () => (
  <div className="animate-pulse flex flex-col gap-2">
    <div className="bg-gray-800 h-24 rounded-2xl"></div>
    <div className="bg-gray-800 h-24 rounded-2xl"></div>
    <div className="bg-gray-800 h-14 rounded-2xl mt-4"></div>
  </div>
);
