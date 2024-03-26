import { useRef, useState } from "react";

declare global {
  interface HTMLDialogElement {
    showModal(): void;
    close(): void;
  }
}

const useDialog = () => {
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const openDialogWithContent = (content: React.ReactNode) => {
    setDialogContent(content);
    dialogRef.current?.showModal();
  };

  return {
    dialogContent,
    dialogRef,
    openDialogWithContent,
    closeDialog
  };
};

export default useDialog;
