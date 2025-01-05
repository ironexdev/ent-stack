import Select, {
  SingleValue,
  ControlProps,
  GroupBase,
  OptionProps,
  MenuListProps,
} from "react-select"
import { useId } from "react"

export default function MySelect({
  options,
  placeholder,
  onChange,
  isSearchable,
  selectedOption,
}: {
  options: { value: string; label: string }[]
  placeholder: string
  isSearchable?: boolean
  onChange: (value: SingleValue<{ value: string; label: string }>) => void
  selectedOption?: { value: string; label: string }
}) {
  return (
    <div className="relative">
      <Select
        instanceId={useId()}
        value={selectedOption}
        placeholder={placeholder}
        isSearchable={isSearchable ?? false}
        unstyled={true}
        classNames={{
          control: controlClassName,
          option: optionClassName,
          menuList: menuListClassName,
        }}
        onChange={onChange}
        options={options}
      />
    </div>
  )
}

function controlClassName(
  props: ControlProps<
    { value: string; label: string },
    false,
    GroupBase<{ value: string; label: string }>
  >,
): string {
  return "bg-select-primary rounded py-2.5 px-5 text-primary"
}

function menuListClassName(
  props: MenuListProps<{ value: string; label: string }>,
): string {
  return "text-primary rounded block pr-10 pb-5"
}

function optionClassName(
  props: OptionProps<
    { value: string; label: string },
    false,
    GroupBase<{ value: string; label: string }>
  >,
): string {
  const selected = props.isSelected
    ? "bg-select-secondary"
    : "bg-select-primary"

  return `text-primary mt-1 items-center px-5 py-2 hover:bg-select-secondary rounded pointer ${selected}`
}
