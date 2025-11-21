export type ProductPromotions = {
    product_id: string;
    product_name: string;
    product_image: string;
    brand: string;
    price: number;
    sales_count: number;
    stocks: number;
    base_stocks:number;
    start_date: Date;
    end_date: Date;
    value: number;
    promotion_type: string;
    isActive?: boolean | null;
}