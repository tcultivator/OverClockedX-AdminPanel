export function generatePromotionEmail({
  productImage,
  productName,
  price,
  promotionType,
  promotionValue,
  promotionEndDate,
}: {
  productImage: string;       
  productName: string;
  price: string;              
  promotionType: "Flash Sale" | "Discounted Products";
  promotionValue: string;     
  promotionEndDate: string;   
}) {
  return `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4; padding: 40px 20px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <tr>
        <td style="padding: 30px 40px; text-align: center; background-color: #1a1a1a; color: #ffffff;">
          <h1 style="margin: 0 0 10px; font-size: 24px;">${promotionType}!</h1>
          <p style="margin: 0; font-size: 14px; color: #cccccc;">
            Don’t miss this exclusive offer!
          </p>
        </td>
      </tr>

      <!-- Product Info -->
      <tr>
        <td style="padding: 40px; text-align: center;">
          <img src="${productImage}" alt="${productName}" width="200" style="border-radius: 8px; margin-bottom: 20px;" />
          <h2 style="margin: 0 0 10px; font-size: 20px; color: #333333;">${productName}</h2>
          <p style="margin: 0 0 10px; font-size: 16px; color: #333333;">Price: ${price}</p>
          <p style="margin: 0 0 20px; font-size: 16px; color: #ff5555; font-weight: bold;">
            Promotion: ${promotionValue} off
          </p>
          <p style="margin: 0 0 30px; font-size: 14px; color: #555555;">
            Hurry! Offer ends on ${promotionEndDate}.
          </p>
          <a href="http://overclockedx.onrender.com" style="display: inline-block; padding: 12px 25px; background-color: #ff5555; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">Shop Now</a>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding: 20px 40px; background-color: #f4f4f4; text-align: center; font-size: 12px; color: #888888;">
          You are receiving this email because you subscribed to our NewsLetter. <br />
          If you wish to unsubscribe, click <a href="#" style="color:#ff5555;">here</a>.
        </td>
      </tr>

    </table>
  </div>
  `;
}
