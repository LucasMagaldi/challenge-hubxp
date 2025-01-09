import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { z } from "zod";
import { BaseList } from "../components/base-list";

const mockColumns = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "edit", label: "Edit", isAction: true },
  { key: "remove", label: "Remove", isAction: true },
];

const mockData = [
  { _id: "1", name: "John Doe", age: 30 },
  { _id: "2", name: "Jane Smith", age: 25 },
];

const mockValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(0, "Age must be a positive number"),
});

const mockAddMutation = async (item: any) => {
  console.log("Added item:", item);
};

const mockEditMutation = async (item: any) => {
  console.log("Edited item:", item);
};

const mockRemoveMutation = async (id: string) => {
  console.log("Removed item with ID:", id);
};

export default {
  title: "Components/BaseList",
  component: BaseList,
  argTypes: {
    addMutation: { action: "addMutation called" },
    editMutation: { action: "editMutation called" },
    removeMutation: { action: "removeMutation called" },
  },
} as Meta;

const Template: StoryFn<any> = (args) => <BaseList {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "User List",
  columns: mockColumns,
  fetchData: mockData,
  validationSchema: mockValidationSchema,
  addMutation: mockAddMutation,
  editMutation: mockEditMutation,
  removeMutation: mockRemoveMutation,
};

export const NoData = Template.bind({});
NoData.args = {
  ...Default.args,
  fetchData: [],
  title: "Empty List",
};

export const CustomTitle = Template.bind({});
CustomTitle.args = {
  ...Default.args,
  title: "Custom User List",
};
