import VueQr from 'vue-qr'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'register',
  components: {
    VueQr
  },
  props: [],
  data () {
    return {
      step: 1,
      email: '',
      alone: false,
      wasEverAlone: false,
      areYouSureDialog: false,
      youWereNeverAloneDialog: false,
      proceedAnyway: false
    }
  },
  computed: {
    ...mapGetters([
      'keys',
      'doubleName',
      'hash',
      'scannedFlagUp'
    ]),
    qrText () {
      return JSON.stringify({
        hash: this.hash,
        privateKey: this.keys.privateKey
      })
    }
  },
  mounted () {
    this.generateKeys()
  },
  methods: {
    ...mapActions([
      'generateKeys',
      'registerUser'
    ]),
    confirmDialog () {
      if (this.wasEverAlone) {
        this.step++
        this.areYouSureDialog = false
      } else {
        this.youWereNeverAloneDialog = true
      }
    },
    giveMeAnOtherChance () {
      this.areYouSureDialog = false
      this.youWereNeverAloneDialog = false
      this.proceedAnyway = false
    },
    proceed () {
      this.areYouSureDialog = false
      this.youWereNeverAloneDialog = false
      this.step++
    }
  },
  watch: {
    alone (val) {
      if (val) {
        this.wasEverAlone = true
      }
    },
    step (val) {
      if (val === 3) {
        this.registerUser({
          email: this.email
        })
      }
    },
    scannedFlagUp (val) {
      console.log(`SCANNEDFLAG CHANGED`)
      if (val && this.step === 3) {
        this.$router.push({ name: 'login' })
      }
    }
  }
}