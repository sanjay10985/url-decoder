export function decodeQuery(input: string): object {
  try {
    const parsedUrl = new URL(input);
    const params = parsedUrl.searchParams;

    const result: { [key: string]: any } = {
      endpoint: parsedUrl.origin + parsedUrl.pathname,
      params: {},
    };

    for (const [key, value] of params.entries()) {
      try {
        result.params[key] = JSON.parse(value);
      } catch {
        result.params[key] = value;
      }
    }

    return result;
  } catch (error) {
    throw new Error("Invalid URL or query string");
  }
}
