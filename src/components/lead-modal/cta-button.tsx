"use client";

import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useLeadModal } from "./modal-provider";

interface CtaButtonProps extends Omit<ButtonProps, "onClick"> {
  source?: string;
}

export function CtaButton({
  source,
  children = "Claim Your Free Spot Now",
  ...props
}: CtaButtonProps) {
  const { open } = useLeadModal();
  return (
    <Button onClick={() => open(source)} {...props}>
      {children}
    </Button>
  );
}
