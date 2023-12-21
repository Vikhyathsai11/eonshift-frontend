import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "appliance",
    label: "Appliance",
  },
  {
    value: "type_1",
    label: "Type 1",
  },
  {
    value: "type_2",
    label: "Type 2",
  },
  {
    value: "heating",
    label: "Heating",
  },
  {
    value: "cooling",
    label: "Cooling",
  },
  {
    value: "other",
    label: "Other",
  },
];

export const statuses = [
  {
    value: "active",
    label: "Active",
    icon: CircleIcon,
  },
  {
    value: "inactive",
    label: "Inactive",
    icon: CircleIcon,
  },
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
