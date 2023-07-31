<template>
  <section class="homepage-container">
    <div class="input-container">
      <div
        class="input-container-item input-section"
        @mouseenter="handleshowInputFloat"
        @mouseleave="handleHideInputFloat"
      >
        <div class="input-container-item-tittle">
          <span class="field-name">Field Name</span>
          <span class="field-type">Type</span>
        </div>
        <div class="input-container-item-input-field field-container">
          <InputField
            :objectList="schemaObjectArray"
            @updateSchemaArray="setUpdatedSchemaArray"
          />
        </div>
        <FloatBtn
          :showFloat="showInputFloat"
          @addAnotherFieldToInputArray="addAnotherFieldToInputArray"
          @mouseenter="handleshowInputFloat"
          @generateData="generateDataFromInputField"
        />
      </div>
      <div
        class="input-container-item editor-section"
        @mouseenter="handleshowEditorFloat"
        @mouseleave="handleHideEditorFloat"
      >
        <JsonEditor />
        <FloatBtn
          :add_field="false"
          :showFloat="showEditorFloat"
          @mouseenter="handleshowEditorFloat"
          @generateData="generateDataFromJsonField"
        />
      </div>
    </div>
    <div class="output-container">
      <div class="output-container-btn">
        <v-btn elevation="1" class="output-btn" @click="showJson = true"
          >JSON</v-btn
        >
        <v-btn elevation="1" class="output-btn" @click="showJson = false"
          >API</v-btn
        >
        <v-btn
          elevation="1"
          class="output-btn text-copy"
          v-if="showCopyBtn"
          @mouseenter="handleShowCopyBtn"
          >Copy</v-btn
        >
      </div>
      <div
        class="output-container-editor"
        @mouseenter="handleShowCopyBtn"
        @mouseleave="handleHideCopyBtn"
      >
        <div
          class="output-container-editor-Json"
          @mouseenter="handleShowCopyBtn"
          v-if="showJson"
        >
          <JsonEditor
            :options="{
              mode: 'text',
              enableTransform: false,
              enableSort: false,
              repair: false,
            }"
            jsonData="output will show here"
          />
        </div>
        <div class="output-container-editor-Api" v-else></div>
      </div>
    </div>
  </section>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import InputField from "@/components/InputField.vue";
