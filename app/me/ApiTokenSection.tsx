'use client';

import { useState } from 'react';
import { generateToken } from '@/app/actions/users';

const ApiTokenSection = ({ initialToken }: { initialToken: string | null }) => {
  const [token, setToken] = useState(initialToken);

  const handleGenerate = async () => {
    const newToken = await generateToken();
    setToken(newToken);
  };

  return (
    <section data-testid="api-token-section">
      <h2 className="text-xl font-bold mb-4">API Token</h2>
      {token ? (
        <div
          data-testid="token-display"
          className="mb-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 rounded"
        >
          <p className="mb-2 font-bold">Current token:</p>
          <p
            data-testid="api-token"
            className="bg-gray-200 dark:bg-gray-700 p-2 rounded break-all"
          >
            {token}
          </p>
        </div>
      ) : (
        <p data-testid="no-token-message" className="text-gray-500 mb-2">
          No token has been generated yet
        </p>
      )}
      <button
        type="button"
        onClick={handleGenerate}
        data-testid="generate-token-button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate New Token
      </button>
    </section>
  );
};

export default ApiTokenSection;
