"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalProps {
  children: React.ReactNode;
  title?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

interface ModalComponent extends React.FC<ModalProps> {
  Form: React.FC<{ children: React.ReactNode }>;
  Actions: React.FC<{ children: React.ReactNode }>;
}

const Modal: ModalComponent = ({
  children,
  title,
  open,
  onOpenChange,
  trigger,
}) => {
  const childrenArray = React.Children.toArray(children);
  const formContent = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === Modal.Form
  );
  const actionsContent = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === Modal.Actions
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogOverlay className="backdrop-blur-sm" />
      <DialogContent>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        {formContent}
        <DialogFooter className="flex justify-between">
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
          {actionsContent}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Form: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
Form.displayName = "Modal.Form";

const Actions: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
Actions.displayName = "Modal.Actions";

Modal.Form = Form;
Modal.Actions = Actions;

export default Modal;
export { type ModalProps };
