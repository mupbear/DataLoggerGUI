
export class GraphColors {
  public getFixedColors(index: number): string {
    const colors = [
      '#1f77b4', // blue
      '#ff7f0e', // orange
      '#2ca02c', // green
      '#d62728', // red
      '#9467bd', // purple
      '#8c564b', // brown
      '#e377c2', // pink
      '#7f7f7f', // gray
    ];

    return colors[index % colors.length];
  }
}


