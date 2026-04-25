import { useNavigate } from "react-router-dom";
import { navigateWithViewTransition } from "@/lib/navigateViewTransition.js";

/**
 * In-app link that uses the View Transitions API when available (Chrome 111+).
 */
export function ViewTransitionLink({ to, className, children, onClick, ...rest }) {
  const navigate = useNavigate();
  return (
    <a
      href={to}
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
