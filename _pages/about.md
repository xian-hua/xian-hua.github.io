---
layout: about
title: About
permalink: /
subtitle: Tenure-track Associate Professor &middot; Dongguan University of Technology
seo_description: Academic homepage of Xianhua Yu (余显华), a tenure-track Associate Professor at Dongguan University of Technology working on ambient IoT, backscatter communications, semantic communications, low-altitude intelligent networking, and wireless AI.

profile:
  align: right
  image: xianhua-yu.png
  image_alt: Portrait of Xianhua Yu (余显华)
  image_circular: false
  more_info: >
    <p>School of Electrical Engineering and Intelligentization</p>
    <p>Dongguan University of Technology</p>
    <p class="profile-office-start profile-office-line">Office: Room 1004-2, Zone A, Building 1</p>
    <p class="profile-office-line">International Cooperation and Innovation Zone</p>
    <p class="profile-office-line">(国际合作创新区1栋A区1004-2)</p>

selected_papers: false
social: false

announcements:
  enabled: false
  scrollable: true
  limit: 8

latest_posts:
  enabled: false
---

<div class="about-contact-line" aria-label="Contact and academic profile">
  <span class="about-contact-item">Email: <a href="mailto:yuxianhua@dgut.edu.cn">yuxianhua@dgut.edu.cn</a></span>
  <a class="about-contact-item" href="https://scholar.google.com/citations?user=mR4CJ4IAAAAJ" target="_blank" rel="external noopener">Google Scholar</a>
</div>

<p class="research-identity">My research develops signal processing and communication methods for resource-efficient intelligent wireless systems. My current interests include ambient IoT and backscatter communications, semantic communications, and low-altitude intelligent networking. Across these areas, I develop and apply wireless AI and learning-driven signal processing methods.</p>

## About

I am a tenure-track Associate Professor in the School of Electrical Engineering and Intelligentization at Dongguan University of Technology and a member of the Dongguan Strategic Scientist Team. I received my Ph.D. in Electronic Information Technology from Macau University of Science and Technology in 2024 under the supervision of [Prof. Dong Li](https://sites.google.com/view/eedongli). I completed a formal joint dual-degree M.S. program in Electrical Engineering at Tatung University and Iowa State University, with degrees conferred by both institutions in 2020; at Iowa State University, I worked with [Prof. Zhengdao Wang](https://mason.gmu.edu/~zwang52/index.html). I received my B.S. in Electrical Engineering from Tatung University in 2017 and was a postdoctoral fellow at Macau University of Science and Technology from February to December 2024.

## Research Focus

- Ambient IoT and Backscatter Communications
- Semantic Communications
- Low-Altitude Intelligent Networking

<p class="research-methodology"><strong>Methodological Focus:</strong> Wireless AI and Learning-Driven Signal Processing</p>

## [News](/news/)

<div class="news">
  <div class="table-responsive" style="max-height: 60vw">
    <table class="table table-sm table-borderless">
      {% assign recent_news = site.news | reverse %}
      {% for item in recent_news limit: 9 %}
        <tr>
          <th scope="row" style="width: 20%">{{ item.date | date: '%b %Y' }}</th>
          <td>{{ item.content | remove: '<p>' | remove: '</p>' | emojify }}</td>
        </tr>
      {% endfor %}
    </table>
  </div>
</div>
