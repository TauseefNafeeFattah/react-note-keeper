import React from "react";

function Footer() {
  // creates the footer of the webpage
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright @ {year}</p>
    </footer>
  );
}
export default Footer;
