import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

interface iconProps {
  link: string;
  icon: typeof faEnvelope | typeof faGithub | typeof faLinkedin;
}

const IconLink: React.FC<iconProps> = ({ link, icon }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon
        icon={icon}
        className="hover:text-gray-400 hover:scale-125 ml-2 mr-2"
      ></FontAwesomeIcon>
    </a>
  );
};
export default IconLink;
