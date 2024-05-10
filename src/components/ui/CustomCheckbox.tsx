import React, { LegacyRef, useRef } from "react";
import {useCheckbox, VisuallyHidden, tv, Chip} from "@nextui-org/react";
import {CheckIcon} from './Checkbox'
import { UseCheckboxProps } from "@nextui-org/checkbox/dist/use-checkbox.js";

const checkbox = tv({
  slots: {
    base: "border-default hover:bg-secondary-200",
    content: "text-default-500 sm:text-xs"
  },
  variants: {
    isSelected: {
      true: {
        base: "border-secondary bg-secondary hover:bg-secondary-500 hover:border-secondary-500",
        content: "text-secondary-foreground pl-1"
      }
    },
    isFocusVisible: {
      true: { 
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      }
    }
  }
})

export const CustomCheckbox = (props: UseCheckboxProps | undefined) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props
  })

  const styles = checkbox({ isSelected, isFocusVisible })
  const labelRef = useRef<HTMLDivElement>(null); // Create a ref

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="secondary"
        startContent={isSelected ? <CheckIcon className="ml-1" /> : null}
        variant="faded"
        // {...getLabelProps()}
        ref={labelRef}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
}
