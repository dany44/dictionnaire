<template>
    <div>
        <h2>Résultats de la recherche :</h2>
        <ul>
            <li v-for="(entry, index) in searchResults" :key="index">
                <span class="fi fi-fr"></span>
                {{ entry.word }}
                <span class="translation-arrow">➔</span>
                <span class="fi fi-tn"></span>
                {{ entry.translation }}
            </li>
        </ul>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const searchResults = ref([]);

// Utilisez onMounted pour charger les résultats de recherche depuis le store lorsque le composant est monté
onMounted(() => {
    searchResults.value = store.getters.getSearchResults;
});
</script>
  
<style scoped>
/* Styles CSS pour la vue des résultats de recherche */

div {
  text-align: center;
  margin: 2rem auto;
  max-width: 600px;
}

h2 {
  font-size: 1.5rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center; /* Ajoutez cette ligne pour centrer horizontalement */
}

.flag-icon {
  font-size: 24px;
  margin: 0 10px; /* Ajoutez cette ligne pour espacer les drapeaux des mots */
}

.translation-arrow {
  font-size: 24px;
  margin: 0 10px; /* Ajoutez cette ligne pour espacer la flèche de la traduction */
}
</style>
