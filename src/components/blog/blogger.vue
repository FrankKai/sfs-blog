<template>
  <div class="blogger">
    <div class="avatar">
      <img src="../../assets/images/avatar.jpg" alt="头像" />
    </div>
    <div class="links">
      <ul>
        <li>
          <a href="https://segmentfault.com/u/chennihuannianqing"
            >segmentFault</a
          >
        </li>
        <li><a href="https://github.com/FrankKai">Github</a></li>
        <li>
          <a
            href="https://www.zhihu.com/people/ting-zhao-wu-yue-tian-da-lan-qiu/activities"
            >知乎</a
          >
        </li>
        <li><a href="http://www.jianshu.com/u/ff2903c0af37">简书</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "blogger",
  template: "<blogger/>",
  data() {
    return {
      msg: "blogger"
    };
  }
};
</script>

<style lang="scss" scoped>
.blogger {
  padding: 10px;
  .avatar {
    text-align: center;
    cursor: pointer;
    img {
      width: 200px;
      border-radius: 50%;
      &:hover {
        transform: rotateZ(-360deg);
        transition: transform 2s;
      }
    }
  }
  .links {
    margin-top: 20px;
    ul {
      padding: 0;
      margin: 0;
      li {
        list-style: none;
        // margin-top: 10px;
        display: inline-block;
        a {
          display: inline-block;
          text-decoration: none;
          color: #fff;
          padding: 5px;
          margin: 5px;
          background: #41c5d3;
          border-radius: 5px;
          &:hover {
            background: #8391a5;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
