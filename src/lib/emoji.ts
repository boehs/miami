export function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    // @ts-expect-error its fine
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
