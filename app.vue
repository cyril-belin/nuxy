<template>
  <div class="bg-gray-950 min-h-screen font-sans text-gray-200 antialiased selection:bg-indigo-500 selection:text-white">
    <NuxtLoadingIndicator color="#6366f1" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
    <UModals />
  </div>
</template>

<style>
/* 
  Ideally we'd import a font here, e.g. Inter or Geist.
  For now, system-ui with premium tracking/leading is good.
*/
:root {
  --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

body {
  font-family: var(--font-sans);
  background-color: #030712; /* gray-950 */
}
</style>
