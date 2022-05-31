import React, { ChangeEvent, useCallback, useState } from "react";
import { useQueryClient } from "react-query";
import { setToken, TOKEN_LIBRARY_KEY } from "../../core/token";

/**
 * This component is only to be used in Storybook context.
 * Like the auth component it offers a way to set the needed context
 * in order for the apps to be able to operate properly.
 *
 * This component offers a way to set the current library token.
 */
const LibraryToken: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [shouldShowSuccessMessage, setShowSuccessMessage] = useState(false);
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
    // Persist the library token in Storybook,
    window.sessionStorage.setItem(TOKEN_LIBRARY_KEY, inputValue);
    // Set the token so it can be used by other components.
    setToken(TOKEN_LIBRARY_KEY, inputValue);
    // Show that everything went well.
    setShowSuccessMessage(true);
    // To make sure that we get fresh results from the queries
    // we invalidate the entire query cache.
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
      <p className="text-small-caption mt-8">
        In order to test apps for anonymous users,
        <br />
        you can insert a library token in this field.
      </p>
      {shouldShowSuccessMessage && (
        <p className="text-small-caption mt-8">The token was saved</p>
      )}
    </div>
  );
};

export default LibraryToken;
