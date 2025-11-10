/**
 * Formats a phone number string to Russian format: +7 (999) 123-45-67
 * @param value - The input value to format
 * @returns Formatted phone number string
 */
export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters except the leading +
  let cleaned = value.replace(/[^\d+]/g, '');

  // Handle empty input
  if (cleaned.length === 0) {
    return '';
  }

  // If it starts with + but not +7, replace with +7
  if (cleaned.startsWith('+') && !cleaned.startsWith('+7')) {
    cleaned = '+7' + cleaned.slice(1).replace(/^7/, '');
  }
  // If it doesn't start with +, ensure it starts with +7
  else if (!cleaned.startsWith('+')) {
    // If it starts with 7 or 8, replace with +7
    if (cleaned.startsWith('7') || cleaned.startsWith('8')) {
      cleaned = '+7' + cleaned.slice(1);
    } else {
      cleaned = '+7' + cleaned;
    }
  }

  // Extract only digits after +7
  const digitsOnly = cleaned.replace(/\D/g, '').slice(1); // Remove + and get digits

  // Limit to 10 digits (after country code)
  const limitedDigits = digitsOnly.slice(0, 10);

  // Format: +7 (XXX) XXX-XX-XX
  if (limitedDigits.length === 0) {
    return '+7';
  } else if (limitedDigits.length <= 3) {
    return `+7 (${limitedDigits}`;
  } else if (limitedDigits.length <= 6) {
    return `+7 (${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3)}`;
  } else if (limitedDigits.length <= 8) {
    return `+7 (${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3, 6)}-${limitedDigits.slice(6)}`;
  } else {
    return `+7 (${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3, 6)}-${limitedDigits.slice(6, 8)}-${limitedDigits.slice(8, 10)}`;
  }
};
