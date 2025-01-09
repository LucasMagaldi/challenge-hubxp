import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { z } from "zod";
import { PopUp } from "../components/popup";

const validationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    imageUrl: z
        .instanceof(File)
        .refine((file) => file.type.startsWith("image/"), "Only image files are allowed")
        .optional(),
});

const defaultValues = {
    name: "John Doe",
    email: "john.doe@example.com",
    imageUrl: null,
};

const onSave = (data: Record<string, any>) => {
    console.log("Form Submitted:", data);
};

export default {
    title: "Components/PopUp",
    component: PopUp,
    argTypes: {
        onSave: { action: "Form Submitted" },
        onClose: { action: "Modal Closed" },
    },
} as Meta;

const Template: StoryFn<any> = (args) => <PopUp {...args} />;

export const Default = Template.bind({});
Default.args = {
    open: true,
    onClose: () => console.log("Modal closed"),
    title: "Add New User",
    validationSchema: validationSchema,
    defaultValues: defaultValues,
    onSave: onSave,
};
