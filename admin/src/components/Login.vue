<template>
  <div class="login-wrap">
      <canvas class="login-bg" ref="login-bg"></canvas>
      <div class="login-box">
        <Form ref="login-form" :rules="rules" :model="models">
            <FormItem label="用户名" prop="username">
                <Input size="large" v-model="models.username" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input size="large" type="password" v-model="models.password" placeholder="请输入密码"></Input>
            </FormItem>
            <FormItem>
                <Button size="large" type="info" long @click="login">登录</Button>
            </FormItem>                        
        </Form>
      </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
      return {
          models: {
              username: "",
              password: ""
          },
          rules: {
              username: [{
                  required: true,
                  message: '用户名不能为空'
              }],
              password: [{
                  required: true,
                  message: '密码不能为空'
              }]
          }
      }
  },
  methods: {
      login () {
          this.$router.push({
              name: 'Home'
          })
      }
  },
  mounted () {
      this.$nextTick(()=>{
            let c = this.$refs['login-bg'];
            c.setAttribute("width",window.innerWidth);
            c.setAttribute("height",window.innerHeight);
            let ctx = c.getContext('2d');

            c.height = window.innerHeight;
            c.width = window.innerWidth;

            let txts = "01";
            txts = txts.split("");

            let font_size = 16;
            let columns = c.width / font_size;

            let s = [];
            for (let x = 0; x < columns; x++)
                s[x] = 1;

            function draw() {
                ctx.fillStyle = "rgba(0,0,0, 0.05)";
                ctx.fillRect(0, 0, c.width, c.height);
                ctx.fillStyle = "#0F0";
                ctx.font = font_size + "px arial";

                for (let i = 0; i < s.length; i++) {
                    let text = Math.floor(Math.random() * 2);
                    ctx.fillText(text, i * font_size, s[i] * font_size);

                    if (s[i] * font_size > c.height || Math.random() > 0.95)
                        s[i] = 0;

                    s[i]++
                }

            }
            setInterval(draw, 50);
      })
  }
}
</script>
<style lang="less">
    .login-wrap{
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        .login-bg{
            width: 100%;
            height: 100%;
        }       
        .login-box{
            position: absolute;
            width: 300px;
            height: 280px;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            background: #00cc99;
            box-shadow: 0 0 5px 5px rgba(255,255,255,.5);
            border-radius: 5px;
            padding: 15px;
            .ivu-form-item-label{
                color: #ffffff;
            }
        } 
    }
</style>

