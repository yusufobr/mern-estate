import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { useRef } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

type ListingProps = {
  userRef: string;
  name: string;
  description: string;
  adress: string;
  type: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  furnished: boolean;
  parking: boolean;
  regularPrice: number;
  discountedPrice?: number;
  offer: boolean;
  images: any;
};

const CreateListing = () => {

  document.title = "Create Listing | Real Estate";

  const { currentUser } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  const pictures = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<any>([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  // const [progress, setProgress] = useState(0);

  const handleFilesUpload = () => {
    setUploading(true);
    if (images.length > 0 && images.length < 7 && formData.images.length < 7) {
      const promises = [];

      for (let i = 0; i < images.length; i++) {
        promises.push(storeImage(images[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({ ...formData, images: formData.images.concat(urls) });
          setUploading(false);
        })
        .catch((err: Error) => {
          setImageUploadError("Error uploading images");
          console.log(err.message);
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images");
      setUploading(false);
    }
  };

  const storeImage = async (file: File) => {
    return new Promise((resolve, reject) => {
      const fileName = new Date().getTime() + file?.name;

      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL: string) => {
              resolve(downloadURL);
            }
          );
        }
      );
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/listing/create", formData);
      if (res.status === 201) {
        navigate('/post/' + res.data._id);
        console.log(res);
        setFormData(initialState);
        setImages([]);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialState = {
    userRef: currentUser.id,
    name: "",
    description: "",
    adress: "",
    type: "rent",
    propertyType: "house",
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    parking: false,
    regularPrice: 0,
    discountedPrice: 0,
    offer: false,
    images: [],
  }
  const [formData, setFormData] = useState<ListingProps>(initialState);

  

  // console.log(formData);

  const handleChange = (e: any) => {
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }
  };

  const removeOneImage = (index: number) => {
    let imagesCopy = [...formData.images];
    imagesCopy.splice(index, 1);
    setFormData({ ...formData, images: imagesCopy});
  };

  return (
    <div className="flex flex-col gap-10 items-center">
      <PageHeader pageTitle="Create Listing" />

      <div className="container max-w-screen-xl mx-auto mb-8 sm:grid sm:grid-cols-2 sm:gap-2 flex flex-col gap-4 w-full">
        <div className="w-full">
          <form className="flex flex-col gap-4 p-3" onSubmit={handleSubmit}>
            <input
              className="border p-3 rounded-md focus:outline-none"
              type="text"
              placeholder="Title"
              id="name"
              maxLength={64}
              minLength={12}
              onChange={handleChange}
              value={formData.name}
              required
            />
            <textarea
              className="border p-3 rounded-md focus:outline-none"
              placeholder="Description"
              id="description"
              onChange={handleChange}
              value={formData.description}
              required
            />
            <input
              className="border p-3 rounded-md focus:outline-none"
              type="text"
              placeholder="Adress"
              id="adress"
              maxLength={64}
              minLength={12}
              onChange={handleChange}
              value={formData.adress}
              required
            />
            <div className="flex gap-2 items-center">
              <span>Category:</span>
              <div className="flex gap-1">
                <input
                  type="radio"
                  name="category"
                  className="border p-1 rounded-md focus:outline-none"
                  id="house"
                  onChange={() => setFormData({ ...formData, propertyType: "house" })}
                  defaultChecked
                />
                <label htmlFor="category">House</label>
              </div>
              <div className="flex gap-1">
                <input
                  type="radio"
                  name="category"
                  className="border p-1 rounded-md focus:outline-none"
                  id="apartment"
                  onChange={() => setFormData({ ...formData, propertyType: "apartment" })}
                />
                <label htmlFor="category">Apartment</label>
              </div>
              <div className="flex gap-1">
                <input
                  type="radio"
                  name="category"
                  className="border p-1 rounded-md focus:outline-none"
                  id="studio"
                  onChange={() => setFormData({ ...formData, propertyType: "studio" })}
                />
                <label htmlFor="category">Studio</label>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <span>Type:</span>
              <div className="flex gap-1">
                <input
                  type="radio"
                  name="type"
                  className="border p-1 rounded-md focus:outline-none"
                  id="rent"
                  onChange={() => setFormData({ ...formData, type: "rent" })}
                  defaultChecked
                />
                <label htmlFor="type">Rent</label>
              </div>
              <div className="flex gap-1">
                <input
                  type="radio"
                  name="type"
                  className="border p-1 rounded-md focus:outline-none"
                  id="sale"
                  onChange={() => setFormData({ ...formData, type: "sale" })}
                />
                <label htmlFor="type">Sale</label>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex gap-2 items-center">
                <span>Bedrooms :</span>
                <input
                  type="number"
                  className="border p-1 rounded-md focus:outline-none w-20"
                  id="bedrooms"
                  step={1}
                  min={1}
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
              </div>
              <div className="flex gap-2 items-center">
                <span>Bathrooms :</span>
                <input
                  type="number"
                  className="border p-1 rounded-md focus:outline-none w-20"
                  id="bathrooms"
                  step={1}
                  min={1}
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex gap-2 items-center">
                <span>Furnished:</span>
                <input
                  type="checkbox"
                  className="border p-1 rounded-md focus:outline-none"
                  id="furnished"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
              </div>
              <div className="flex gap-2 items-center">
                <span>Parking spot:</span>
                <input
                  type="checkbox"
                  className="border p-1 rounded-md focus:outline-none"
                  id="parking"
                  onChange={handleChange}
                  checked={formData.parking}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-6">
                <div className="flex gap-2 items-center">
                  <label htmlFor="discountedPrice">{formData.offer ? "Discounted Price :" : "Price :"}</label>
                  <input
                        className="border p-2 rounded-md focus:outline-none"
                        type="number"
                        placeholder={formData.offer ? "Discounted Price" : "Price"}
                        id="discountedPrice"
                        min={50}
                        onChange={handleChange}
                        value={formData.discountedPrice}
                      />
                </div>
                {formData.offer && (
                  <div className="flex gap-2 items-center">
                    <label htmlFor="regularPrice">Regular Price :</label>
                    <input
                    className="border p-2 rounded-md focus:outline-none"
                    type="number"
                    placeholder="Regular Price"
                    id="regularPrice"
                    onChange={handleChange}
                    value={formData.regularPrice}
                  />
                  </div>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <span>Offer:</span>
                <input
                  type="checkbox"
                  id="offer"
                  className="border p-3 rounded-md focus:outline-none"
                  onChange={handleChange}
                  checked={formData.offer}
                />
              </div>
            </div>
            <input
              ref={pictures}
              type="file"
              accept=".png, .jpeg, .jpg"
              multiple
              onChange={(e) => setImages(e.target.files!)}
              hidden
            />
            <div>
              <button
                type="submit"
                className="bg-black text-white p-2 px-8 rounded-md"
              >
                Create Listing
              </button>

            </div>
          </form>
        </div>
        
        <div className="flex flex-col gap-4 p-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <div
                className="flex flex-col justify-center items-center bg-gray-50 rounded-xl border-2 border-gray-200 border-dotted h-full w-full cursor-pointer"
                onClick={() => pictures.current?.click()}
              >
                <div className="flex flex-col items-center">
                  <LuPlus size={25} />
                  {images.length > 0 ? (
                    <span>{images.length} images selected</span>
                  ) : (
                    <span className="text-sm">Add Images</span>
                  )}
                </div>
              </div>
              <div className="text-center text-sm text-gray-400"><span>add atleast one Image</span></div>
            </div>
            
            <div className="flex flex-col gap-2 py-[2px]">
              <button
                type="button"
                className="bg-blue-500 text-white rounded-md p-2"
                onClick={handleFilesUpload}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
              <button
                className="bg-red-500 text-white rounded-md p-2"
                onClick={() => {
                  setImages([]);
                  setFormData({ ...formData, images: [] });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
          {formData.images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {formData.images.map((image: any, index: number) => (
                <div className="relative" key={index}>
                  <img src={image} alt="listing" />
                  <div
                    className="absolute top-2 right-2 text-white p-1 bg-red-400 rounded-full"
                    onClick={() => removeOneImage(index)}
                  >
                    <MdDeleteOutline size={20} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {imageUploadError && (
          <div className="bg-red-500 text-white p-3 rounded-md">
            {imageUploadError}
            </div>
        )}
      </div>
    </div>
  );
};

export default CreateListing;
