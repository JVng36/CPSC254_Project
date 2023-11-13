<!-- calendar.svelte -->

<script>
    import { onMount } from 'svelte';
    import { format, addDays} from 'date-fns';

    let selectedDates = [];


    function handleDateClick(date) {
    // Toggle date selection
        if (selectedDates.includes(date)) {
            selectedDates = selectedDates.filter(d => d !== date);
        } else {
            selectedDates = [...selectedDates, date];
        }
    }
    onMount(async () => {
        //fetc user data and update selectedDates
    });
</script>

<style>
    /*component sytle*/
</style>

<div>
    <h2>Calender Dates</h2>
    <div>
      {#each days as day}
        <div on:click={() => handleDateClick(day)} class:selected={selectedDates.includes(day)}>
          {format(day, 'MMMM d')}
        </div>
      {/each}
    </div>
  </div>