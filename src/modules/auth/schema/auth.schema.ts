import z from "zod";

export const signupSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(8),
  }),
});
export const SigninSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string(),
  }),
});

export type ISignupSchema = z.infer<typeof signupSchema>;
export type ISigninSchema = z.infer<typeof SigninSchema>;
