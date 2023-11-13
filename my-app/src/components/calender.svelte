<!-- calendar.svelte -->

<script>
    import { onMount } from 'svelte';
    import { format, addDays} from 'date-fns';

    let selectedDates = [];
    let days = []; // Added this line


    function handleDateClick(date) {
    // Toggle date selection
        if (selectedDates.includes(date)) {
            selectedDates = selectedDates.filter(d => d !== date);
        } else {
            selectedDates = [...selectedDates, date];
        }
    }
    //issue with defining handleKeyDown, addressing here
    function handleKeyDown(event, date){
        if (event.key == 'Enter'){
            handleDateClick(date);
        }
    }

    onMount(async () => {
        //get user data and update selectedDates
        //replace the following line with your actual data-fetching logic
        const userData = await fetchData();
        //assuming userData contains an array of available dates
        days = userData.availableDates || [];
    });
    async function fetchData() {
        //simulate fetching user data
        return new Promise(resolve => {
            setTimeout(() => {
                const userData = { availableDates: [new Date(), addDays(new Date(), 2)] };
                resolve(userData);
            }, 1000); //delay
        });
    }




</script>

<style>
    /*component sytle here*/
</style>

<div>
    <h2>Calender Dates</h2>
    <div>
        {#each days as day}
            <div on:click={() => handleDateClick(day)} on:keydown={(e) => handleKeyDown(e, day)} tabindex="0" role="button" class:selected={selectedDates.includes(day)}>
                {format(day, 'MMMM d')}
            </div>
        {/each}
    </div>

</div>