import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaGithub, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Hirehub Team...</div>
      <div>
       <a
              href="https://github.com/keerthipetla"
              target="_blank"
              rel="noopener noreferrer"
                >
                <FaGithub />
                </a>
                  <a
                   href="https://youtube.com/@KeerthiPetla"
                   target="_blank"
                      rel="noopener noreferrer"
                        >
                     <FaYoutube />
                       </a>
        <a
          href="https://www.linkedin.com/in/keerthi-petla-9b2941298"
           target="_blank"
            rel="noopener noreferrer"
             >
              <FaLinkedin />
              </a>
        
      </div>
    </footer>
  );
};

export default Footer;
