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
            name: '会員管理',
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
                    'パスワード（確認）はパスワードと一致していません。',
            },
        },
        order: {
            name: 'オーダー管理',
            amount: '1 order |||| %{smart_count} orders',
            title: 'Order %{reference}',
            fields: {
                basket: {
                    reference: '商品',
                    quantity: '数量',
                    sum: 'Sum',
                    tax_rate: 'Tax Rate',
                    taxes: 'Tax',
                    total: '総合計',
                    unit_price: '価格',
                    nb_items: 'Total item'
                },
                address: '住所',
                user_id: 'ユーザー管理',
                branch_id: '店舗管理',
                nb_items: 'Nb Items',
                total_gte: 'Min amount',
                st: '状態',
                returned: 'Returned',
                created_time: '登録日',
            },
            section: {
                order: 'オーダー管理',
                customer: 'ユーザー管理',
                branch: '店舗',
                items: '商品情報',
                total: '合計',
            },
        },
        product: {
            name: '商品管理',
            fields: {
                cat_ids: 'カテゴリー',
                tax_ids: '税金',
                image: '画像',
                name: '氏名',
                price: '価格',
                price_no_tax: '価格（税抜き）',
                delivery_est: '受け取り時間（予定)',
                information: {
                    item_title: '項目名前',
                    item_content: '項目内容'
                },
                option: {
                    name: 'オプション',
                    item_display_name: '項目',
                    item_price: '項目価格'
                },
                description: '内容',
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
            name: '商品カテゴリ',
            fields: {
                name: '氏名',
                description: '内容',
                products: '商品一覧（メニュー）',
                created_at: '登録日',
            },
        },
        branch: {
            name: '店舗管理',
            tabs: {
                info: '店舗情報',
                menu: '商品一覧（メニュー）',
                working_times: '営業時間'
            },
            fields: {
                name: '氏名',
                food_ids: '商品一覧（メニュー）',
                staff_ids: 'スタッフ',
                delivery_est: '受け取り時間（予定)',
                working_times: {
                    start_at: '開店時間',
                    end_at: '閉店時間'
                },
                start_at: '開店時間',
                end_at: '閉店時間',
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
            name: '消費税設定',
            fields: {
                name: '氏名',
                value: '消費税(%)',
                description: '内容',
                created_at: '登録日',
            }
        },
        news: {
            name: 'ニュース',
            fields: {
                name: '氏名',
                title: 'タイトル',
                banner: '画像',
                description: '内容',
                publish_time: '公開日',
                expired_time: '期限設定',
                created_at: '登録日',
            }
        },
        slide: {
            name: 'スライド',
            fields: {
                image: '画像',
                created_at: '登録日',
            }
        },
        staff: {
            name: 'スタッフ管理',
            fields: {
                username: 'ユーザーID',
                display_name: 'ユーザー名',
                type: 'スタッフ役割',
                created_at: '登録日',
                password: 'パスワード',
                confirm_password: 'パスワード確認',
            },
            errors: {
                password_mismatch:
                    'パスワード（確認）はパスワードと一致していません。',
            }
        },
    }
}

const japaneseMessages = {
    ...japaneseCoreMessages,
    ...japaneseDomainMessages
};

export default japaneseMessages;