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
            month_history: '売上履歴',
            order: {
                items:
                    'by %{user_name}, one item |||| by %{user_name}, %{nb_items} items',
            },
        },
    },
    resources: {
        user: {
            name: '会員管理',
            fields: {
                order: 'ユーザー：オーダー履歴',
                display_name: {
                    last_name: '性',
                    first_name: '名',
                    last_name_kata: '性（カナ）',
                    first_name_kata: '名（カナ）',
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
                birthday: '生年月日',
                phone: '電話番号',
                total_spent: 'Total spent',
                password: 'パスワード',
                confirm_password: 'パスワード確認',
                last_seen: 'Last seen',
                created_at: '登録日時',
                last_updated_at: '更新日時'
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
                stats: 'ステータス',
                history: '履歴',
            },
            page: {
                delete: 'Delete User',
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
                user_id: '会員情報',
                branch_id: '店舗',
                nb_items: 'Nb Items',
                total_gte: 'Min amount',
                st: '状態',
                returned: 'Returned',
                created_time: '登録日時',
            },
            section: {
                order: 'オーダー管理',
                user: 'ユーザー管理',
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
                name: '商品名',
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
                created_at: '登録日時',
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
                name: 'カテゴリ名',
                description: '内容',
                products: '商品一覧（メニュー）',
                created_at: '登録日時',
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
                name: '店舗名',
                banner: '画像',
                food_ids: '商品一覧（メニュー）',
                staff_ids: 'スタッフ',
                delivery_est: '受け取り時間（予定)',
                working_time_text: '表示営業時間',
                holiday_text: '表示定休日',
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
                created_at: '登録日時',
            },
        },
        tax: {
            name: '消費税設定',
            fields: {
                name: '設定名',
                value: '消費税(%)',
                description: '内容',
                created_at: '登録日時',
            }
        },
        news: {
            name: 'ニュース',
            fields: {
                name: '名前',
                title: 'タイトル',
                banner: '画像',
                description: '内容',
                publish_time: '公開日',
                expired_time: '期限設定',
                created_at: '登録日時',
            }
        },
        slide: {
            name: 'スライド',
            fields: {
                image: '画像',
                created_at: '登録日時',
            }
        },
        staff: {
            name: 'スタッフ管理',
            fields: {
                username: 'ユーザーID',
                display_name: 'ユーザー名',
                type: '種別',
                created_at: '登録日時',
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
