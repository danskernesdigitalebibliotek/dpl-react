import { createSlice } from "@reduxjs/toolkit";
import {
  setConfig as fbsSetConfig,
  Options as FbsOptions
} from "./fbs/fbsConfig";
import {
  setConfig as publizonSetConfig,
  Options as publizonOptions
} from "./publizon/publizonConfig";

const initialState: {
  data: { [key: string]: string } | Record<string, never>;
} = {
  data: {}
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfig(state, action) {
      fbsSetConfig(FbsOptions.baseUrl, action.payload.entries.fbsBaseConfig);
      publizonSetConfig(
        publizonOptions.baseUrl,
        action.payload.entries.publizonBaseConfig
      );
    }
  }
});

export const { setConfig } = configSlice.actions;

export default configSlice.reducer;
