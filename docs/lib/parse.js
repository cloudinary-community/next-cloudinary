/**
 * getUrlParamsFromString
 */

export function getUrlParamsFromString(string) {
  let url;

  try {
    url = new URL(string);
  } catch (e) {
    throw new Error(`Failed to get URL params from string: ${e.message}`);
  }

  const params = new URLSearchParams(url.search);

  return Array.from(params.keys()).map((key) => {
    return {
      key,
      value: params.get(key),
    };
  });
}