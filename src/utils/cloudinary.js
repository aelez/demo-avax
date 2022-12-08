// video URL prefix
const vUrlPfx = 'https://res.cloudinary.com/avax/video/upload/';
const iUrlPfx = 'https://res.cloudinary.com/avax/image/upload/';
const cloudinaryId = 'v1519892914';

const vUrl = (strings, params, file) => {
  const extension = strings.find(Boolean);
  return `${vUrlPfx}${params}${cloudinaryId}/${file}${extension}`;
};

const imgUrl = (strings, params, file) => {
  const extension = strings.find(Boolean);
  return `${iUrlPfx}${params}/${cloudinaryId}/${file}${extension}`;
};

export { vUrlPfx, vUrl, iUrlPfx, imgUrl };
