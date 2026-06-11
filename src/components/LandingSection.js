import React from "react";
import { Avatar, Heading, VStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import RunicBackground from "./RunicBackground";

const greeting = "Hello, I am Ruan!";
const bio1 = "A frontend developer";
const bio2 = "specialised in React";

const LandingSection = () => (
  // position="relative" is required so RunicBackground can use position="absolute" inside
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
    position="relative"
  >
    {/* Decorative background layer — sits behind all content */}
    <RunicBackground />

    {/* zIndex keeps content above the RunicBackground overlay */}
    <VStack spacing={6} zIndex={1}>
      {/* Avatar with grayscale filter applied via CSS */}
      <Avatar size="2xl" src={`${process.env.PUBLIC_URL}/ruan.png`} sx={{ filter: "grayscale(100%)" }} />
      <Heading as="h1" size="lg" textAlign="center">
        {greeting}
      </Heading>
      <Heading as="h2" size="md" textAlign="center" fontWeight="normal">
        {bio1}
      </Heading>
      <Heading as="h2" size="md" textAlign="center" fontWeight="normal">
        {bio2}
      </Heading>
    </VStack>
  </FullScreenSection>
);

export default LandingSection;
