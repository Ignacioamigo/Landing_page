"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { leadSchema, type LeadInput } from "@/lib/schemas";
import { cn, generateEventId } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: string | null;
}

/** Read cookies injected by the Meta Pixel for better CAPI match quality. */
function readPixelCookies(): { fbp?: string; fbc?: string } {
  if (typeof document === "undefined") return {};
  const pairs = document.cookie.split(";").map((c) => c.trim());
  const get = (key: string) =>
    pairs.find((p) => p.startsWith(`${key}=`))?.split("=")[1];
  return { fbp: get("_fbp"), fbc: get("_fbc") };
}

export function LeadModal({ isOpen, onClose, source }: LeadModalProps) {
  // Lock body scroll + ESC-to-close while the modal is mounted.
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="lead-modal"
          className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-4 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl sm:p-8"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-lg p-2 text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <X size={18} />
            </button>

            {/* The form is a sibling component — AnimatePresence unmounts the
                whole subtree on exit, so form state resets naturally each
                time the modal is opened. No effect-driven setState needed. */}
            <LeadForm onClose={onClose} source={source} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

interface LeadFormProps {
  onClose: () => void;
  source: string | null;
}

function LeadForm({ onClose, source }: LeadFormProps) {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    mode: "onTouched",
    defaultValues: { firstName: "", email: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("submitting");
    setErrorMessage(null);

    const eventId = generateEventId();
    const { fbp, fbc } = readPixelCookies();

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          email: values.email,
          eventId,
          fbp,
          fbc,
          pagePath:
            typeof window !== "undefined" ? window.location.href : "/",
          source,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(
          data.error ?? "Something went wrong. Please try again."
        );
      }

      // Fire the client-side Pixel Lead event with the same event_id so
      // Meta can deduplicate against the server-side CAPI event.
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead", {}, { eventID: eventId });
      }

      setStatus("success");
      // Redirect to the private video page after a brief success moment.
      setTimeout(() => {
        window.location.href = "/thank-you";
      }, 1400);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setErrorMessage(message);
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <div className="flex flex-col items-center py-4 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
          <CheckCircle2 className="h-7 w-7 text-accent" />
        </div>
        <h2
          id="lead-modal-title"
          className="font-display text-2xl font-bold tracking-tight"
        >
          You&apos;re in.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Check your inbox in the next minute for the access link and your
          bonus:{" "}
          <span className="text-foreground">50 AI Video Prompts</span>.
        </p>
        <Button
          variant="secondary"
          size="md"
          fullWidth
          className="mt-6"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    );
  }

  return (
    <>
      <h2
        id="lead-modal-title"
        className="font-display text-2xl font-bold tracking-tight"
      >
        Register for the free class
      </h2>
      <p className="mt-2 text-sm text-muted">
        Enter your details to get instant access. Seats are limited.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="firstName"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted"
          >
            First name
          </label>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            autoCapitalize="words"
            inputMode="text"
            placeholder="John"
            aria-invalid={!!errors.firstName}
            {...register("firstName")}
            className={cn(
              "w-full rounded-lg border bg-background px-4 py-3 text-[15px] text-foreground placeholder:text-muted/60 transition-colors",
              errors.firstName
                ? "border-red-500/70 focus:border-red-500"
                : "border-border focus:border-accent"
            )}
          />
          {errors.firstName ? (
            <p className="mt-1.5 text-xs text-red-400">
              {errors.firstName.message}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            {...register("email")}
            className={cn(
              "w-full rounded-lg border bg-background px-4 py-3 text-[15px] text-foreground placeholder:text-muted/60 transition-colors",
              errors.email
                ? "border-red-500/70 focus:border-red-500"
                : "border-border focus:border-accent"
            )}
          />
          {errors.email ? (
            <p className="mt-1.5 text-xs text-red-400">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          size="lg"
          fullWidth
          disabled={status === "submitting" || !isValid}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving your seat...
            </>
          ) : (
            "Get Instant Access to the Class"
          )}
        </Button>

        {status === "error" && errorMessage ? (
          <p
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300"
            role="alert"
          >
            {errorMessage}
          </p>
        ) : null}

        <p className="pt-1 text-center text-[11px] text-muted">
          100% secure. We don&apos;t spam. Unsubscribe anytime.
        </p>
      </form>
    </>
  );
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
