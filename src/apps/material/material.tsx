import React from "react";
import MaterialHeader from "../../components/material/MaterialHeader";
import { useGetMaterialQuery } from "../../core/dbc-gateway/generated/graphql";
import { Pid } from "../../core/utils/types/ids";

export interface MaterialProps {
  pid: Pid;
}

const Material: React.FC<MaterialProps> = ({ pid }) => {
  const { data, isLoading } = useGetMaterialQuery({
    pid
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // TODO: handle error if data is empty array
  if (!data?.work) {
    return <div>No work data</div>;
  }

  return (
    <main>
      <MaterialHeader pid={pid} work={data.work} />
    </main>
  );
};

export default Material;
