<template>
  <div>
    <header>
      <!-- Header de votre application -->
      <h1>Dictionnaire Franco-Tunisien</h1>
      <nav>
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/contribuer">Contribuer</RouterLink>
        <RouterLink to="/apropos">À propos</RouterLink>
      </nav>
    </header>

    <!-- Contenu principal de votre application -->
    <div class="content">
      <main>
        <RouterView />
      </main>
    </div>
    
    <footer>
      <!-- Footer de votre application -->
      <p>&copy; {{ new Date().getFullYear() }} Mon Dictionnaire Franco-Tunisien</p>
      <p>par Dany aka Danino aka Dandoun</p>
    </footer>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router';
// ...
</script>

<style scoped>
.content {
  flex-grow: 1;
  /* Fait en sorte que le contenu principal prenne tout l'espace vertical disponible */
  min-height: 1000px;
  /* Hauteur minimale pour le contenu principal */
  box-sizing: border-box;
  padding: 20px;
  /* Ajoutez un padding pour l'espacement intérieur du contenu */
  overflow-y: auto;
  /* Ajoute une barre de défilement si le contenu dépasse la hauteur minimale */
}

/* Vos styles CSS pour le header et le footer */
header {
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
}

header h1 {
  font-size: 2rem;
}

nav {
  margin-top: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 1rem;
}

footer {
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
}
</style>