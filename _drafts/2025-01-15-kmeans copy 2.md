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
from js import document
# Set up matplotlib to work in the browser
import matplotlib
matplotlib.use('module://matplotlib_pyodide.html5_canvas_backend')

import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from matplotlib.widgets import Button

def generate_data():
    np.random.seed(1)
    data1 = np.random.normal(loc=[2, 2], scale=1, size=(100, 2))
    data2 = np.random.normal(loc=[6, 6], scale=1, size=(100, 2))
    data3 = np.random.normal(loc=[10, 2], scale=1, size=(100, 2))
    return np.vstack([data1, data2, data3])

def initialize_centroids(data, k):
    indices = np.random.choice(len(data), k, replace=False)
    return data[indices]

def assign_clusters(data, centroids):
    distances = np.linalg.norm(data[:, np.newaxis] - centroids, axis=2)
    return np.argmin(distances, axis=1)

def update_centroids(data, labels, k):
    return np.array([data[labels == i].mean(axis=0) for i in range(k)])

def k_means_with_animation(data, k, max_iters=100, tol=1e-4):
    centroids = initialize_centroids(data, k)
    history = []  # To store centroids and labels for each iteration

    for _ in range(max_iters):
        old_centroids = centroids
        labels = assign_clusters(data, centroids)
        centroids = update_centroids(data, labels, k)
        history.append((centroids.copy(), labels.copy()))

        if np.linalg.norm(centroids - old_centroids) < tol:
            break

    return history

# Main
if __name__ == "__main__":
    document.pyodideMplTarget = document.getElementById("plot-container");
    data = generate_data()
    k = 3
    history = k_means_with_animation(data, k)

    # Set up the plot
    fig, ax = plt.subplots()
    scatter = ax.scatter(data[:, 0], data[:, 1], c='gray', marker='o', alpha=0.6, label='Data points')
    centroids_scatter = ax.scatter([], [], c='red', marker='X', s=200, label='Centroids')
    ax.legend()
    ax.set_title("K-Means Clustering")
    ax.set_xlabel("X")
    ax.set_ylabel("Y")

    frame_idx = [0]  # To keep track of the current frame

    def update(frame):
        centroids, labels = history[frame]
        scatter.set_array(labels)
        centroids_scatter.set_offsets(centroids)
        return scatter, centroids_scatter
    
    from matplotlib_pyodide.browser_backend import TimerWasm

    class Timer(TimerWasm):
        def __init__(self, interval=None):
            self._timer = None
            super().__init__(interval=interval)
    ani = FuncAnimation(fig, update, frames=len(history), blit=True,
    event_source=Timer(interval=500), repeat=False)
    fig.canvas.show()
'''
    html = ani.to_jshtml()
    element = document.getElementById(current_target())
    if element.tagName == "SCRIPT":
        element = getattr(element, "target", element)
    element.replaceChildren()
    script_element = document.createRange().createContextualFragment(html)
    element.append(script_element)
'''
    
`);
}
main();
    </script>
</body>
</html>