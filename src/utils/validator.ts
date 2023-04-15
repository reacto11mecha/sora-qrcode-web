import { z } from "zod";

const customToken = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const arrayValidator = customToken.split("");

const validateId = (id: string) =>
  id
    .split("")
    .map((char) => arrayValidator.includes(char))

    // Every item is true
    .every((item) => item);

export const ValidateData = z.array(
  z.object({
    name: z.string().includes(" | "),
    qrId: z.string().refine(validateId),
  })
);
