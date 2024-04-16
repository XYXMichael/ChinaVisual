var data=[]
fetch("exampledata.csv")
  .then((response) => response.text())
  .then((data) => {
    // 解析 CSV 数据
    const rows = data.split("\n");
    const result = rows.map((row) => {
      const columns = row.split(",");
      const speed = Math.sqrt(columns[6] ** 2 + columns[7] ** 2);
      const angle = Math.atan2(columns[6], columns[7]) * (180 / Math.PI);
      return [columns[11], columns[12], speed, angle]; // 提取第7列和第8列
    });
  });
