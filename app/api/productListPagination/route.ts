import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { ProductsType } from "@/types/ProductsType";

type Count = { total: number };

export async function GET(req: NextRequest) {
    try {
        const page = Number(req.nextUrl.searchParams.get("page")) || 1;
        const category = req.nextUrl.searchParams.get("category");
        const type = req.nextUrl.searchParams.get("type");
        const field = req.nextUrl.searchParams.get("field");
        const direction = req.nextUrl.searchParams.get("direction");

        // Valid ORDER BY fields
        const allowedFields = ["price", "stocks", "sales_count", "created_at"];
        const allowedDirections = ["ASC", "DESC"];

        const finalField = allowedFields.includes(field || "") ? field : "created_at";
        const finalDirection = allowedDirections.includes(direction || "") ? direction : "DESC";

        const finalOrderBy = ` ORDER BY p.${finalField} ${finalDirection} `;

        // --- CATEGORY / SEARCH LOGIC ---
        let whereClause = "";
        const params: unknown[] = [];

        if (type === "filter") {
            if (category && category !== "all") {
                whereClause = ` WHERE (p.category = ? OR p.parent = ?) `;
                params.push(category, category);
            }
        } else if (type === "search") {
            if (category) {
                whereClause = ` WHERE (p.category LIKE ? OR p.product_name LIKE ? OR p.product_id = ?) `;
                params.push(`%${category}%`, `%${category}%`, category);
            }
        }

        // Count total rows
        const countQuery = `SELECT COUNT(*) AS total FROM products p ${whereClause}`;
        const [countRows] = await db.query(countQuery, params);
        const totalCount = (countRows as Count[])[0].total;

        const limit = 11;
        const totalPages = Math.ceil(totalCount / limit) || 1;

        const finalPage = Math.min(Math.max(page, 1), totalPages);
        const offset = (finalPage - 1) * limit;

        // Get products
        const productsQuery = `
      SELECT 
        p.*,
        promo.value,
        promo.promotion_type
      FROM products p
      LEFT JOIN product_promotion_list promo
        ON promo.product_id = p.product_id 
        AND promo.isActive = 1
        AND promo.end_date > NOW()
      ${whereClause}
      ${finalOrderBy}
      LIMIT ? OFFSET ?
    `;

        const [rows] = await db.query(productsQuery, [...params, limit, offset]);
        const result = rows as ProductsType[];

        return NextResponse.json({
            result,
            totalPages,
            currentPage: finalPage,
        });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ status: 500, error: "Server Error" });
    }
}
