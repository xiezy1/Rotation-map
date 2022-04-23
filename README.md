<h2 align="center">原生js实现轮播图</h2>

<a href="https://xiezy1.github.io/Rotation-map/index.html">预览</a>

> How to use

```html
<script src="./index.js"></script>
<script>
    new sliderBox({
        slider_step: 500,
        slider_wapper: "#wapper",
        slider_box: "#slider",
        slider_focus: "#focus",
        slider_a: ['.left', '.right'],
        focusTriggerType: 'hover',
        autoplay: 2000
    })
</script>
```



| param            | type   | value                                          |
| ---------------- | ------ | ---------------------------------------------- |
| slider_step      | number | 默认400，步长：每一次移动的距离                |
| slider_wapper    | String | 默认空，轮播图的最大容器，用于添加鼠标移入移出 |
| slider_box       | String | 默认空，需要移动的容器                         |
| slider_focus     | String | 默认空，轮播图下方小圆点的容器                 |
| slider_a         | Array  | 默认空，左右的click容器（next，prev）          |
| focusTriggerType | String | 默认“hover” 小圆点触发事件                     |
| autoplay         | Number | 默认0 则不轮播                                 |

