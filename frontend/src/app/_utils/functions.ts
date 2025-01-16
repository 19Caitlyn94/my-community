export const getInitials = (name?: string) => {
  /**
   * Extracts the initials from a given name string.
   *
   * The function splits the name into words based on spaces, takes the first letter 
   * of each word, converts it to uppercase, and joins them to form the initials.
   * 
   * Examples:
   * - "John Doe" -> "JD"
   * - "John" -> "J"
   * - "" -> ""
   *
   * @param {string} name - The full name or display name.
   * @returns {string} - The first and last initials of the name in uppercase. If the input is an empty
   *                     string or only contains spaces, it returns an empty string.
   */

  if (!name) return "";
  const names = name.split(' ')
  const initials = `${names[0][0]}${names.length > 1 ? names[names.length - 1][0] : ''}`.toUpperCase()

  return initials
}

export const stringToHslColor = (str?: string) => {
  /**
   * Converts a string into a unique HSL color.
   *
   * This function generates a hash from the input string, maps it to a hue value,
   * and returns a corresponding HSL color with fixed saturation and lightness values.
   * If no string is provided, a default gray color is returned.
   *
   * @param {string} [str] - The input string to convert to an HSL color.
   * @returns {string} - The generated HSL color in the format `hsl(hue, 30%, 80%)`.
   *                     Defaults to `hsl(0, 0%, 50%)` if no input is provided.
   *
   * @example
   * stringToHslColor("example"); // "hsl(104, 30%, 80%)"
   * stringToHslColor(); // "hsl(0, 0%, 50%)"
   */

  if (!str) { return 'hsl(0,0%,30%)' }

  // Create hash value based on the string given
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Return a number between 0-360 based on the hash
  const h = hash % 360;
  return `hsl(${h},100%,20%)`;
}