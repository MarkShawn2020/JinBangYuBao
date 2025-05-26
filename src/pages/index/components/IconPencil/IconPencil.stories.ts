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
    shape: "../../../assets/img/shape-1.svg",
    shapeClassNameOverride: {},
    bodyClassNameOverride: {},
    body: "../../../assets/img/body-1.svg",
    color: "color-#ff5020",
  },
};
