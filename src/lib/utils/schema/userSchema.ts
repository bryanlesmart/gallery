import { z } from 'zod';
import { zfd } from '../zfd';

export const createUserSchema = zfd
	.formData({
		name: zfd.text(
			z
				.string({ required_error: 'Name is required.' })
				.regex(/^[a-zA-Z\s]*$/, { message: 'Name can only contain letters and spaces.' })
				.min(2, { message: 'Name must be at least 2 characters' })
				.max(64, { message: 'Name must be less than 64 characters' })
				.trim()
		),
		username: zfd.text(
			z
				.string({ required_error: 'Name is required.' })
				.regex(/^[a-zA-Z\s]*$/, { message: 'Name can only contain letters and spaces.' })
				.min(2, { message: 'Name must be at least 2 characters' })
				.max(64, { message: 'Name must be less than 64 characters' })
				.trim()
		),
		password: zfd.text(
			z
				.string({ required_error: 'Password is required' })
				.min(6, { message: 'Password must be at least 6 characters' })
				.max(64, { message: 'Password must be less than 64 characters' })
		),
		passwordConfirm: zfd.text(
			z
				.string({ required_error: 'Confirm Password is required' })
				.min(6, { message: 'Password must be at least 6 characters' })
				.max(64, { message: 'Password must be less than 64 characters' })
		),
		email: zfd.text(
			z
				.string({ required_error: 'Email is required' })
				.email({ message: 'Email must be a valid email.' })
		)
	})
	.superRefine(({ password, passwordConfirm }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must be match',
				path: ['password']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must be match',
				path: ['passwordConfirm']
			});
		}
	});

export const userLoginSchema = zfd.formData({
	email: zfd.text(
		z
			.string({ required_error: 'Email is required' })
			.email({ message: 'Email must be a valid email.' })
	),
	password: zfd.text(
		z
			.string({ required_error: 'Password is required' })
			.min(6, { message: 'Password must be at least 6 characters' })
			.max(64, { message: 'Password must be less than 64 characters' })
	)
});
