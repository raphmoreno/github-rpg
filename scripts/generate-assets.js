const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Ensure directories exist
const dirs = [
  'assets/icons',
  'assets/avatars'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Generate icons
const iconSizes = [16, 48, 128];
const iconSource = path.join(__dirname, '../assets/icons/icon.svg');

iconSizes.forEach(size => {
  sharp(iconSource)
    .resize(size, size)
    .png()
    .toFile(path.join(__dirname, `../assets/icons/icon${size}.png`))
    .then(() => console.log(`Generated ${size}x${size} icon`))
    .catch(err => console.error(`Error generating ${size}x${size} icon:`, err));
});

// Generate avatar
const avatarSource = path.join(__dirname, '../assets/avatars/default.svg');
sharp(avatarSource)
  .resize(64, 64)
  .png()
  .toFile(path.join(__dirname, '../assets/avatars/default.png'))
  .then(() => console.log('Generated avatar'))
  .catch(err => console.error('Error generating avatar:', err)); 