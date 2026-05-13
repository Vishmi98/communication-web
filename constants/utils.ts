export const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')  // Remove all non-word chars
        .replace(/--+/g, '-')     // Replace multiple - with single -
        .trim();                  // Trim whitespace
};

export const generateAlphanumericVerificationCode = (): string => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();  // Generates a random 6-character alphanumeric code
};