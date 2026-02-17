import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import BranchListEntry from "./branch-list.entry";

const branchesData = [
  {
    title: "Hovedbiblioteket",
    url: "/biblioteker/hovedbiblioteket",
    image:
      "https://plus.unsplash.com/premium_photo-1661875977781-adbb21036841?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGxpYnJhcnl8ZW58MHx8MHx8fDA%3D",
    address: "Krystalgade 15",
    city: "1172 København K"
  },
  {
    title: "Blågården Bibliotek",
    url: "/biblioteker/blaagaarden",
    image:
      "https://images.unsplash.com/photo-1585779034823-7e9ac8faec70?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    address: "Blågårds Plads 6",
    city: "2200 København N"
  },
  {
    title: "Brønshøj Bibliotek",
    url: "/biblioteker/bronshoj",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D",
    address: "Brønshøj Torv 7",
    city: "2700 Brønshøj"
  },
  {
    title: "Kulturstationen Vanløse",
    url: "/biblioteker/vanlose",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D",
    address: "Frode Jakobsens Plads 4",
    city: "2720 Vanløse"
  },
  {
    title: "Nørrebro Bibliotek",
    url: "/biblioteker/norrebro",
    address: "Jagtvej 227",
    city: "2100 København Ø"
  }
];

const meta: Meta<typeof BranchListEntry> = {
  title: "Apps / Branch List",
  component: BranchListEntry,
  argTypes: {
    branchesConfig: {
      name: "Branches data (JSON)",
      control: { type: "text" }
    },
    branchListTitleText: {
      name: "Page title",
      control: { type: "text" }
    }
  },
  args: {
    branchesConfig: JSON.stringify(branchesData),
    branchListTitleText: "Biblioteker"
  }
};

export default meta;

type Story = StoryObj<typeof BranchListEntry>;

export const Default: Story = {
  render: (args) => <BranchListEntry {...args} />
};

export const WithoutImages: Story = {
  args: {
    branchesConfig: JSON.stringify(branchesData.map(({ _, ...rest }) => rest))
  },
  render: (args) => <BranchListEntry {...args} />
};
