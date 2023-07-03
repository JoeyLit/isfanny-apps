<template>
  <div class="form__container">
    <div>
      <div class="form__container">
        <form class="container">
          <div class="brand-title">DUTIES CALCULATOR</div>
          <div class="col-12">
            <div class="inputs">
              <label>Unit Price</label>
              <input
                v-model="unit_price"
                type="number"
                placeholder="Price"
                required
              />

              <label>Quantity</label>
              <input
                v-model="quantity"
                type="number"
                placeholder="Quantity"
                required
              />
              <label>Freight</label>
              <input
                v-model="freight"
                type="number"
                placeholder="Freight"
                required
              />
              <label>Insurance</label>
              <input
                v-model="insurance"
                type="number"
                placeholder="Insurance"
                required
              />
              <label>Import Excise Duty Rate</label>
              <input
                v-model="import_excise_duty_rate"
                type="number"
                placeholder="Excise Duty Rate"
                required
              />
              <label>Import Duty Rate</label>
              <input
                v-model="import_duty_rate"
                type="number"
                placeholder="Import Duty Rate"
                required
              />
              <h5 v-if="TOTAL_DUTY">Total Duty: {{ TOTAL_DUTY }}</h5>
              <p>FOB: {{ FOB }}</p>
              <p>CIF: {{ CIF }}</p>
              <p>import excise duty: {{ importExciseDuty }}</p>
              <p>import duty: {{ importDuty }}</p>
              <p>import NHIL: {{ importNHIL }}</p>
              <p>import GETFUND: {{ importGETFUND }}</p>
              <p>import COVID-19 Levy: {{ importCOVID }}</p>
              <p>import VAT: {{ importVAT }}</p>
              <p>ECOWAS Levy: {{ ECOWASLevy }}</p>
              <p>Network Charge: {{ networkCharge }}</p>
              <p>Network Charge NHIL: {{ networkChargeNHIL }}</p>
              <p>Network Charge GETFUND: {{ networkChargeGETFUND }}</p>
              <p>Network Charge COVID-19 HRL: {{ networkChargeCOVID }}</p>
              <p>Network Charge VAT: {{ networkChargeVAT }}</p>
              <p>IRS Tax Deposit: {{ IRS_TaxDeposit }}</p>
              <p>Special Import Levy: {{ specialImportLevy }}</p>
              <p>Ghana EXIM Levy: {{ EXIMLevy }}</p>
              <p>Inspection Fee: {{ inspectionFee }}</p>
              <p>AU Import Levy: {{ AU_importLevy }}</p>
              <!-- <button type="submit">Calculate</button> -->
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exchange_rate: 5.9804,
      unit_price: null,
      quantity: null,
      freight: null,
      insurance: null,
      import_excise_duty_rate: null,
      import_duty_rate: null,
    };
  },
  methods: {
    // totalPrice(unit_price, quantity){
    //     return unit_price * quantity
    // }
    // ,
  },
  computed: {
    FOB() {
      const price = parseFloat(this.unit_price);
      if (price == null) {
        return 0;
      }

      const quantity = parseInt(this.quantity);
      const totalPrice = price * quantity;
      return totalPrice;
    },
    CIF() {
      const freight = parseFloat(this.freight);
      const insurance = parseFloat(this.insurance);
      return this.FOB + freight + insurance;
    },
    importExciseDuty() {
      const rate = parseFloat(this.import_excise_duty_rate / 100);
      if (this.CIF == null) {
        return 0;
      } else {
        console.log(rate * this.CIF);
        return rate * this.CIF;
      }
    },
    importDuty() {
      const rate = parseFloat(this.import_duty_rate / 100);
      if (this.CIF == null) {
        return 0;
      } else {
        return rate * this.CIF;
      }
    },
    CIF_ID_EXD() {
      const CIF_ID_EXD = this.CIF + this.importDuty + this.importExciseDuty;
      if (this.CIF == null) {
        return 0;
      } else {
        return CIF_ID_EXD;
      }
    },
    importNHIL() {
      const NHIL = (2.5 / 100) * this.CIF_ID_EXD;
      if (this.CIF_ID_EXD == null) {
        return 0;
      } else {
        console.log(NHIL);
        return NHIL;
      }
    },
    importGETFUND() {
      const GETFUND = (2.5 / 100) * this.CIF_ID_EXD;
      if (this.CIF_ID_EXD == null) {
        return 0;
      } else {
        console.log(GETFUND);
        return GETFUND;
      }
    },
    importCOVID() {
      const COVID = (1 / 100) * this.CIF_ID_EXD;
      if (this.CIF_ID_EXD == null) {
        return 0;
      } else {
        console.log(COVID);
        return COVID;
      }
    },
    importVAT() {
      const VAT =
        (12.5 / 100) *
        (this.CIF_ID_EXD +
          this.importNHIL +
          this.importGETFUND +
          this.importCOVID);
      if (this.CIF_ID_EXD == null) {
        return 0;
      } else {
        return VAT;
      }
    },
    ECOWASLevy() {
      const ECOWASLevy = (0.5 / 100) * this.CIF;
      if (this.CIF == null) {
        return 0;
      } else {
        return ECOWASLevy;
      }
    },
    networkCharge() {
      const networkCharge = (0.4 / 100) * this.FOB;
      if (this.FOB == null) {
        return 0;
      } else {
        return networkCharge;
      }
    },
    networkChargeNHIL() {
      const networkChargeNHIL = (2.5 / 100) * this.networkCharge;
      if (this.networkCharge == null) {
        return 0;
      } else {
        return networkChargeNHIL;
      }
    },
    networkChargeGETFUND() {
      const networkChargeGETFUND = (2.5 / 100) * this.networkCharge;
      if (this.networkCharge == null) {
        return 0;
      } else {
        return networkChargeGETFUND;
      }
    },
    networkChargeCOVID() {
      const networkChargeCOVID = (1 / 100) * this.networkCharge;
      if (this.networkCharge == null) {
        return 0;
      } else {
        return networkChargeCOVID;
      }
    },
    networkChargeVAT() {
      if (this.networkCharge == null) {
        return 0;
      } else {
        const rate = 12.5 / 100;
        const totalNetworkCharge =
          this.networkCharge +
          this.networkChargeNHIL +
          this.networkChargeGETFUND +
          this.networkChargeCOVID;
        const networkChargeVAT = rate * totalNetworkCharge;
        return networkChargeVAT;
      }
    },
    IRS_TaxDeposit() {
      const IRS_TaxDeposit = (1 / 100) * this.CIF;
      if (this.CIF == null) {
        return 0;
      } else {
        return IRS_TaxDeposit;
      }
    },
    specialImportLevy() {
      const specialImportLevy = (2 / 100) * this.CIF;
      if (this.CIF == null) {
        return 0;
      } else {
        return specialImportLevy;
      }
    },
    EXIMLevy() {
      const EXIMLevy = (0.75 / 100) * this.CIF;
      if (this.CIF == null) {
        return 0;
      } else {
        return EXIMLevy;
      }
    },
    inspectionFee() {
      const inspectionFee = (1 / 100) * this.CIF;
      if (this.CIF == null) {
        return 0;
      } else {
        return inspectionFee;
      }
    },
    AU_importLevy() {
      const AU_importLevy = (0.2 / 100) * this.CIF;
      if (this.CIF == null) {
        return 0;
      } else {
        return AU_importLevy;
      }
    },
    TOTAL_DUTY() {
      if (this.CIF == null) {
        return 0;
      }
      const total =
        this.importDuty +
        this.importVAT +
        this.importExciseDuty +
        this.ECOWASLevy +
        this.networkCharge +
        this.networkChargeVAT +
        this.networkChargeCOVID +
        this.importNHIL +
        this.networkChargeNHIL +
        this.IRS_TaxDeposit +
        this.specialImportLevy +
        this.EXIMLevy +
        this.importGETFUND +
        this.networkChargeGETFUND +
        this.inspectionFee +
        this.AU_importLevy;
      return total;
    },
  },
  mounted() {},
};
</script>