import FloatBtn from "@/components/FloatBtn.vue";
import JsonEditor from "@/components/JsonEditor.vue";
import { faker } from "@faker-js/faker";
// import { fakerGenerateEntry } from "../data/data";
export default {
  data() {
    return {
      schemaObjectArray: [
        {
          id: uuidv4(),
          schemaKey: "_id",
          schemaType: "Number",
        },
        {
          id: uuidv4(),
          schemaKey: "first_name",
          schemaType: "String",
        },
        {
          id: uuidv4(),
          schemaKey: "last_name",
          schemaType: "String",
        },

        {
          id: uuidv4(),
          schemaKey: "age",
          schemaType: "Number",
        },
        {
          id: uuidv4(),
          schemaKey: "Image",
          schemaType: "URL",
        },
        // {
        //   id: uuidv4(),
        //   schemaKey: "gender",
        //   schemaType: "String",
        // },
      ],
      fakerKeyArray: [],
      showJson: true,
      showCopyBtn: false,
      showInputFloat: false,
      showEditorFloat: false,
    };
  },
  components: {
    InputField,
    FloatBtn,

    JsonEditor,
  },
  created() {
    const fakerGenerateEntry = [
      { data_type: "Name (Full Name)", example: faker.name.findName() },
      { data_type: "Name (First Name)", example: faker.name.firstName() },
      { data_type: "Name (Last Name)", example: faker.name.lastName() },
      { data_type: "Address", example: faker.address.streetAddress() },
      { data_type: "Address (City)", example: faker.address.city() },
      { data_type: "Address (State)", example: faker.address.state() },
      { data_type: "Address (Country)", example: faker.address.country() },
      { data_type: "Address (Zip Code)", example: faker.address.zipCode() },
      { data_type: "Email", example: faker.internet.email() },
      { data_type: "Phone Number", example: faker.phone.phoneNumberFormat() },
      {
        data_type: "Date of Birth",
        example: faker.date.past().toISOString().split("T")[0],
      },
      { data_type: "Job", example: faker.name.jobTitle() },
      { data_type: "Company", example: faker.company.companyName() },
      { data_type: "Text", example: faker.lorem.paragraph() },
      {
        data_type: "Credit Card Number",
        example: faker.finance.creditCardNumber(),
      },
      {
        data_type: "Credit Card Expiration",
        example: faker.finance.creditCardExpirationDate(),
      },
      { data_type: "Color Name", example: faker.commerce.color() },
      { data_type: "Latitude", example: faker.address.latitude() },
      { data_type: "Longitude", example: faker.address.longitude() },
      { data_type: "Random Number", example: faker.random.number() },
      { data_type: "Random Float Number", example: faker.random.float() },
      {
        data_type: "Random Array Element",
        example: faker.random.arrayElement(["apple", "orange", "banana"]),
      },
      { data_type: "Boolean", example: faker.random.boolean() },
      { data_type: "Word", example: faker.lorem.word() },
      { data_type: "Words", example: faker.lorem.words() },
      { data_type: "UUID", example: faker.random.uuid() },
      { data_type: "File Path", example: faker.system.filePath() },
      { data_type: "Image URL", example: faker.image.imageUrl() },
      { data_type: "Avatar Image URL", example: faker.image.avatar() },
      { data_type: "Domain Name", example: faker.internet.domainName() },
      { data_type: "URL", example: faker.internet.url() },
      { data_type: "IPv4 Address", example: faker.internet.ip() },
      {
        data_type: "User Agent",
        example: faker.internet.userAgent(),
      },
      { data_type: "ISBN-10", example: faker.random.isbn10() },
      { data_type: "ISBN-13", example: faker.random.isbn13() },
      { data_type: "Language Code", example: faker.random.locale() },
      { data_type: "Currency Code", example: faker.finance.currencyCode() },
      { data_type: "File Extension", example: faker.system.fileExt() },
      { data_type: "MIME Type", example: faker.system.mimeType() },
      { data_type: "Emoji", example: faker.random.emoji() },
      { data_type: "Password", example: faker.internet.password() },
      { data_type: "Airline", example: faker.company.companyName() },
      { data_type: "Aircraft Type", example: faker.system.commonFileName() },
      {
        data_type: "Airplane",
        example: faker.random.alphaNumeric(6).toUpperCase(),
      },
      {
        data_type: "Airport",
        example: faker.address.city() + " International Airport",
      },
      {
        data_type: "Flight Number",
        example:
          faker.random.alphaNumeric(2).toUpperCase() +
          faker.random.number({ min: 100, max: 999 }),
      },
      {
        data_type: "Record Locator",
        example: faker.random.alphaNumeric(6).toUpperCase(),
      },
      {
        data_type: "Seat",
        example:
          faker.random.number({ min: 1, max: 50 }) +
          faker.random.arrayElement(["A", "B", "C", "D", "E", "F"]),
      },
      { data_type: "Department", example: faker.commerce.department() },
      { data_type: "Price", example: faker.commerce.price() },
      { data_type: "Product", example: faker.commerce.product() },
      {
        data_type: "Product Adjective",
        example: faker.commerce.productAdjective(),
      },
      {
        data_type: "Product Description",
        example: faker.commerce.productDescription(),
      },
      {
        data_type: "Product Material",
        example: faker.commerce.productMaterial(),
      },
      { data_type: "Product Name", example: faker.commerce.productName() },

      // System
      {
        data_type: "Common File Extension",
        example: faker.system.commonFileExt(),
      },
      { data_type: "Common File Name", example: faker.system.commonFileName() },
      { data_type: "Common File Type", example: faker.system.commonFileType() },
      { data_type: "Cron Expression", example: faker.random.cron() },
      { data_type: "Directory Path", example: faker.system.directoryPath() },
      { data_type: "File Extension", example: faker.system.fileExt() },
      { data_type: "File Name", example: faker.system.fileName() },
      { data_type: "File Path", example: faker.system.filePath() },
      { data_type: "File Type", example: faker.system.fileType() },
      { data_type: "MIME Type", example: faker.system.mimeType() },
      {
        data_type: "Network Interface",
        example: faker.system.networkInterface(),
      },
      { data_type: "Semantic Version", example: faker.system.semver() },
      // Vehicle
      { data_type: "Bicycle", example: faker.vehicle.bicycle() },
      { data_type: "Color", example: faker.vehicle.color() },
      { data_type: "Fuel", example: faker.vehicle.fuel() },
      { data_type: "Manufacturer", example: faker.vehicle.manufacturer() },
      { data_type: "Model", example: faker.vehicle.model() },
      { data_type: "Type", example: faker.vehicle.type() },
      { data_type: "Vehicle", example: faker.vehicle.vehicle() },
      {
        data_type: "VIN (Vehicle Identification Number)",
        example: faker.vehicle.vin(),
      },
      {
        data_type: "VRM (Vehicle Registration Mark)",
        example: faker.vehicle.vrm(),
      },
      // Word
      { data_type: "Adjective", example: faker.random.word() },
      { data_type: "Adverb", example: faker.random.word() },
      { data_type: "Conjunction", example: faker.random.word() },
      { data_type: "Interjection", example: faker.random.word() },
      { data_type: "Noun", example: faker.random.word() },
      { data_type: "Preposition", example: faker.random.word() },
      { data_type: "Sample Word", example: faker.random.word() },
      { data_type: "Verb", example: faker.random.word() },
      { data_type: "Words", example: faker.random.words() },
      // Location
      { data_type: "Building Number", example: faker.address.buildingNumber() },
      { data_type: "Cardinal Direction", example: faker.address.direction() },
      { data_type: "City", example: faker.address.city() },
      { data_type: "City Name", example: faker.address.cityName() },
      { data_type: "Country", example: faker.address.country() },
      { data_type: "Country Code", example: faker.address.countryCode() },
      { data_type: "County", example: faker.address.county() },
      { data_type: "Direction", example: faker.address.direction() },
      { data_type: "Latitude", example: faker.address.latitude() },
      { data_type: "Longitude", example: faker.address.longitude() },
      {
        data_type: "Nearby GPS Coordinate",
        example: faker.address.nearbyGPSCoordinate(),
      },
      {
        data_type: "Ordinal Direction",
        example: faker.address.ordinalDirection(),
      },
      {
        data_type: "Secondary Address",
        example: faker.address.secondaryAddress(),
      },
      { data_type: "State", example: faker.address.state() },
      { data_type: "State Abbreviation", example: faker.address.stateAbbr() },
      { data_type: "Street", example: faker.address.streetName() },
      { data_type: "Street Address", example: faker.address.streetAddress() },
      { data_type: "Time Zone", example: faker.address.timeZone() },
      { data_type: "Zip Code", example: faker.address.zipCode() },
      // Date
      { data_type: "Any Time", example: faker.date.past().toISOString() },
      {
        data_type: "Between",
        example: `${faker.date.past().toISOString()} and ${faker.date
          .future()
          .toISOString()}`,
      },
      {
        data_type: "Between Dates",
        example: `${faker.date.past().toISOString()} and ${faker.date
          .future()
          .toISOString()}`,
      },
      { data_type: "Birthdate", example: faker.date.past().toISOString() },
      { data_type: "Future Date", example: faker.date.future().toISOString() },
      { data_type: "Month", example: faker.date.month() },
      { data_type: "Past Date", example: faker.date.past().toISOString() },
      { data_type: "Recent Date", example: faker.date.recent().toISOString() },
      { data_type: "Soon Date", example: faker.date.soon().toISOString() },
      { data_type: "Weekday", example: faker.date.weekday() },
      // Finance
      { data_type: "Account", example: faker.finance.account() },
      { data_type: "Account Name", example: faker.finance.accountName() },
      { data_type: "Account Number", example: faker.finance.accountNumber() },
      { data_type: "Amount", example: faker.finance.amount() },
      { data_type: "BIC (Bank Identifier Code)", example: faker.finance.bic() },
      { data_type: "Bitcoin Address", example: faker.finance.bitcoinAddress() },
      { data_type: "Credit Card CVV", example: faker.finance.creditCardCVV() },
      {
        data_type: "Credit Card Issuer",
        example: faker.finance.creditCardIssuer(),
      },
      {
        data_type: "Credit Card Number",
        example: faker.finance.creditCardNumber(),
      },
      { data_type: "Currency", example: faker.finance.currency() },
      { data_type: "Currency Code", example: faker.finance.currencyCode() },
      { data_type: "Currency Name", example: faker.finance.currencyName() },
      { data_type: "Currency Symbol", example: faker.finance.currencySymbol() },
      {
        data_type: "Ethereum Address",
        example: faker.finance.ethereumAddress(),
      },
      {
        data_type: "IBAN (International Bank Account Number)",
        example: faker.finance.iban(),
      },
      {
        data_type: "Litecoin Address",
        example: faker.finance.litecoinAddress(),
      },
      { data_type: "Mask", example: faker.random.mask() },
      { data_type: "Masked Number", example: faker.random.mask() },
      { data_type: "PIN", example: faker.finance.pin() },
      { data_type: "Routing Number", example: faker.finance.routingNumber() },
      {
        data_type: "Transaction Description",
        example: faker.finance.transactionDescription(),
      },
      {
        data_type: "Transaction Type",
        example: faker.finance.transactionType(),
      },
      // Lorem
      { data_type: "Lines", example: faker.lorem.lines() },
      { data_type: "Paragraph", example: faker.lorem.paragraph() },
      { data_type: "Paragraphs", example: faker.lorem.paragraphs() },
      { data_type: "Sentence", example: faker.lorem.sentence() },
      { data_type: "Sentences", example: faker.lorem.sentences() },
      { data_type: "Slug", example: faker.lorem.slug() },
      { data_type: "Text", example: faker.lorem.text() },
      { data_type: "Word", example: faker.lorem.word() },
      { data_type: "Words", example: faker.lorem.words() },
      // Music
      { data_type: "Genre", example: faker.music.genre() },
      { data_type: "Song Name", example: faker.music.songName() },
      // Random
      { data_type: "Alpha", example: faker.random.alpha() },
      { data_type: "Alphanumeric", example: faker.random.alphaNumeric() },
      { data_type: "Binary", example: faker.random.binary() },
      {
        data_type: "From Characters",
        example: faker.random.alphaNumeric(10, "ABCD"),
      },
      { data_type: "Hexadecimal", example: faker.random.hexaDecimal() },
      { data_type: "NanoID", example: faker.random.uuid() }, // Using UUID as NanoID is not natively supported by Faker.js
      { data_type: "Numeric", example: faker.random.number() },
      { data_type: "Octal", example: faker.random.octal() },
      {
        data_type: "Sample",
        example: faker.random.arrayElement(["apple", "orange", "banana"]),
      },
      {
        data_type: "Symbol",
        example: faker.random.alphaNumeric(1, "!@#$%^&*()[]{}<>?/|"),
      },
      { data_type: "UUID", example: faker.random.uuid() },
    ];
    this.fakerKeyArray = fakerGenerateEntry;
  },
  methods: {
    addAnotherFieldToInputArray() {
      let schemaObject = {
        id: uuidv4(),
        schemaKey: "gender",
        schemaType: "String",
      };

      this.schemaObjectArray.push(schemaObject);
    },
    handleshowInputFloat() {
      this.showInputFloat = true;
    },
    handleHideInputFloat() {
      this.showInputFloat = false;
    },
    setUpdatedSchemaArray(data) {
      this.schemaObjectArray = data;
    },
    handleshowEditorFloat() {
      this.showEditorFloat = true;
    },
    handleHideEditorFloat() {
      this.showEditorFloat = false;
    },
    handleShowCopyBtn() {
      this.showCopyBtn = true;
    },
    handleHideCopyBtn() {
      this.showCopyBtn = false;
    },
    generateDataFromInputField() {
      // let generateDataFromUserSchema = this.schemaObjectArray.map(
      //   (schemaObject) => {
      //     schemaObject.schemaType =
      //       this.fakerKeyArray[schemaObject.schemaType].example;
      //     console.log(schemaObject.schemaType);
      //     return schemaObject;
      //   }
      // );
      // console.log(generateDataFromUserSchema);
    },
    generateDataFromJsonField() {
      // window.alert("Json");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/style.scss";

.homepage-container {
  width: 98%;
  height: 93vh;
  padding: 1rem 1.6rem 0 1.6rem;
  margin: 0 auto;
  background: $landing-page-background-color;
}
.input-container {
  width: 100%;
  height: 55%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 3rem;

  &-item {
    flex: 0 0 45%;
    height: 100%;
    position: relative;
    justify-self: flex-start;
    padding: 1rem 0 0 0;
    background: $primary-white;

    // box-shadow: 0 0 0.9rem rgb(218, 216, 216);
    box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5);
    &-tittle {
      width: 100%;
      margin: 0 auto;

      & span {
        font-size: 1.2rem;
        font-weight: 400;
        letter-spacing: 0.03rem;
        color: $primary-gray;
      }
    }
    &-input-field {
      width: 100%;

      height: 90%;
      overflow-y: scroll;
      scroll-behavior: smooth;
      &::-webkit-scrollbar {
        width: 1rem;
      }
    }
  }

  & > span {
    font-size: 1rem;
    font-weight: 500;
  }
}

.field-name {
  padding-left: 1.5rem;
}
.field-type {
  padding-left: 6rem;
}
.editor-section {
  flex: 0 0 52%;
  // padding: 0 0 0.04rem 0.04rem !important;
  padding: 0 !important;
  box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5) !important;
  overflow: hidden;
}

.input-section {
  flex: 0 0 40%;
  padding: 1rem 3.2rem;
  overflow: hidden;
}
// ROW INPUT
.row-input {
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  border-top: 1px solid rgb(201, 200, 200);
  border-bottom: 1px solid rgb(201, 200, 200);
  margin: 0.5rem 0;

  padding: 0.7rem 0 0.3rem 10rem;
  &-add-field {
    width: max-content;
    cursor: pointer;

    & span {
      text-transform: uppercase;
      letter-spacing: 0.03rem;
      font-size: 1rem;
      font-weight: 500;
      border: 1px solid rgb(201, 200, 200) !important;
      background: $primary-white;
      color: $primary-gray;
      text-align: center;
      padding: 0.3rem 0.6rem;
      border-radius: 0.2rem;
      &:hover {
        background: $primary-whitsmoke;
      }
    }
  }
}
.output-container {
  width: 100%;
  height: 42%;

  position: relative;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  // box-shadow: 0 0 0.9rem rgb(218, 216, 216);
  box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5);
  margin-top: 1.5rem;
  &-btn {
    flex: 0 0 4%;
    height: 100%;
  }
  &-editor {
    flex: 0 0 93%;
    height: 100%;
    border-left: 0.1rem solid $primary-border;

    &-Json {
      width: 100%;
      height: 100%;
    }
    &-Api {
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 0, 0.267);
    }
  }
}

.text-copy {
  position: absolute;
  top: 0;
  right: -0.2rem;
  z-index: 999;
}
</style>

<style lang="scss">
@import "../sass/style.scss";
.row-input-item
  > .v-text-field.v-text-field--solo.v-input--dense
  > .v-input__control {
  min-height: 35px !important;
}
.v-btn:not(.v-btn--round).v-size--default {
  min-width: 10px !important;
  min-width: 100px !important;
  border-radius: 0;
  padding: 1rem !important;
  margin-bottom: 0.05rem;
}

.row-input-item
  > .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: none;
  border: 1px solid rgb(201, 200, 200) !important;
}
</style>
