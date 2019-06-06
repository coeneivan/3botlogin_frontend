import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'login',
  components: {},
  props: [],
  data () {
    return {
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }
  },
  computed: {
    ...mapGetters([
      'signed',
      'redirectUrl',
      'doubleName',
      'firstTime',
      'randomImageId',
      'hash',
      'scope',
      'appId',
      'appPublicKey'
    ])
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'resendNotification'
    ]),
    openApp () {
      if (this.isMobile) {
        var url = `threebot://login/?state=${encodeURIComponent(this.hash)}&mobile=true`
        if (this.scope) url += `&scope=${encodeURIComponent(this.scope)}`
        if (this.appId) url += `&appId=${encodeURIComponent(this.appId)}`
        if (this.appPublicKey) url += `&appPublicKey=${encodeURIComponent(this.appPublicKey)}`
        window.open(url)
      }
    }
  },
  watch: {
    signed (val) {
      if (val) {
        var signedHash = encodeURIComponent(val.signedHash)
        var data = encodeURIComponent(JSON.stringify(val.data))
        var union = '&'
        if (this.redirectUrl.indexOf('?') >= 0) {
          union = '&'
        } else {
          union = '?'
        }
        var url = `${this.redirectUrl}${union}username=${this.doubleName}&signedhash=${signedHash}&data=${data}`
        window.location.href = url
      }
    }
  }
}
