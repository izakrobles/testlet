const profilePictures = [
    { id: 1, url: "https://i.imgur.com/daAEnpv.png", altText: "red discord pfp" },
    { id: 2, url: "https://i.imgur.com/pUmsBOS.png", altText: "white discord pfp" },
    { id: 3, url: "https://i.imgur.com/n9Q4Kt9.png", altText: "green discord pfp" },
    { id: 4, url: "https://i.imgur.com/CIDJgn3.png", altText: "orange discord pfp" },
    { id: 5, url: "https://i.imgur.com/2WDxheK.png", altText: "merge ... pfp" },
    { id: 6, url: "https://i.imgur.com/PMWZcbY.png", altText: "default discord pfp" },
    // add more pictures as needed
  ];
  
  const imageMap = {};
  profilePictures.forEach((picture) => {
    imageMap[picture.id] = picture;
  });
  
  export { profilePictures, imageMap };