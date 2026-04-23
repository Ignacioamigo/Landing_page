"use client";

import * as React from "react";
import { LeadModal } from "./lead-modal";

interface ModalContextValue {
  open: (source?: string) => void;
  close: () => void;
  isOpen: boolean;
  source: string | null;
}

const ModalContext = React.createContext<ModalContextValue | null>(null);

export function useLeadModal(): ModalContextValue {
  const ctx = React.useContext(ModalContext);
  if (!ctx) {
    throw new Error("useLeadModal must be used within <ModalProvider>");
  }
  return ctx;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [source, setSource] = React.useState<string | null>(null);

  const open = React.useCallback((src?: string) => {
    setSource(src ?? null);
    setIsOpen(true);
  }, []);

  const close = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = React.useMemo(
    () => ({ open, close, isOpen, source }),
    [open, close, isOpen, source]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <LeadModal isOpen={isOpen} onClose={close} source={source} />
    </ModalContext.Provider>
  );
}
