export async function logout(req, res) {
    try {
      
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  