import React, { useState, useEffect } from "react";
import FullScreenSection from "./FullScreenSection";
import { Box, Heading } from "@chakra-ui/react";
import Card from "./Card";

const ProjectsSection = () => {
  // holds the list of repos fetched from the GitHub API
  const [projects, setProjects] = useState([]);

  // fetches the 8 most recently pushed public repos on mount
  useEffect(() => {
    fetch("https://api.github.com/users/Damaged-hero/repos?sort=pushed&direction=desc&per_page=8")
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <FullScreenSection
      backgroundColor="#060f0a"
      isDarkBackground
      p={8}
      alignItems="flex-start"
      spacing={8}
    >
      <Heading as="h1" id="projects-section">
        Featured Projects
      </Heading>

      {/* 2-column responsive grid of project cards */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(2,minmax(0,1fr))"
        gridGap={8}
      >
        {projects.map((project) => (
          <Card
            key={project.name}
            title={project.name}
            // fallback text for repos with no description set on GitHub
            description={project.description || "No description provided"}
            // GitHub's OpenGraph service generates a preview image per repo
            imageSrc={`https://opengraph.githubassets.com/1/Damaged-hero/${project.name}`}
          />
        ))}
      </Box>
    </FullScreenSection>
  );
};

export default ProjectsSection;
