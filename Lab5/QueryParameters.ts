export default function QueryParameters(app) {
  const calculator = (req, res) => {
    const { a, b, operation } = req.query;
    let result: number | string = 0;
    switch (operation) {
      case "add":
        result = parseInt(a) + parseInt(b);
        break;
      case "subtract":
        result = parseInt(a) - parseInt(b);
        break;
      case "multiply": {
        const num1 = parseInt(a);
        const num2 = parseInt(b);
        result = num1 * num2;
        break;
      }
      case "divide": {
        const num1 = parseInt(a);
        const num2 = parseInt(b);
        result = num1 / num2;
        break;
      }
      default:
        result = "Invalid operation";
    }
    res.send(result.toString());
  };
  app.get("/lab5/calculator", calculator);
}
