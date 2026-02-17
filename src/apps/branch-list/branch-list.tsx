import React, { FC } from "react";
import ContentListPage from "../../components/content-list/ContentListPage";
import ContentList from "../../components/content-list/ContentList";
import ContentListItem from "../../components/content-list/ContentListItem";
import { useConfig } from "../../core/utils/config";
import { useText } from "../../core/utils/text";

type Branch = {
  title: string;
  url: string;
  image?: string;
  address?: string;
  city?: string;
};

const BranchList: FC = () => {
  const config = useConfig();
  const t = useText();

  const branches = config<Branch[]>("branchesConfig", {
    transformer: "jsonParse"
  });
  const title = t("branchListTitleText");

  return (
    <ContentListPage title={title}>
      <ContentList>
        {branches.map((branch) => (
          <ContentListItem
            key={branch.url}
            url={branch.url}
            title={branch.title}
            image={branch.image}
          >
            {(branch.address || branch.city) && (
              <address>
                {branch.address}
                <br />
                {branch.city}
              </address>
            )}
          </ContentListItem>
        ))}
      </ContentList>
    </ContentListPage>
  );
};

export default BranchList;
