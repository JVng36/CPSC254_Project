<script>
  import { onMount } from 'svelte';
  import { format, addDays, startOfDay, endOfDay } from 'date-fns';

  const port = import.meta.env.port;

  let selectedTimeBlocks = [];
  let displayedDays = [];

  async function fetchData() {
    try {
      const userId = 1;

      const response = await fetch(`http://localhost:${$port}/api/getAvailability/${userId}`);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('error fetching data:', error);
      return null;
    }
  }

  function generateDaysArray() {
    const start = new Date();
    const end = addDays(start, 13); // Two weeks
    displayedDays = Array.from({ length: 14 }, (_, i) => addDays(start, i));
  }

  function handleTimeBlockClick(day, hour) {
    const timeBlock = { start: startOfDay(day), end: endOfDay(day), hour };

    const index = selectedTimeBlocks.findIndex(
      block => block.start.getTime() === timeBlock.start.getTime() &&
        block.end.getTime() === timeBlock.end.getTime() &&
        block.hour === timeBlock.hour
    );

    if (index !== -1) {
      selectedTimeBlocks = selectedTimeBlocks.filter(
        block => block.start.getTime() !== timeBlock.start.getTime() ||
          block.end.getTime() !== timeBlock.end.getTime() ||
          block.hour !== timeBlock.hour
      );
    } else {
      selectedTimeBlocks = [...selectedTimeBlocks, timeBlock];
    }
  }

  onMount(async () => {
    const data = await fetchData();
    if (data) {
      selectedTimeBlocks = data.availability || [];
      displayedDays = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));
    } else {
      generateDaysArray();
    }
  });

  async function sendDataToBackend() {
    try {
      const userId = 1;

      const response = await fetch(`http://localhost:${$port}/api/setAvailability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, selectedTimeBlocks }),
      });

      const data = await response.json();
      console.log('Data successfully sent to backend:', data);
    } catch (error) {
      console.error('Oops. Error sending data to backend:', error);
    }
  }
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
    margin-top: 20px;
  }

  .day {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center; /* Center the content horizontally */
  }

  .timeslot {
    width: 80px;
    height: 20px;
    border: 1px solid #ddd;
    cursor: pointer;
    margin-top: 5px;
    background-color: white; /* Added background color */
  }

  .timeslot.selected {
    background-color: #adf;
  }

  button {
    margin-top: 20px;
    padding: 10px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1em;
  }
</style>


<div class="container">
{#each displayedDays as day (day)}
  <div class="day">
    {format(day, 'MMMM d')}
    {#each [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23] as hour (hour)}
      {#if selectedTimeBlocks.some(block =>
        block.start.getTime() === startOfDay(day).getTime() &&
        block.end.getTime() === endOfDay(day).getTime() &&
        block.hour === hour
      )}
        <div
          on:click={() => handleTimeBlockClick(day, hour)}
          tabindex="0"
          role="button"
          class="timeslot selected"
        >
          {hour}:00
        </div>
      {:else}
        <div
          on:click={() => handleTimeBlockClick(day, hour)}
          tabindex="0"
          role="button"
          class="timeslot"
        >
          {hour}:00
        </div>
      {/if}
    {/each}
  </div>
{/each}
</div>

<button on:click={sendDataToBackend}>Save Availability</button>
