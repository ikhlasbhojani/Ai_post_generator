import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import TextModal from './textModal';
import ImageModal from './imageModal';

interface Product {
  image: string | null;
  title: string;
  description: string;
}

interface ProductFormProps {
  onSubmit: (newProduct: Product) => void;
}

function ProductForm({ onSubmit }: ProductFormProps) {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isTextModalOpen, setIsTextModalOpen] = useState<boolean>(false);
  const [imageGen, setImageGen] = useState<string | null>(null);
  const [textGen, setTextGen] = useState<string>('');

  useEffect(() => {
    if (textGen) {
      setDescription((prevDescription) => prevDescription.trim() + ' ' + textGen);
    }
  }, [textGen]);

  const openTextModal = () => {
    setIsTextModalOpen(true);
  };

  const closeTextModal = () => {
    setIsTextModalOpen(false);
  };

  const handleTextGen = (textGenData: string) => {
    setTextGen(textGenData);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageGen = (imageGenData: string) => {
    setImageGen(imageGenData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const previewURL = file ? URL.createObjectURL(file) : null;

    setImage(file);
    setImagePreview(previewURL);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newProduct: Product = {
      image: imagePreview || imageGen,
      title: title,
      description: description,
    };

    onSubmit(newProduct);

    setImage(null);
    setTitle('');
    setDescription('');
    setImagePreview(null);
    setImageGen(null);
    setTextGen('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image:
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="mt-1 block w-48 shadow sm:text-sm border-gray-300 rounded-md outline-none"
            />
          </label>

          {imagePreview || imageGen ? (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Image Preview:</label>
              <img
                src={imagePreview || imageGen || ""}
                alt="Preview"
                className="mt-1 w-32 h-32 object-cover"
              />
            </div>
          ) : null}
        </div>

        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full shadow sm:text-sm border-gray-300 rounded-md outline-none"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <div className="relative">
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full shadow sm:text-sm border-gray-300 rounded-md outline-none"
              rows={3}
            ></textarea>
            <button
              onClick={(e) => {
                e.preventDefault();
                openTextModal();
              }}
              className="absolute top-0 right-0 mt-2 mr-2 border w-12 rounded-md block text-[12px] font-bold"
            >
              GPT
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
      <button onClick={openModal} className="absolute right-24 top-1/3 border py-1 w-24 rounded-md block">
        Generate
      </button>

      <ImageModal isOpen={isModalOpen} onClose={closeModal} onImageGen={handleImageGen} />

      <TextModal isOpen={isTextModalOpen} onClose={closeTextModal} onTextGen={handleTextGen} />
    </>
  );
}

export default ProductForm;
