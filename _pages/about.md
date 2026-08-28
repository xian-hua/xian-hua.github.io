---
layout: about
title: about
permalink: /
subtitle: Associate Professor &middot; Dongguan University of Technology

profile:
  align: right
  image: xianhua-yu.png
  image_circular: false
  more_info: >
    <p>School of Electrical Engineering and Intelligentization</p>
    <p>Dongguan University of Technology</p>
    <p>Dongguan, China</p>

selected_papers: true
social: true

announcements:
  enabled: false
  scrollable: true
  limit: 8

latest_posts:
  enabled: false
---

## About

I joined the School of Electrical Engineering and Intelligentization at Dongguan University of Technology as an Associate Professor in December 2024, and I am also a member of the Dongguan Strategic Scientist Team. I received my Ph.D. degree from Macau University of Science and Technology in 2024, where I was fortunate to be supervised by [Prof. Dong Li](https://sites.google.com/view/eedongli). I obtained a joint M.S. degree from Iowa State University in 2020, where I had the opportunity to work with [Prof. Zhengdao Wang](https://mason.gmu.edu/~zwang52/index.html), and earned my M.S. and B.S. degrees from Tatung University in 2020 and 2017, respectively. Before joining DGUT, I worked as a postdoctoral fellow at Macau University of Science and Technology.

## Research Interests

- Ambient IoT
- Semantic Communication
- Low-altitude Intelligent Networking
- Wireless AI

## Research Grants

- **面向无源物联网的标签通感协同推断与跨场景适配机理研究** — 国家自然科学基金青年科学基金项目（C类），2027–2029，30 万元，主持。
- **面向环境散射通信的无线电检测与并行解码机理研究** — 广东省自然科学基金粤莞青年基金，2025–2027，10 万元，主持。

## Students & People

Verified profiles of current students and group members were not available on the previous website. The [People page](/people/) is ready for confirmed profiles and research roles.

## Contact

For research collaboration and student inquiries, please email [yuxianhua@dgut.edu.cn](mailto:yuxianhua@dgut.edu.cn).

## [News](/news/)

<div class="news">
  <div class="table-responsive" style="max-height: 60vw">
    <table class="table table-sm table-borderless">
      {% assign recent_news = site.news | reverse %}
      {% for item in recent_news limit: 8 %}
        <tr>
          <th scope="row" style="width: 20%">{{ item.date | date: '%b %Y' }}</th>
          <td>{{ item.content | remove: '<p>' | remove: '</p>' | emojify }}</td>
        </tr>
      {% endfor %}
    </table>
  </div>
</div>
