import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

type ImageViewerProps = {
  images: string[];
}

const ImageViewer = ({ images}: ImageViewerProps) => {
  return (
    <PhotoProvider>
      <div className="foo grid grid-cols-3 gap-2">
        {images.map((item, index) => (
          <PhotoView key={index} src={item}>
            <img className="previewImgs" src={item} alt="" />
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
};

export default ImageViewer;
