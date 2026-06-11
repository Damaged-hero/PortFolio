import * as React from "react";
import { VStack } from "@chakra-ui/react";

/**
 * Illustrates the use of children prop and spread operator
 */
const FullScreenSection = ({ children, isDarkBackground, ...boxProps }) => {
  const { backgroundColor, sx, position, ...innerProps } = boxProps;
  return (
    <VStack
      width="100%"
      position={position || "static"}
      backgroundColor={backgroundColor}
      color={isDarkBackground ? "white" : "black"}
      sx={sx}
    >
      <VStack maxWidth="1280px" minHeight="100vh" {...innerProps}>
        {children}
      </VStack>
    </VStack>
  );
};


export default FullScreenSection;
