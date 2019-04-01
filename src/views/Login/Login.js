import { mapGetters } from 'vuex'

export default {
  name: 'login',
  components: {},
  props: [],
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'signed',
      'redirectUrl',
      'doubleName'
    ])
  },
  mounted () {

  },
  methods: {

  },
  watch: {
    signed (val) {
      if (val) {
        console.log(`going to reidrect to`, `${this.redirectUrl}?username=${this.doubleName}&signedhash=${val}`)
        window.location.href = `${this.redirectUrl}?username=${this.doubleName}&signedhash=${val}`
      }
    }
  }
}