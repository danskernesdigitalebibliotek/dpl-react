import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React from "react";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../../core/storybook/globalTextArgs";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../../core/storybook/serviceUrlArgs";
import MaterialGridLinkAutomatic from "./MaterialGridLinkAutomatic.entry";
import MaterialGridSkeleton from "../../../components/material-grid/MaterialGridSkeleton";

const meta: Meta<typeof MaterialGridLinkAutomatic> = {
  title: "Apps / Material Grid / Link Automatic",
  component: MaterialGridLinkAutomatic,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: can't figure out how to type this
  argTypes: {
    ...globalTextArgTypes,
    ...serviceUrlArgTypes,
    title: {
      description: "Title",
      control: { type: "text" }
    },
    description: {
      description: "Description",
      control: { type: "text" }
    },
    link: {
      control: { type: "text" },
      description:
        "link search string to use for the material grid, search for a result and copy the link string from an advanced search"
    },
    selectedAmountOfMaterialsForDisplay: {
      description: "Amount of materials to show",
      control: {
        type: "select",
        options: [4, 8, 12, 16, 20, 24, 28, 32]
      }
    },
    buttonText: {
      description: "Button text",
      control: { type: "text" }
    },
    materialUrl: {
      description: "Path to the material page",
      control: { type: "text" }
    },
    etAlText: {
      description: "Et al. Text",
      control: { type: "text" }
    },
    blacklistedPickupBranchesConfig: {
      description: "Blacklisted Pickup branches",
      control: { type: "text" }
    },
    blacklistedAvailabilityBranchesConfig: {
      description: "Blacklisted Availability branches",
      control: { type: "text" }
    },
    blacklistedSearchBranchesConfig: {
      description: "Blacklisted branches",
      control: { type: "text" }
    },
    branchesConfig: {
      description: "Branches",
      control: { type: "text" }
    }
  }
};

export default meta;

type Story = StoryObj<typeof MaterialGridLinkAutomatic>;

export const Primary: Story = {
  args: {
    ...globalTextArgs,
    ...serviceUrlArgs,
    title: "Recommended materials",
    description:
      "This is a long description of the materials selected, or whatever else you want to put in here",
    link: "https://dapple-cms.docker/advanced-search?advancedSearchCql=%27harry%27&linked=true",
    selectedAmountOfMaterialsForDisplay: 12,
    buttonText: "Show all",
    materialUrl: "/work/:workid",
    etAlText: "et al.",
    blacklistedPickupBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
    blacklistedAvailabilityBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
    blacklistedSearchBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
    branchesConfig:
      '[\n   {\n      "branchId":"DK-775120",\n      "title":"Højbjerg"\n   },\n   {\n      "branchId":"DK-775122",\n      "title":"Beder-Malling"\n   },\n   {\n      "branchId":"DK-775144",\n      "title":"Gellerup"\n   },\n   {\n      "branchId":"DK-775167",\n      "title":"Lystrup"\n   },\n   {\n      "branchId":"DK-775146",\n      "title":"Harlev"\n   },\n   {\n      "branchId":"DK-775168",\n      "title":"Skødstrup"\n   },\n   {\n      "branchId":"FBS-751010",\n      "title":"Arresten"\n   },\n   {\n      "branchId":"DK-775147",\n      "title":"Hasle"\n   },\n   {\n      "branchId":"FBS-751032",\n      "title":"Må ikke benyttes"\n   },\n   {\n      "branchId":"FBS-751031",\n      "title":"Fjernlager 1"\n   },\n   {\n      "branchId":"DK-775126",\n      "title":"Solbjerg"\n   },\n   {\n      "branchId":"FBS-751030",\n      "title":"ITK"\n   },\n   {\n      "branchId":"DK-775149",\n      "title":"Sabro"\n   },\n   {\n      "branchId":"DK-775127",\n      "title":"Tranbjerg"\n   },\n   {\n      "branchId":"DK-775160",\n      "title":"Risskov"\n   },\n   {\n      "branchId":"DK-775162",\n      "title":"Hjortshøj"\n   },\n   {\n      "branchId":"DK-775140",\n      "title":"Åby"\n   },\n   {\n      "branchId":"FBS-751009",\n      "title":"Fjernlager 2"\n   },\n   {\n      "branchId":"FBS-751029",\n      "title":"Stadsarkivet"\n   },\n   {\n      "branchId":"FBS-751027",\n      "title":"Intern"\n   },\n   {\n      "branchId":"FBS-751026",\n      "title":"Fælles undervejs"\n   },\n   {\n      "branchId":"FBS-751025",\n      "title":"Fællessekretariatet"\n   },\n   {\n      "branchId":"DK-775133",\n      "title":"Bavnehøj"\n   },\n   {\n      "branchId":"FBS-751024",\n      "title":"Fjernlånte materialer"\n   },\n   {\n      "branchId":"DK-775100",\n      "title":"Hovedbiblioteket"\n   },\n   {\n      "branchId":"DK-775170",\n      "title":"Trige"\n   },\n   {\n      "branchId":"DK-775150",\n      "title":"Tilst"\n   },\n   {\n      "branchId":"DK-775130",\n      "title":"Viby"\n   },\n   {\n      "branchId":"DK-775164",\n      "title":"Egå"\n   }\n]'
  }
};

export const WithoutOnshelf: Story = {
  args: {
    ...Primary.args,
    title: "All Availability",
    description: "Includes materials regardless of on-shelf status",
    link: "https://dapple-cms.docker/advanced-search?advancedSearchCql=%28lix%3D2+OR+lix%3D3+OR+lix%3D4+OR+lix%3D5+OR+let%3D8+OR+let%3D9+OR+let%3D10%29+AND+term.childrenoradults%3D%22til+b%C3%B8rn%22&linked=true"
  }
};

export const WithOnshelfTrue: Story = {
  args: {
    ...Primary.args,
    title: "On-Shelf Only",
    description: "Filtered to show only materials currently on shelf",
    link: "https://dapple-cms.docker/advanced-search?advancedSearchCql=%28lix%3D2+OR+lix%3D3+OR+lix%3D4+OR+lix%3D5+OR+let%3D8+OR+let%3D9+OR+let%3D10%29+AND+term.childrenoradults%3D%22til+b%C3%B8rn%22&onshelf=true&linked=true"
  }
};

export const WithSort: Story = {
  args: {
    ...Primary.args,
    title: "with sort = sort.title.desc",
    description: "Sorts materials by title in descending order",
    link: "https://dapple-cms.docker/advanced-search?advancedSearchCql=%28lix%3D2+OR+lix%3D3+OR+lix%3D4+OR+lix%3D5+OR+let%3D8+OR+let%3D9+OR+let%3D10%29+AND+term.childrenoradults%3D%22til+b%C3%B8rn%22&sort=sort.title.desc"
  }
};

export const Skeleton: Story = {
  render: () => <MaterialGridSkeleton />
};
