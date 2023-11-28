<script>
  import { onMount } from 'svelte';
  import { format, addDays } from 'date-fns';
  const port = import.meta.env.port;

  let selectedDates = [];
  let displayedDays = [];
  let days = [];

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
    days = Array.from({ length: 31 }, (_, i) => addDays(start, i + 1));
    displayedDays = days.map(day => format(day, 'MMMM d'));
  }

  function handleDateClick(date) {
    const index = days.findIndex(day => format(day, 'MMMM d') === date);

    if (selectedDates.includes(days[index])) {
      selectedDates = selectedDates.filter(d => d !== days[index]);
    } else {
      selectedDates = [...selectedDates, days[index]];
    }
  }

  onMount(async () => {
    const data = await fetchData();
    if (data) {
      days = data.availability || [];
      displayedDays = days.map(day => format(day, 'MMMM d'));
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
        body: JSON.stringify({ userId, selectedDates }),
      });

      const data = await response.json();
      console.log('Data successfully sent to backend!:', data);
    } catch (error) {
      console.error('Oops. Error sending data to backend ):', error);
    }
  }
</script>

<style>
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  div > div {
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ddd;
    cursor: pointer;
    user-select: none;
  }

  div > div.selected {
    background-color: #adf;
  }

  button {
    margin-top: 10px;
    padding: 10px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    display: block;
  }
</style>

<div style="display: flex; flex-wrap: wrap; gap: 5px;">
  {#each displayedDays as day, index (day)}
    <div
      on:click={() => handleDateClick(displayedDays[index])}
      tabindex="0"
      role="button"
      class:selected={selectedDates.includes(days[index])}
      style="width: 70px; height: 70px; display: flex; justify-content: center; align-items: center; border: 1px solid #ddd; cursor: pointer; user-select: none;"
    >
      {day}
    </div>
  {/each}
</div>
<button on:click={sendDataToBackend}>Save Availability</button>
