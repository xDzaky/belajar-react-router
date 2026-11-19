import { z } from 'zod';

export const userDataSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full Name wajib diisi')
    .min(3, 'Full Name minimal 3 karakter')
    .max(100, 'Full Name maksimal 100 karakter'),

  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),

  phoneNumber: z
    .string()
    .min(1, 'Phone Number wajib diisi')
    .min(10, 'Phone Number minimal 10 digit')
    .max(15, 'Phone Number maksimal 15 digit')
    .refine(
      (value) => /^[0-9+\-\s]+$/.test(value),
      'Phone Number hanya boleh berisi angka, +, -, dan spasi'
    )
    .refine(
      (value) => {
        const digitsOnly = value.replace(/\D/g, '');
        return digitsOnly.length >= 10;
      },
      'Phone Number harus memiliki minimal 10 digit angka'
    ),

  gender: z
    .string()
    .min(1, 'Gender wajib dipilih'),

  dateOfBirth: z
    .string()
    .min(1, 'Date of Birth wajib diisi')
    .refine(
      (value) => {
        const date = new Date(value);
        return !isNaN(date.getTime());
      },
      'Format tanggal tidak valid'
    )
    .refine(
      (value) => {
        const date = new Date(value);
        const today = new Date();
        const minAge = new Date(
          today.getFullYear() - 100,
          today.getMonth(),
          today.getDate()
        );
        return date <= today && date >= minAge;
      },
      'Tanggal lahir tidak valid'
    ),

  address: z
    .string()
    .min(1, 'Address wajib diisi')
    .min(10, 'Address minimal 10 karakter')
    .max(500, 'Address maksimal 500 karakter'),

  occupation: z
    .string()
    .min(1, 'Occupation wajib dipilih'),

  bio: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        return value.length <= 200;
      },
      'Bio maksimal 200 karakter'
    ),
});
