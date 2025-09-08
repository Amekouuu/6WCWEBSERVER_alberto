<script setup>
const games = [
  {
    title: "Valorant",
    genre: "Tactical Shooter",
    image: "/images/valorant.jpg",
  },
  {
    title: "CS:GO",
    genre: "Competitive FPS",
    image: "/images/csgo.jpg",
  },
  {
    title: "Overwatch",
    genre: "Hero Shooter",
    image: "/images/overwatch.jpg",
  },
];
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-white">
    <!-- Header -->
    <header class="py-8 text-center">
      <h1 class="text-4xl font-bold mb-2">FPS Games skrt skrttt</h1>
      <p class="text-slate-400">Explore some of the most iconic shooters</p>
    </header>

    <!-- Cards -->
    <main class="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
      <div
        v-for="game in games"
        :key="game.title"
        class="bg-slate-800 rounded-2xl shadow-lg hover:scale-105 transition-transform"
      >
        <img :src="game.image" :alt="game.title" class="rounded-t-2xl w-full h-48 object-cover" />
        <div class="p-6 text-center">
          <h2 class="text-xl font-semibold">{{ game.title }}</h2>
          <p class="text-slate-400">{{ game.genre }}</p>
        </div>
      </div>
    </main>
  </div>
</template>
