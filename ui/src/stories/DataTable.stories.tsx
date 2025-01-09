import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { DataTable } from "../components/data-table";

export default {
  title: "Components/DataTable",
  component: DataTable,
} as Meta;

const Template: StoryFn<any> = (args) => <DataTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns: [
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "edit", label: "Edit", isAction: true },
    { key: "remove", label: "Remove", isAction: true },
  ],
  data: [
    { name: "John Doe", age: 30 },
    { name: "Jane Smith", age: 25 },
  ],
  onEdit: (row: any) => console.log("Edit clicked:", row),
  onRemove: (row: any) => console.log("Remove clicked:", row),
};
