import React from "react";
import { EventImpl } from "@fullcalendar/core/internal";

type DialogFomularProps = {
  evnetInfo: EventImpl;
  handleEventEditing: (title: string) => void;
};

const DialogFomular: React.FC<DialogFomularProps> = ({
  evnetInfo,
  handleEventEditing
}) => {
  return (
    <>
      <p>DialogFomular:</p>
      <pre>{JSON.stringify(evnetInfo, null, 2)}</pre>
      <form>
        {/* Should be type submit */}
        <button
          type="button"
          onClick={() => handleEventEditing(evnetInfo.title)}
          style={{
            border: "1px solid black",
            padding: "5px",
            background: "grey"
          }}
        >
          Show title btn
        </button>
      </form>
    </>
  );
};

export default DialogFomular;
