import japaneseCoreMessages from '@bicstone/ra-language-japanese';

const japaneseDomainMessages = {
    pos: {
        search: 'Search',
        configuration: 'Configuration',
        language: 'Language',
        theme: {
            name: 'Theme',
            light: 'Light',
            dark: 'Dark',
        },
        dashboard: {
            monthly_revenue: '当月売上',
            month_history: '売り上げ履歴',
            new_orders: '新規注文',
            new_customers: '新規登録ユーザー',
            all_customers: 'ユーザー一覧',
            pending_orders: 'オーダー：承認待ち',
            order: {
                items:
                    'by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items',
            },
        },
    },
    resources: {
        customer: {
            name: 'ユーザー管理',
            fields: {
                order: 'ユーザー：オーダー履歴',
                display_name: {
                    first_name: '性',
                    last_name: '名',
                    first_name_kata: '性（カナ）',
                    last_name_kata: '名（カナ）',
                },
                address: {
                    postal_code: '郵便番号',
                    prefecture: '都道府県',
                    city: '市区町村',
                    address: '住所',
                    apartment: 'アパートメント名',
                },
                email: 'Eメール',
                nickname: 'ニックネーム',
                brithday: '生年月日',
                total_spent: 'Total spent',
                password: 'パスワード',
                confirm_password: 'パスワード確認',
                last_seen: 'Last seen',
                created_at: '登録日',
            },
            filters: {
                last_visited: 'Last visited',
                today: 'Today',
                this_week: 'This week',
                last_week: 'Last week',
                this_month: 'This month',
                last_month: 'Last month',
                earlier: 'Earlier',
                has_ordered: 'Has ordered',
                has_newsletter: 'Has newsletter',
            },
            fieldGroups: {
                identity: '性別',
                address: '住所',
                stats: 'ユーザーステータス',
                history: '履歴',
            },
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch:
                    'The password confirmation is not the same as the password.',
            },
        },
        order: {
            name: 'オーダー管理',
            amount: '1 order |||| %{smart_count} orders',
            title: 'Order %{reference}',
            fields: {
                basket: {
                    delivery: 'Delivery',
                    reference: 'Reference',
                    quantity: 'Quantity',
                    sum: 'Sum',
                    tax_rate: 'Tax Rate',
                    taxes: 'Tax',
                    total: 'Total',
                    unit_price: 'Unit Price',
                    nb_items: 'Total item'
                },
                address: 'Address',
                customer_id: 'Customer',
                date_gte: 'Passed Since',
                date_lte: 'Passed Before',
                nb_items: 'Nb Items',
                total_gte: 'Min amount',
                status: 'Status',
                returned: 'Returned',
                created_at: '登録日',
            },
            section: {
                order: 'Order',
                customer: 'Customer',
                branch: 'Branch',
                shipping_address: 'Shipping Address',
                items: 'Items',
                total: 'Totals',
            },
        },
        product: {
            name: '商品 |||| 商品',
            fields: {
                category: 'カテゴリー',
                tax: '税金',
                image: '画像',
                name: '氏名',
                price: '価格',
                price_no_tax: '価格（税抜き）',
                information: {
                    name: '商品情報',
                    item_title: 'オプション：項目名前',
                    item_content: 'オプション：項目内容'
                },
                option: {
                    name: 'オプション',
                    item_display_name: 'オプション：項目',
                    item_price: '項目価格'
                },
                created_at: '登録日',
            },
            tabs: {
                image: '画像',
                details: '内容',
                options: 'オプション',
                information: '商品情報',
                description: '内容',
            },
            filters: {
                category: 'Categories',
                tax: 'Tax',
                sales: 'Sales',
                best_sellers: 'Best sellers',
                average_sellers: 'Average',
                low_sellers: 'Low',
                never_sold: 'Never sold',
            },
        },
        category: {
            name: 'カテゴリー |||| カテゴリー',
            fields: {
                products: '商品一覧（メニュー）',
                created_at: '登録日',
            },
        },
        branch: {
            name: '店舗',
            fields: {
                name: '氏名',
                food_ids: '商品一覧（メニュー）',
                staff_ids: 'スタッフ',
                address: {
                    postal_code: '郵便番号',
                    prefecture: '都道府県',
                    city: '市区町村',
                    address: '住所',
                    apartment: 'アパートメント名',
                    location: {
                        x: '経度',
                        y: '緯度',
                    }
                },
                description: '内容',
                created_at: '登録日',
            },
        },
        tax: {
            name: '税金',
        },
        news: {
            name: 'ニュース',
        },
        staff: {
            name: 'スタッフ',
            fields: {
                username: 'ユーザーID',
                display_name: 'ユーザー名',
                type: 'スタッフ役割',
                created_at: '登録日',
                password: 'パスワード',
                confirm_password: 'パスワード確認',
            }
        },
    }
}

const japaneseMessages = {
    ...japaneseCoreMessages,
    ...japaneseDomainMessages
};

export default japaneseMessages;