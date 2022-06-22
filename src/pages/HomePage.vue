<script setup>

import getAssetsFile from '@/utils/Utils.js'

let customers = [
  {
    name: ' Mrs. Wu (Seattle, USA)',
    product: 'Computer Repairing (remotely)',
    rating: 5,
    comment: 'A great experience! I didn\'t expect that under the guidance of OwOBlog I could repair my computer by myself! Thank you for helping me restore the important data in the hard drive!',
  },
  {
    name: 'Student Mrs. Yu (Heilongjiang, China)',
    product: 'Computer Repairing (remotely)',
    rating: 5,
    comment: '之前电脑特别卡，很慢，后来通过HanskiJay(无名晓)的帮助让电脑焕发一新！',
  },
  {
    name: 'Student Mrs. Zhang (Sichuan, China)',
    product: 'Cloud Storage',
    rating: 5,
    comment: '蟹蟹OwO解决了我的手机空间内存不够滴问题>w<!',
  },
  {
    name: 'Student Mr. He (Shenzhen, China)',
    product: 'Website Mirrored',
    rating: 5,
    comment: 'I known OwOBlog from friends I\'m studying in Hongkong. Cause Covid-19 I have to go back to Shenzhen. During the time I used the service from OwOBlog and find very quickly!!!',
  },
  {
    name: ' Mr. Huang (Sichuan, China)',
    product: 'Cloud Storage',
    rating: 5,
    comment: '同学推荐的，还行。',
  },
  {
    name: 'Student Mr. Zeng (Shenzhen, China)',
    product: 'Website Building',
    rating: 5,
    comment: 'OwOBlog帮我完成了一项作业内容嘿嘿，老师和同学们都说好看。感谢大佬！OwOBlog helped me complete a homework content. Heyhey, the teacher and classmates said it was pretty. Thank you guys!',
  }
]

let carousels = [
  {
    isActive: true,
    title: 'Website for Student Mr. Zeng.',
    description: 'This Page is for his homework design.',
    background: getAssetsFile('zeng1.png')
  },
  {
    isActive: false,
    title: 'Website for Student Mr. Zeng.',
    description: 'This Page is for his homework design.',
    background: getAssetsFile('zeng2.png')
  },
  {
    isActive: false,
    title: 'Network Service Test from Student Mr. He.',
    description: 'The Speed test is when he visited in Chengdu, Sichuan, China and tested there.',
    background: getAssetsFile('SpeedTestHe.png')
  },
  {
    isActive: false,
    title: 'Rating from Student Mrs. Yu.',
    description: 'She rated the service in other platform.',
    background: getAssetsFile('ComputerRepairingYu.jpg')
  }
]
function setActive(status) {
  return status ? 'active' : ''
}

</script>


