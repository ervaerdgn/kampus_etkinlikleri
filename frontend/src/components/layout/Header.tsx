import React from "react";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

function Header({ 
  title = "Kampüs Etkinlikleri", 
  subtitle = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." 
}: HeaderProps) {
  return (
    <header>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}

export default Header;