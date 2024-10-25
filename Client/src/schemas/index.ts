import { z } from "zod";
import { UserRole } from "../types";

export const loginSchema = z.object({
    email: z.string().email("Debe ser un email válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
})

export const userSchema = z.object({
    id: z.number(),
    fullName: z.string(),
    userName: z.string(),
    email: z.string(),
    role: z.enum([UserRole.Admin, UserRole.Employee]),
    departamento: z.string()
})

export const registerFormDataSchema = z.object({
    fullName: z.string(),
    userName: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.string(),
    departamento: z.string(),
});

export const updateFormDataSchema = z.object({
    fullName: z.string(),
    userName: z.string(),
    email: z.string().email(),
    passwordHash: z.string(),
    role: z.string(),
    departamento: z.string(),
});

export const userArraySchema = z.array(userSchema);