import React, { useState } from "react";
import Dialog from "./dialog.js";

export default { title: "Atoms|Dialog" };

export function simple () {
    const [showDialog, setShowDialog] = useState(false);
    const open = () => setShowDialog(true);
    const close = () => setShowDialog(false);
  
    return (
      <div>
        <button onClick={open}>Open Dialog</button>
        <Dialog isOpen={showDialog} onDismiss={close}>
          <button className="close-button" onClick={close}>
            Close
          </button>
          <p>Hello there. I am a dialog</p>
        </Dialog>
      </div>
    );
  }