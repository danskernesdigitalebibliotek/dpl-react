import React, { FC } from "react";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import CreatePatron from "./CreatePatron";

interface CreatePatronConfigProps {}

interface CreatePatronTextProps {}

export interface CreatePatronProps
  extends CreatePatronConfigProps,
    CreatePatronTextProps {}

const CreatePatronEntry: FC<CreatePatronProps> = () => <CreatePatron />;

export default withConfig(withText(CreatePatronEntry));
