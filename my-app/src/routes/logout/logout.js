// Example: logout.js
import { logout } from '$lib/server/database.js';
export { logout };

export const actions = {
  async post() {
    // Assuming you have the user ID available from the authentication state
    const userId = getUserIdFromAuthentication(); // Implement this based on your authentication mechanism

    // Clear user session
    await logout(userId);

    return {
      status: 302,
      headers: {
        location: '/',
      },
    };
  },
};
