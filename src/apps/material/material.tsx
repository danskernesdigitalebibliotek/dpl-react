import React from "react";
import MaterialDescription from "../../components/material/MaterialDescription";
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
      <MaterialDescription
        work={data.work}
        description="Stormandssønnen Arn får hos cisterciensermunkene i Sverige og Danmark den bedste uddannelse, der findes i middelalderens Europa. Men hans lærere aner, at han ikke er bestemt til at være klosterbroder og vil gøre bedre fyldest som Kristi strids... "
      />
    </main>
  );
};

export default Material;
