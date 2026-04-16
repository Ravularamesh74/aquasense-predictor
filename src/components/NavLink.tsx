"use client";

import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "default" | "underline" | "pill" | "ghost";

interface NavLinkPropsExtended extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  variant?: Variant;
  animate?: boolean;
}

const baseStyles =
  "relative inline-flex items-center text-sm font-medium transition-colors";

const variantStyles: Record<Variant, string> = {
  default: "text-gray-400 hover:text-white",
  ghost: "text-muted-foreground hover:text-primary",
  pill: "px-3 py-1.5 rounded-lg hover:bg-white/10",
  underline: "text-gray-400 hover:text-white",
};

const activeStyles: Record<Variant, string> = {
  default: "text-white",
  ghost: "text-primary",
  pill: "bg-white/10 text-white",
  underline: "text-cyan-400",
};

const pendingStyles =
  "opacity-70 pointer-events-none animate-pulse";

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkPropsExtended>(
  (
    {
      className,
      activeClassName,
      pendingClassName,
      variant = "default",
      animate = true,
      to,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        {...props}
        className={({ isActive, isPending }) =>
          cn(
            baseStyles,
            variantStyles[variant],
            isActive && activeStyles[variant],
            isPending && pendingStyles,
            className,
            isActive && activeClassName,
            isPending && pendingClassName
          )
        }
      >
        {({ isActive, ...renderProps }) => (
          <span className="relative">
            {typeof children === "function"
              ? children({ isActive, ...renderProps })
              : children}

            {/* 🔥 Animated underline */}
            {variant === "underline" && isActive && animate && (
              <motion.span
                layoutId="nav-underline"
                className="absolute left-0 -bottom-1 w-full h-[2px] bg-cyan-400 rounded-full"
              />
            )}

            {/* 🔥 Glow effect */}
            {isActive && variant === "default" && (
              <span className="absolute inset-0 blur-md bg-cyan-400/10 rounded-md -z-10" />
            )}
          </span>
        )}
      </RouterNavLink>
    );
  }
);

NavLink.displayName = "NavLink";