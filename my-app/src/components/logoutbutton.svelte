<!-- components/LogoutButton.svelte -->

<script>
  async function handleLogout() {
    try {
      const response = await fetch('/logout', {
        method: 'POST',
      });

      if (response.ok) {
        console.log('Logout successful');
        // Redirect or update UI as needed
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  }
</script>

<style>
  /* Use :global to apply the styles globally */
  :global(button) {
    background-color: #007bff;
    color: white;
    font-weight: bold;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  :global(button:hover) {
    background-color: #0056b3;
  }
</style>

 <!-- <button on:click={handleLogout}>Logout</button>-->
