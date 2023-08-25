import { ForwardedRef, ReactNode, forwardRef } from "react";
import { Link as RRLink, LinkProps as RRLinkProps } from "react-router-dom";

interface LinkProps extends Omit<RRLinkProps, "to"> {
  href: string;
  children: ReactNode;
}

export const Link = forwardRef(
  (props: LinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    const { href, children, ...rest } = props;

    return <RRLink ref={ref} to={href} {...rest}>
      {children}
    </RRLink>
  }
);