<style scoped>
.form__container {
  margin: 0;
  width: 100vw;
  background: #ecf0f3;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  place-items: center;
  overflow: auto;
}

.container {
  position: relative;
  margin: 3rem 0;
  width: 400px;
  /* height: 80%; */
  border-radius: 20px;
  padding: 40px;
  box-sizing: border-box;
  background: #ecf0f3;
  /* box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white; */
}

@media screen and (min-width: 650px) {
  .container {
    width: 500px;
  }
}

.brand-logo {
  height: 100px;
  width: 100px;
  background: url("https://img.icons8.com/color/100/000000/twitter--v2.png");
  margin: auto;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow: 7px 7px 10px #cbced1, -7px -7px 10px white;
}

.brand-title {
  margin-top: 10px;
  font-weight: 900;
  font-size: 1.3rem;
  color: var(--color-dark);
  letter-spacing: 1px;
}

.inputs {
  text-align: left;
  margin-top: 20px;
}

label,
input,
button {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  outline: none;
  box-sizing: border-box;
}

label {
  margin-bottom: 4px;
}

label:nth-of-type(2) {
  margin-top: 12px;
}

input::placeholder {
  color: gray;
}

input {
  background: #ecf0f3;
  margin-bottom: 1rem;
  padding: 10px;
  padding-left: 20px;
  height: 50px;
  font-size: 14px;
  border-radius: 10px;
  box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
}

button {
  color: white;
  margin-top: 20px;
  background: #1da1f2;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 900;
  box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
  transition: 0.5s;
}

button:hover {
  box-shadow: none;
}

a {
  position: absolute;
  font-size: 8px;
  bottom: 4px;
  right: 4px;
  text-decoration: none;
  color: black;
  background: yellow;
  border-radius: 10px;
  padding: 2px;
}

h1 {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
