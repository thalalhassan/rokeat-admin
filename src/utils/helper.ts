export const isEmpty = (val: any) => {
  if (val == null) return true;
  if (typeof val === "object" && Object.keys(val).length === 0) return true;
  if (typeof val === "string" && val.trim().length === 0) return true;
  return false;
};

/**
 * Decamelizes a string with/without a custom separator (underscore by default).
 *
 * @param str String in camelcase
 * @param separator Separator for the new decamelized string.
 */
 export function decamelize(str: string, separator?: string): string {
  separator = typeof separator === "undefined" ? " " : separator;

  return str
    .replace(/([a-z\d])([A-Z])/g, "$1" + separator + "$2")
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + separator + "$2")
    .toLowerCase();
}
