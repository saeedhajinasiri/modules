import React, {ReactNode} from "react";
import {Text} from "@pezeshk-book/ui-kit";

export const Wrapper = ({title, children, className, titleColor}: { title: string, children: ReactNode, className?: string, titleColor?: string }) => {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      <Text direction={'ltr'} align={"left"} className={`${titleColor} min-w-[100px] whitespace-nowrap`}>{title}:</Text>
      {children}
    </div>
  )
}
