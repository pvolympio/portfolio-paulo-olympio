import { getRequestConfig } from 'next-intl/server';

// Define the locales that your app supports
const locales = ['en', 'pt_BR'];

export default getRequestConfig(async ({ requestLocale }) => {
  // Get the locale from the request (e.g., from the cookie or URL)
  let locale = await requestLocale;

  // Ensure a valid locale is used
  if (!locale || !locales.includes(locale as any)) {
    locale = 'en'; // Default locale
  }

  return {
    locale,
    // Load the messages for the locale from the messages directory
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});