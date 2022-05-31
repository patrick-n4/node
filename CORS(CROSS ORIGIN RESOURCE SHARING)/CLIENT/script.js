fetch("http://localhost:6060/data")
  .then((response) => response.json())
  .then((data) => console.log(data));
