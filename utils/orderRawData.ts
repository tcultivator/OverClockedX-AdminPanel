import { GroupedOrder } from "@/types/GroupDataType"
export const orderRawData: GroupedOrder[] = [
  {
    "order_id": 1001,
    "email": "user1001@email.com",
    "profile_Image": "https://example.com/profile/1.png",
    "reference_id": "REF-1001",
    "total_amount": 750,
    "payment_method": "GCash",
    "payment_status": "pending",
    "order_status": "pending",
    "created_at": "2026-02-05T10:01:11.535Z",
    "rname": "Juan Dela Cruz",
    "phone_number": "09172411604",
    "address_line_1": "Block 9 Lot 8",
    "city_municipality": "Makati",
    "barangay": "Poblacion",
    "province": "Metro Manila",
    "postal_code": "1210",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1001-1",
        "product_name": "Pasta",
        "product_image": "https://example.com/products/pasta.png",
        "quantity": 1,
        "price": 300,
        "sub_total": 300
      },
      {
        "product_id": "P-1001-2",
        "product_name": "Fries",
        "product_image": "https://example.com/products/fries.png",
        "quantity": 1,
        "price": 150,
        "sub_total": 150
      },
      {
        "product_id": "P-1001-3",
        "product_name": "Fries",
        "product_image": "https://example.com/products/fries.png",
        "quantity": 2,
        "price": 150,
        "sub_total": 300
      }
    ]
  },
  {
    "order_id": 1002,
    "email": "user1002@email.com",
    "profile_Image": "https://example.com/profile/2.png",
    "reference_id": "REF-1002",
    "total_amount": 2400,
    "payment_method": "PayMaya",
    "payment_status": "pending",
    "order_status": "success",
    "created_at": "2026-02-05T10:01:11.536Z",
    "rname": "Maria Santos",
    "phone_number": "09175309815",
    "address_line_1": "Block 6 Lot 5",
    "city_municipality": "Pasig",
    "barangay": "Rosario",
    "province": "Metro Manila",
    "postal_code": "1609",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1002-1",
        "product_name": "Fries",
        "product_image": "https://example.com/products/fries.png",
        "quantity": 4,
        "price": 150,
        "sub_total": 600
      },
      {
        "product_id": "P-1002-2",
        "product_name": "Chicken Meal",
        "product_image": "https://example.com/products/chicken-meal.png",
        "quantity": 4,
        "price": 450,
        "sub_total": 1800
      }
    ]
  },
  {
    "order_id": 1003,
    "email": "user1003@email.com",
    "profile_Image": "https://example.com/profile/3.png",
    "reference_id": "REF-1003",
    "total_amount": 480,
    "payment_method": "COD",
    "payment_status": "pending",
    "order_status": "cancel",
    "created_at": "2026-02-04T10:01:11.536Z",
    "rname": "Pedro Ramirez",
    "phone_number": "09179607709",
    "address_line_1": "Block 4 Lot 18",
    "city_municipality": "Quezon City",
    "barangay": "Commonwealth",
    "province": "Metro Manila",
    "postal_code": "1121",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1003-1",
        "product_name": "Softdrink",
        "product_image": "https://example.com/products/softdrink.png",
        "quantity": 3,
        "price": 60,
        "sub_total": 180
      },
      {
        "product_id": "P-1003-2",
        "product_name": "Pasta",
        "product_image": "https://example.com/products/pasta.png",
        "quantity": 1,
        "price": 300,
        "sub_total": 300
      }
    ]
  },
  {
    "order_id": 1004,
    "email": "user1004@email.com",
    "profile_Image": "https://example.com/profile/4.png",
    "reference_id": "REF-1004",
    "total_amount": 450,
    "payment_method": "COD",
    "payment_status": "pending",
    "order_status": "pending",
    "created_at": "2026-02-09T10:01:11.536Z",
    "rname": "Ana Lopez",
    "phone_number": "09172601214",
    "address_line_1": "Block 2 Lot 15",
    "city_municipality": "Quezon City",
    "barangay": "Commonwealth",
    "province": "Metro Manila",
    "postal_code": "1121",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1004-1",
        "product_name": "Chicken Meal",
        "product_image": "https://example.com/products/chicken-meal.png",
        "quantity": 1,
        "price": 450,
        "sub_total": 450
      }
    ]
  },
  {
    "order_id": 1005,
    "email": "user1005@email.com",
    "profile_Image": "https://example.com/profile/5.png",
    "reference_id": "REF-1005",
    "total_amount": 1595,
    "payment_method": "PayMaya",
    "payment_status": "cancel",
    "order_status": "success",
    "created_at": "2026-02-03T10:01:11.536Z",
    "rname": "Mark Villanueva",
    "phone_number": "09173346842",
    "address_line_1": "Block 6 Lot 2",
    "city_municipality": "Caloocan",
    "barangay": "Bagong Silang",
    "province": "Metro Manila",
    "postal_code": "1428",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1005-1",
        "product_name": "Chicken Meal",
        "product_image": "https://example.com/products/chicken-meal.png",
        "quantity": 3,
        "price": 450,
        "sub_total": 1350
      },
      {
        "product_id": "P-1005-2",
        "product_name": "Rice Meal",
        "product_image": "https://example.com/products/rice-meal.png",
        "quantity": 1,
        "price": 245,
        "sub_total": 245
      }
    ]
  },
  {
    "order_id": 1006,
    "email": "user1006@email.com",
    "profile_Image": "https://example.com/profile/6.png",
    "reference_id": "REF-1006",
    "total_amount": 5735,
    "payment_method": "PayMaya",
    "payment_status": "pending",
    "order_status": "success",
    "created_at": "2026-02-03T10:01:11.536Z",
    "rname": "Carlo Reyes",
    "phone_number": "09179570473",
    "address_line_1": "Block 9 Lot 1",
    "city_municipality": "Taguig",
    "barangay": "BGC",
    "province": "Metro Manila",
    "postal_code": "1630",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1006-1",
        "product_name": "Rice Meal",
        "product_image": "https://example.com/products/rice-meal.png",
        "quantity": 3,
        "price": 245,
        "sub_total": 735
      },
      {
        "product_id": "P-1006-2",
        "product_name": "Pizza",
        "product_image": "https://example.com/products/pizza.png",
        "quantity": 4,
        "price": 800,
        "sub_total": 3200
      },
      {
        "product_id": "P-1006-3",
        "product_name": "Chicken Meal",
        "product_image": "https://example.com/products/chicken-meal.png",
        "quantity": 4,
        "price": 450,
        "sub_total": 1800
      }
    ]
  },
  {
    "order_id": 1007,
    "email": "user1007@email.com",
    "profile_Image": "https://example.com/profile/7.png",
    "reference_id": "REF-1007",
    "total_amount": 900,
    "payment_method": "GCash",
    "payment_status": "pending",
    "order_status": "On Delivery",
    "created_at": "2026-02-03T10:01:11.536Z",
    "rname": "Jenny Bautista",
    "phone_number": "09177613459",
    "address_line_1": "Block 8 Lot 7",
    "city_municipality": "Quezon City",
    "barangay": "Commonwealth",
    "province": "Metro Manila",
    "postal_code": "1121",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1007-1",
        "product_name": "Chicken Meal",
        "product_image": "https://example.com/products/chicken-meal.png",
        "quantity": 2,
        "price": 450,
        "sub_total": 900
      }
    ]
  },
  {
    "order_id": 1008,
    "email": "user1008@email.com",
    "profile_Image": "https://example.com/profile/8.png",
    "reference_id": "REF-1008",
    "total_amount": 900,
    "payment_method": "PayMaya",
    "payment_status": "cancel",
    "order_status": "success",
    "created_at": "2026-02-09T10:01:11.536Z",
    "rname": "Paolo Mendoza",
    "phone_number": "09172516225",
    "address_line_1": "Block 9 Lot 4",
    "city_municipality": "Makati",
    "barangay": "Poblacion",
    "province": "Metro Manila",
    "postal_code": "1210",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1008-1",
        "product_name": "Chicken Meal",
        "product_image": "https://example.com/products/chicken-meal.png",
        "quantity": 2,
        "price": 450,
        "sub_total": 900
      }
    ]
  },
  {
    "order_id": 1009,
    "email": "user1009@email.com",
    "profile_Image": "https://example.com/profile/1.png",
    "reference_id": "REF-1009",
    "total_amount": 245,
    "payment_method": "GCash",
    "payment_status": "success",
    "order_status": "pending",
    "created_at": "2026-02-10T10:01:11.536Z",
    "rname": "Juan Dela Cruz",
    "phone_number": "09171665274",
    "address_line_1": "Block 7 Lot 10",
    "city_municipality": "Pasig",
    "barangay": "Rosario",
    "province": "Metro Manila",
    "postal_code": "1609",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1009-1",
        "product_name": "Rice Meal",
        "product_image": "https://example.com/products/rice-meal.png",
        "quantity": 1,
        "price": 245,
        "sub_total": 245
      }
    ]
  },
  {
    "order_id": 1010,
    "email": "user1010@email.com",
    "profile_Image": "https://example.com/profile/2.png",
    "reference_id": "REF-1010",
    "total_amount": 3450,
    "payment_method": "GCash",
    "payment_status": "success",
    "order_status": "success",
    "created_at": "2026-02-06T10:01:11.536Z",
    "rname": "Maria Santos",
    "phone_number": "09174469851",
    "address_line_1": "Block 6 Lot 11",
    "city_municipality": "Quezon City",
    "barangay": "Commonwealth",
    "province": "Metro Manila",
    "postal_code": "1121",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1010-1",
        "product_name": "Chicken Meal",
        "product_image": "https://example.com/products/chicken-meal.png",
        "quantity": 4,
        "price": 450,
        "sub_total": 1800
      },
      {
        "product_id": "P-1010-2",
        "product_name": "Chicken Meal",
        "product_image": "https://example.com/products/chicken-meal.png",
        "quantity": 3,
        "price": 450,
        "sub_total": 1350
      },
      {
        "product_id": "P-1010-3",
        "product_name": "Pasta",
        "product_image": "https://example.com/products/pasta.png",
        "quantity": 1,
        "price": 300,
        "sub_total": 300
      }
    ]
  },
  {
    "order_id": 1011,
    "email": "user1011@email.com",
    "profile_Image": "https://example.com/profile/3.png",
    "reference_id": "REF-1011",
    "total_amount": 600,
    "payment_method": "PayMaya",
    "payment_status": "cancel",
    "order_status": "pending",
    "created_at": "2026-02-07T10:01:11.536Z",
    "rname": "Pedro Ramirez",
    "phone_number": "09174823777",
    "address_line_1": "Block 9 Lot 11",
    "city_municipality": "Makati",
    "barangay": "Poblacion",
    "province": "Metro Manila",
    "postal_code": "1210",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1011-1",
        "product_name": "Fries",
        "product_image": "https://example.com/products/fries.png",
        "quantity": 2,
        "price": 150,
        "sub_total": 300
      },
      {
        "product_id": "P-1011-2",
        "product_name": "Fries",
        "product_image": "https://example.com/products/fries.png",
        "quantity": 2,
        "price": 150,
        "sub_total": 300
      }
    ]
  },
  {
    "order_id": 1012,
    "email": "user1012@email.com",
    "profile_Image": "https://example.com/profile/4.png",
    "reference_id": "REF-1012",
    "total_amount": 840,
    "payment_method": "COD",
    "payment_status": "pending",
    "order_status": "success",
    "created_at": "2026-02-07T10:01:11.536Z",
    "rname": "Ana Lopez",
    "phone_number": "09179103585",
    "address_line_1": "Block 7 Lot 14",
    "city_municipality": "Taguig",
    "barangay": "BGC",
    "province": "Metro Manila",
    "postal_code": "1630",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1012-1",
        "product_name": "Pasta",
        "product_image": "https://example.com/products/pasta.png",
        "quantity": 1,
        "price": 300,
        "sub_total": 300
      },
      {
        "product_id": "P-1012-2",
        "product_name": "Softdrink",
        "product_image": "https://example.com/products/softdrink.png",
        "quantity": 4,
        "price": 60,
        "sub_total": 240
      },
      {
        "product_id": "P-1012-3",
        "product_name": "Pasta",
        "product_image": "https://example.com/products/pasta.png",
        "quantity": 1,
        "price": 300,
        "sub_total": 300
      }
    ]
  },
  {
    "order_id": 1013,
    "email": "user1013@email.com",
    "profile_Image": "https://example.com/profile/5.png",
    "reference_id": "REF-1013",
    "total_amount": 490,
    "payment_method": "COD",
    "payment_status": "cancel",
    "order_status": "cancel",
    "created_at": "2026-02-05T10:01:11.536Z",
    "rname": "Mark Villanueva",
    "phone_number": "09173034406",
    "address_line_1": "Block 8 Lot 11",
    "city_municipality": "Taguig",
    "barangay": "BGC",
    "province": "Metro Manila",
    "postal_code": "1630",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1013-1",
        "product_name": "Rice Meal",
        "product_image": "https://example.com/products/rice-meal.png",
        "quantity": 2,
        "price": 245,
        "sub_total": 490
      }
    ]
  },
  {
    "order_id": 1014,
    "email": "user1014@email.com",
    "profile_Image": "https://example.com/profile/6.png",
    "reference_id": "REF-1014",
    "total_amount": 975,
    "payment_method": "COD",
    "payment_status": "pending",
    "order_status": "preparing",
    "created_at": "2026-02-07T10:01:11.536Z",
    "rname": "Carlo Reyes",
    "phone_number": "09179013069",
    "address_line_1": "Block 4 Lot 19",
    "city_municipality": "Taguig",
    "barangay": "BGC",
    "province": "Metro Manila",
    "postal_code": "1630",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1014-1",
        "product_name": "Rice Meal",
        "product_image": "https://example.com/products/rice-meal.png",
        "quantity": 3,
        "price": 245,
        "sub_total": 735
      },
      {
        "product_id": "P-1014-2",
        "product_name": "Softdrink",
        "product_image": "https://example.com/products/softdrink.png",
        "quantity": 4,
        "price": 60,
        "sub_total": 240
      }
    ]
  },
  {
    "order_id": 1015,
    "email": "user1015@email.com",
    "profile_Image": "https://example.com/profile/7.png",
    "reference_id": "REF-1015",
    "total_amount": 3210,
    "payment_method": "COD",
    "payment_status": "success",
    "order_status": "preparing",
    "created_at": "2026-02-07T10:01:11.536Z",
    "rname": "Jenny Bautista",
    "phone_number": "09171358913",
    "address_line_1": "Block 4 Lot 17",
    "city_municipality": "Pasig",
    "barangay": "Rosario",
    "province": "Metro Manila",
    "postal_code": "1609",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1015-1",
        "product_name": "Softdrink",
        "product_image": "https://example.com/products/softdrink.png",
        "quantity": 1,
        "price": 60,
        "sub_total": 60
      },
      {
        "product_id": "P-1015-2",
        "product_name": "Pizza",
        "product_image": "https://example.com/products/pizza.png",
        "quantity": 3,
        "price": 800,
        "sub_total": 2400
      },
      {
        "product_id": "P-1015-3",
        "product_name": "Burger",
        "product_image": "https://example.com/products/burger.png",
        "quantity": 3,
        "price": 250,
        "sub_total": 750
      }
    ]
  },
  {
    "order_id": 1016,
    "email": "user1016@email.com",
    "profile_Image": "https://example.com/profile/8.png",
    "reference_id": "REF-1016",
    "total_amount": 1950,
    "payment_method": "PayMaya",
    "payment_status": "cancel",
    "order_status": "pending",
    "created_at": "2026-02-05T10:01:11.536Z",
    "rname": "Paolo Mendoza",
    "phone_number": "09178369605",
    "address_line_1": "Block 8 Lot 19",
    "city_municipality": "Caloocan",
    "barangay": "Bagong Silang",
    "province": "Metro Manila",
    "postal_code": "1428",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1016-1",
        "product_name": "Chicken Meal",
        "product_image": "https://example.com/products/chicken-meal.png",
        "quantity": 3,
        "price": 450,
        "sub_total": 1350
      },
      {
        "product_id": "P-1016-2",
        "product_name": "Fries",
        "product_image": "https://example.com/products/fries.png",
        "quantity": 4,
        "price": 150,
        "sub_total": 600
      }
    ]
  },
  {
    "order_id": 1017,
    "email": "user1017@email.com",
    "profile_Image": "https://example.com/profile/1.png",
    "reference_id": "REF-1017",
    "total_amount": 1350,
    "payment_method": "COD",
    "payment_status": "success",
    "order_status": "pending",
    "created_at": "2026-02-04T10:01:11.536Z",
    "rname": "Juan Dela Cruz",
    "phone_number": "09179742359",
    "address_line_1": "Block 7 Lot 2",
    "city_municipality": "Makati",
    "barangay": "Poblacion",
    "province": "Metro Manila",
    "postal_code": "1210",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1017-1",
        "product_name": "Chicken Meal",
        "product_image": "https://example.com/products/chicken-meal.png",
        "quantity": 2,
        "price": 450,
        "sub_total": 900
      },
      {
        "product_id": "P-1017-2",
        "product_name": "Fries",
        "product_image": "https://example.com/products/fries.png",
        "quantity": 3,
        "price": 150,
        "sub_total": 450
      }
    ]
  },
  {
    "order_id": 1018,
    "email": "user1018@email.com",
    "profile_Image": "https://example.com/profile/2.png",
    "reference_id": "REF-1018",
    "total_amount": 4900,
    "payment_method": "COD",
    "payment_status": "pending",
    "order_status": "preparing",
    "created_at": "2026-02-08T10:01:11.536Z",
    "rname": "Maria Santos",
    "phone_number": "09174981712",
    "address_line_1": "Block 10 Lot 1",
    "city_municipality": "Quezon City",
    "barangay": "Commonwealth",
    "province": "Metro Manila",
    "postal_code": "1121",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1018-1",
        "product_name": "Pizza",
        "product_image": "https://example.com/products/pizza.png",
        "quantity": 1,
        "price": 800,
        "sub_total": 800
      },
      {
        "product_id": "P-1018-2",
        "product_name": "Pizza",
        "product_image": "https://example.com/products/pizza.png",
        "quantity": 4,
        "price": 800,
        "sub_total": 3200
      },
      {
        "product_id": "P-1018-3",
        "product_name": "Chicken Meal",
        "product_image": "https://example.com/products/chicken-meal.png",
        "quantity": 2,
        "price": 450,
        "sub_total": 900
      }
    ]
  },
  {
    "order_id": 1019,
    "email": "user1019@email.com",
    "profile_Image": "https://example.com/profile/3.png",
    "reference_id": "REF-1019",
    "total_amount": 1300,
    "payment_method": "COD",
    "payment_status": "pending",
    "order_status": "cancel",
    "created_at": "2026-02-03T10:01:11.536Z",
    "rname": "Pedro Ramirez",
    "phone_number": "09177133312",
    "address_line_1": "Block 8 Lot 19",
    "city_municipality": "Pasig",
    "barangay": "Rosario",
    "province": "Metro Manila",
    "postal_code": "1609",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1019-1",
        "product_name": "Burger",
        "product_image": "https://example.com/products/burger.png",
        "quantity": 4,
        "price": 250,
        "sub_total": 1000
      },
      {
        "product_id": "P-1019-2",
        "product_name": "Fries",
        "product_image": "https://example.com/products/fries.png",
        "quantity": 2,
        "price": 150,
        "sub_total": 300
      }
    ]
  },
  {
    "order_id": 1020,
    "email": "user1020@email.com",
    "profile_Image": "https://example.com/profile/4.png",
    "reference_id": "REF-1020",
    "total_amount": 600,
    "payment_method": "COD",
    "payment_status": "pending",
    "order_status": "preparing",
    "created_at": "2026-02-08T10:01:11.536Z",
    "rname": "Ana Lopez",
    "phone_number": "09172731176",
    "address_line_1": "Block 9 Lot 14",
    "city_municipality": "Taguig",
    "barangay": "BGC",
    "province": "Metro Manila",
    "postal_code": "1630",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1020-1",
        "product_name": "Pasta",
        "product_image": "https://example.com/products/pasta.png",
        "quantity": 2,
        "price": 300,
        "sub_total": 600
      }
    ]
  },
  {
    "order_id": 1021,
    "email": "user1021@email.com",
    "profile_Image": "https://example.com/profile/5.png",
    "reference_id": "REF-1021",
    "total_amount": 500,
    "payment_method": "PayMaya",
    "payment_status": "cancel",
    "order_status": "On Delivery",
    "created_at": "2026-02-09T10:01:11.536Z",
    "rname": "Mark Villanueva",
    "phone_number": "09171096643",
    "address_line_1": "Block 1 Lot 16",
    "city_municipality": "Pasig",
    "barangay": "Rosario",
    "province": "Metro Manila",
    "postal_code": "1609",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1021-1",
        "product_name": "Burger",
        "product_image": "https://example.com/products/burger.png",
        "quantity": 2,
        "price": 250,
        "sub_total": 500
      }
    ]
  },
  {
    "order_id": 1022,
    "email": "user1022@email.com",
    "profile_Image": "https://example.com/profile/6.png",
    "reference_id": "REF-1022",
    "total_amount": 1390,
    "payment_method": "PayMaya",
    "payment_status": "cancel",
    "order_status": "preparing",
    "created_at": "2026-02-08T10:01:11.536Z",
    "rname": "Carlo Reyes",
    "phone_number": "09173623814",
    "address_line_1": "Block 5 Lot 1",
    "city_municipality": "Caloocan",
    "barangay": "Bagong Silang",
    "province": "Metro Manila",
    "postal_code": "1428",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1022-1",
        "product_name": "Rice Meal",
        "product_image": "https://example.com/products/rice-meal.png",
        "quantity": 2,
        "price": 245,
        "sub_total": 490
      },
      {
        "product_id": "P-1022-2",
        "product_name": "Pasta",
        "product_image": "https://example.com/products/pasta.png",
        "quantity": 2,
        "price": 300,
        "sub_total": 600
      },
      {
        "product_id": "P-1022-3",
        "product_name": "Fries",
        "product_image": "https://example.com/products/fries.png",
        "quantity": 2,
        "price": 150,
        "sub_total": 300
      }
    ]
  },
  {
    "order_id": 1023,
    "email": "user1023@email.com",
    "profile_Image": "https://example.com/profile/7.png",
    "reference_id": "REF-1023",
    "total_amount": 1600,
    "payment_method": "PayMaya",
    "payment_status": "success",
    "order_status": "cancel",
    "created_at": "2026-02-05T10:01:11.536Z",
    "rname": "Jenny Bautista",
    "phone_number": "09171710570",
    "address_line_1": "Block 7 Lot 17",
    "city_municipality": "Taguig",
    "barangay": "BGC",
    "province": "Metro Manila",
    "postal_code": "1630",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1023-1",
        "product_name": "Pizza",
        "product_image": "https://example.com/products/pizza.png",
        "quantity": 2,
        "price": 800,
        "sub_total": 1600
      }
    ]
  },
  {
    "order_id": 1024,
    "email": "user1024@email.com",
    "profile_Image": "https://example.com/profile/8.png",
    "reference_id": "REF-1024",
    "total_amount": 2685,
    "payment_method": "GCash",
    "payment_status": "cancel",
    "order_status": "On Delivery",
    "created_at": "2026-02-09T10:01:11.536Z",
    "rname": "Paolo Mendoza",
    "phone_number": "09172890387",
    "address_line_1": "Block 9 Lot 16",
    "city_municipality": "Taguig",
    "barangay": "BGC",
    "province": "Metro Manila",
    "postal_code": "1630",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1024-1",
        "product_name": "Pasta",
        "product_image": "https://example.com/products/pasta.png",
        "quantity": 2,
        "price": 300,
        "sub_total": 600
      },
      {
        "product_id": "P-1024-2",
        "product_name": "Rice Meal",
        "product_image": "https://example.com/products/rice-meal.png",
        "quantity": 3,
        "price": 245,
        "sub_total": 735
      },
      {
        "product_id": "P-1024-3",
        "product_name": "Chicken Meal",
        "product_image": "https://example.com/products/chicken-meal.png",
        "quantity": 3,
        "price": 450,
        "sub_total": 1350
      }
    ]
  },
  {
    "order_id": 1025,
    "email": "user1025@email.com",
    "profile_Image": "https://example.com/profile/1.png",
    "reference_id": "REF-1025",
    "total_amount": 245,
    "payment_method": "PayMaya",
    "payment_status": "cancel",
    "order_status": "preparing",
    "created_at": "2026-02-10T10:01:11.536Z",
    "rname": "Juan Dela Cruz",
    "phone_number": "09176479301",
    "address_line_1": "Block 6 Lot 6",
    "city_municipality": "Quezon City",
    "barangay": "Commonwealth",
    "province": "Metro Manila",
    "postal_code": "1121",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1025-1",
        "product_name": "Rice Meal",
        "product_image": "https://example.com/products/rice-meal.png",
        "quantity": 1,
        "price": 245,
        "sub_total": 245
      }
    ]
  },
  {
    "order_id": 1026,
    "email": "user1026@email.com",
    "profile_Image": "https://example.com/profile/2.png",
    "reference_id": "REF-1026",
    "total_amount": 850,
    "payment_method": "GCash",
    "payment_status": "success",
    "order_status": "On Delivery",
    "created_at": "2026-02-04T10:01:11.536Z",
    "rname": "Maria Santos",
    "phone_number": "09173627995",
    "address_line_1": "Block 9 Lot 6",
    "city_municipality": "Taguig",
    "barangay": "BGC",
    "province": "Metro Manila",
    "postal_code": "1630",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1026-1",
        "product_name": "Burger",
        "product_image": "https://example.com/products/burger.png",
        "quantity": 1,
        "price": 250,
        "sub_total": 250
      },
      {
        "product_id": "P-1026-2",
        "product_name": "Pasta",
        "product_image": "https://example.com/products/pasta.png",
        "quantity": 2,
        "price": 300,
        "sub_total": 600
      }
    ]
  },
  {
    "order_id": 1027,
    "email": "user1027@email.com",
    "profile_Image": "https://example.com/profile/3.png",
    "reference_id": "REF-1027",
    "total_amount": 550,
    "payment_method": "GCash",
    "payment_status": "success",
    "order_status": "pending",
    "created_at": "2026-02-08T10:01:11.536Z",
    "rname": "Pedro Ramirez",
    "phone_number": "09178585786",
    "address_line_1": "Block 4 Lot 9",
    "city_municipality": "Quezon City",
    "barangay": "Commonwealth",
    "province": "Metro Manila",
    "postal_code": "1121",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1027-1",
        "product_name": "Burger",
        "product_image": "https://example.com/products/burger.png",
        "quantity": 1,
        "price": 250,
        "sub_total": 250
      },
      {
        "product_id": "P-1027-2",
        "product_name": "Fries",
        "product_image": "https://example.com/products/fries.png",
        "quantity": 2,
        "price": 150,
        "sub_total": 300
      }
    ]
  },
  {
    "order_id": 1028,
    "email": "user1028@email.com",
    "profile_Image": "https://example.com/profile/4.png",
    "reference_id": "REF-1028",
    "total_amount": 900,
    "payment_method": "GCash",
    "payment_status": "success",
    "order_status": "preparing",
    "created_at": "2026-02-09T10:01:11.536Z",
    "rname": "Ana Lopez",
    "phone_number": "09177425743",
    "address_line_1": "Block 1 Lot 14",
    "city_municipality": "Caloocan",
    "barangay": "Bagong Silang",
    "province": "Metro Manila",
    "postal_code": "1428",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1028-1",
        "product_name": "Chicken Meal",
        "product_image": "https://example.com/products/chicken-meal.png",
        "quantity": 2,
        "price": 450,
        "sub_total": 900
      }
    ]
  },
  {
    "order_id": 1029,
    "email": "user1029@email.com",
    "profile_Image": "https://example.com/profile/5.png",
    "reference_id": "REF-1029",
    "total_amount": 2700,
    "payment_method": "PayMaya",
    "payment_status": "pending",
    "order_status": "success",
    "created_at": "2026-02-04T10:01:11.536Z",
    "rname": "Mark Villanueva",
    "phone_number": "09171651495",
    "address_line_1": "Block 4 Lot 8",
    "city_municipality": "Caloocan",
    "barangay": "Bagong Silang",
    "province": "Metro Manila",
    "postal_code": "1428",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1029-1",
        "product_name": "Pasta",
        "product_image": "https://example.com/products/pasta.png",
        "quantity": 4,
        "price": 300,
        "sub_total": 1200
      },
      {
        "product_id": "P-1029-2",
        "product_name": "Pasta",
        "product_image": "https://example.com/products/pasta.png",
        "quantity": 3,
        "price": 300,
        "sub_total": 900
      },
      {
        "product_id": "P-1029-3",
        "product_name": "Fries",
        "product_image": "https://example.com/products/fries.png",
        "quantity": 4,
        "price": 150,
        "sub_total": 600
      }
    ]
  },
  {
    "order_id": 1030,
    "email": "user1030@email.com",
    "profile_Image": "https://example.com/profile/6.png",
    "reference_id": "REF-1030",
    "total_amount": 1600,
    "payment_method": "COD",
    "payment_status": "pending",
    "order_status": "cancel",
    "created_at": "2026-02-07T10:01:11.536Z",
    "rname": "Carlo Reyes",
    "phone_number": "09171318938",
    "address_line_1": "Block 8 Lot 18",
    "city_municipality": "Quezon City",
    "barangay": "Commonwealth",
    "province": "Metro Manila",
    "postal_code": "1121",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1030-1",
        "product_name": "Pizza",
        "product_image": "https://example.com/products/pizza.png",
        "quantity": 2,
        "price": 800,
        "sub_total": 1600
      }
    ]
  },
  {
    "order_id": 1031,
    "email": "user1031@email.com",
    "profile_Image": "https://example.com/profile/7.png",
    "reference_id": "REF-1031",
    "total_amount": 1590,
    "payment_method": "COD",
    "payment_status": "success",
    "order_status": "pending",
    "created_at": "2026-02-09T10:01:11.536Z",
    "rname": "Jenny Bautista",
    "phone_number": "09174810448",
    "address_line_1": "Block 5 Lot 6",
    "city_municipality": "Makati",
    "barangay": "Poblacion",
    "province": "Metro Manila",
    "postal_code": "1210",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1031-1",
        "product_name": "Softdrink",
        "product_image": "https://example.com/products/softdrink.png",
        "quantity": 4,
        "price": 60,
        "sub_total": 240
      },
      {
        "product_id": "P-1031-2",
        "product_name": "Pasta",
        "product_image": "https://example.com/products/pasta.png",
        "quantity": 3,
        "price": 300,
        "sub_total": 900
      },
      {
        "product_id": "P-1031-3",
        "product_name": "Fries",
        "product_image": "https://example.com/products/fries.png",
        "quantity": 3,
        "price": 150,
        "sub_total": 450
      }
    ]
  },
  {
    "order_id": 1032,
    "email": "user1032@email.com",
    "profile_Image": "https://example.com/profile/8.png",
    "reference_id": "REF-1032",
    "total_amount": 1280,
    "payment_method": "PayMaya",
    "payment_status": "success",
    "order_status": "success",
    "created_at": "2026-02-04T10:01:11.536Z",
    "rname": "Paolo Mendoza",
    "phone_number": "09174917934",
    "address_line_1": "Block 4 Lot 15",
    "city_municipality": "Makati",
    "barangay": "Poblacion",
    "province": "Metro Manila",
    "postal_code": "1210",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1032-1",
        "product_name": "Rice Meal",
        "product_image": "https://example.com/products/rice-meal.png",
        "quantity": 4,
        "price": 245,
        "sub_total": 980
      },
      {
        "product_id": "P-1032-2",
        "product_name": "Fries",
        "product_image": "https://example.com/products/fries.png",
        "quantity": 2,
        "price": 150,
        "sub_total": 300
      }
    ]
  },
  {
    "order_id": 1033,
    "email": "user1033@email.com",
    "profile_Image": "https://example.com/profile/1.png",
    "reference_id": "REF-1033",
    "total_amount": 960,
    "payment_method": "PayMaya",
    "payment_status": "cancel",
    "order_status": "pending",
    "created_at": "2026-02-09T10:01:11.536Z",
    "rname": "Juan Dela Cruz",
    "phone_number": "09176767796",
    "address_line_1": "Block 6 Lot 6",
    "city_municipality": "Taguig",
    "barangay": "BGC",
    "province": "Metro Manila",
    "postal_code": "1630",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1033-1",
        "product_name": "Softdrink",
        "product_image": "https://example.com/products/softdrink.png",
        "quantity": 1,
        "price": 60,
        "sub_total": 60
      },
      {
        "product_id": "P-1033-2",
        "product_name": "Pasta",
        "product_image": "https://example.com/products/pasta.png",
        "quantity": 1,
        "price": 300,
        "sub_total": 300
      },
      {
        "product_id": "P-1033-3",
        "product_name": "Pasta",
        "product_image": "https://example.com/products/pasta.png",
        "quantity": 2,
        "price": 300,
        "sub_total": 600
      }
    ]
  },
  {
    "order_id": 1034,
    "email": "user1034@email.com",
    "profile_Image": "https://example.com/profile/2.png",
    "reference_id": "REF-1034",
    "total_amount": 735,
    "payment_method": "GCash",
    "payment_status": "success",
    "order_status": "success",
    "created_at": "2026-02-10T10:01:11.536Z",
    "rname": "Maria Santos",
    "phone_number": "09174403159",
    "address_line_1": "Block 8 Lot 14",
    "city_municipality": "Makati",
    "barangay": "Poblacion",
    "province": "Metro Manila",
    "postal_code": "1210",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1034-1",
        "product_name": "Rice Meal",
        "product_image": "https://example.com/products/rice-meal.png",
        "quantity": 3,
        "price": 245,
        "sub_total": 735
      }
    ]
  },
  {
    "order_id": 1035,
    "email": "user1035@email.com",
    "profile_Image": "https://example.com/profile/3.png",
    "reference_id": "REF-1035",
    "total_amount": 1530,
    "payment_method": "COD",
    "payment_status": "pending",
    "order_status": "cancel",
    "created_at": "2026-02-04T10:01:11.536Z",
    "rname": "Pedro Ramirez",
    "phone_number": "09178109230",
    "address_line_1": "Block 3 Lot 7",
    "city_municipality": "Makati",
    "barangay": "Poblacion",
    "province": "Metro Manila",
    "postal_code": "1210",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1035-1",
        "product_name": "Pasta",
        "product_image": "https://example.com/products/pasta.png",
        "quantity": 4,
        "price": 300,
        "sub_total": 1200
      },
      {
        "product_id": "P-1035-2",
        "product_name": "Softdrink",
        "product_image": "https://example.com/products/softdrink.png",
        "quantity": 3,
        "price": 60,
        "sub_total": 180
      },
      {
        "product_id": "P-1035-3",
        "product_name": "Fries",
        "product_image": "https://example.com/products/fries.png",
        "quantity": 1,
        "price": 150,
        "sub_total": 150
      }
    ]
  },
  {
    "order_id": 1036,
    "email": "user1036@email.com",
    "profile_Image": "https://example.com/profile/4.png",
    "reference_id": "REF-1036",
    "total_amount": 4850,
    "payment_method": "PayMaya",
    "payment_status": "pending",
    "order_status": "pending",
    "created_at": "2026-02-04T10:01:11.536Z",
    "rname": "Ana Lopez",
    "phone_number": "09178766350",
    "address_line_1": "Block 8 Lot 15",
    "city_municipality": "Makati",
    "barangay": "Poblacion",
    "province": "Metro Manila",
    "postal_code": "1210",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1036-1",
        "product_name": "Fries",
        "product_image": "https://example.com/products/fries.png",
        "quantity": 3,
        "price": 150,
        "sub_total": 450
      },
      {
        "product_id": "P-1036-2",
        "product_name": "Pasta",
        "product_image": "https://example.com/products/pasta.png",
        "quantity": 4,
        "price": 300,
        "sub_total": 1200
      },
      {
        "product_id": "P-1036-3",
        "product_name": "Pizza",
        "product_image": "https://example.com/products/pizza.png",
        "quantity": 4,
        "price": 800,
        "sub_total": 3200
      }
    ]
  },
  {
    "order_id": 1037,
    "email": "user1037@email.com",
    "profile_Image": "https://example.com/profile/5.png",
    "reference_id": "REF-1037",
    "total_amount": 1785,
    "payment_method": "PayMaya",
    "payment_status": "cancel",
    "order_status": "cancel",
    "created_at": "2026-02-07T10:01:11.536Z",
    "rname": "Mark Villanueva",
    "phone_number": "09176984177",
    "address_line_1": "Block 2 Lot 4",
    "city_municipality": "Pasig",
    "barangay": "Rosario",
    "province": "Metro Manila",
    "postal_code": "1609",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1037-1",
        "product_name": "Rice Meal",
        "product_image": "https://example.com/products/rice-meal.png",
        "quantity": 3,
        "price": 245,
        "sub_total": 735
      },
      {
        "product_id": "P-1037-2",
        "product_name": "Burger",
        "product_image": "https://example.com/products/burger.png",
        "quantity": 3,
        "price": 250,
        "sub_total": 750
      },
      {
        "product_id": "P-1037-3",
        "product_name": "Pasta",
        "product_image": "https://example.com/products/pasta.png",
        "quantity": 1,
        "price": 300,
        "sub_total": 300
      }
    ]
  },
  {
    "order_id": 1038,
    "email": "user1038@email.com",
    "profile_Image": "https://example.com/profile/6.png",
    "reference_id": "REF-1038",
    "total_amount": 3435,
    "payment_method": "GCash",
    "payment_status": "cancel",
    "order_status": "preparing",
    "created_at": "2026-02-10T10:01:11.536Z",
    "rname": "Carlo Reyes",
    "phone_number": "09178298212",
    "address_line_1": "Block 5 Lot 16",
    "city_municipality": "Quezon City",
    "barangay": "Commonwealth",
    "province": "Metro Manila",
    "postal_code": "1121",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1038-1",
        "product_name": "Chicken Meal",
        "product_image": "https://example.com/products/chicken-meal.png",
        "quantity": 3,
        "price": 450,
        "sub_total": 1350
      },
      {
        "product_id": "P-1038-2",
        "product_name": "Rice Meal",
        "product_image": "https://example.com/products/rice-meal.png",
        "quantity": 3,
        "price": 245,
        "sub_total": 735
      },
      {
        "product_id": "P-1038-3",
        "product_name": "Chicken Meal",
        "product_image": "https://example.com/products/chicken-meal.png",
        "quantity": 3,
        "price": 450,
        "sub_total": 1350
      }
    ]
  },
  {
    "order_id": 1039,
    "email": "user1039@email.com",
    "profile_Image": "https://example.com/profile/7.png",
    "reference_id": "REF-1039",
    "total_amount": 900,
    "payment_method": "PayMaya",
    "payment_status": "success",
    "order_status": "cancel",
    "created_at": "2026-02-04T10:01:11.536Z",
    "rname": "Jenny Bautista",
    "phone_number": "09173457065",
    "address_line_1": "Block 4 Lot 19",
    "city_municipality": "Pasig",
    "barangay": "Rosario",
    "province": "Metro Manila",
    "postal_code": "1609",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1039-1",
        "product_name": "Pasta",
        "product_image": "https://example.com/products/pasta.png",
        "quantity": 3,
        "price": 300,
        "sub_total": 900
      }
    ]
  },
  {
    "order_id": 1040,
    "email": "user1040@email.com",
    "profile_Image": "https://example.com/profile/8.png",
    "reference_id": "REF-1040",
    "total_amount": 1500,
    "payment_method": "GCash",
    "payment_status": "cancel",
    "order_status": "success",
    "created_at": "2026-02-03T10:01:11.536Z",
    "rname": "Paolo Mendoza",
    "phone_number": "09178287424",
    "address_line_1": "Block 4 Lot 20",
    "city_municipality": "Taguig",
    "barangay": "BGC",
    "province": "Metro Manila",
    "postal_code": "1630",
    "updated_at": "2026-02-10T10:01:11.536Z",
    "items": [
      {
        "product_id": "P-1040-1",
        "product_name": "Pasta",
        "product_image": "https://example.com/products/pasta.png",
        "quantity": 3,
        "price": 300,
        "sub_total": 900
      },
      {
        "product_id": "P-1040-2",
        "product_name": "Fries",
        "product_image": "https://example.com/products/fries.png",
        "quantity": 4,
        "price": 150,
        "sub_total": 600
      }
    ]
  }
]