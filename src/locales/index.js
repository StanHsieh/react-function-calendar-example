export const getLocale = (locale) => {
  let i18n;
  try {
    i18n = require(`./${locale}`).default;
  } catch (e) {
    i18n = {};
  }
  return i18n;
}