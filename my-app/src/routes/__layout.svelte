<!-- src/routes/__layout.svelte -->

<script>
    import { Navigation } from 'sveltekit-navigation';
  </script>
  
  <Navigation>
    <!-- Your layout content goes here -->
    <slot></slot>
  </Navigation>
  
  <style>
    /* Add any global styles for your layout */
  </style>