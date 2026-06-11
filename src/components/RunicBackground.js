import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';

// Elder Futhark runic alphabet used for the shuffling characters
const RUNES = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ';

// Single character that cycles through random runes at the given speed (ms)
const RunicChar = ({ speed }) => {
  const [char, setChar] = useState(RUNES[0]);

  useEffect(() => {
    const id = setInterval(() => {
      setChar(RUNES[Math.floor(Math.random() * RUNES.length)]);
    }, speed);
    // cleanup stops the interval when the character unmounts
    return () => clearInterval(id);
  }, [speed]);

  return <span>{char}</span>;
};

// Triangle shape shrinking downward — top row is widest, bottom row is 1 char
const RunicTriangleDown = ({ rows = 14 }) => (
  <Box display="flex" flexDirection="column" gap={2}
    fontFamily="serif" fontSize="xl" letterSpacing="0.25em">
    {Array.from({ length: rows }, (_, row) => (
      // each row fades out slightly as it goes down
      <Box key={row} display="flex" gap={3}
        opacity={0.85 - row * 0.05} color="whiteAlpha.500">
        {Array.from({ length: rows - row }, (_, i) => (
          // stagger each character's speed so they don't all shuffle in sync
          <RunicChar key={i} speed={80 + row * 20 + i * 12} />
        ))}
      </Box>
    ))}
  </Box>
);

// Triangle shape growing upward — top row is 1 char, bottom row is widest
const RunicTriangleUp = ({ rows = 14 }) => (
  <Box display="flex" flexDirection="column" gap={2}
    fontFamily="serif" fontSize="xl" letterSpacing="0.25em">
    {Array.from({ length: rows }, (_, row) => (
      // each row gets more opaque as it grows toward the bottom
      <Box key={row} display="flex" gap={3}
        opacity={0.3 + row * 0.05} color="whiteAlpha.500">
        {Array.from({ length: row + 1 }, (_, i) => (
          <RunicChar key={i} speed={80 + row * 20 + i * 12} />
        ))}
      </Box>
    ))}
  </Box>
);

// Grid of dots used as decorative fill beside the rune triangles
const DotStrip = ({ cols = 80, rows = 4 }) => (
  <Box
    display="grid"
    gridTemplateColumns={`repeat(${cols}, 1fr)`}
    gap={3}
    opacity={0.2}
    color="white"
    fontSize="sm"
    width="100%"
  >
    {Array.from({ length: cols * rows }, (_, i) => (
      <Box key={i} textAlign="center" py={2}>·</Box>
    ))}
  </Box>
);

// Absolutely positioned overlay — covers the full landing section behind the content
const RunicBackground = () => (
  <Box position="absolute" inset={0} overflow="hidden" pointerEvents="none"
    display="flex" flexDirection="column" justifyContent="space-between">

    {/* Top dot strip — paddingLeft clears the top-left rune triangle area */}
    <Box width="100%" paddingLeft="32%">
      <DotStrip cols={60} rows={4} />
    </Box>

    {/* Bottom dot strip — paddingRight clears the bottom-right rune triangle area */}
    <Box width="100%" paddingRight="32%">
      <DotStrip cols={60} rows={4} />
    </Box>

    {/* Rune triangle pinned to the top-left corner */}
    <Box position="absolute" top={0} left={0} p={6}>
      <RunicTriangleDown rows={14} />
    </Box>

    {/* Rune triangle pinned to the bottom-right corner, mirrored horizontally */}
    <Box position="absolute" bottom={0} right={0} p={6}
      sx={{ transform: 'scaleX(-1)' }}>
      <RunicTriangleUp rows={14} />
    </Box>

  </Box>
);

export default RunicBackground;
