import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Calendar} from "./calendar";
import {CalendarProps} from "../../modules/calendar/calendar.props";

export default {
  title: "Calendar",
  component: Calendar,
  argTypes: {},
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args: CalendarProps) => <Calendar {...args} />;

export const Default = Template.bind({});