<template>
  <div class="owo-clear-area m-5"></div>
  <div class="container-fluid">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div :style="{
            backgroundImage: 'url(' + getAssetsFile('background1.jpg') + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%'
            }">
            <div class="owo-giant-screen height-50">
              <div class="jumbotron">
                <div id="list">
                  <h1 class="hugeTitle display-4">Welcome!</h1>
                  <p class="description lead">Here is OwOBlog Service Page. Here you can find what I can do for you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div :style="{
            backgroundImage: 'url(' + getAssetsFile('background2.png') + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%'
            }">
            <div class="owo-giant-screen height-50">
              <div class="jumbotron">
                <div id="list">
                  <h1 class="hugeTitle display-4">Quick Reaction.</h1>
                  <p class="description lead">When we see your request at the first time, we will respond to you as quickly as possible.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h2 class="owo-area-title">Services</h2>
    <h5 class="owo-area-subtitle">The most things we do for our customers.</h5>
    <div class="middle">
      <div class="owo-container">
        <div class="owo-item">
          <p class="title"><ion-icon name="globe-outline"></ion-icon>Website Building</p>
          <p class="text">We have professional technicians who can meet your customized needs to build your own personal website.</p>
        </div>
        <div class="owo-item">
          <p class="title"><ion-icon name="earth-outline"></ion-icon>Website Hosting</p>
          <p class="text">We can provide you with a non-programmatic website hosting service (you only need to provide your website description content) and deploy it to our server in one step. This one can save you a lot of time.</p>
        </div>
        <div class="owo-item">
          <p class="title"><ion-icon name="hardware-chip-outline"></ion-icon>Server Management</p>
          <p class="text">When you encounter problems with the server you purchased elsewhere, we will provide you with reliable help.</p>
        </div>
        <div class="owo-item">
          <p class="title"><ion-icon name="build-outline"></ion-icon>Computer Repairing</p>
          <p class="text">We will check your computer problems (software level) through remote management software, or remotely assist you to repair your computer through video conferencing software. If you are locally, we will provide door-to-door service. </p>
        </div>
        <div class="owo-item">
          <p class="title"><ion-icon name="hammer-outline"></ion-icon>Custom/DIY PC</p>
          <p class="text">If you urgently need to buy a personal desktop computer and have no experience, we can provide you with the most favorable assembly plan, which is a good choice.</p>
        </div>
        <div class="owo-item">
          <p class="title"><ion-icon name="cloud-outline"></ion-icon>Cloud Storage</p>
          <p class="text">Not enough local disk? We provide online storage and sharing services. Stable server operation can provide security for your files.</p>
        </div>
      </div>
    </div>

    <div class="owo-clear-area"></div>

    <h2 class="owo-area-title">FAQ</h2>
    <h5 class="owo-area-subtitle">Customers have several common questions about us.</h5>
    <div class="middle">
      <div class="owo-container">
        <div class="owo-item">
          <p class="title">1. How are you profitable?</p>
          <p class="text">We don't charge any fees for some consultation questions, such as providing the best solution for customers to assemble computers. We can earn by e.g. customizing and developing a website for customers.</p>
        </div>
        <div class="owo-item">
          <p class="title">2. How many Employee do you have? How long have you been doing with this work?</p>
          <p class="text">We are a group of students as well as a group of independent developers. Currently, we are 3 core members of the main team. Our team was established in 2015 and is led by HanskiJay.</p>
        </div>
        <div class="owo-item">
          <p class="title">3. Can we as customers trusts your service?</p>
          <p class="text">Regarding this aspect, you don't need to worry at all. We have had many rich remote assistances experience.</p>
        </div>
      </div>
    </div>

    <div class="owo-clear-area"></div>

    <h2 class="owo-area-title lang">Customers Rating</h2>
    <h5 class="owo-area-subtitle">The evaluation of our users.</h5>
    <div class="middle">
      <div class="owo-container">
        <div class="owo-item" v-for="customer in customers">
          <p class="title cl-green"><ion-icon name="person-circle-outline"></ion-icon> {{ customer.name }}</p>
          <p class="title product"><ion-icon name="headset-outline"></ion-icon>{{ customer.product }}</p>
          <p class="rating">
            <ion-icon class="up" name="thumbs-up-outline"></ion-icon>
            <ion-icon class="full-star" name="star"></ion-icon>
            <ion-icon class="full-star" name="star"></ion-icon>
            <ion-icon class="full-star" name="star"></ion-icon>
            <ion-icon class="full-star" name="star"></ion-icon>
            <ion-icon class="full-star" name="star"></ion-icon>
          </p>
          <p class="text">{{ customer.comment }}</p>
        </div>
      </div>
    </div>

    <div class="owo-clear-area"></div>

    <h2 class="owo-area-title">Gallery</h2>
    <h5 class="owo-area-subtitle">Here will show you what we done for our customers.</h5>
    <div class="middle">
      <div class="owo-container">
        <div id="carouselExampleIndicators2" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators2" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators2" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators2" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators2" data-slide-to="3"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item" :class="setActive(carousel.isActive)" v-for="carousel in carousels">
              <img :src="carousel.background" class="d-block w-100" width="50%">
                <div class="owo-giant-screen">
                  <div class="jumbotron">
                    <div id="list">
                      <h5 class="hugeTitle">{{ carousel.title }}</h5>
                      <p class="description lead">{{ carousel.description }}</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="owo-clear-area"></div>
  </div>
</template>