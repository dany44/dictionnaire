<template>
  <div>
    <!-- Barre de recherche -->
    <div>
      <input type="text" v-model="searchTerm" placeholder="Rechercher un mot" />
      <button @click="searchWord">Rechercher</button>
    </div>

    <!-- Boutons pour chaque lettre de l'alphabet -->
    <div class="alphabet-buttons">
      <button v-for="(letterObj, index) in alphabet" :key="index" @click="filterWordsByLetter(letterObj.letter)"
        :class="{ active: letterObj.active }">
        {{ letterObj.letter }}
      </button>
    </div>

    <!-- Affichage des mots par lettre -->
    <div>
      <h2>Mots dans le dictionnaire :</h2>
      <ul>
        <li v-for="(letterData, letter) in paginatedDictionary" :key="letter">
          <h3>{{ letter }}</h3>
          <ul>
            <li v-for="(word, wordIndex) in letterData.words" :key="wordIndex">
              <span class="fi fi-fr"></span>
              {{ word.word }}
              <span class="translation-arrow">➔</span>
              <span class="fi fi-tn"></span>
              {{ word.translation }}
            </li>
          </ul>
          <!-- Boutons de pagination pour passer à la page précédente et suivante -->
          <button @click="prevPage(letter)" v-if="letterData && letterData.currentPage > 1">Page précédente</button>
          <button @click="nextPage(letter)" v-if="letterData && letterData.currentPage < letterData.totalPages">Page
            suivante</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const dictionary = ref([
  { word: 'Après', translation: 'Ba3ed' },
  { word: 'Aussi', translation: 'Zeda' },
  { word: 'Avant', translation: 'Kbal' },
  { word: 'Bonjour', translation: 'Aslema' },
  // Ajoutez davantage d'entrées ici
]);

const itemsPerPage = 10; // Nombre de mots par page (changez à 10 pour la pagination)
const searchTerm = ref('');
const searchResults = ref({});

// Tableau d'objets pour représenter chaque lettre de l'alphabet
const alphabet = ref(
  Array.from({ length: 26 }, (_, i) => ({
    letter: String.fromCharCode(65 + i), // A, B, C, ...
    active: false, // Initialisé comme inactif
  }))
);

// Modifiez la structure de votre modèle de données pour organiser les mots par lettre
const dictionaryByLetter = ref({});

// Modifiez la structure de votre modèle de données pour suivre la pagination par lettre
const paginatedDictionary = ref({});

// Fonction pour mettre à jour dictionaryByLetter
const updateDictionaryByLetter = () => {
  dictionaryByLetter.value = {};

  // Remplissez dictionaryByLetter avec les mots organisés par lettre
  alphabet.value.forEach((letterObj) => {
    const letter = letterObj.letter;
    const wordsForLetter = dictionary.value.filter((entry) =>
      entry.word.charAt(0).toUpperCase() === letter
    );
    dictionaryByLetter.value[letter] = { words: wordsForLetter };
  });
};

// Fonction pour afficher les mots par lettre et gérer la pagination
const filterWordsByLetter = (letter) => {
  // Réinitialisez l'état actif de toutes les lettres
  alphabet.value.forEach((letterObj) => {
    letterObj.active = false;
  });

  // Activez la lettre sélectionnée
  const selectedLetterObj = alphabet.value.find((letterObj) => letterObj.letter === letter);
  if (selectedLetterObj) {
    selectedLetterObj.active = true;
  }

  // Récupérez les mots de la lettre sélectionnée
  const wordsForLetter = dictionaryByLetter.value[letter].words;

  // Divisez les mots en pages de 10 mots chacune (changez à 10 pour la pagination)
  const totalPages = Math.ceil(wordsForLetter.length / itemsPerPage);
  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    const startIdx = i * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    pages.push(wordsForLetter.slice(startIdx, endIdx));
  }

  // Stockez les mots paginés dans le modèle de vue
  paginatedDictionary.value[letter] = {
    words: pages,
    currentPage: 1,
    totalPages,
  };
};

// Fonction pour passer à la page précédente
const prevPage = (letter) => {
  if (paginatedDictionary.value[letter].currentPage > 1) {
    paginatedDictionary.value[letter].currentPage--;
  }
};

// Fonction pour passer à la page suivante
const nextPage = (letter) => {
  if (paginatedDictionary.value[letter].currentPage < paginatedDictionary.value[letter].totalPages) {
    paginatedDictionary.value[letter].currentPage++;
  }
};

const searchWord = () => {
  const term = searchTerm.value.toLowerCase();
  searchResults.value = dictionary.value.filter(entry =>
    entry.word.toLowerCase().includes(term) ||
    entry.translation.toLowerCase().includes(term)
  );

  if (searchResults.value.length > 0) {
    store.dispatch('setSearchResults', searchResults.value);
    router.push({ name: 'search-results' }); // Utilisez le routeur pour naviguer
  }
};

// Méthode pour charger le dictionnaire lors de la montée de la page
const loadDictionary = () => {
  // Vous pouvez initialiser la lettre active à "A" (ou une autre lettre par défaut)
  const defaultLetter = "A";

  // Appelez la fonction pour filtrer les mots par lettre
  filterWordsByLetter(defaultLetter);

  // Appelez la fonction pour organiser les mots par lettre
  updateDictionaryByLetter();
};

// Appelez la méthode loadDictionary lorsque la page est montée
import { onMounted } from 'vue';
onMounted(loadDictionary);
</script>

<style scoped>
/* Vos styles CSS ici */
</style>



<style scoped>
/* Style de la barre de recherche */
div {
  text-align: center;
  margin: 2rem auto;
  max-width: 800px;
}

input[type="text"] {
  padding: 0.5rem;
  width: 70%;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* Coins arrondis */
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: transparent;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* Coins arrondis */
  cursor: pointer;
  margin-right: 0;
}

/* Style des boutons de l'alphabet */
.alphabet-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

/* Style des boutons de l'alphabet */
.alphabet-buttons button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: transparent;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* Coins arrondis */
  cursor: pointer;
  margin: 0 0.25rem;
}

button.active {
  background-color: transparent;
  color: #333;
  border: 1px solid #333;
  border-radius: 5px;
  /* Coins arrondis */
}

/* Style de la liste de mots */
h2 {
  font-size: 1.5rem;
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
  /* Réduisez la marge inférieure */
  border: 1px solid #ccc;
  padding: 0.5rem;
  background-color: #f5f5f5;
  color: #333;
  width: 25%;
  /* Réduisez la largeur horizontale */
}

/* Style des drapeaux */
.flag-icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

/* Style de la flèche de traduction */
.translation-arrow {
  font-size: 1.5rem;
  margin: 0 0.25rem;
  /* Ajustement de l'espacement horizontal */
}
</style>
