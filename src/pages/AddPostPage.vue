<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-card style="max-width: 100vw; height: 90vh">
        <q-tabs
          v-model="tab"
          class="text-grey q-py-md"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          inline-label
          narrow-indicator
        >
          <q-tab name="file" label="Post Video or Image" />
          <q-tab name="text" label="Post Text Meme" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="file">
            <div class="text-h5 text-center q-my-md">Post Image or Video</div>
            <form @submit.prevent="handleSubmitFile">
              <div class="form">
                <div class="file-section row q-col-gutter-lg">
                  <div class="col-12 col-md file-section">
                    <img
                      v-if="!file_type"
                      src="../assets/upload.png"
                      alt=""
                      style="
                        object-fit: cover;
                        width: 100%;
                        height: 420px;
                        margin: 0 auto;
                        background-color: black;
                        border-radius: 0.5rem;
                      "
                    />
                    <img
                      v-if="file_type === 'photo'"
                      :src="memeImage"
                      alt=""
                      style="
                        object-fit: contain;
                        width: 100%;
                        height: 420px;
                        margin: 0 auto;
                        background-color: black;
                        border-radius: 0.5rem;
                      "
                    />
                    <video
                      v-if="file_type === 'video'"
                      muted
                      autoplay
                      controls
                      :src="memevideo"
                      alt=""
                      style="
                        object-fit: contain;
                        width: 100%;
                        height: 420px;
                        margin: 0 auto;
                        background-color: black;
                        border-radius: 0.5rem;
                      "
                    />
                    <input
                      class="q-mt-md"
                      type="file"
                      ref="fileType"
                      @change="handleFileChange"
                      required
                    />
                  </div>
                  <div class="col-12 col-md">
                    <q-select
                      emit-value
                      filled
                      v-model="file_category"
                      ref="fileCategory"
                      :options="categoryOptions"
                      label="Category"
                      hint="Select meme category"
                    />
                    <q-select
                      emit-value
                      class="q-mt-md"
                      filled
                      ref="fileFeatured"
                      v-model="file_featured"
                      :options="featuredOptions"
                      label="Is this meme very funny?"
                      hint="How funny is the meme?"
                    />
                    <q-input
                      class="q-mt-md"
                      filled
                      v-model="file_tags"
                      ref="fileTags"
                      label="Tags"
                      hint="Use space to separate tags"
                    />
                    <q-input
                      class="q-mt-md"
                      filled
                      v-model="file_description"
                      ref="fileDescription"
                      label="Description"
                      type="textarea"
                      hint="Add a funny comment here"
                    />
                    <q-btn
                      class="q-mt-md q-mb-xl text-center"
                      type="submit"
                      color="primary"
                      label="Submit Meme"
                    />
                  </div>
                </div>
              </div>
            </form>
          </q-tab-panel>

          <q-tab-panel name="text">
            <div class="text-h5 text-center q-my-md">Post Text</div>
            <form @submit.prevent="handleSubmitText">
              <div class="form">
                <div class="section row q-col-gutter-lg q-ma-md">
                  <div class="col-12 col-md">
                    <q-select
                      emit-value
                      filled
                      ref="textCategory"
                      v-model="category"
                      :options="categoryOptions"
                      label="Category"
                      hint="Select meme category"
                    />
                    <q-select
                      emit-value
                      class="q-mt-md"
                      filled
                      ref="textFeatured"
                      v-model="featured"
                      :options="featuredOptions"
                      label="Is this meme very funny?"
                      hint="select how funny the meme is"
                    />
                    <q-input
                      class="q-mt-md"
                      filled
                      ref="textTags"
                      v-model="tags"
                      label="Tags"
                      hint="Use space to separate tags"
                    />
                  </div>
                  <div class="col-12 col-md">
                    <q-input
                      filled
                      ref="textDescription"
                      v-model="description"
                      label="Meme content"
                      type="textarea"
                      hint="describe meme"
                    />
                    <q-btn
                      class="q-mt-md q-mb-xl"
                      type="submit"
                      color="primary"
                      label="Primary"
                    />
                  </div>
                </div>
              </div>
            </form>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";

