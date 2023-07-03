<template>
  <div>
    <div class="hero__container">
      <img
        width="100"
        height="115"
        class="logo"
        src="../assets/isfanny_about_logo_2-12.png"
        alt=""
      />
      <h2>About <strong>is</strong>Fanny</h2>
      <p>Spread a smile to everyone</p>
    </div>
    <div class="about__container">
      <div class="about__container-content">
        <div>
          <h2>The World of Memes</h2>
          <p>
            isFanny is a meme hosting platform where you will find the funniest
            memes, videos, images, GIFs and Texts, served up in an endless
            fashion.
          </p>
          <p>Our mission is to spread a smile to everyone</p>
        </div>
        <!-- <img src="../assets/isFanny_devices.png" alt="" /> -->
        <img
          src="https://res.cloudinary.com/mememe/image/upload/v1661349691/isFanny_devices_xj2mad.png"
          alt=""
        />
      </div>
    </div>
    <div class="footer">
      <span
        >Developed with love
        <i style="color: red" class="uil uil-heart"></i> by<a
          target="blank"
          href="https:/twitter.com/JoeyLit9"
        >
          Gabriel Nyarkoh - +233 50 476 8978</a
        ></span
      >
      <p>All rights reserved &copy; Copyright 2023</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},

  methods: {},
  mounted() {},
};
</script>

<style scoped>
.hero__container {
  background-color: var(--color-hero-bg);

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 3.6rem;
  margin-bottom: 0.1rem;
  padding: 2.4rem 0;
  text-align: center;
  box-shadow: 0 1px 3px rgba(128, 128, 128, 0.178);
}

.hero__container .logo {
  width: 7rem;
  /* height: auto;
  max-width: 100%; */
}

/* hero title */

.hero__container h2 {
  font-weight: 400;
  font-size: 2rem;
  margin-top: 1rem;
}

/*======== about section =========*/

.about__container {
  background-color: var(--color-hero-bg);

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 0.5rem;
  margin-bottom: 0.1rem;
  padding: 2.4rem;
  text-align: center;
  /* box-shadow: 0 1px 3px rgba(2, 1, 1, 0.178); */
}

.about__container-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* gap: 1rem; */
  margin-top: 2rem;
  justify-content: center;
}

.about__container-content > div {
  padding: 2rem;
}

.about__container-content img {
  width: 20rem;
  display: block;
}

.footer {
  width: 100%;
  /* background-color: var(--color-dark);
  color: var(--color-white); */
  text-align: center;
  padding: 1rem 0.8rem;

  background-color: var(--color-hero-bg);

  margin-top: 0.5rem;
  margin-bottom: 0.1rem;
  padding: 2.4rem 1rem;
}

/* media queries */

@media screen and (max-width: 769px) {
  .hero__container {
    /* margin-top: 0.5rem; */

    margin-top: 3rem;
  }

  .memes__container {
    margin-top: 0.5rem;
  }
}

@media screen and (max-width: 769px) {
  .about__container-content {
    display: grid;
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 480px) {
  .hero__container {
    /* margin-top: 0.3rem; */

    margin-top: 2.95rem;
  }

  .hero__container h2,
  .about__container h2 {
    font-weight: 400;
    font-size: 1.2rem;
  }

  .hero__container p {
    font-size: 0.9rem;
  }
}
</style>
