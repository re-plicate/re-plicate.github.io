# 如何在文章中添加图片和视频 - 示例

## 方法 1: 添加单张图片

使用标准的 Markdown 图片语法：

```markdown
![图片描述](static/assets/img/your-image.jpg)
```

或者使用 HTML 的 figure 标签（推荐，支持标题）：

```markdown
<figure>
  <img src="static/assets/img/your-image.jpg" alt="图片描述">
  <figcaption>这是图片的说明文字</figcaption>
</figure>
```

## 方法 2: 添加视频

### 本地视频文件：

```markdown
<video controls width="100%">
  <source src="static/assets/video/your-video.mp4" type="video/mp4">
  您的浏览器不支持视频标签。
</video>
```

### YouTube 或其他在线视频：

```html
<div class="video-wrapper">
  <iframe 
    src="https://www.youtube.com/embed/VIDEO_ID" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>
```

## 方法 3: 多图网格展示

```html
<div class="image-grid">
  <img src="static/assets/img/image1.jpg" alt="图片1">
  <img src="static/assets/img/image2.jpg" alt="图片2">
  <img src="static/assets/img/image3.jpg" alt="图片3">
</div>
```

## 实际使用示例（Publications）

- <strong>Jinhui Ouyang</strong>, Mingzhu Wu, Xinglin Li, Hanhui Deng, Zhanpeng Jin, Di Wu. "NeuroBCI: Multi-Brain to Multi-Robot Interaction through EEG-Adaptive Neural Networks and Semantic Communications." IEEE Transactions on Mobile Computing (TMC), 2024.

<figure>
  <img src="static/assets/img/neurobci-demo.jpg" alt="NeuroBCI 系统演示">
  <figcaption>图1: NeuroBCI 系统架构和实验结果</figcaption>
</figure>

- <strong>Jinhui Ouyang</strong>, Mingxia Yu, Weiren Yu, Zheng Qin, Amelia C Regan, Di Wu. "TPGraph: A Spatial-Temporal Graph Learning Framework for Accurate Traffic Prediction on Arterial Roads." IEEE Transactions on Intelligent Transportation Systems (T-ITS), 2024.

<figure>
  <img src="static/assets/img/tpgraph-results.jpg" alt="TPGraph 实验结果">
  <figcaption>图2: TPGraph 在交通预测任务上的性能表现</figcaption>
</figure>

<!-- 视频示例 -->
<div class="video-wrapper">
  <iframe 
    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>

