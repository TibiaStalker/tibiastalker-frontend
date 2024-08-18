import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import { ReactNode } from "react";

type StandardLinkProps = {
  children: ReactNode;
  href: string;
};

export const StandardLink = ({ children, href }: StandardLinkProps) => {
  return (
    <MenuItem sx={{ py: { md: "6px" }, px: { md: "12px" } }}>
      <Link href={href} variant="body2" underline="none" color="text.primary">
        {children}
      </Link>
    </MenuItem>
  );
};
