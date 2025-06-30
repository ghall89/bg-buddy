const DEFAULT_ERROR = 'Unexpected error';

/**
 * Executes an asynchronous action and adds contextual error handling.
 */
export async function tryCatch<T>(
  action: () => Promise<T>,
  errorMessage = DEFAULT_ERROR,
): Promise<T> {
  try {
    const result = await action();

    return result;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `${errorMessage}: ${error.message}`;
      throw error;
    }

    throw new Error(`${errorMessage}: ${JSON.stringify(error)}`);
  }
}

/**
 * Executes a synchronous action and adds contextual error handling.
 */
export function tryCatchSync<T>(
  action: () => T,
  errorMessage = DEFAULT_ERROR,
): T {
  try {
    const result = action();

    return result;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `${errorMessage}: ${error.message}`;
      throw error;
    }
    throw new Error(`${errorMessage}: ${JSON.stringify(error)}`);
  }
}
