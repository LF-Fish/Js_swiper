let img_box = document.querySelector('.img_box')
let imgs = document.querySelectorAll('img')
let sel_box = document.querySelector('.sel_box')
let lis = sel_box.querySelectorAll('li')
let left_btn = document.querySelector('.left_btn')
let right_btn = document.querySelector('.right_btn')
let banner = document.querySelector('.banner')

// 记录第几张图片
let index = 0
let timer = null // 定时器

// 设置图片容器大小
// imgContainerW：img_box本身宽度，为400
let imgContainerW = img_box.offsetWidth
img_box.style.width = imgContainerW * imgs.length + 'px'

// 设置小圆点初始样式
lis[0].className = 'cur'

function swapImg() {
    // 修改img_box的定位，往左偏移 index * imgContainerW
    img_box.style.left = -index * imgContainerW + 'px';

    // 排他算法
    for (let i = 0; i < lis.length; i++) {
        lis[i].className = ''
    }
    // 修改当前小圆点的样式
    lis[index].className = 'cur'
}

function swapFormat() {
    // 进入下一张图片
    index++
    // 判断如果是最后一张
    if (index >= 3) {
        // 防止频繁点击，进行类似防抖的处理
        index = 3
        img_box.style.transition = 'all linear 1.5s'
        img_box.style.left = -index * imgContainerW + 'px'
        for (let i = 0; i < lis.length; i++) {
            lis[i].className = '';
        }
        lis[0].className = 'cur'

        // 实现无缝衔接
        setTimeout(() => {
            index = 0
            // 无过渡
            img_box.style.transition = ''
            swapImg()
        }, 1500)
    }
    // 如果是其他图片，正常过渡
    else {
        img_box.style.transition = 'all linear 1.5s'
        swapImg()
    }
}

// 添加定时器调用函数
timer = setInterval(swapFormat, 3000)

// 点击右箭头，图片移动方式与自动播放一样
right_btn.addEventListener('click', () => {
    swapFormat();
})

// 点击左箭头
left_btn.addEventListener('click', () => {
    index--
    if (index < 0) {
        index = -1
        img_box.style.transition = 'all linear 1.5s'
        img_box.style.left = -index * imgContainerW + 'px'
        for (let i = 0; i < lis.length; i++) {
            lis[i].className = '';
        }
        // 修改小图标的样式
        lis[2].className = 'cur'

        // 无缝衔接
        setTimeout(() => {
            index = 2
            img_box.style.transition = ''
            swapImg()
        }, 1500)
    }
    else {
        img_box.style.transition = 'all linear 1.5s';
        swapImg();
    }
})

// 小圆点绑定点击事件
sel_box.addEventListener('click', (e) => {
    let li = e.target
    let cur_index = li.getAttribute('data-index')
    index = cur_index
    img_box.style.transition = 'all linear 1.5s'
    swapImg()
})

// 当鼠标在图片上、左箭头、右箭头、小圆点时清除定时器
img_box.addEventListener('mouseover', () => {
    clearInterval(timer)
})
right_btn.addEventListener('mouseover', () => {
    clearInterval(timer)
})

left_btn.addEventListener('mouseover', () => {
    clearInterval(timer)
})

sel_box.addEventListener('mouseover', () => {
    clearInterval(timer)
})

// 当鼠标离开图片、左箭头、右箭头时开启定时器，即图片继续轮播
img_box.addEventListener('mouseout', () => {
    timer = setInterval(swapFormat, 3000)
})

left_btn.addEventListener('mouseout', () => {
    timer = setInterval(swapFormat, 3000)
})

right_btn.addEventListener('mouseout', () => {
    timer = setInterval(swapFormat, 3000)
})

sel_box.addEventListener('mouseover', () => {
    timer = setInterval(swapFormat, 3000)
})

// 箭头隐藏和显示
banner.addEventListener('mouseenter', () => {
    left_btn.style.display = 'block'
    right_btn.style.display = 'block'
})
banner.addEventListener('mouseleave',()=>{
    left_btn.style.display = 'none'
    right_btn.style.display = 'none'
})