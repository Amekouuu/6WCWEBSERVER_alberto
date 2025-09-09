<script setup>
const games = [
  {
    title: "Valorant",
    genre: "Tactical Shooter",
    image: "/images/valorant.jpg",
    install: "https://playvalorant.com/", // Official Valorant download
  },
  {
    title: "CS:GO",
    genre: "Competitive FPS",
    image: "/images/csgo.jpg",
    install: "https://store.steampowered.com/app/730/CounterStrike_2/", // Steam link for CS2
  },
  {
    title: "Overwatch",
    genre: "Hero Shooter",
    image: "/images/overwatch.jpg",
    install: "https://overwatch.blizzard.com/", // Official Overwatch site
  },
];
</script>

<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Header -->
    <header class="py-8 text-center">
      <h1 class="text-4xl font-bold mb-2">First Person Skrt Skrttt</h1>
      <p class="text-slate-400">Explore some of the most iconic shooters</p>
    </header>

    <!-- Cards -->
    <main class="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
      <div v-for="game in games" :key="game.title" class="bg-slate-800 rounded-2xl shadow-lg">
        <img :src="game.image" :alt="game.title" class="rounded-t-2xl w-full h-48 object-cover" />
        <div class="p-6 text-center">
          <h2 class="text-xl font-semibold">{{ game.title }}</h2>
          <p class="text-slate-400 mb-4">{{ game.genre }}</p>
          <a
            :href="game.install"
            target="_blank"
            class="inline-block px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 transition"
          >Install Now</a>
        </div>
      </div>
    </main>
  </div>
</template>
