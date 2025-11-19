<template>
  <div id="app">
    <Navbar />

    <Hero />
    <About />
    <Services @open-modal="openModal" />
    <Portfolio @open-modal="openModal" />
    <Contact />

    <Footer />

    <Modal :show="modal.show" :title="modal.title" :content="modal.content" @close="closeModal" />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import Hero from '@/components/sections/Hero.vue'
import About from '@/components/sections/About.vue'
import Services from '@/components/sections/Services.vue'
import Portfolio from '@/components/sections/Portfolio.vue'
import Contact from '@/components/sections/Contact.vue'
import Modal from '@/components/common/Modal.vue'

const modal = reactive({
  show: false,
  title: '',
  content: '',
})

const openModal = (data) => {
  modal.title = data.title
  modal.content = data.content
  modal.show = true
}

const closeModal = () => {
  modal.show = false
  modal.title = ''
  modal.content = ''
}
</script>

<style>
@import './styles/variables.css';
@import './styles/global.css';

#app {
  min-height: 100vh;
}
</style>
