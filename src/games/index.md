---
layout: base.njk
title: "Games"
---

<article>
    <section>
    <h2> Collections </h2>
    <ul>
        {% for post in collections.games | reverse %}
            <li class="auto"><a href="{{ post.url }}">{{ post.data.title }}</a> - {{ post.data.desc }}</li>
        {% endfor %}
    </ul>
    </section>
</article>