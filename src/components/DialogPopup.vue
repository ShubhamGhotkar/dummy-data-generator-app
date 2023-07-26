<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog
        transition="dialog-top-transition"
        max-width="850"
        max-height="1000"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            style=""
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
              style="padding: 2rem"
              @click="dialog.value = false"
            >
              <v-col v-for="num in 15" :key="num" style="cursor: pointer">
                <v-card class="mx-auto" width="180" outlined :elevation="4">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <!-- <div class="text-overline mb-4">Tittle</div> -->
                      <v-list-item-title class="text-h2 mb-1">
                        Tittle
                      </v-list-item-title>
                      <v-list-item-subtitle v-for="num in 3" :key="num"
                        >Example {{ num }}</v-list-item-subtitle
                      >
                    </v-list-item-content>

                    <v-list-item-avatar
                      tile
                      size="40"
                      color="grey"
                    ></v-list-item-avatar>
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
</template>

<script>
export default {
  props: {
    field_type: {
      type: String,
      require: true,
      default: "",
    },
  },
  data: () => ({
    dialog: false,
  }),
};
</script>

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
</style>
