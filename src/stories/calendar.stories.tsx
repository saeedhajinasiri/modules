import React from "react";
import Calendar from "../modules/calender/index";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {CalenderProps} from "../modules/calender/calender.props";

export default {
  title: "Calendar",
  component: Calendar,
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = ({...args}:CalenderProps) => <Calendar {...args} />;

export const Default = Template.bind({});