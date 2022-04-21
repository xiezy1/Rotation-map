class sliderBox {
    constructor({ autoplay = 0, slider_wapper = "", slider_a = "", slider_box = "", slider_step = 0, slider_focus = "", focusTriggerType = 'hover' }) {
        this.focusType = ['hover', 'click']
        this.autoplay = autoplay
        this.focusTriggerType = focusTriggerType
        this.speed = 5
        this.index = 1;
        this.dot = 0;
        this.flog = true;
        this.slider_step = parseInt(slider_step) > 0 ? parseInt(slider_step) : 400
        this.slider_box = this.$(slider_box)[0]
        this.slider_focus = this.$(slider_focus)[0]
        this.slider_wapper = this.$(slider_wapper)[0]

        this.slider_a = slider_a.map(item => {
            return this.$(item)[0]
        })
        this.length = this.slider_focus.children.length
        this.init()
    }

    // 初始化函数
    init() {
        // 检查focusTriggerType 并把hover转为mouseenter
        if (this.focusTriggerType) this.checkFocusType()

        //检查必要容器是否找到，并给小圆点添加事件 
        this.checkContainter()
        let _this = this

        // 鼠标移入移出事件
        this.addEvent(this.slider_wapper, 'mouseenter', function () { this.cancelPlay.call(_this) })
        this.addEvent(this.slider_wapper, 'mouseleave', function () { this.autoPlay.call(_this) })

        // left，right添加事件
        this.slider_a.forEach((item, index) => {
            let _this = this
            if (index == 0) this.addEvent(item, 'click', function () { _this.prev() })
            else this.addEvent(item, 'click', function () { _this.next() })
        })

        // 初始化时设置小圆点样式
        this.setSpanStyle()

        // 如果autoplay有值且不为0时自动轮播
        if (this.autoplay != 0) this.autoPlay()
    }

    // 检查给定的容器是否存在，并给 小圆点添加事件
    checkContainter() {
        if (this.slider_box == null || this.slider_focus == null || this.slider_wapper == null) return new Error(`cannot find element`)
        let children = Array.from(this.slider_focus.children)
        let _this = this
        children.forEach((item, index) => {
            item.index = index + 1
            this.addEvent(item, this.focusTriggerType, function () {
                _this.index = this.index
                _this.changePosition(this.index)
            }, item)
        })

    }

    // 检查配置项是否正确，并把hover，改为mouseenter
    checkFocusType() {
        if (!this.focusType.includes(this.focusTriggerType)) {
            throw new Error(`focusTriggerType: There is no type of ${this.focusTriggerType},
            You can use focusTriggerType:'hover' or 'click'`)
        } else {
            if (this.focusTriggerType == 'hover') this.focusTriggerType = 'mouseover'
        }
    }

    // 添加函数事件，可以改变this指向（可选）
    addEvent(targetEle, EventType, EventFunction, _this, ...arg) {
        try {
            targetEle.addEventListener(EventType, EventFunction.bind(_this || this, arg))
        } catch (error) {
            console.error(error);
        }
    }

    // 下一张图片
    next() {
        if (this.flog) {
            let width = this.slider_step
            this.slider_box.style.left = -this.index * width + 'px'
            this.flog = false
            this.index++
            this.changePosition(this.index)
        }

    }

    // 上一张图片
    prev() {
        if (this.flog) {
            let width = this.slider_step
            this.slider_box.style.left = -this.index * width + 'px'
            this.flog = false
            this.index--
            this.changePosition(this.index)
        }
    }

    // 如函数名一样，改变指定容器的left位置，并修正index和dot
    changePosition(i) {
        this.dot = i - 1
        let _this = this
        let width = this.slider_step
        if (this.dot < 0) this.dot = this.length - 1
        if (this.dot > this.length - 1) this.dot = 0

        this.animation(this.slider_box, -i * width, function () {
            _this.flog = true
        })
        if (i <= 0) {
            _this.index = this.length
        }
        if (i > this.length) {
            _this.index = 1
        }
        this.setSpanStyle()
    }

    // 小圆点样式设置
    setSpanStyle() {
        let item = this.slider_focus.children
        for (let i = 0; i < item.length; i++) {
            item[i].className = ''
        }
        item[this.dot].className = 'active'
    }

    // 动画函数
    animation(ele, target, fn) {
        cancelAnimationFrame(ele.timer || null)
        let left = parseInt(getComputedStyle(this.slider_box)['left'])
        let speed = (target - left) / this.speed
        if (left == target) {
            cancelAnimationFrame(ele.timer)
            if (typeof fn == 'function') fn()
        } else {
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
            ele.style.left = left + speed + 'px'
            ele.timer = requestAnimationFrame(this.animation.bind(this, ele, target, fn))
        }
    }

    // 自动播放
    autoPlay() {
        let _this = this
        this.timer = setInterval(this.next.bind(_this), this.autoplay)
    }

    // 取消自动播放
    cancelPlay() {
        clearInterval(this.timer)
    }

    // 获取dom节点
    $(ele) {
        return document.querySelectorAll(ele)
    }
}