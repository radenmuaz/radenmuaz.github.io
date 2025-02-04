---
title: 'Linear Regression (with Pyscript demo)'
date: 2025-02-01
permalink: /blog/linear-regression/
tags:
  - machine learning
  - linear regression
  - pyscript
---

<!-- <html>
<img class="center" src="{{ site.url }}{{ site.baseurl }}/images/kmeans.png" width="400">
<figcaption>Figure 1: Linear regression on 2D dataset/figcaption>
</html> -->

<!-- \newcommand{\unit}[1]{[\mathrm{#1}]} -->
<html>
<img class="center" src="{{ site.url }}{{ site.baseurl }}/images/linear_regression.png" width="400">
<figcaption>Figure 1: Linear regression on 2D dataset</figcaption>
</html>

## Introduction
Linear regression models the relationship between a dependent variable $$y$$ and independent variables $$X$$ as a linear function. It finds coefficients $$\beta$$ that minimize the error between predicted and actual values.

---

## Mathematical Formulation

The dataset is labelled, $$(\mathbf X, \mathbf y)$$, and is assumed to follow this equation:

$$
\mathbf{y} = \mathbf{X\mathbf W } + b + \mathbf{\epsilon}
$$

Where:
- $$\mathbf{y} \in \mathbb{R}^{m}$$: Target vector ($$m$$ is the number of samples)
- $$\mathbf{X} \in \mathbb{R}^{m \times d}$$: Feature matrix with $$d$$ features (including a column of ones for the intercept)
- $$\b\in \mathbb{R}^{m}$$: Target vector ($$m$$ is the number of samples)
- $$\mathbf W \in \mathbb{R}^{d}$$: Coefficients vector
- $$\boldsymbol \epsilon \sim \mathcal{N}(0, \sigma^2 \mathbf I)\in \mathbb{R}^{m}$$: Error term (Gaussian noise with variance $$\sigma^2$$ )


The model is given by

$$
\mathbf{\hat y} = \mathbf X \mathbf W 
$$


The optimal $$\mathbf W$$ minimizes the Mean Squared Error (MSE):

$$
\text{MSE}(\mathbf W) = \frac{1}{m} \|\mathbf X\mathbf W\ - \mathbf y \|^2
= \frac{1}{m} (\mathbf X\mathbf W\ - \mathbf y )^\top(\mathbf X\mathbf W\ - \mathbf y)
$$


## Training

tl;dr
 
- **Gradient equation**:
  $$
  \nabla_{\mathbf W} J(\mathbf W) = \frac{1}{m} \mathbf X^\top (\mathbf X \mathbf W - \mathbf y) + \lambda \mathbf W
  $$

- **Closed-form solution**:
  $$
  \mathbf W = (\mathbf X^\top \mathbf X + \lambda \mathbf I)^{-1} \mathbf X^\top \mathbf y
  $$


Where $$ \lambda $$ hyperparameter for L2 regularization of $$ \mathbf W $$ and $$ \mathbf I $$ is identity matrix.

### Derivation

The loss funtion is the MSE:

$$
J(\mathbf W) = \text{MSE}(\mathbf W) = \frac{1}{m} \|\mathbf X\mathbf W\ - \mathbf y \|^2
$$

Also, L2 regularization onto $$\mathbf W$$ can be added to penalize large coefficients in $$\mathbf W$$. In literature this is known as _ridge regression_.

$$
\lambda\|\mathbf W\|^2 = \lambda \mathbf W^\top \mathbf W
$$

where $$ \lambda $$ is the regularization parameter that controls the strength of the regularization.

Now, the full cost function $$ J(\mathbf W) $$ becomes:

$$
J(\mathbf W) = \frac{1}{m} \|\mathbf X \mathbf W - \mathbf y\|^2 + \lambda \|\mathbf W\|^2
$$

We multiply by $$ \frac{1}{2} $$ to help cancel extra $$2$$ term when computing gradient of $$\|  \|^2 $$ terms:


$$
J(\mathbf W) = \frac{1}{2m} \|\mathbf X \mathbf W - \mathbf y\|^2 + \frac{\lambda}{2} \|\mathbf W\|^2
$$

### 1. Gradient Equation with Regularization:

The derivative of $$ J(\beta) $$ with respect to $$ \beta $$, is the gradient:

$$
\nabla_{\mathbf W} J(\mathbf W) = \frac{1}{m} \mathbf X^\top (\mathbf X \mathbf W - \mathbf y) + \lambda \mathbf W
$$


This gradient can be used in gradient descent to iteratively update $$ \beta $$:

$$
\mathbf W = \mathbf W - \alpha \nabla_{\mathbf W} J(\mathbf W)
$$

Where $$ \alpha $$ is the learning rate.

### 2. Closed Form Solution (Normal Equation with Regularization):

Taking the derivative of $$ J(\beta) $$ with respect to $$ \beta $$ and setting it to zero:

$$
\nabla_{\mathbf W} J(\mathbf W) = \frac{1}{m} \mathbf X^\top (\mathbf X \mathbf W - \mathbf y) + \lambda \mathbf W = 0
$$

$$\mathbf W $$ can be computed in single shot:

$$
\mathbf W = (\mathbf X^\top \mathbf X + \lambda \mathbf I)^{-1} \mathbf X^\top \mathbf y
$$

Where $$ \mathbf I $$ is identity matrix.



## Python Implementation


**[Open in PyScript.com](https://pyscript.com/@radenmuaz/linear-regression/latest)**

<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <script type="module" src="https://pyscript.net/releases/2024.1.1/core.js"></script>
    </head>
    <body>
        <section class="pyscript">
            <div id="mpl"></div>
            <script type="py"
            src="https://gist.githubusercontent.com/radenmuaz/12e3f31d8dba3a2253f1504960a723ea/raw/c0195b1a5fe821baf7eb2ba4f67bfb18f927fc15/linear_regression.py"
             config='{"packages":["numpy", "matplotlib"], "sync_main_only": true}'>
            </script>
          </section>
    <script src="https://gist.github.com/radenmuaz/12e3f31d8dba3a2253f1504960a723ea.js"></script>
    
  </body>

</html>