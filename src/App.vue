<script setup>
import { RouterLink, RouterView } from 'vue-router'
import getAssetsFile from '@/utils/Utils.js'

</script>

<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark owo-navbar">
		<RouterLink class="navbar-brand" to="/">
			<img :src="getAssetsFile('favicon.ico')" width="50" height="50" alt="OwOBlog Logo">
		</RouterLink>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item active">
					<RouterLink class="nav-link" to="/">OwOBlog</RouterLink>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="mailto:support@owoblog.com">Contact</a>
				</li>
				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
						Learn More
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
						<div class="dropdown-divider"></div>
            <RouterLink class="dropdown-item" to="/about">About Us</RouterLink>
            <RouterLink class="dropdown-item" to="/support">Get Support</RouterLink>
						<div class="dropdown-divider"></div>
					</div>
				</li>
			</ul>
		</div>
		<a class="navbar-text disabled">Preview Version [Beta v1.0.0]</a>
	</nav>

  <RouterView />

  <div class="footer-navbar">
    <div class="upper">
      <div class="area">
        <p class="title">ABOUT US</p>
        <a class="item" href="https://owoblog.com/blog">Visit Blog (HanskiJay / Wuming Xiao)</a>
        <a class="item" href="https://github.com/Tommy131">Visit GitHub Page (HanskiJay / Wuming Xiao)</a>
      </div>
      <div class="area">
        <p class="title">SUPPORT</p>
        <RouterLink class="item" to="/support">Get Support</RouterLink>
        <RouterLink class="item" to="/privacy">Privacy Policies</RouterLink>
        <RouterLink class="item" to="/termsofservice">Terms of Service</RouterLink>
        <a class="item" href="mailto:support@owoblog.com">Contact Us</a>
        <a class="item" href="mailto:support@owoblog.com">Feedback</a>
      </div>
      <div class="area">
        <p class="title">FRIEND LINKS</p>
        <a class="item" href="https://v4.bootcss.com/">BootStrap</a>
        <a class="item" href="https://ionic.io/ionicons">Ionicons</a>
        <a class="item" href="https://suz.wiki">suz.wiki</a>
        <a class="item" href="https://owoblog.com/blog">OwOBlog</a>
        <a class="item" href="https://github.com/Tommy131/OwOFrame">OwOBlog Powered from &COPY;OwOFrame.</a>
      </div>
      <div class="area">
        <p class="title"></p>
      </div>
    </div>
    <div class="bottom">
      <div class="footer">Copyright &copy; 2015-2021 <RouterLink to="/">OwOBlogTeam.</RouterLink></div>
    </div>
  </div>
</template>
