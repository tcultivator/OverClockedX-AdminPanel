import { GroupedOrder } from "@/types/GroupDataType"

export function GroupOrdersData(data: any) {
    const tempGroup: GroupedOrder[] = []

    for (const product of data) {
        const index = tempGroup.findIndex(
            (g) => g.order_id === product.order_id
        )
        if (index === -1) {
            tempGroup.push({
                order_id: product.order_id,
                email: product.email,
                profile_Image: product.profile_Image,
                reference_id: product.reference_id,
                total_amount: product.total_amount,
                payment_method: product.payment_method,
                payment_status: product.payment_status,
                order_status: product.order_status,
                created_at: product.created_at,
                updated_at: product.updated_at,
                rname: product.rname,
                phone_number: product.phone_number,
                address_line_1: product.address_line_1,
                city_municipality: product.city_municipality,
                barangay: product.barangay,
                province: product.province,
                postal_code: product.postal_code,
                items: [
                    {
                        product_id: product.product_id,
                        product_name: product.product_name,
                        product_image: product.product_image,
                        quantity: product.quantity,
                        price: product.price,
                        sub_total: product.sub_total,
                    },
                ],
            })
        } else {
            tempGroup[index].items.push({
                product_id: product.product_id,
                product_name: product.product_name,
                product_image: product.product_image,
                quantity: product.quantity,
                price: product.price,
                sub_total: product.sub_total,
            })
        }
    }
    return tempGroup
}