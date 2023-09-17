import React, { useState } from 'react';
import { Api } from './api';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageGen: (imageUrl: string) => void;
}

function ImageModal({ isOpen, onClose, onImageGen }: ImageModalProps) {
  const [modalInput, setModalInput] = useState<string>('');

  const handleModalSubmit = async () => {
    const res = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${Api}`,
        },
        body: JSON.stringify({ inputs: modalInput }),
      }
    );
    const blob = await res.blob();
    const imageUrl = URL.createObjectURL(blob);
    onImageGen(imageUrl);
    onClose();
    setModalInput("");
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 w-1/3 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Generate Image</h2>
            <input
              type="text"
              value={modalInput}
              onChange={(e) => setModalInput(e.target.value)}
              placeholder="Write your prompt here"
              className="w-full px-3 py-2 border rounded-md"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleModalSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Submit
              </button>
              <button
                onClick={onClose}
                className="ml-2 px-4 py-2 bg-gray-300 text-gray-600 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ImageModal;
