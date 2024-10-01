import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import globalTextArgs, {
  GlobalEntryTextProps
} from "../../../core/storybook/globalTextArgs";
import serviceUrlArgs from "../../../core/storybook/serviceUrlArgs";
import MaterialGridManual, {
  MaterialGridManualEntryProps
} from "./MaterialGridManual.entry";
import MaterialGridSkeleton from "../MaterialGridSkeleton";

// 31 materials. Intentionally not using 32 in order to demonstrate the
// logic for only displaying intervals of 4 materials.
const materials = [
  { wid: "work-of:870970-basis:25660722", materialType: "bog" },
  { wid: "work-of:870970-basis:22383590", materialType: "e-bog" },
  { wid: "work-of:870970-basis:25932625", materialType: "film" },
  { wid: "work-of:870970-basis:26264340", materialType: "musik (online)" },
  { wid: "work-of:870970-basis:52646251", materialType: "lydbog" },
  { wid: "work-of:870970-basis:26856353", materialType: "artikel" },
  { wid: "work-of:870970-basis:27275745", materialType: "tegneserie (online)" },
  { wid: "work-of:870970-basis:22383590", materialType: "tidsskrift" },
  { wid: "work-of:870970-basis:29788596", materialType: "cd" },
  { wid: "work-of:870970-basis:52646251", materialType: "podcast" },
  { wid: "work-of:870970-basis:50689360", materialType: "film (online)" },
  { wid: "work-of:870970-basis:22383590", materialType: "lydbog (cd-mp3)" },
  { wid: "work-of:870970-basis:46510534", materialType: "artikel (online)" },
  { wid: "work-of:870970-basis:134877804", materialType: "tegneserie" },
  { wid: "work-of:870970-basis:54129807", materialType: "tidsskrift (online)" },
  { wid: "work-of:870970-basis:52646251", materialType: "billedbog" },
  { wid: "work-of:870970-basis:25660722", materialType: "billedbog (online)" },
  { wid: "work-of:870970-basis:25932625", materialType: "lydbog (online)" },
  { wid: "work-of:870970-basis:26264340", materialType: "musik (online)" },
  { wid: "work-of:870970-basis:22383590", materialType: "artikel" },
  { wid: "work-of:870970-basis:26856353", materialType: "film" },
  { wid: "work-of:870970-basis:27275745", materialType: "e-bog" },
  { wid: "work-of:870970-basis:45363899", materialType: "cd" },
  { wid: "work-of:870970-basis:29788596", materialType: "podcast" },
  { wid: "work-of:870970-basis:52646251", materialType: "film (online)" },
  { wid: "work-of:870970-basis:50689360", materialType: "lydbog" },
  { wid: "work-of:870970-basis:53045650", materialType: "tegneserie (online)" },
  { wid: "work-of:870970-basis:46510534", materialType: "tidsskrift" },
  { wid: "work-of:870970-basis:134877804", materialType: "cd" },
  { wid: "work-of:870970-basis:54129807", materialType: "podcast" },
  { wid: "work-of:870970-basis:52646251", materialType: "film (online)" }
];
export default {
  title: "Apps / Material Grid / Manual",
  component: MaterialGridManual,
  argTypes: {
    title: {
      name: "Title",
      defaultValue: "Recommended materials",
      control: { type: "text" }
    },
    description: {
      name: "Description",
      defaultValue:
        "This is a long description of the materials selected, or whatever else you want to put in here",
      control: { type: "text" }
    },
    buttonText: {
      name: "Button text",
      defaultValue: "Show all",
      control: { type: "text" }
    },
    materials: {
      name: "Materials",
      defaultValue: JSON.stringify(materials),
      control: { type: "array" }
    },
    materialUrl: {
      name: "Path to the material page",
      defaultValue: "/work/:workid",
      control: { type: "text" }
    },
    etAlText: {
      name: "Et al. Text",
      defaultValue: "et al.",
      control: { type: "text" }
    },
    ...globalTextArgs,
    ...serviceUrlArgs,
    blacklistedPickupBranchesConfig: {
      name: "Blacklisted Pickup branches",
      defaultValue: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
      control: { type: "text" }
    },
    blacklistedAvailabilityBranchesConfig: {
      name: "Blacklisted Availability branches",
      defaultValue: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
      control: { type: "text" }
    },
    blacklistedSearchBranchesConfig: {
      name: "Blacklisted branches",
      defaultValue: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
      control: { type: "text" }
    },
    branchesConfig: {
      name: "Branches",
      defaultValue:
        '[\n   {\n      "branchId":"DK-775120",\n      "title":"Højbjerg"\n   },\n   {\n      "branchId":"DK-775122",\n      "title":"Beder-Malling"\n   },\n   {\n      "branchId":"DK-775144",\n      "title":"Gellerup"\n   },\n   {\n      "branchId":"DK-775167",\n      "title":"Lystrup"\n   },\n   {\n      "branchId":"DK-775146",\n      "title":"Harlev"\n   },\n   {\n      "branchId":"DK-775168",\n      "title":"Skødstrup"\n   },\n   {\n      "branchId":"FBS-751010",\n      "title":"Arresten"\n   },\n   {\n      "branchId":"DK-775147",\n      "title":"Hasle"\n   },\n   {\n      "branchId":"FBS-751032",\n      "title":"Må ikke benyttes"\n   },\n   {\n      "branchId":"FBS-751031",\n      "title":"Fjernlager 1"\n   },\n   {\n      "branchId":"DK-775126",\n      "title":"Solbjerg"\n   },\n   {\n      "branchId":"FBS-751030",\n      "title":"ITK"\n   },\n   {\n      "branchId":"DK-775149",\n      "title":"Sabro"\n   },\n   {\n      "branchId":"DK-775127",\n      "title":"Tranbjerg"\n   },\n   {\n      "branchId":"DK-775160",\n      "title":"Risskov"\n   },\n   {\n      "branchId":"DK-775162",\n      "title":"Hjortshøj"\n   },\n   {\n      "branchId":"DK-775140",\n      "title":"Åby"\n   },\n   {\n      "branchId":"FBS-751009",\n      "title":"Fjernlager 2"\n   },\n   {\n      "branchId":"FBS-751029",\n      "title":"Stadsarkivet"\n   },\n   {\n      "branchId":"FBS-751027",\n      "title":"Intern"\n   },\n   {\n      "branchId":"FBS-751026",\n      "title":"Fælles undervejs"\n   },\n   {\n      "branchId":"FBS-751025",\n      "title":"Fællessekretariatet"\n   },\n   {\n      "branchId":"DK-775133",\n      "title":"Bavnehøj"\n   },\n   {\n      "branchId":"FBS-751024",\n      "title":"Fjernlånte materialer"\n   },\n   {\n      "branchId":"DK-775100",\n      "title":"Hovedbiblioteket"\n   },\n   {\n      "branchId":"DK-775170",\n      "title":"Trige"\n   },\n   {\n      "branchId":"DK-775150",\n      "title":"Tilst"\n   },\n   {\n      "branchId":"DK-775130",\n      "title":"Viby"\n   },\n   {\n      "branchId":"DK-775164",\n      "title":"Egå"\n   }\n]',
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof MaterialGridManual>;

export const App: ComponentStory<typeof MaterialGridManual> = (
  args: MaterialGridManualEntryProps & GlobalEntryTextProps
) => <MaterialGridManual {...args} />;

const SkeletonTemplate: ComponentStory<typeof MaterialGridManual> = () => {
  return <MaterialGridSkeleton />;
};
export const Skeleton = SkeletonTemplate.bind({});
