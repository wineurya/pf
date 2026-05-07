import { useNavigate } from "react-router-dom";
import { navigateWithViewTransition, viewTransitionToHref } from "@/lib/navigateViewTransition.js";

/**
 * In-app link that uses the View Transitions API when available (Chrome 111+).
 */
export function ViewTransitionLink({ to, className, children, onClick, ...rest }) {
  const navigate = useNavigate();
  const href = viewTransitionToHref(to);
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        e.preventDefault();
        navigateWithViewTransition(navigate, to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
