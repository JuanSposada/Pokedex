<script setup>
    import axios from 'axios'
    import { computed, ref, onMounted } from 'vue'
    import { RouterLink } from 'vue-router'

    const pokemons = ref([])
    const currentPage = ref(1)
    const pageSize = ref(10)

    const getData = async () => {
        try{
            const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')
            const detailed = await Promise.all(
                data.results.map(async (pokemon) => {
                    const {data: pokemonData} = await axios.get(pokemon.url)
                    return {
                        name: pokemon.name,
                        image: pokemonData.sprites.front_default
                    }
                })
            )
            pokemons.value = detailed
        }catch(error){
            console.log(error)
        }
    }

onMounted(getData)

    //paginacion
    const paginatedPokemons = computed(()=> {
        const start = (currentPage.value -1 ) * pageSize.value
        const end = start + pageSize.value
        return pokemons.value.slice(start, end)
    })

    const totalPages = computed(() => Math.ceil(pokemons.value.length / pageSize.value))
    const nextPage = () => {
        if (currentPage.value < totalPages.value) currentPage.value++
    }
    const prevPage = ()=>{
        if (currentPage.value > 1) currentPage.value--
    }
</script>
<template>
  <div class="min-h-screen bg-blue-600 flex flex-col items-center p-6">
    <img src="/src/assets/Pokeball-PNG-Photo-Image.png" alt="PokemonLogo" class="w-32 h-32 mb-4">
    <h1 class="text-white text-3xl font-bold mb-6">Pokemons 2026</h1>

    <!-- Lista estilo Pokédex -->
     <div class="bg-red-500 rounded-xl shadow-2xl p-6 w-full max-w-6xl border-4 border-black">
        <ul class="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-6xl">
      <li 
        v-for="pokemon in paginatedPokemons" 
        :key="pokemon.name"
        class="bg-gray-900 border-4 border-black rounded-xl shadow-lg hover:scale-105 transition cursor-pointer flex flex-col items-center justify-center w-48 h-48 p-4 overflow-hidden"
      >
        <RouterLink 
          :to="`/pokemon/${pokemon.name}`" 
          class="flex flex-col items-center justify-center w-full text-center"
        >
        <span class="text-green-400 font-mono capitalize text-xl hover:text-green-300 truncate w-full">
          {{ pokemon.name }}
        </span>
          
          <img 
            :src="pokemon.image" 
            alt="pokemon sprite" 
            class="w-24 h-24 mt-2 drop-shadow-lg object-contain mx-auto"
          />

        </RouterLink>
      </li>
    </ul>
     </div>
    

    <!-- paginacion-->
     <div class="flex gap-4 mt-6">
        <button
            @click="prevPage" 
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-black text-white rounded disabled:opacity-50">
            Anterior
        </button>
        <span class="text-white">Página {{ currentPage }} de {{ totalPages }}</span>
        <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
      >
        Siguiente
      </button>

     </div>
  </div>
</template>
