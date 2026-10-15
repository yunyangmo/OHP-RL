# OHP-RL project webpage

## 打开与部署

解压完整文件夹，直接打开 `index.html`。无需安装依赖或执行构建。
上传静态网站时，上传 `OHP_RL_Project/` 内的所有文件并保留目录结构。
如浏览器限制本地视频读取，可在此目录运行 `python3 -m http.server 8000`，
然后访问 `http://localhost:8000`。

## 修改

- `index.html`：标题、作者、单位、摘要、各模块及 BibTeX。
- `style.css`：配色、字号、留白、响应式布局。
- `app.js`：三个训练任务的切换与 BibTeX 复制。
- `citation.bib`：可下载的 arXiv 引用。
- `assets/images/`：原始实验设计 PNG、矢量方法图及视频封面。
- `assets/videos/`：三段训练录像与一段三任务合并的推理录像。
- `assets/papers/method.pdf`：用户提供的方法图原 PDF。

## 行为与清晰度

训练区只有一个播放器。点击 Press Bell / Push Ball / Move Sand Bag 会选择
并播放该任务；其他任务视频不会显示，也不会同时播放。推理区使用提供的
Inference.mp4 原片，三任务已经在同一个视频中。训练与推理播放器会互相暂停，
避免同时播放。首次打开页面不会自动播放。

实验设计图逐字节保留原 PNG，点击可打开原图。方法图由原 PDF 导出为矢量 SVG，
文字/线条可缩放，另含清晰 PNG 回退和原 PDF。视频只调整 MP4 容器以支持快速
在线起播；压缩视频流、原始分辨率、帧率、总帧数和播放速度均保持不变。
网页无第三方字体、CDN、框架或后端依赖；仅论文链接访问 arXiv。

## 论文信息

Title: OHP-RL: Online Human Preference as Guidance in Reinforcement Learning for Robot Manipulation
Authors: Yunyang Mo*, Jian Li*, Qiwei Wu, Yihang Kang, Renjing Xu†
Affiliation: The Hong Kong University of Science and Technology (Guangzhou)
* Equal contribution; † Corresponding author.
Paper: https://arxiv.org/abs/2605.15971
Status: Accepted at IEEE Robotics and Automation Letters (RA-L).

作者与单位根据提供过的 OHP-RL 论文首页核对。网页使用此次给定摘要，加粗了核心词组，
没有改写摘要内容。BibTeX 目前引用 arXiv 并注明 RA-L 已接收；正式期刊卷号、页码、
DOI 公布后可更新 `index.html` 与 `citation.bib`。页面没有添加未提供的实验数值。

## 验证范围

已检查全部素材引用、原视频数据一致性、任务切换/互斥播放、键盘操作、BibTeX 复制
和无剪贴板权限时的回退。方法图和视频封面已做视觉检查。未做真实浏览器页面渲染测试。
