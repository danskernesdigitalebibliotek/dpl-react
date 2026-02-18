import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import BranchListEntry from "./branch-list.entry";
import geoLocationArgs, {
  argTypes as geoLocationArgTypes
} from "../../core/storybook/geoLocationArgs";
import dataforsyningenArgs, {
  argTypes as dataforsyningenArgTypes
} from "../../core/storybook/dataforsyningenArgs";

const branchesData = [
  {
    title: "Hovedbiblioteket",
    url: "/biblioteker/hovedbiblioteket",
    address: "Krystalgade 15",
    city: "1172 København K",
    lat: "55.6802",
    lng: "12.5732"
  },
  {
    title: "Blågården Bibliotek",
    url: "/biblioteker/blaagaarden",
    address: "Blågårds Plads 6",
    city: "2200 København N",
    lat: "55.6867",
    lng: "12.5525"
  },
  {
    title: "Brønshøj Bibliotek",
    url: "/biblioteker/bronshoj",
    address: "Brønshøj Torv 7",
    city: "2700 Brønshøj",
    lat: "55.7078",
    lng: "12.5082"
  },
  {
    title: "Kulturstationen Vanløse",
    url: "/biblioteker/vanlose",
    address: "Frode Jakobsens Plads 4",
    city: "2720 Vanløse",
    lat: "55.6833",
    lng: "12.4833"
  },
  {
    title: "Nørrebro Bibliotek",
    url: "/biblioteker/norrebro",
    address: "Jagtvej 227",
    city: "2100 København Ø",
    lat: "55.6969",
    lng: "12.5479"
  }
];

const meta: Meta<typeof BranchListEntry> = {
  title: "Apps / Branch List",
  component: BranchListEntry,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: can't figure out how to type geoLocationArgTypes
  argTypes: {
    ...geoLocationArgTypes,
    ...dataforsyningenArgTypes,
    branchesConfig: {
      name: "Branches data (JSON)",
      control: { type: "text" }
    },
    branchListTitleText: {
      name: "Page title",
      control: { type: "text" }
    },
    branchListAddressSearchLabelText: {
      name: "Address search label",
      control: { type: "text" }
    },
    branchListAddressSearchPlaceholderText: {
      name: "Address search placeholder",
      control: { type: "text" }
    },
    branchListGeoLocationButtonText: {
      name: "Geolocation button text",
      control: { type: "text" }
    }
  },
  args: {
    ...geoLocationArgs,
    ...dataforsyningenArgs,
    branchesConfig: JSON.stringify(branchesData),
    branchListTitleText: "Branches",
    branchListAddressSearchLabelText: "Sort by distance - enter your address",
    branchListAddressSearchPlaceholderText: "Enter your address",
    branchListGeoLocationButtonText: "Find nearest library from your location"
  }
};

export default meta;

type Story = StoryObj<typeof BranchListEntry>;

export const Default: Story = {
  render: (args) => <BranchListEntry {...args} />
};
