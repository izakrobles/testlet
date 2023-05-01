const profilePictures = [
  { id: 1, url: "https://i.imgur.com/7rBrcuu.png", altText: "bear pfp" },
  { id: 2, url: "https://i.imgur.com/prN43Z3.png", altText: "pig pfp" },
  { id: 3, url: "https://i.imgur.com/vQlYzCM.png", altText: "frog pfp" },
  { id: 4, url: "https://i.imgur.com/QmnWSpT.png", altText: "bunny pfp" },
  { id: 5, url: "https://i.imgur.com/2WDxheK.png", altText: "zo pfp" },
  { id: 6, url: "https://i.imgur.com/ZvsgxIm.png", altText: "elephant pfp" },
  // add more pictures as needed
];

const imageMap = {};
profilePictures.forEach((picture) => {
  imageMap[picture.id] = picture;
});

export { imageMap };
