import React, { useState } from "react";
import Dialog from "./dialog";
import Button from "../button/button";

export default { title: "Atoms/Dialog" };

export function Simple() {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  return (
    <div>
      <Button onClick={open}>Open Dialog</Button>
      <Dialog isOpen={showDialog} onDismiss={close}>
        <p>Hello there. I am a dialog</p>
        <Button className="close-button" onClick={close}>
          Close
        </Button>
      </Dialog>
    </div>
  );
}

export function Dropdown() {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  return (
    <div>
      <Button onClick={open}>Open Dialog</Button>
      <Dialog dropDown isOpen={showDialog} onDismiss={close}>
        <p>Hello there. I am a dialog</p>
        <Button className="close-button" onClick={close}>
          Close
        </Button>
      </Dialog>
    </div>
  );
}
