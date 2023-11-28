import { fail, redirect } from '@sveltejs/kit';
import { findUserByUsername, verifyPassword } from '$lib/server/database.js';

export const actions = {
	async login({ request, cookies }) {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		// Check if the user exists
		const user = await findUserByUsername(username);

		if (!user) {
			return fail(401, {
				error: 'Invalid credentials'
			});
		}

		// Verify the password
		const passwordValid = await verifyPassword(password, user.password);

		if (!passwordValid) {
			return fail(401, {
				error: 'Invalid credentials'
			});
		}

		// If the credentials are valid, set a user identifier in the cookie
		cookies.set('userId', user.id);

		// Redirect to the home page
		throw redirect(302, '/');
	}
};
