---
title: 'Trying out DeepSeek R1'
date: 2025-02-04
permalink: /blog/trying-out-deepseek-r1/
tags:
  - machine learning
  - linear regression
  - pyscript
---

So this model [DeepSeek-R1](https://chat.deepseek.com/) has nice DeepThink feature which have the model monologue in the `<think></think>` tag.

Model is open-sourced, e.g. [DeepSeek R1 on Github](https://github.com/deepseek-ai/DeepSeek-R1)

Here are my thoughts:

# 1. Cool logo.

<html>
<img class="center" src="{{ site.url }}{{ site.baseurl }}/images/deepseek.png">
<figcaption>Whale is cute.</figcaption>
</html>

AI models should have cute animal branding like llama, cats, whales.

# 2. Long think: 7 minutes of thinking with _simple_ question

Give it a **hard** ML research problem, like approximating ReLU with only addition and multiplication.

I managed to let this run for like 7 minutes...


<html>
<img class="center" src="{{ site.url }}{{ site.baseurl }}/images/deepseek_longthink1.png" width="700">
<!-- <figcaption>longthinking</figcaption> -->
</html>

...And answer is worse than ChatGPT.

<html>
<img class="center" src="{{ site.url }}{{ site.baseurl }}/images/deepseek_longthink2.png" width="700">
<!-- <figcaption>bad answer</figcaption> -->
<br>
</html>



# 3. Alignment

For anything geopolitical and genocide. The model print out things and hide, maybe not DeepSeek-R1 itself but the online chat service by DeepSeek has filter.

For religion, I tested for Islam -- this model is aligned to respect muslims.

Tried to ask it to print out pages of verses of [surah al-Baqarah](https://quran.com/ms/al-baqarah), it declined and declined.


<html>
<img class="center" src="{{ site.url }}{{ site.baseurl }}/images/deepseek_quran1.png" width="700">
<!-- <figcaption>short thinking</figcaption> -->
</html>

---

<html>
<img class="center" src="{{ site.url }}{{ site.baseurl }}/images/deepseek_quran2.png" width="700">
<!-- <figcaption>Ok...</figcaption> -->
</html>

---

<html>
<img class="center" src="{{ site.url }}{{ site.baseurl }}/images/deepseek_quran3.png" width="700">
<!-- <figcaption>Skip</figcaption> -->
</html>

Despite being AI, it has much more decency than human beings who corrupted text and claimed that text is word of God.

# Conclusion

There are other nice things like Search feature, but seems not available on locally downloaded DeepSeek-R1.

Will it replace ChatGPT? ChatGPT still has easy-to-use coding canvas, analyze feature (asking to plot, it will write Python code), and search feature.

Also recently ChatGPT has released reasoning feature on free tier.