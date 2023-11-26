<script>
	export let data;
</script>

<h1 class="text-3xl p-3">
	Hello, {data.user?.username || 'Please login or register!'}!
</h1>

<h1>Welcome to MeetUp</h1>
<body>
    <a href="/calendar">Calendar check</a>
	<a href="/register"> Register</a>
</body>