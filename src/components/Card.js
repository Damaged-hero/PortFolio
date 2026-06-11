import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

// Displays a single project card with an image, title, arrow and description
const Card = ({ title, description, imageSrc }) => {
  return (
    // White card with rounded corners and clipped overflow so the image fits cleanly
    <VStack
      backgroundColor="white"
      borderRadius="xl"
      overflow="hidden"
      spacing={0}
      color="black"
      align="stretch"
      cursor="pointer"
    >
      {/* Project screenshot or GitHub preview image */}
      <Image src={imageSrc} alt={title} objectFit="cover" />

      <VStack p={4} spacing={3} align="flex-start">
        {/* Title and arrow sit side by side, pushed to opposite ends */}
        <HStack justifyContent="space-between" alignItems="center" w="100%">
          <Heading as="h3" size="md">
            {title}
          </Heading>
          <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </HStack>

        {/* Short project description */}
        <Text fontSize="sm" color="gray.600">
          {description}
        </Text>
      </VStack>
    </VStack>
  );
};

export default Card;
