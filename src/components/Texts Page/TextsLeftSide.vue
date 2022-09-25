<template>
  <div class="left-side__container">
    <div class="page-title">
      <p class="text-weight-bold">Texts</p>
    </div>
    <div class="left-side__category">
      <router-link :to="{ name: 'Home' }">
        <div class="left-side__category-item first-item">
          <i class="uil uil-apps"></i>
          <p>All</p>
        </div>
      </router-link>
      <router-link :to="{ name: 'Photos' }">
        <div class="left-side__category-item">
          <i class="uil uil-image"></i>
          <p>Photos</p>
        </div>
      </router-link>
      <router-link :to="{ name: 'Videos' }">
        <div class="left-side__category-item">
          <i class="uil uil-film"></i>
          <p>Videos</p>
        </div>
      </router-link>
      <router-link :to="{ name: 'Gifs' }">
        <div class="left-side__category-item">
          <i class="uil uil-image"></i>
          <p>Gif</p>
        </div>
      </router-link>
      <router-link :to="{ name: 'Texts' }">
        <div class="left-side__category-item last-item active">
          <i class="uil uil-file-alt"></i>
          <p>Text</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.left-side__container {
  position: sticky;
  top: 4rem;
}

.left-side__container .page-title {
  text-align: center;
  /* width: 70%; */
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  border-radius: 1.5rem;
  background-color: var(--color-white);
  border: 2px solid rgba(128, 128, 128, 0.164);
}

.left-side__category {
  /* margin: 1rem 0; */

  border-radius: 1.5rem;
  margin-top: 1rem;
  background-color: var(--color-white);
  border: 2px solid rgba(128, 128, 128, 0.164);
}

.left-side__category-item {
  display: flex;
  gap: 1.5rem;
  padding: 0.5rem 1.5rem;
  color: var(--color-dark);
}

.left-side__category-item.active {
  background-color: var(--color-light);
  color: var(--color-primary);
  position: relative;
}

.left-side__category-item.active::before {
  content: "";
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background-color: var(--color-primary);
}

.left-side__category-item:hover {
  background-color: var(--color-light);
  color: var(--color-black);
  cursor: pointer;
  border-radius: 0;
}
.left-side__category-item.first-item {
  border-radius: 1.5rem 1.5rem 0 0;
}
.left-side__category-item.last-item {
  border-radius: 0 0 1.5rem 1.5rem;
}

@media screen and (max-width: 850px) {
  .left-side__category-item {
    gap: 1rem;
  }
}

@media screen and (max-width: 769px) {
  .left-side__container .page-title {
    border-radius: 1rem;
    padding: 0.5rem 0;
  }
}

@media screen and (max-width: 650px) {
  .left-side__category-item p {
    display: none;
  }

  .left-side__category-item {
    justify-content: center;
    padding: 0.5rem 0;
  }

  .left-side__container .page-title {
    font-size: 0.8rem;
  }
}

@media screen and (max-width: 480px) {
  /* .left-side__container .page-title {
    font-size: 0.8rem;
    border-radius: 0.8rem;
  } */

  .left-side__container .page-title {
    display: none;
  }

  .left-side__container {
    top: 2.4rem;
    margin-bottom: 0.5rem;
  }

  .left-side__category {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0;
    /* padding: 0 0.3rem; */
    /* box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.2); */
    border-radius: 0 0 1.5rem 1.5rem;
    width: 100%;
  }

  .left-side__category-item:nth-child(1) {
    padding: 0.3rem;
    /* padding-right: 0.5rem; */
  }

  .left-side__category-item:nth-child(5) {
    padding: 0.3rem;
    /* padding-left: 0.5rem; */
  }

  .left-side__category-item {
    display: flex;
    gap: 0.3rem;
    padding: 0.5rem 0.3rem;
    /* padding: 0.7rem; */

    align-items: center;
  }

  .left-side__category-item.active {
    padding: 0.5rem 0.3rem;
  }

  .left-side__category-item.active p {
    color: var(--color-primary);
  }

  .left-side__category-item p {
    display: flex;
    font-size: 0.8rem;
    color: var(--color-dark);
  }

  .left-side__category-item.active::after {
    content: "";
    position: absolute;
    display: block;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: var(--color-primary);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .left-side__category-item.active::before {
    content: "";
    position: absolute;
    display: block;
    bottom: 0;
    left: 0;
    width: 0;
    height: 0;
  }
}

@media screen and (max-width: 330px) {
  .left-side__category-item,
  .left-side__category-item p {
    font-size: 0.7rem;
  }

  .left-side__category-item {
    gap: 0.2rem;
    padding: 0.5rem 0.3rem;
  }
}
</style>
