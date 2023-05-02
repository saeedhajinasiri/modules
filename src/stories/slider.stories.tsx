import React from "react";
import Slider from "../modules/slider/index";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {SliderProps} from "../modules/slider/slider.props";

export default {
  title: "Slider",
  component: Slider,
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = ({...args}:SliderProps) => <Slider {...args} />;

export const Default = Template.bind({});