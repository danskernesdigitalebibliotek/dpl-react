import React, { ChangeEvent, useCallback, useState } from "react";
import { useQueryClient } from "react-query";
import { setToken, TOKEN_LIBRARY_KEY } from "../../core/token";

const LibraryToken: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [shouldShowSuccessMessage, showSuccessMessage] = useState(false);
  const queryClient = useQueryClient();

  const setInputValueHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value: token }
      } = event;
      setInputValue(token);
    },
    [setInputValue]
  );
  const setLibraryTokenHandler = useCallback(() => {
    window.sessionStorage.setItem(TOKEN_LIBRARY_KEY, inputValue);
    setToken(TOKEN_LIBRARY_KEY, inputValue);
    showSuccessMessage(true);
    queryClient.clear();
  }, [queryClient, inputValue]);

  return (
    <div className="p-8">
      <p>Insert Library token:</p>
      <input
        className="mt-8 mr-8"
        value={inputValue}
        onChange={setInputValueHandler}
        size={41}
      />
      <button type="submit" onClick={setLibraryTokenHandler}>
        Save
      </button>
      {shouldShowSuccessMessage && (
        <p className="text-small-caption mt-8">The token was saved</p>
      )}
    </div>
  );
};

export default LibraryToken;
