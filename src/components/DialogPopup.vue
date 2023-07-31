<template>
  <section class="dialog-popup">
    <v-row justify="space-around">
      <v-col cols="auto">
        <v-dialog transition="dialog-top-transition" max-width="900">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              :elevation="0"
              class="dialogue-open-btn"
              >{{ field_type }}</v-btn
            >
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark>Opening from the top</v-toolbar>
              <!--  -->
              <v-card-actions
                class="justify-end"
                style="display: flex; justify-content: flex-end; padding: 0"
              >
                <v-btn
                  text
                  @click="dialog.value = false"
                  class="dialogue-close-btn"
                  >X</v-btn
                >
              </v-card-actions>
              <v-row
                align="start"
                align-content="start"
                style="padding: 1rem"
                @click="dialog.value = false"
              >
                <v-col
                  v-for="fakerData in fakerDataArray"
                  :key="fakerData.data_type"
                >
                  <v-card
                    class="mx-auto hover"
                    width="250"
                    outlined
                    :elevation="4"
                    @click="selectFakerDataType(fakerData.data_type)"
                    style="padding: 0; text-align: center"
                  >
                    <v-list-item three-line>
                      <v-list-item-content>
                        <!-- <div class="text-overline mb-4">Tittle</div> -->
                        <v-list-item-title class="text-h2 mb-1">
                          {{ fakerData.data_type }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ fakerData.example }}</v-list-item-subtitle
                        >
                      </v-list-item-content>

                      <!-- <v-list-item-avatar
                        tile
                        size="40"
                        color="grey"
                      ></v-list-item-avatar> -->
                    </v-list-item>
                    <v-card-actions>
                      <!-- <v-btn text> Select </v-btn> -->
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { fakerDataExamples } from "../data/data";
export default {
  props: {
    field_type: {
      type: String,
      require: true,
      default: "",
    },
    id: {
      type: String,
      require: true,
      default: "",
    },
  },
  created() {
    // let faker_data_examples = [
    //   { data_type: "Name (Full Name)", example: "John Doe" },
    //   { data_type: "Name (First Name)", example: "John" },
    //   { data_type: "Name (Last Name)", example: "Doe" },
    //   { data_type: "Address", example: "1234 Elm Street" },
    //   { data_type: "Address (City)", example: "New York" },
    //   { data_type: "Address (State)", example: "New York" },
    //   { data_type: "Address (Country)", example: "United States" },
    //   { data_type: "Address (Zip Code)", example: "10001" },
    //   { data_type: "Email", example: "john.doe@example.com" },
    //   { data_type: "Phone Number", example: "+1 (123) 456-7890" },
    //   { data_type: "Date of Birth", example: "1985-07-15" },
    //   { data_type: "Job", example: "Software Engineer" },
    //   { data_type: "Company", example: "Acme Corporation" },
    //   { data_type: "Text", example: "This is an example text." },
    //   { data_type: "Credit Card Number", example: "**** **** **** 4321" },
    //   { data_type: "Credit Card Expiration", example: "06/26" },
    //   { data_type: "Color Name", example: "Red" },
    //   { data_type: "Latitude", example: "40.7128" },
    //   { data_type: "Longitude", example: "-74.0060" },
    //   { data_type: "Random Number", example: "42" },
    //   { data_type: "Random Float Number", example: "3.14" },
    //   { data_type: "Random Array Element", example: "orange" },
    //   { data_type: "Boolean", example: "true" },
    //   { data_type: "Word", example: "example" },
    //   { data_type: "Words", example: "example lorem ipsum" },
    //   { data_type: "UUID", example: "d8e9a2a1-43aa-4c0b-846c-9c016c403b23" },
    //   { data_type: "File Path", example: "/path/to/file.txt" },
    //   { data_type: "Image URL", example: "http://example.com/image.jpg" },
    //   {
    //     data_type: "Avatar Image URL",
    //     example: "http://example.com/avatar.jpg",
    //   },
    //   { data_type: "Domain Name", example: "example.com" },
    //   { data_type: "URL", example: "http://www.example.com" },
    //   { data_type: "IPv4 Address", example: "192.168.0.1" },
    //   {
    //     data_type: "User Agent",
    //     example:
    //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    //   },
    //   { data_type: "ISBN-10", example: "1234567890" },
    //   { data_type: "ISBN-13", example: "978-1234567890" },
    //   { data_type: "Language Code", example: "en" },
    //   { data_type: "Currency Code", example: "USD" },
    //   { data_type: "File Extension", example: ".txt" },
    //   { data_type: "MIME Type", example: "application/pdf" },
    //   { data_type: "Emoji", example: "😀" },
    //   { data_type: "Password", example: "SecurePwd123!" },
    //   { data_type: "Animal", example: "cat,fish,cow!" },
    // ];
    this.fakerDataArray = fakerDataExamples;
  },
  data: () => ({
    dialog: false,
    fakerDataArray: [],
  }),

  methods: {
    selectFakerDataType(dataType) {
      this.$emit("selectDataType", dataType, this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.hover {
  &:hover {
    background: rgba(0, 0, 0, 0.099);
  }
}
</style>

<style lang="scss">
@import "../sass/style.scss";
.dialogue-open-btn {
  height: 2.2rem !important;
  width: 12rem;
  text-align: start !important;
  padding: 0 !important;
  background: white !important;
  border-radius: 0.3rem;
  border: 1px solid $primary-border !important;
  margin-top: 0.4rem;
  color: $primary-black !important;
  border-radius: 0.2rem !important;
}
.dialogue-close-btn {
  font-size: 1.2rem !important;
  height: 2rem !important;
  width: 2rem !important;
  padding: 0.5rem 0 0 0;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.v-sheet.v-card:not(.v-sheet--outlined) {
  overflow: hidden;
}
.v-dialog:not(.v-dialog--fullscreen) {
  max-height: 90%;

  scroll-behavior: smooth;
}
// .v-btn__content {
//   background: purple;
// }
</style>
