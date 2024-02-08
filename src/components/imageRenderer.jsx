import React from "react";

const ImageComponent = (base64Image) => {
  return (
    <div>
      {/* Display the image using an img tag */}
      <img src={`data:image/jpeg;base64,${base64Image.data}`} />
    </div>
  );
};

export default ImageComponent;
