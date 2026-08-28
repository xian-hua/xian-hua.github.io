---
layout: about
title: About
permalink: /
subtitle: Tenure-track Associate Professor &middot; Dongguan University of Technology

profile:
  align: right
  image: xianhua-yu.png
  image_circular: false
  more_info: >
    <p>School of Electrical Engineering and Intelligentization</p>
    <p>Dongguan University of Technology</p>
    <p>Office: New Campus, Building 1, Zone A, Room 1004（新区1栋A区1004）</p>
    <p>Email: <a href="mailto:yuxianhua@dgut.edu.cn">yuxianhua@dgut.edu.cn</a></p>

selected_papers: true
social: false

announcements:
  enabled: false
  scrollable: true
  limit: 8

latest_posts:
  enabled: false
---

## About

I joined the School of Electrical Engineering and Intelligentization at Dongguan University of Technology as a tenure-track Associate Professor in December 2024, and I am also a member of the Dongguan Strategic Scientist Team. I received my Ph.D. in Electronic Information Technology from Macau University of Science and Technology in 2024, where I was fortunate to be supervised by [Prof. Dong Li](https://sites.google.com/view/eedongli). I completed a formal joint dual-degree M.S. program in Electrical Engineering at Tatung University and Iowa State University, with degrees conferred by both institutions in 2020; at Iowa State, I had the opportunity to work with [Prof. Zhengdao Wang](https://mason.gmu.edu/~zwang52/index.html). I earned my B.S. in Electrical Engineering from Tatung University in 2017. From February to December 2024, I was a postdoctoral fellow at Macau University of Science and Technology.

## Research Interests

- Ambient IoT
- Semantic Communication
- Low-altitude Intelligent Networking
- Wireless AI

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
