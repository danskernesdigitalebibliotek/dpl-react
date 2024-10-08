import React, { FC } from "react";
import useDialog from "../../components/dialog/useDialog";
import OpeningHoursSidebarContent from "./OpeningHoursSidebarContent";
import OpeningHoursSidebarButtonLarge from "./OpeningHoursSidebarButtonLarge";
import OpeningHoursSidebarButtonSmall from "./OpeningHoursSidebarButtonSmall";
import Dialog from "../../components/dialog/Dialog";
import useOpeningHoursSidebar from "./useOpeningHoursSidebar";

export type OpeningHoursSidebarType = {
  size: "small" | "large";
};

const OpeningHoursSidebar: FC<OpeningHoursSidebarType> = ({ size }) => {
  const { dialogContent, openDialogWithContent, closeDialog, dialogRef } =
    useDialog();

  const { libraries } = useOpeningHoursSidebar();

  const openDialog = () =>
    openDialogWithContent(<OpeningHoursSidebarContent libraries={libraries} />);

  return (
    <>
      {size === "large" && (
        <OpeningHoursSidebarButtonLarge openDialog={openDialog} />
      )}
      {size === "small" && (
        <OpeningHoursSidebarButtonSmall openDialog={openDialog} />
      )}

      <Dialog isSidebar closeDialog={closeDialog} ref={dialogRef}>
        {dialogContent}
      </Dialog>
    </>
  );
};

export default OpeningHoursSidebar;
