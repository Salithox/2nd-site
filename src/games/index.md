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
    <section>
    <h2> My Gaming Collection </h2>
        {% for post in collection.gcollection %}
            <a href="{{ post.url }}"><h4> {{ post.data.title}} </h4></a>
            <p>{{ post.data.desc }}</p>
        {% endfor %}
    </section>
</article>