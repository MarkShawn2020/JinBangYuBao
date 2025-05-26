import type { Meta, StoryObj } from "@storybook/react";
import { IconMessage } from ".";

const meta: Meta<typeof IconMessage> = {
  title: "Components/IconMessage",
  component: IconMessage,
};

export default meta;

type Story = StoryObj<typeof IconMessage>;

export const Default: Story = {
  args: {
    className: {},
    overlapGroupClassName: {},
    boxClassName: {},
    messagesClassName: {},
    messages: "../../../assets/img/messages.png",
  },
};
