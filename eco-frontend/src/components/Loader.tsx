import React from 'react'

const Loader = () => {
  return (
    <div>
      Loader...
    </div>
  )
}
interface SkeletonProps {
  width?: string;
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ width = "unset", count = 3 }: SkeletonProps) => {
  const skeletons = Array.from({ length: count }, (_, idx) => (
    <div key={idx} className="skeleton-shape"></div>
  ));

  return (
    <div className="skeleton-loader" style={{ width }}>
      {skeletons}
    </div>
  );
};


export default Loader
