import z from "zod";

export const pageSchema = z.coerce.number().default(1);

export const limitSchema = z.coerce.number().default(10);

export const searchTextSchema = z
  .string()
  .optional()
  .transform((v) => (v ? escapeRegExp(v) : undefined)); // prisma doesn't escape regex chars on contains query

/**
 * Zod schema that converts a query ordering string to a prisma orderBy object
 */
export const orderBySchema = z.string().transform(getPrismaOrderBy);

/**
 * Convert a query ordering string to a prisma orderBy object
 * @param ordering example: "-name" for desc order or "name" for asc order
 * @returns
 */
export function getPrismaOrderBy(ordering?: string) {
  if (ordering == null) return undefined;

  const isOrderDESC = ordering.includes("-");
  const keyName = ordering.replace(/-/g, "");
  return {
    [keyName]: isOrderDESC ? "desc" : "asc",
  };
}

export function getPrismaPagination(page: number, limit: number) {
  return {
    skip: (page - 1) * limit,
    take: limit,
  };
}

// source : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#escaping
export function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export const passwordSchema = z
  .string()
  .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
  .max(20, { message: "Le mot de passe doit contenir au plus 20 caractères" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Le mot de passe doit contenir au moins une lettre majuscule",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Le mot de passe doit contenir au moins une lettre minuscule",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Le mot de passe doit contenir au moins un chiffre",
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: "Le mot de passe doit contenir au moins un caractere special",
  });
