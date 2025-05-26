import type { Meta, StoryObj } from "@storybook/react";
import { IconPencil } from ".";

const meta: Meta<typeof IconPencil> = {
  title: "Components/IconPencil",
  component: IconPencil,
};

export default meta;

type Story = StoryObj<typeof IconPencil>;

export const Default: Story = {
  args: {
    className: {},
    overlapClassName: {},
    boxClassName: {},
    pencilClassName: {},
    overlapGroupClassName: {},
    bodyClassName: {},
    shapeClassName: {},
    shape: "/img/shape-1.svg",
    shapeClassNameOverride: {},
    bodyClassNameOverride: {},
    body: "/img/body-1.svg",
  },
};
