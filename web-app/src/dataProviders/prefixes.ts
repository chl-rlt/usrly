/**
 * Get the prefixed resource name
 * @param resource - The resource name
 * @returns The prefixed resource name
 */
export const getPrefixedResource = (resource: string): string => {
  const prefix = "v1";
  return `${prefix}/${resource}`;
};
