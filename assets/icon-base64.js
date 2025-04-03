/**
 * Base64 encoded pixel art icons for GitHub RPG extension
 * These are pre-generated placeholder icons for the extension
 * In a real project, you would use actual image files
 */

// 16x16 pixel wizard hat icon (base64 PNG)
export const ICON_16 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQklEQVQ4T2NkIAIwEqGWAb8BjERqZsKpgVTNTLg0Y9NMrGZmXJqxaSZFMwsuzZg0k6qZFZdmZM2kaGbDpRlZMwD67AoRuXBP4wAAAABJRU5ErkJggg==`;

// 32x32 pixel wizard hat icon (base64 PNG)
export const ICON_32 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAhElEQVRYR+2WMQ7AIAwDSf//aDoiJCQrxE4ZGLqlN9jYboxxjTmuCQHEBhCgSCKnAFUCOQXoEsghwJBAygCWBFIGsCQQG+DCm7AswJZAaADbAuEGSS3AmkCoAXsCoQYdEgg16JBAqEGHBEINVgLsZ6GdwHoWWgmsGXAksGbAkUCKgQfGAS0R3h+bagAAAABJRU5ErkJggg==`;

// 48x48 pixel wizard hat icon (base64 PNG)
export const ICON_48 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAA4ElEQVRoQ+2ZQQ7DIAwEyf8fTY8VUiTkBRvvlkNzTTODwU5prfXc63pvCUBsAAGKJHIKUCWQU4AugRwCDAmkDGBJIGUASwKxAS68CcsCbAmEBrAtEG6Q1AKsCYQasCcQatAhgVCDDgmEGnRIINRgJcB+Ftoppgm8Nli1odlq93o++z+3/zeLmWDMPsEwAjMTrNhnmkcCM/ZZ5pHAyDzTPBKQebbAyCxFAE4QjWAC8AQsCQfgCVgSDsATsCQcgCdgSTgAT8CScACegCXhADwBS8IBrARWvgvsFFYC33wXsPIJlOpWEbJIPO0AAAAASUVORK5CYII=`;

// 128x128 pixel wizard hat icon (base64 PNG)
export const ICON_128 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAABuklEQVR4Xu3dsQ3CQBRFQeNdUAXtpw7apw7apwqLLRBItsUMT+L+nW+ZK+FVxrZtx3F83fvcQOAZdwMBfACBuB0Q4APIBAgkEogbQIAPIJNAJBE3gAAfQCaBSCJuAAE+gEwCkUTcAAJ8AJkEIom4AQT4ADIJRBJxAwjwAWQSiCTiBhDgA8gkEEnEDSDAB5BJIJKIGyDA3/0BzvP8qRvO8/yuG47j+KgbJn/4+nP2tIGAHyCQSCCSiBtAgA8gk0AkETeAAB9AJoFIIm4AAT6ATAKRRNwAAnwAmQQiibgBBPgAMglEEnEDCPABZBKIJOIGEOADyCQQScQNIMAHkEkgkogbQIAPIJNAJBE3gAAfQCaBSCJuAAE+gEwCkUTcAAJ8AJkEIom4AQT4ADIJRBJxAwjwAWQSiCTiBhDgA8gkEEnEDSDAB5BJIJKIGyDA3/0BfH3v6+t7P4DA5O/U1/e+vr73AwjwAWQSiCTiBhDgA8gkEEnEDSDAB5BJIJKIGyDA3/0B3ACXNzCZQCSRNoAAH0AmgUgibgABPoBMApFE3AACfACZBCKJuAEE+AAyCUQScQMI8AFkEogk4gYQ4APIJBBJbAX8AOpIDhGQ04GeAAAAAElFTkSuQmCC`;

/**
 * Function to save base64 data URL as a file
 * @param {string} dataUrl - Base64 data URL
 * @param {string} filename - Name to save the file as
 */
export function saveBase64AsFile(dataUrl, filename) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Function to save all icons to files
export function saveAllIcons() {
  saveBase64AsFile(ICON_16, 'icon-16.png');
  saveBase64AsFile(ICON_32, 'icon-32.png');
  saveBase64AsFile(ICON_48, 'icon-48.png');
  saveBase64AsFile(ICON_128, 'icon-128.png');
}

// If this file is run directly, save all icons
if (typeof window !== 'undefined' && window.location.pathname.includes('save-icons')) {
  saveAllIcons();
} 