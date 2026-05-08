import { useNavigate } from "react-router-dom";
import { navigateWithViewTransition, viewTransitionToHref } from "@/lib/navigateViewTransition.js";

/**
 * In-app link that uses the View Transitions API when available (Chrome 111+).
 */
function shouldUseBrowserDefault(e, { target, download }) {
  return (
    e.button !== 0 ||
    e.metaKey ||
    e.altKey ||
    e.ctrlKey ||
    e.shiftKey ||
    download !== undefined ||
    (target && target !== "_self")
  );
}

export function ViewTransitionLink({ to, className, children, onClick, target, download, ...rest }) {
  const navigate = useNavigate();
  const href = viewTransitionToHref(to);
  return (
    <a
      href={href}
      className={className}
      target={target}
      download={download}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (shouldUseBrowserDefault(e, { target, download })) return;
        e.preventDefault();
        navigateWithViewTransition(navigate, to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
