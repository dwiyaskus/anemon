import { Meta, StoryObj } from "@storybook/angular";
import { CheckboxComponent } from "./checkbox.component";

const meta: Meta<CheckboxComponent> = {
  title: "Core/Checkbox",
  component: CheckboxComponent,
  tags: ["autodocs"],
  argTypes: {
    click: { action: "clicked" },
    change: { action: "changed" },
    focus: { action: "focused" },
    blur: { action: "blurred" },
  },
};

export default meta;

type Story = StoryObj<CheckboxComponent>;

export const Primary: Story = {
  args: {
    title: "Checkbox",
  },
  parameters: {
    actions: {
      handles: ["click", "change", "focus", "blur"],
    },
  },
};
