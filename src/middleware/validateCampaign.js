function validateCampaign(req, res, next) {

    const { title, price, discount } = req.body;

    if (!title || !price || !discount) {
        
        return res.status(400).json({ error: "Title, price and discount is required" });
      }
      
      next();
    }

    export { validateCampaign }
