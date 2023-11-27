<script>
    import Table from "../../components/table.svelte";
</script>

<style>
  /* Common styles for headings */
  h1 {
    font-size: 3rem;
    padding: 1rem;
    background-color: #cfe4fc; /* Light blue background color */
  }

  /* Styles for links */
  a {
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
    margin-right: 10px;
  }

  /* Styles for buttons */
  .button {
    display: inline-block;
    padding: 10px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 5px;
  }

  .button:hover {
    background-color: #0056b3;
  }

  /* Styles for paragraphs */
  p1 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
</style>

<h1>Welcome to Student MeetUp Scheduler</h1>
<button class="button" on:click={() => window.location.href='/'}>Home</button>
<p1>Select when you are available</p1>

<!-- calendar component removed for now-->

<!-- table component -->
<Table />
