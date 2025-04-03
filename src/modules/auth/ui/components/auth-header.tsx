import React from "react";

interface authHeaderProps {
  heading: string;
  text: string;
}

export default function AuthHeader({ heading, text }: authHeaderProps) {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-bold tracking-tighter">{heading}</h1>
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}
