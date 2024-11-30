import React from "react";

interface Props {
  className?: string;
}

export const ServerHeader: React.FC<Props> = ({ className }) => {
  return <div className={className}>Server Header</div>;
};
