---
title: 'K-means clustering in pure Python'
date: 2025-01-15
permalink: /posts/2025/01/blog-post-1/
tags:
  - cool posts
  - category1
  - category2
---

K-means clustering is a unsupervised learning to group data points to pre-defined number of groups.

Here with Pyiodide,

<html>
 <head>
  </head>
<body>
    <!-- Container for the plot -->
    <script src="https://cdn.jsdelivr.net/pyodide/v0.27.1/full/pyodide.js"></script>
    <div id="plot-container"></div>

    <script>

async function main() {
// Initialize Pyodide
let pyodide = await loadPyodide();

// Load required packages
await pyodide.loadPackage(["numpy", "matplotlib"]);

// Run Python code
await pyodide.runPython(`
import numpy as np
import matplotlib.pyplot as plt
from js import document

# Set up matplotlib to work in the browser
import matplotlib
matplotlib.use('module://matplotlib_pyodide.html5_canvas_backend')

# Create data
x = np.linspace(0, 10, 50)
y = x  # Simple linear relationship

# Create figure and plot
fig, ax = plt.subplots()
ax.plot(x, y)
ax.set_title('Simple Linear Plot')
ax.set_xlabel('X-axis')
ax.set_ylabel('Y-axis')

document.pyodideMplTarget = document.getElementById("plot-container");

#canvas = fig.canvas.get_element("canvas")  # Correct method for HTML5 backend
#document.getElementById("plot-container").appendChild(canvas)
#document.getElementById("plot-container").appendChild(fig.canvas)

fig.canvas.show()

'''
def get_element(self):
    return document.getElementById('plot-container')

#override create_root_element method of canvas by one of the functions above
fig.canvas.create_root_element = get_element.__get__(
    get_element, fig.canvas.__class__)
fig.canvas.show()
'''
`);
}
main();
    </script>
</body>
</html>