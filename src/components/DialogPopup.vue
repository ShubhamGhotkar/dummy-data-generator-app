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
              :ripple="false"
              style="overflow: hidden"
              >{{ formatText(field_type) }}</v-btn
            >
          </template>
          <template v-slot:default="dialog">
            <v-card>
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
                <v-col v-for="fakerData in fakerDataArray" :key="fakerData.id">
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
                        <v-list-item-title class="text-h2 mb-1">
                          {{ fakerData.data_type }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ fakerData.example }}</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>
                    <v-card-actions> </v-card-actions>
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
import { fakerGenerateEntry } from "../data/fakerData";

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

  mounted() {
    this.fakerDataArray = fakerGenerateEntry;
  },
  data: () => ({
    dialog: false,
    fakerDataArray: [],
  }),

  methods: {
    selectFakerDataType(dataType) {
      this.$emit("selectDataType", dataType, this.id);
    },
    formatText(text) {
      return text.replaceAll("_", " ");
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
  background: $primary-white !important;
  border-radius: 0.3rem;
  border: 1px solid $primary-border !important;
  margin-top: 0.4rem;
  color: $primary-black !important;
  border-radius: 0.2rem !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
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
// .dialog-popup .v-btn__content {
//   // text-transform: none;
//   // font-weight: inherit;
// }
</style>
