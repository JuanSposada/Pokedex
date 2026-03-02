<script setup>
import axios from 'axios'
import {  useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()

const pokemon = ref(null)
const hoverShiny = ref(false)


const back = () =>{
    router.push('/pokemon')
}

const getData = async() =>{
    try {
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`)
        pokemon.value = data
            console.log(data)
    } catch (error) {
        console.log(error)
    }
    
}
getData()
</script>
<template >
    <div class="flex items-center justify-center min-h-screen bg-blue-600">
        <div class="bg-red-500 rounded-xl shadow-2xl p-6 w-96 border-4 border-black">
            <div>
                <!--Header -->
                <div class="flex justify-between items-center mb-4">
                    <h1 class="text-white text-2xl font-bold">Pokedex</h1>
                    <button  @click="back" 
                    class="bg-yellow-400 text-black px-3 py-1 rounded-lg shadow hover:bg-yellow-500 transition">
                    Back
                    </button>
                </div>
                <!--Screen-->
                <div class="bg-gray-900 rounded-lg p-4 border-4 border-black">
                    <p class="text-green-400 font-mono">Nombre: {{ $route.params.name }}</p>
                    <div v-if="pokemon" class="flex flex-col items-center mt-2">
                        <img :src="hoverShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default" 
                            alt="pokemon sprite" 
                            class="w-64 h-64 drop-shadow-lg transition duration-300"
                            @mouseenter="hoverShiny = true"
                            @mouseleave="hoverShiny = false"
                        />
                        <div class="mt-0.5 bg-gray-800 rounded-lg p-4 w-full border-2 border-green-400">
                            <p class="text-green-400 font-mono mt-1">ID: {{ pokemon.id }}</p>
                            <p class="text-green-400 font-mono">Tipo: 
                                <span v-for="t in pokemon.types" :key="t.type.name" class="capitalize">
                                {{ t.type.name }}
                                </span>
                            </p>
                            <p class="text-green-400 font-mono">Estadisticas:</p>
                            <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="text-green-400 font-mono capitalize">
                                {{ stat.stat.name }}: {{ stat.base_stat }}
                            </div>
                            <p class="text-green-400 font-mono">Habilidades:</p>
                            <div v-for="ability in pokemon.abilities" :key="ability.ability.name" class="text-green-400 font-mono capitalize">
                                {{ ability.ability.name }}
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="flex justify-around mt-6">
                    <div class="w-6 h-6 bg-green-400 rounded-full border-2 border-black"></div>
                    <div class="w-6 h-6 bg-yellow-400 rounded-full border-2 border-black"></div>
                    <div class="w-6 h-6 bg-blue-400 rounded-full border-2 border-black"></div>
                </div>

            </div>
        </div>
    </div>

</template>