import React, {useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

// Social media links data — icon and url per platform
const socials = [
  {
    icon: faEnvelope,
    url: "mailto:rvanzyl67@gmail.com",
  },
  {
    icon: faGithub,
    url: "https://github.com/Damaged-hero",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/ruan-vanzyl-43280a1a4/",
  },
];

const Header = () => {
  // ref attached to the header Box so we can directly manipulate its transform style
  const headerRef = useRef(null);

  // smooth scrolls to the section matching the anchor id
  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // hides header when scrolling down, shows it again when scrolling up
  useEffect(() => {
    let lastscrollY = window.scrollY;

    const handelScroll = () => {
      if (window.scrollY > lastscrollY) {
        headerRef.current.style.transform = "translateY(-200px)";
      } else {
        headerRef.current.style.transform = "translateY(0)";
      }
      lastscrollY = window.scrollY;
    };

    window.addEventListener("scroll", handelScroll);
    // cleanup removes listener when component unmounts
    return () => window.removeEventListener("scroll", handelScroll);
  }, []);

  return (
    // zIndex keeps header above all sections, transition animates the hide/show
    <Box
      ref={headerRef}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack px={16} py={4} justifyContent="space-between" alignItems="center">
          {/* Left nav — external social media icon links */}
          <nav>
            <HStack spacing={4}>
              {socials.map((social) => (
                <a
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={social.icon} size="2x" />
                </a>
              ))}
            </HStack>
          </nav>
          {/* Right nav — internal page section links */}
          <nav>
            <HStack spacing={8}>
              <a href="#projects-section" onClick={handleClick("projects")}>
                Projects
              </a>
              <a href="#contactme-section" onClick={handleClick("contactme")}>
                Contact Me
              </a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;
