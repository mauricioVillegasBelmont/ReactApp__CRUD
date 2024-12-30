import React, { ReactNode } from "react";


interface DisplayFullProps {
  classes?:string;
  children:ReactNode;
}
const DisplayFull: React.FC<DisplayFullProps> = (props: DisplayFullProps) => {
  const { classes, children } = props;
  return (
    <>
      <div className={`w-full h-lvh ${classes ?? ""}`}>{children}</div>
    </>
  );
};

export default DisplayFull;