import React from "react";
import Overlay from "./overlay";
import Box from "./box";
import { cn } from "@/lib/utils";
import CloseButton from "./close-button";

interface ModalProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "className"> {
  isOpen: boolean;
  handleOpen: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal = ({
  isOpen = false,
  handleOpen,
  children,
  className,
  ...props
}: ModalProps) => {
  const baseStyle = cn(
    "fixed top-0 left-0 h-screen w-screen flex items-center justify-center",
    isOpen ? "visible opacity-100" : "invisible opacity-0"
  );
  const boxStyle = cn(
    "absolute transition-opacity max-h-screen overscroll-y-auto",
    isOpen ? "visible opacity-100" : "invisible opacity-0"
  );
  return (
    <div className={cn(baseStyle, className)} {...props}>
      <Overlay isOpen={isOpen} handleOpen={handleOpen} />
      <Box variant="rounded" className={boxStyle}>
        <CloseButton
          handleOpen={handleOpen}
          className="ml-auto -mr-4 -mt-4 mb-2"
        />
        {children}
      </Box>
    </div>
  );
};

export default Modal;
