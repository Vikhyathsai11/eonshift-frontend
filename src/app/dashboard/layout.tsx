import { type ReactElement } from "react";

import { CheckAuthProvider } from "~/providers";

export default function RootLayout({ children }: { children: ReactElement }) {
  return <CheckAuthProvider>{children}</CheckAuthProvider>;
}
