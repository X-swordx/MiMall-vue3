<template>
  <div class="product">
    <product-param v-bind:title="product.name">
      <template v-slot:buy>
        <button class="btn" @click="buy">立即购买</button>
      </template>
    </product-param>
    <div class="content">
      <div class="item-bg">
        <h2>{{ product.name }}</h2>
        <h3>{{ product.subtitle }}</h3>
        <p>
          <a href="" id="">全球首款双频 GP</a>
          <span>|</span>
          <a href="" id="">骁龙845</a>
          <span>|</span>
          <a href="" id="">AI 变焦双摄</a>
          <span>|</span>
          <a href="" id="">红外人脸识别</a>
        </p>
        <div class="price">
          <span
            >￥<em>{{ product.price }}</em></span
          >
        </div>
      </div>
      <div class="item-bg-2"></div>
      <div class="item-bg-3"></div>
      <div class="ant-item-swiper">
        <a-carousel autoplay>
          <div>
            <img src="/imgs/product/gallery-2.png" alt="" />
          </div>
          <div>
            <img src="/imgs/product/gallery-3.png" alt="" />
          </div>
          <div>
            <img src="/imgs/product/gallery-4.png" alt="" />
          </div>
          <div>
            <img src="/imgs/product/gallery-5.jpg" alt="" />
          </div>
          <div>
            <img src="/imgs/product/gallery-6.jpg" alt="" />
          </div>
        </a-carousel>
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
      <div class="item-video">
        <h2>60帧超慢动作摄影<br />慢慢回味每一瞬间的精彩</h2>
        <p>
          后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br />更能AI
          精准分析视频内容，15个场景智能匹配背景音效。
        </p>
        <div class="video-bg" @click="showSlide = 'slideDown'"></div>
        <div class="video-box" v-show="showSlide">
          <div class="overlay"></div>
          <div class="video" v-bind:class="showSlide">
            <span class="icon-close" @click="closeVideo"></span>
            <video
              src="/imgs/product/video.mp4"
              muted
              autoplay
              controls="controls"
            ></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCurrentInstance, onMounted, ref } from 'vue'
import ProductParam from './../components/ProductParam'
export default {
  name: 'product',
  components: {
    ProductParam,
  },
  setup() {
    const { ctx } = getCurrentInstance()
    const showSlide = ref('') //控制动画效果
    let product = ref({}) //商品信息
    const id = ctx.$router.currentRoute.value.params.id

    onMounted(() => {
      getProductInfo()
    })

    const getProductInfo = () => {
      ctx.$axios.get(`/products/${id}`).then((res) => {
        product.value = res
      })
    }
    const buy = () => {
      ctx.$router.push(`/detail/${id}`)
    }
    const closeVideo = () => {
      showSlide.value = 'slideUp'
      let vi = document.getElementsByTagName('video')[0]
      vi.pause()
      setTimeout(() => {
        showSlide.value = ''
      }, 600)
    }
    return {
      showSlide,
      product,
      getProductInfo,
      buy,
      closeVideo,
    }
  },
}
</script>
<style lang="scss">
@import './../assets/scss/mixin.scss';
.product {
  .content {
    .item-bg {
      background: url('/imgs/product/product-bg-1.png') no-repeat center;
      height: 718px;
      text-align: center;
      h2 {
        font-size: 80px;
        padding-top: 55px;
      }
      h3 {
        font-size: 24px;
        letter-spacing: 10px;
      }
      p {
        margin-top: 21px;
        margin-bottom: 40px;
        a {
          font-size: 16px;
          color: #333333;
        }
        span {
          margin: 0 15px;
        }
      }
      .price {
        font-size: 30px;
        color: #333333;
        em {
          font-style: normal;
          font-size: 38px;
        }
      }
    }
    .item-bg-2 {
      background: url(/imgs/product/product-bg-2.png) no-repeat center;
      height: 480px;
      background-size: 1226px 397px;
    }
    .item-bg-3 {
      background: url(/imgs/product/product-bg-3.png) no-repeat center;
      height: 638px;
      background-size: cover;
    }
    .ant-item-swiper {
      .ant-carousel {
        margin: 60px;
      }
      margin: 36px auto 52px;
      .desc {
        font-size: 18px;
        color: #333333;
        text-align: center;
      }
      img {
        width: 100%;
      }
    }

    .item-video {
      height: 1044px;
      background-color: #070708;
      margin-bottom: 76px;
      color: #ffffff;
      text-align: center;
      h2 {
        font-size: 60px;
        padding-top: 82px;
        margin-bottom: 47px;
      }
      p {
        font-size: 24px;
        margin-bottom: 58px;
      }
      .video-bg {
        background: url('/imgs/product/gallery-1.png') no-repeat center;
        background-size: cover;
        width: 1226px;
        height: 540px;
        margin: 0 auto 120px;
        cursor: pointer;
      }
      .video-box {
        .overlay {
          @include position(fixed);
          background-color: #333333;
          opacity: 0.4;
          z-index: 10;
        }
        @keyframes slideDown {
          from {
            top: -50%;
            opacity: 0;
          }
          to {
            top: 50%;
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            top: 50%;
            opacity: 1;
          }
          to {
            top: -50%;
            opacity: 0;
          }
        }
        .video {
          position: fixed;
          top: -50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          width: 1000px;
          height: 536px;
          opacity: 1;
          &.slideDown {
            animation: slideDown 0.6s linear;
            top: 50%;
          }
          &.slideUp {
            animation: slideUp 0.6s linear;
          }
          .icon-close {
            position: absolute;
            top: 20px;
            right: 20px;
            @include bgImg(20px, 20px, '/imgs/icon-close.png');
            cursor: pointer;
            z-index: 11;
          }
          video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            outline: none;
          }
        }
      }
    }
  }
  button {
    margin-left: 10px;
  }
}
</style>
