<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { Calendar, CalendarDays, CalendarRange, Plus } from 'lucide-vue-next'
import EventModal from '@/components/EventModal.vue'
import SampleDataButton from '@/components/SampleDataButton.vue'

const showEventModal = ref(false)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
    <!-- Header -->
    <header class="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white shadow-lg">
      <div class="px-4 py-6">
        <h1 class="text-2xl font-bold text-center animate-pulse">💕 TimeLove</h1>
        <p class="text-center text-pink-100 text-sm mt-1">Gestiona tu tiempo con amor</p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="pb-24 min-h-[calc(100vh-88px-80px)]">
      <RouterView v-slot="{ Component }">
        <Transition
          enter-active-class="transition-opacity duration-200 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-150 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          mode="out-in"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-pink-200 shadow-lg h-20">
      <div class="flex justify-around items-center h-full py-2">
        <RouterLink 
          to="/day" 
          class="flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-150 transform hover:scale-110 min-h-[64px] w-20"
          :class="$route.path === '/day' ? 'text-pink-600 bg-pink-50 shadow-md' : 'text-gray-500 hover:text-pink-500 hover:bg-pink-50'"
        >
          <Calendar class="w-6 h-6 mb-1" />
          <span class="text-xs font-medium opacity-100">Día</span>
        </RouterLink>
        
        <RouterLink 
          to="/week" 
          class="flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-150 transform hover:scale-110 min-h-[64px] w-20"
          :class="$route.path === '/week' ? 'text-pink-600 bg-pink-50 shadow-md' : 'text-gray-500 hover:text-pink-500 hover:bg-pink-50'"
        >
          <CalendarDays class="w-6 h-6 mb-1" />
          <span class="text-xs font-medium opacity-100">Semana</span>
        </RouterLink>
        
        <RouterLink 
          to="/month" 
          class="flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-150 transform hover:scale-110 min-h-[64px] w-20"
          :class="$route.path === '/month' ? 'text-pink-600 bg-pink-50 shadow-md' : 'text-gray-500 hover:text-pink-500 hover:bg-pink-50'"
        >
          <CalendarRange class="w-6 h-6 mb-1" />
          <span class="text-xs font-medium opacity-100">Mes</span>
        </RouterLink>
      </div>
    </nav>

    <!-- Floating Action Button -->
    <Transition
      enter-active-class="transition-all duration-400 ease-out"
      enter-from-class="opacity-0 scale-0 rotate-180 translate-y-8"
      enter-to-class="opacity-100 scale-100 rotate-0 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100 rotate-0 translate-y-0"
      leave-to-class="opacity-0 scale-0 rotate-180 translate-y-8"
    >
      <button
        @click="showEventModal = true"
        class="fixed bottom-28 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 hover:rotate-12 animate-bounce"
      >
        <Plus class="w-6 h-6" />
      </button>
    </Transition>

    <!-- Sample Data Button -->
    <SampleDataButton />

    <!-- Event Modal -->
    <EventModal 
      v-if="showEventModal" 
      @close="showEventModal = false"
    />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

* {
  box-sizing: border-box;
}

/* Animación personalizada para el botón flotante */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: translate3d(0, -8px, 0);
  }
  70% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0,-1px,0);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
</style>
