import React, { useState, useEffect } from "react";
import Checklist from "./checklist.js";

import MaterialList from "../../core/MaterialList.js";

export function ChecklistEntry() {
  const [list, setList] = useState([
    {
      id: 1,
      text: "Hunger Games"
    },
    {
      id: 2,
      text: "Camelot"
    }
  ]);
  useEffect(() => {
    async function getList() {
      try {
        const client = await MaterialList;
        const newList = await client.apis.List.getList();
        setList(newList);
      } catch (err) {
        console.error(err);
      }
    }
    getList();
  }, []);
  return <Checklist items={list} />;
}

export default ChecklistEntry;
