<!-- pages/index.svelte -->

<script>
	export let data;
	import LogoutButton from '../components/logoutbutton.svelte';
  </script>
  
  <style>
	/* Common styles for headings */
	h1 {
	  font-size: 3rem;
	  padding: 1rem;
	}
  
	/* Styles for the main content container */
	.main-content {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  min-height: 100vh;
	  background-color: #c7d6e8; /* Light blue background color */
	}
  
	/* Styles for the links */
	a {
	  margin-right: 10px;
	  text-decoration: none;
	  color: #007bff;
	  font-weight: bold;
	}
  
	/* Button styles */
	.button {
	  background-color: #007bff;
	  color: white;
	  font-weight: bold;
	  padding: 10px;
	  border: none;
	  border-radius: 5px;
	  cursor: pointer;
	  margin-top: 10px;
	}
  
	.button:hover {
	  background-color: #0056b3;
	}
  </style>
  
  
  <div class="main-content">
	<h1>Hello, {data.user?.username || 'Please login or register!'}</h1>
	<h1>Welcome to MeetUp</h1>
	<div>
	  <a href="/calendar" class="button">Select Availability on Calendar</a>
	  <a href="/register" class="button">Register</a>
	  <LogoutButton />
	</div>
	<!-- Additional content goes here -->
  </div>
  