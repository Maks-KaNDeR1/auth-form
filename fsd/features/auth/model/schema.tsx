import {z} from "zod";

export const schema = z
    .object({
        email: z.string().email("Wrong type of e-mail"),
        phone: z.string().nonempty("Enter phone number"),
        password: z
            .string()
            .min(8, "At least 8 characters")
            .refine((value) => /[A-Z]/.test(value), {
                message: "One or more capitalized letter",
            })
            .refine((value) => /[0-9!@#$%^&*(),.?":{}|<>]/.test(value), {
                message: "Contains a number or(and) symbol",
            }),
        referralCode: z
            .string()
            .optional()
            .refine((value) => value === undefined || ["PROMO123", "promo_may2024", "NEWUSER"].includes(value), {
                message: "There is no such promo code",
            }),
        terms: z.boolean().refine((value) => value, {
            message: "You must accept the Terms of Use and Privacy Policy",
        }),
    })
    .superRefine((data, ctx) => {
        if (data.password.includes(data.email)) {
            ctx.addIssue({
                path: ["password"],
                message: "Can’t contain e-mail address",
                code: z.ZodIssueCode.custom,
            });
        }
    });

