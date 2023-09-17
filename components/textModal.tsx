import React, { useState } from 'react';
import { OpenAI } from 'langchain/llms/openai';
import { LLMChain } from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';
import { openApi } from './api';

interface TextModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTextGen: (text: string) => void;
}

function TextModal({ isOpen, onClose, onTextGen }: TextModalProps) {
  const [modalInput, setModalInput] = useState<string>('');

  const handleModalSubmit = async () => {
    const llm = new OpenAI({
      openAIApiKey: openApi,
    });

    const prompt = PromptTemplate.fromTemplate('you are a description writer {product}?');

    const chain = new LLMChain({
      llm,
      prompt,
    });

    const result = await chain.run(modalInput);
    onTextGen(result);
    onClose();
    setModalInput('');
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 w-1/3 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Generate Text</h2>
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

export default TextModal;
