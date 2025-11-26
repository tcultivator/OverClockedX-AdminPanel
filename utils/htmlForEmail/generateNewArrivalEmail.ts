export function generateNewArrivalEmail({
  product_id,
  productImage,
  productName,
  price,
}: {
  product_id: string;
  productImage: string;
  productName: string;
  price: string;
}) {
  return `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4; padding: 40px 20px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%"
      style="max-width: 600px; margin: 0 auto; background-color: #ffffff;
      border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

      <!-- Header -->
      <tr>
        <td style="padding: 30px 40px; text-align: center; background-color: #1a1a1a; color: #ffffff;">
          <h1 style="margin: 0 0 10px; font-size: 24px;">New Arrival!</h1>
          <p style="margin: 0; font-size: 14px; color: #cccccc;">
            Check out our latest addition!
          </p>
        </td>
      </tr>

      <!-- Product Info -->
      <tr>
        <td style="padding: 40px; text-align: center;">
          <img src="${productImage}" alt="${productName}" width="200"
            style="border-radius: 8px; margin-bottom: 20px;" />
          <h2 style="margin: 0 0 10px; font-size: 20px; color: #333333;">
            ${productName}
          </h2>

          <p style="margin: 0 0 10px; font-size: 16px; color: #333333;">
            Price: ${price}
          </p>


          <a href="https://overclockedx-admin.vercel.app/product/${product_id}"
            style="display: inline-block; padding: 12px 25px; background-color: #ff5555;
            color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">
            View Product
          </a>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding: 20px 40px; background-color: #f4f4f4; text-align: center;
        font-size: 12px; color: #888888;">
          You are receiving this email because you subscribed to new product updates. <br />
          If you wish to unsubscribe, click <a href="#" style="color:#ff5555;">here</a>.
        </td>
      </tr>

    </table>
  </div>
  `;
}
