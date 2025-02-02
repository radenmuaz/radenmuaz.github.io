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

## Introduction
Linear regression models the relationship between a dependent variable $$y$$ and independent variables $$X$$ as a linear function. It finds coefficients $$\beta$$ that minimize the error between predicted and actual values.

---

## Mathematical Formulation

The datasetis follows this equation:

$$
\mathbf{y} = \mathbf{X\boldsymbol\beta } + \mathbf{\epsilon}
$$

Where:
- $$\mathbf{y} \in \mathbb{R}^{m}$$: Target vector ($$m$$ is the number of samples)
- $$\mathbf{X} \in \mathbb{R}^{m \times d}$$: Feature matrix with $$d$$ features (including a column of ones for the intercept)
- $$\boldsymbol \beta \in \mathbb{R}^{d}$$: Coefficients vector
- $$\boldsymbol \epsilon \sim \mathcal{N}(0, \sigma^2 \mathbf I)\in \mathbb{R}^{m}$$: Error term (Gaussian noise with variance $$\sigma^2$$ )


The model is given by

$$
\mathbf{\hat y} = \mathbf X \boldsymbol\beta 
$$


The optimal $$\boldsymbol\beta$$ minimizes the Mean Squared Error (MSE):

$$
\text{MSE}(\boldsymbol\beta) = \frac{1}{m} \|\mathbf X\boldsymbol\beta\ - \mathbf y \|^2
= \frac{1}{m} (\mathbf X\boldsymbol\beta\ - \mathbf y )^\top(\mathbf X\boldsymbol\beta\ - \mathbf y)
$$


## Training

tl;dr
 
- **Gradient equation**:
  $$
  \nabla_{\boldsymbol \beta} J(\boldsymbol \beta) = \frac{1}{m} \mathbf X^\top (\mathbf X \boldsymbol \beta - \mathbf y) + \lambda \boldsymbol\beta
  $$

- **Closed-form solution**:
  $$
  \boldsymbol \beta = (\mathbf X^\top \mathbf X + \lambda \mathbf I)^{-1} \mathbf X^\top \mathbf y
  $$


Where $$ \lambda $$ hyperparameter for L2 regularization of $$ \boldsymbol \beta $$ and $$ \mathbf I $$ is identity matrix.

### Derivation

The loss funtion is the MSE:

$$
J(\boldsymbol \beta) = \text{MSE}(\boldsymbol \beta) = \frac{1}{m} \|\mathbf X\boldsymbol \beta\ - \mathbf y \|^2
$$

Also, L2 regularization onto $$\boldsymbol \beta$$ can be added to penalize large coefficients in $$\boldsymbol \beta$$. In literature this is known as _ridge regression_.

$$
\lambda\|\boldsymbol \beta\|^2 = \lambda \boldsymbol \beta^\top \boldsymbol \beta
$$

where $$ \lambda $$ is the regularization parameter that controls the strength of the regularization.

Now, the full cost function $$ J(\boldsymbol \beta) $$ becomes:

$$
J(\boldsymbol \beta) = \frac{1}{m} \|\mathbf X \boldsymbol \beta - \mathbf y\|^2 + \lambda \|\boldsymbol \beta\|^2
$$

$$
J(\boldsymbol \beta) = \frac{1}{2m} \|\mathbf X \boldsymbol \beta - \mathbf y\|^2 + \frac{\lambda}{2} \|\boldsymbol \beta\|^2
$$

### 1. Gradient Equation with Regularization:

The derivative of $$ J(\beta) $$ with respect to $$ \beta $$, is the gradient:

$$
\nabla_{\boldsymbol \beta} J(\boldsymbol \beta) = \frac{1}{m} \mathbf X^\top (\mathbf X \boldsymbol \beta - \mathbf y) + \lambda \boldsymbol \beta
$$


This gradient can be used in gradient descent to iteratively update $$ \beta $$:

$$
\beta = \beta - \alpha \nabla_\beta J(\beta)
$$

Where $$ \alpha $$ is the learning rate.

### 2. Closed Form Solution (Normal Equation with Regularization):

Starting from the gradient equation, set to 0:
Taking the derivative of $$ J(\beta) $$ with respect to $$ \beta $$ and setting it to zero:

$$
\nabla_{\boldsymbol \beta} J(\boldsymbol \beta) = \frac{1}{m} \mathbf X^\top (\mathbf X \boldsymbol \beta - \mathbf y) + \lambda \boldsymbol \beta = 0
$$

Solving for $$\boldsymbol \beta $$:

$$
\boldsymbol \beta = (\mathbf X^\top \mathbf X + \lambda \mathbf I)^{-1} \mathbf X^\top \mathbf y
$$

Where $$ \mathbf I $$ is identity matrix.



## Python Implementation


**[Open in PyScript.com](https://pyscript.com/@radenmuaz/linear-regression/latest)**

<html>
    <head>
        <!-- Recommended meta tags -->
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
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