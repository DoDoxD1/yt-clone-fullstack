import React from "react";
import Link from "next/link";

interface authFooterProps {
  link: string;
  text: string;
}

export default function AuthFooter({ link, text }: authFooterProps) {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Link href={link}>{text}</Link>
    </div>
  );
}
