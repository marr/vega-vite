<template>
  <header style="position: fixed; top: 50px; left: 50px; z-index: 1;">
    <nav style="display: flex; gap: 5px">
      <router-link to="/">home</router-link>
      <router-link to="/geo">geo</router-link>
      <router-link to="/dates">dates</router-link>
    </nav>
  </header>
  <router-view />
</template>