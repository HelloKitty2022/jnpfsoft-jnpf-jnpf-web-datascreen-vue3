<template>

</template>

<script>
import * as mqtt from 'mqtt/dist/mqtt.min';
import dayjs from 'dayjs'
import { uuid } from '@/utils/utils';
const format = 'YYYY-MM-DD HH:mm:ss'
const url = 'wss://data.avuejs.com/api/mqtt/xiaowei'
export default {
  inject: ["contain"],
  data() {
    return {
      timeout: null,
      group: '',
      id: '',
      userList: [],
      reload: false,
      clientId: "mqtt_client_" + uuid(),
      client: null
    }
  },
  watch: {
    'contain.render': {
      handler(val) {
        setTimeout(() => {
          this.reload = true;
        }, 1000)
      },
      immediate: true
    },
    'contain.config': {
      handler(val) {
        this.debounce(this.send)(val, 'config')
      },
      deep: true
    },
    'contain.nav': {
      handler(val) {
        this.debounce(this.send)(val, 'list')
      },
      deep: true
    }
  },
  mounted() {
    this.id = this.contain.id;
    this.connect()
  },
  methods: {
    debounce(func, wait = 600) {
      let that = this;
      return function () {
        const context = this;
        const args = arguments;
        clearTimeout(that.timeout);
        that.timeout = setTimeout(function () {
          func.apply(context, args);
        }, wait);
      };
    },
    connect() {
      this.client = mqtt.connect(url, {
        clientId: this.clientId
      })
      this.client.on("connect", () => {
        this.group = this.id
        this.client.subscribe(this.group, () => {
          console.log(`Subscribe to topic '${this.group}'`)
          window.onunload = () => {
            console.log(`Lave to topic '${this.group}'`)
            let data = {
              clientId: this.clientId,
              data: dayjs().format(format),
              type: 'leave'
            }
            this.client.publish(this.group, JSON.stringify(data), { qos: 0 })
          }
          let data = {
            clientId: this.clientId,
            data: dayjs().format(format),
            type: 'join'
          }
          this.userList.push(data)
          this.client.publish(this.group, JSON.stringify(data), { qos: 0 })
        })
        this.client.on('message', (topic, message) => {
          let data = JSON.parse(message)
          if (data.clientId != this.clientId && topic == this.group) {
            this.reload = false
            let user = this.userList.find(ele => ele.clientId == data.clientId)
            let index = this.userList.findIndex(ele => ele.clientId == data.clientId)
            if (data.type == 'leave') {
              this.userList.splice(index, 1)
            } else if (data.type == 'config') {
              this.contain.config = data.data
            } else if (data.type == 'list') {
              this.contain.nav = data.data
            }
            if (!user) {
              data.data = dayjs().format(format)
              this.userList.push(data)
            }
            this.$nextTick(() => {
              this.reload = true
            })
          }
        })
      })

    },
    send(val, type) {
      if (this.contain.render && this.reload) {
        let data = {
          clientId: this.clientId,
          data: val,
          type: type
        }
        this.client.publish(this.group, JSON.stringify(data), { qos: 0 })
      }
    }
  }
}
</script>
<style lang="scss">
.sync {
  ul {
    padding: 10px 10px;
  }
  li {
    margin-bottom: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
    img {
      margin-right: 10px;
      padding: 5px;
      width: 40px;
      height: 40px;
      border-radius: 100%;
      box-sizing: border-box;
      background-color: #232323;
    }
    span {
      font-size: 10px;
      line-height: 30px;
      color: #fff;
    }
  }
}
</style>