export default {
  data() {
    return {
      categoryOptions: [
        {
          label: "education",
          value: "education",
        },
        {
          label: "Music & Dance",
          value: "music",
        },
        {
          label: "Movies & TV",
          value: "movies",
        },
        {
          label: "Love & Romance",
          value: "love",
        },
        {
          label: "sports",
          value: "sports",
        },
        {
          label: "Comedy",
          value: "comedy",
        },
        {
          label: "Science & Tech",
          value: "technology",
        },
        {
          label: "Animals & Nature",
          value: "animals",
        },
        {
          label: "Politics",
          value: "politics",
        },
        {
          label: "Celebrities",
        },
        {
          label: "Culture & Religion",
          value: "religion",
        },
        {
          label: "Fails",
          value: "fails",
        },
        {
          label: "Kids & Teens",
          value: "kids",
        },
        {
          label: "Adult",
          value: "adult",
        },
        {
          label: "Social",
          value: "social",
        },
        {
          label: "Food",
          value: "food",
        },
        {
          label: "Other",
          value: "other",
        },
      ],
      featuredOptions: [
        {
          label: "Quite Funny",
          value: "false",
        },
        {
          label: "Very Funny",
          value: "true",
        },
      ],
      memeImage: null,
      memevideo: null,
      selectedFile: null,

      textErrors: [],
      FileErrors: [],

      dollarQ: this.$q,
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      tab: ref("file"),
      category: ref(null),
      featured: ref(null),
      tags: ref(null),
      description: ref(null),
      file: ref(null),
      file_type: ref(null),
      file_category: ref(null),
      file_featured: ref(null),
      file_tags: ref(null),
      file_description: ref(null),
    };
  },
  methods: {
    showLoading() {
      this.dollarQ.loading.show({
        // delay: 400,
      });
    },
    hideLoading() {
      this.dollarQ.loading.hide();
    },
    textValidation() {
      this.textErrors = [];

      if (!this.category || this.category == "") {
        this.$refs.textCategory.focus();
        this.dollarQ.notify({
          type: "negative",
          message: "category required.",
          position: "top-right",
        });
        this.textErrors.push("category required");
        return;
      }
      if (!this.featured || this.featured == "") {
        this.$refs.textFeatured.focus();
        this.dollarQ.notify({
          type: "negative",
          message: "featured required.",
          position: "top-right",
        });
        this.textErrors.push("featured required");
        return;
      }
      if (!this.tags || this.tags == "") {
        this.$refs.textTags.focus();
        this.dollarQ.notify({
          type: "negative",
          message: "tags required.",
          position: "top-right",
        });
        this.textErrors.push("tags required");
        return;
      }
      if (!this.description || this.description == "") {
        this.$refs.textDescription.focus();
        this.dollarQ.notify({
          type: "negative",
          message: "Description required.",
          position: "top-right",
        });
        this.textErrors.push("description required");
        return;
      }
    },
    handleSubmitText() {
      const data = {
        type: "text",
        category: this.category,
        featured: this.featured,
        tags: this.tags,
        description: this.description,
      };
      console.log(data);
      this.textValidation();
      this.showLoading();

      if (this.textErrors.length > 0) {
        this.hideLoading();
        return;
      } else {
        // everything looks good for posting
        axios
          .post("https://meme-api-v1.herokuapp.com", data, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.hideLoading();
            this.dollarQ.dialog({
              title: "Success",
              message: "Meme has been posted successfully",
            });
            // Reset meme details
            this.category = null;
            this.featured = null;
            this.tags = null;
            this.description = null;
            this.tab = "text";

            console.log(res);
            // this.$router.push({ name: "Home" });
          })
          .catch((err) => {
            console.log(err);
            this.hideLoading();
            this.dollarQ.dialog({
              title: "Failed to post meme",
              message:
                "Ooops! Something went wrong. Check your internet and try again",
            });
          });
      }
    },
    handleFileChange(e) {
      console.log(e.target.files[0]);
      let file = e.target.files[0];
      if (
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg"
      ) {
        this.file_type = "photo";
      } else if (file.type === "image/gif") {
        this.file_type = "gif";
      } else if (file.type === "video/mp4") {
        this.file_type = "video";
      } else {
        // this.file = null;
        this.dollarQ.dialog({
          title: "File not supported",
          message: "Upload a video or photo",
        });
        this.file = null;
        return;
      }
      // console.log(file.type.startsWith("image"));
      this.selectedFile = file;
      this.memeImage = URL.createObjectURL(file);
      this.memevideo = URL.createObjectURL(file);
    },
    handleSubmitFile() {
      this.showLoading();
      this.validateFileMeme();
      // console.log(this.selectedFile.size);
      if (!this.selectedFile || this.selectedFile == null) {
        this.hideLoading();
        this.dollarQ.dialog({
          title: "No file selected",
          message: "Select a video or photo",
        });
        console.log("made it here");
        this.file_type = null;
        return;
      } else {
        // everything is set here
        if (this.fileErrors.length > 0) {
          console.log("errors dey");
          this.hideLoading();
        } else {
          const data = {
            type: this.file_type,
            category: this.file_category,
            featured: this.file_featured,
            tags: this.file_tags,
            description: this.file_description,
          };

          let formData = new FormData();
          formData.append("type", this.file_type);
          formData.append("category", this.file_category);
          formData.append("featured", this.file_featured);
          formData.append("tags", this.file_tags);
          formData.append("description", this.file_description);
          formData.append("imageURL", this.selectedFile);

          axios
            .post("https://meme-api-v1.herokuapp.com", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              console.log("success");
              console.log(res.data);
              this.hideLoading();

              this.dollarQ.dialog({
                title: "Success",
                message: "Meme has been submitted",
              });
            })
            .catch((err) => {
              console.log(err);
              this.hideLoading();

              this.dollarQ.dialog({
                title: "Error uploading meme",
                message: "Meme was not submitted",
              });
            });
        }
      }
    },

    validateFileMeme() {
      // model validation
      this.fileErrors = [];
      if (!this.file_type || this.file_type == "") {
        this.$refs.fileType.focus();
        this.dollarQ.notify({
          type: "negative",
          message: "Select a file.",
          position: "top-right",
        });
        this.file_type = null;
        this.fileErrors.push("File required");
        return;
      }
      if (this.selectedFile.size > 5000000) {
        console.log("file too large");
        this.dollarQ.dialog({
          title: "File too large",
          message: "file must be less than 5MB",
        });
        this.file_type = null;
        return;
      }

      if (!this.file_category || this.file_category == "") {
        this.$refs.fileCategory.focus();
        this.dollarQ.notify({
          type: "negative",
          message: "category required.",
          position: "top-right",
        });
        this.fileErrors.push("category required");
        return;
      }
      if (!this.file_featured || this.file_featured == "") {
        this.$refs.fileFeatured.focus();
        this.dollarQ.notify({
          type: "negative",
          message: "featured required.",
          position: "top-right",
        });
        this.fileErrors.push("featured required");
        return;
      }
      if (!this.file_tags || this.file_tags == "") {
        this.$refs.fileTags.focus();
        this.dollarQ.notify({
          type: "negative",
          message: "tags required.",
          position: "top-right",
        });
        this.fileErrors.push("tags required");
        return;
      }
      if (!this.file_description || this.file_description == "") {
        this.$refs.fileDescription.focus();
        this.dollarQ.notify({
          type: "negative",
          message: "Description required.",
          position: "top-right",
        });
        this.fileErrors.push("description required");
        return;
      }
      if (this.fileErrors.length > 0) {
        console.log(this.fileErrors);
        return;
      }
    },
  },
};
</script>

<style scoped>
.file-section {
  max-height: 100%;
}

.file-section img,
.file-section video {
  width: 100%;
}
</style>
