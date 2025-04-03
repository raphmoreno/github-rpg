/**
 * Create a simple pixel art icon programmatically
 * This can be used to generate placeholder icons until proper assets are created
 */

/**
 * Generate a pixel art wizard hat icon on a canvas
 * @param {number} size - Canvas size
 * @param {string} bgColor - Background color
 * @param {string} primaryColor - Primary icon color
 * @param {string} accentColor - Accent color for details
 * @returns {HTMLCanvasElement} Canvas with pixel art
 */
export function generatePixelIcon(size = 128, bgColor = '#1E1E3F', primaryColor = '#8F6FC5', accentColor = '#FFCC00') {
  // Create canvas and get context
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  // Set image rendering to pixelated
  ctx.imageSmoothingEnabled = false;
  
  // Calculate pixel size (want relatively large pixels)
  const pixelSize = Math.max(2, Math.floor(size / 16));
  
  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);
  
  // Define pixel art pattern for wizard hat (16x16 grid)
  const pattern = [
    '0000000000000000',
    '0000000111000000',
    '0000001111100000',
    '0000011111110000',
    '0000111111111000',
    '0001111111111100',
    '0001222222222100',
    '0001222222222100',
    '0001222222222100',
    '0011113333111100',
    '0111100000011110',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000',
    '0000000000000000'
  ];
  
  // Color mapping
  const colors = {
    '0': 'transparent',
    '1': primaryColor,
    '2': accentColor,
    '3': '#fff'
  };
  
  // Draw pixel art pattern
  for (let y = 0; y < pattern.length; y++) {
    for (let x = 0; x < pattern[y].length; x++) {
      const colorKey = pattern[y][x];
      const color = colors[colorKey];
      
      if (color !== 'transparent') {
        ctx.fillStyle = color;
        ctx.fillRect(
          x * pixelSize, 
          y * pixelSize, 
          pixelSize, 
          pixelSize
        );
      }
    }
  }
  
  return canvas;
}

/**
 * Generate and download pixel art icons in different sizes
 * Use this function to generate the icon files for the extension
 */
export function generateIconFiles() {
  const sizes = [16, 32, 48, 128];
  
  sizes.forEach(size => {
    const canvas = generatePixelIcon(size);
    const link = document.createElement('a');
    link.download = `icon-${size}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}

// If this file is loaded directly, generate the icon files
if (typeof window !== 'undefined' && window.location.pathname.includes('generate-icons')) {
  generateIconFiles();
} 