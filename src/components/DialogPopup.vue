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
            <v-row align="center" align-content="center" justify-lg>
              <v-col v-for="num in 6" :key="num">
                <v-card class="mx-auto" width="190" outlined :elevation="4">
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
                    <v-btn outlined rounded text> Select </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <!-- <v-card-text>
              <div class="text-h2 pa-12">Hello world!</div>
            </v-card-text> -->
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog.value = false">Close</v-btn>
            </v-card-actions>
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
</style>

<!-- <style lang="scss">
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: none !important;
  border: 1px solid rgb(201, 200, 200) !important;
  padding: 0.05rem 0 0.05rem 0.8rem !important;
  margin-bottom: 0.5rem !important;
}




.v-btn:not(.v-btn--round).v-size--default{

}
</style> -->
