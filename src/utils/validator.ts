const customToken = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const arrayValidator = customToken.split("");

export const validateId = (id: string) =>
  id
    .split("")
    .map((char) => arrayValidator.includes(char))

    // Every item is true
    .every((item) => item);
