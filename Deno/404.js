export default (ctx) => {
    ctx.response .status = 404; 
    ctx.response.body = {error : "Not found"};
  }