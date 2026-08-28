---
layout: about
title: About
permalink: /
subtitle: Tenure-track Associate Professor &middot; Dongguan University of Technology
seo_description: Academic homepage of Xianhua Yu (余显华), a tenure-track Associate Professor at Dongguan University of Technology working on ambient IoT, backscatter communications, semantic communications, low-altitude intelligent networking, and wireless AI.

profile:
  align: right
  image: xianhua-yu.png
  image_circular: false
  more_info: >
    <p>School of Electrical Engineering and Intelligentization</p>
    <p>Dongguan University of Technology</p>
    <p>Office: Room 1004, Zone A, Building 1, Songshan Lake Campus (新区1栋A区1004)</p>

selected_papers: false
social: false

announcements:
  enabled: false
  scrollable: true
  limit: 8

latest_posts:
  enabled: false
---

<div class="about-academic-links" aria-label="Primary academic links">
  <a href="https://scholar.google.com/citations?user=mR4CJ4IAAAAJ&hl=en" target="_blank" rel="external noopener" aria-label="Google Scholar profile (opens in a new tab)">Google Scholar</a>
  <a href="mailto:yuxianhua@dgut.edu.cn" aria-label="Email Xianhua Yu">Email</a>
  <a href="/cv/" aria-label="Web CV">CV</a>
</div>

<p class="research-identity">My research develops signal-processing and communication methods for resource-efficient intelligent wireless systems. My current interests include ambient IoT and backscatter communications, semantic communications, and low-altitude intelligent networking, with wireless AI serving as a cross-cutting methodology.</p>

## About

I am a tenure-track Associate Professor in the School of Electrical Engineering and Intelligentization at Dongguan University of Technology and a member of the Dongguan Strategic Scientist Team. I received my Ph.D. in Electronic Information Technology from Macau University of Science and Technology in 2024 under the supervision of [Prof. Dong Li](https://sites.google.com/view/eedongli). I completed a formal joint dual-degree M.S. program in Electrical Engineering at Tatung University and Iowa State University, with degrees conferred by both institutions in 2020; at Iowa State University, I worked with [Prof. Zhengdao Wang](https://mason.gmu.edu/~zwang52/index.html). I received my B.S. in Electrical Engineering from Tatung University in 2017 and was a postdoctoral fellow at Macau University of Science and Technology from February to December 2024.

## Research Focus

- Ambient IoT and Backscatter Communications
- Semantic Communications
- Low-Altitude Intelligent Networking

<p class="research-methodology"><strong>Cross-cutting methodology:</strong> Wireless AI and Learning-Driven Signal Processing</p>

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
