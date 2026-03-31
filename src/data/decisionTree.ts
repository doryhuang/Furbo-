import { DecisionTree } from "../types";

export const furboDecisionTree: DecisionTree = {
  startNodeId: "reason",
  nodes: {
    reason: {
      id: "reason",
      question: "申請新機原因",
      options: [
        { label: "FCP (主機壞掉)", nextId: "camera_count" },
        { label: "純加購 (主機沒壞)", nextId: "purchase_type" },
        { label: "EOL", nextId: "eol_options" },
      ],
    },
    // --- FCP Branch ---
    camera_count: {
      id: "camera_count",
      question: "帳號下攝影機總數",
      options: [
        { label: "只有一台", nextId: "sub_status_single" },
        { label: "兩台以上", nextId: "sub_status_multi" },
      ],
    },
    // FCP - Single Camera
    sub_status_single: {
      id: "sub_status_single",
      question: "用戶當前訂閱狀態 (只有一台)",
      options: [
        { label: "月方案 (總月份 < 12個月)", nextId: "refurb_single_monthly" },
        { label: "年 / 兩年方案 & 忠實用戶", nextId: "refurb_single_loyal" },
        { label: "沒訂閱", nextId: "refurb_single_none" },
      ],
    },
    refurb_single_monthly: {
      id: "refurb_single_monthly",
      question: "損壞品項是否有整新機? (只有一台 / 月方案)",
      options: [
        { label: "🟢 損壞品項有整新", nextId: "options_single_monthly_yes" },
        { label: "🔴 損壞品項沒整新", nextId: "options_single_monthly_no" },
      ],
    },
    options_single_monthly_yes: {
      id: "options_single_monthly_yes",
      question: "選擇方案 (只有一台 / 月方案 / 有整新)",
      options: [
        {
          label: "1. Webconsole 買一年訂閱、免費換整新機",
          result: {
            plan: "Webconsole 買一年訂閱、免費換整新機",
            device: "整新機",
            link: "https://reurl.cc/6GVjYy",
            code: "FC3010（訂閱費 7 折）",
            notes: ["📌 需在 Webconsole 操作", "🎁 方案：買一年訂閱、免費換整新機"],
            macro: "親愛的用戶您好，\n\n感謝您聯繫 Furbo 客服。\n針對您的需求，我們建議以下方案：\n\n方案內容：Webconsole 買一年訂閱、免費換整新機\n設備：整新機\n購買連結：https://reurl.cc/6GVjYy\nCode：FC3010（訂閱費 7 折）\n\n若有任何問題，歡迎隨時與我們聯繫。\nFurbo 客服團隊 敬上"
          },
        },
        {
          label: "2. 提供 Faas 折扣連結 (限年以上方案)",
          result: {
            plan: "提供 Faas 折扣連結",
            device: "全新機",
            deviceLinks: [
              { name: "FD3", url: "https://reurl.cc/ppnV0Q" },
              { name: "FC3", url: "https://reurl.cc/ppnVeZ" },
              { name: "M2", url: "https://reurl.cc/A9nzZ3" },
              { name: "M3", url: "https://reurl.cc/ppnVk8" },
            ],
            notes: [
              "💡 年以上才可以用更多的折扣",
              "【FaaS Device 底價放內心】",
              "• Furbo3: $969",
              "• Mini3: $799",
              "• Mini2: $429"
            ],
            macro: "親愛的用戶您好，\n\n感謝您聯繫 Furbo 客服。\n針對您的需求，我們建議以下方案：\n\n方案內容：提供 Faas 折扣連結\n設備：全新機\n\n若有任何問題，歡迎隨時與我們聯繫。\nFurbo 客服團隊 敬上"
          },
        },
        {
          label: "3. 不買訂閱：提供官網全新機 SA 折扣",
          result: {
            plan: "不買訂閱：提供官網全新機 SA 折扣",
            device: "全新機",
            link: "https://furbo.com/tw",
            code: "FD3/FC3/M2: CSFRIEND (9折) / CSFAM (85折)\nM3: CSFRIEND3 (9折)",
            notes: [
              "📌 M3 Code: CSFRIEND3 (T3, T2) 設定底價 2399 (T1會用不了)",
              "【SA T1 底價放內心】",
              "• Furbo3: $3799",
              "• Mini3: $2399",
              "• Mini2: $1899"
            ],
            macro: "親愛的用戶您好，\n\n感謝您聯繫 Furbo 客服。\n針對您的需求，我們建議以下方案：\n\n方案內容：不買訂閱：提供官網全新機 SA 折扣\n設備：全新機\n購買連結：https://furbo.com/tw\nCode：FD3/FC3/M2: CSFRIEND (9折) / CSFAM (85折)\nM3: CSFRIEND3 (9折)\n\n若有任何問題，歡迎隨時與我們聯繫。\nFurbo 客服團隊 敬上"
          },
        },
      ],
    },
    options_single_monthly_no: {
      id: "options_single_monthly_no",
      question: "選擇方案 (只有一台 / 月方案 / 沒整新)",
      options: [
        {
          label: "1. 提供 Faas 折扣連結 (只能看到年以上)",
          result: {
            plan: "提供 Faas 折扣連結",
            device: "全新機",
            deviceLinks: [
              { name: "FD3", url: "https://reurl.cc/ppnV0Q" },
              { name: "FC3", url: "https://reurl.cc/ppnVeZ" },
              { name: "M2", url: "https://reurl.cc/A9nzZ3" },
              { name: "M3", url: "https://reurl.cc/ppnVk8" },
            ],
            code: "FC2010, FC2020, FC3010, FC3020",
            notes: [
              "📌 只能看到年以上方案",
              "補充：\n數字前兩碼=訂閱費折數\n數字後兩碼=Device折數"
            ],
            macro: "親愛的用戶您好，\n\n感謝您聯繫 Furbo 客服。\n針對您的需求，我們建議以下方案：\n\n方案內容：提供 Faas 折扣連結\n設備：全新機\nCode：FC2010, FC2020, FC3010, FC3020\n\n若有任何問題，歡迎隨時與我們聯繫。\nFurbo 客服團隊 敬上"
          },
        },
        {
          label: "2. 不買訂閱：提供官網全新機 SA 折扣",
          result: {
            plan: "不買訂閱：提供官網全新機 SA 折扣",
            device: "全新機",
            link: "https://furbo.com/tw",
            code: "FD3/FC3/M2: CSFAM (85折)\nM3: CSINNER (88折)",
            notes: ["官網直接購買全新機"],
            macro: "親愛的用戶您好，\n\n感謝您聯繫 Furbo 客服。\n針對您的需求，我們建議以下方案：\n\n方案內容：不買訂閱：提供官網全新機 SA 折扣\n設備：全新機\n購買連結：https://furbo.com/tw\nCode：FD3/FC3/M2: CSFAM (85折)\nM3: CSINNER (88折)\n\n若有任何問題，歡迎隨時與我們聯繫。\nFurbo 客服團隊 敬上"
          },
        },
      ],
    },
    refurb_single_loyal: {
      id: "refurb_single_loyal",
      question: "損壞品項是否有整新機? (只有一台 / 年或忠實)",
      options: [
        { label: "🟢 損壞品項有整新", nextId: "options_single_loyal_yes" },
        { label: "🔴 損壞品項沒整新", nextId: "options_single_loyal_no" },
      ],
    },
    options_single_loyal_yes: {
      id: "options_single_loyal_yes",
      question: "選擇方案 (只有一台 / 年或忠實 / 有整新)",
      options: [
        {
          label: "不用訂閱、免費換整新機",
          result: {
            plan: "不用訂閱、免費換整新機",
            device: "整新機",
            notes: [
              "忠實用戶/年方案優惠",
              "\n※ 2026 忠實用戶分級：",
              "【鑽石 VIP】訂閱 STD / Premium (含 OST Pro)，續約/總年資 > 2 次/年。",
              "【黃金老友】訂閱 BSC (含 OST-Basic)，續約 > 2 次/年 (或月費連續 24 個月)。",
              "【沉睡金礦】曾有訂閱，目前非訂閱，註冊 > 1.5 年且近期有登入。",
              "【鐵桿粉絲】從未/極少訂閱，註冊 > 3 年且目前活躍。",
              "【一般/潛力用戶】不符合上述條件者。"
            ],
            macro: "親愛的用戶您好，\n\n感謝您對 Furbo 的長期支持！經查詢您的帳號符合我們的專屬優惠資格。\n為了回饋您的愛護，我們特別為您提供以下方案：\n\n方案內容：不用訂閱、免費換整新機\n設備：整新機\n\n若有任何問題，歡迎隨時與我們聯繫。\nFurbo 客服團隊 敬上"
          },
        },
      ],
    },
    options_single_loyal_no: {
      id: "options_single_loyal_no",
      question: "選擇方案 (只有一台 / 年或忠實 / 沒整新)",
      options: [
        {
          label: "不用訂閱、免費換全新機",
          result: {
            plan: "不用訂閱、免費換全新機",
            device: "全新機",
            notes: [
              "目前無整新機，提供全新機",
              "\n※ 2026 忠實用戶分級：",
              "【鑽石 VIP】訂閱 STD / Premium (含 OST Pro)，續約/總年資 > 2 次/年。",
              "【黃金老友】訂閱 BSC (含 OST-Basic)，續約 > 2 次/年 (或月費連續 24 個月)。",
              "【沉睡金礦】曾有訂閱，目前非訂閱，註冊 > 1.5 年且近期有登入。",
              "【鐵桿粉絲】從未/極少訂閱，註冊 > 3 年且目前活躍。",
              "【一般/潛力用戶】不符合上述條件者。"
            ],
            macro: "親愛的用戶您好，\n\n感謝您對 Furbo 的長期支持！經查詢您的帳號符合我們的專屬優惠資格。\n為了回饋您的愛護，我們特別為您提供以下方案：\n\n方案內容：不用訂閱、免費換全新機\n設備：全新機\n\n若有任何問題，歡迎隨時與我們聯繫。\nFurbo 客服團隊 敬上"
          },
        },
      ],
    },
    refurb_single_none: {
      id: "refurb_single_none",
      question: "損壞品項是否有整新機? (只有一台 / 沒訂閱)",
      options: [
        { label: "🟢 損壞品項有整新", nextId: "options_single_none_yes" },
        { label: "🔴 損壞品項沒整新", nextId: "options_single_none_no" },
      ],
    },
    options_single_none_yes: {
      id: "options_single_none_yes",
      question: "選擇方案 (只有一台 / 沒訂閱 / 有整新)",
      options: [
        {
          label: "1. Webconsole 買一年訂閱、免費換整新機",
          result: {
            plan: "Webconsole 買一年訂閱、免費換整新機",
            device: "整新機",
            link: "https://reurl.cc/6GVjYy",
            code: "FC3010（訂閱費 7 折）",
            notes: ["📌 需在 Webconsole 操作", "🎁 方案：買一年訂閱、免費換整新機"],
            macro: "親愛的用戶您好，\n\n感謝您聯繫 Furbo 客服。\n針對您的需求，我們建議以下方案：\n\n方案內容：Webconsole 買一年訂閱、免費換整新機\n設備：整新機\n購買連結：https://reurl.cc/6GVjYy\nCode：FC3010（訂閱費 7 折）\n\n若有任何問題，歡迎隨時與我們聯繫。\nFurbo 客服團隊 敬上"
          },
        },
        {
          label: "2. 提供 Faas 折扣連結 (月/年/兩年)",
          result: {
            plan: "提供 Faas 折扣連結",
            device: "全新機",
            deviceLinks: [
              { name: "FD3", url: "https://reurl.cc/ppnV0Q" },
              { name: "FC3", url: "https://reurl.cc/ppnVeZ" },
              { name: "M2", url: "https://reurl.cc/A9nzZ3" },
              { name: "M3", url: "https://reurl.cc/ppnVk8" },
            ],
            code: "月: FC1010, FC1020 | 年: FC2010, FC2020, FC3010, FC3020",
            notes: ["補充：\n數字前兩碼=訂閱費折數\n數字後兩碼=Device折數"],
            macro: "親愛的用戶您好，\n\n感謝您聯繫 Furbo 客服。\n針對您的需求，我們建議以下方案：\n\n方案內容：提供 Faas 折扣連結\n設備：全新機\nCode：月: FC1010, FC1020 | 年: FC2010, FC2020, FC3010, FC3020\n\n若有任何問題，歡迎隨時與我們聯繫。\nFurbo 客服團隊 敬上"
          },
        },
        {
          label: "3. 不買訂閱：提供官網全新機 SA 折扣",
          result: {
            plan: "不買訂閱：提供官網全新機 SA 折扣",
            device: "全新機",
            link: "https://furbo.com/tw",
            code: "FD3/FC3/M2: CSFRIEND (9折) / CSFAM (85折)\nM3: CSFRIEND3 (9折)",
            notes: ["📌 M3 Code: CSFRIEND3 (T3, T2) 設定底價 2399 (T1會用不了)"],
            macro: "親愛的用戶您好，\n\n感謝您聯繫 Furbo 客服。\n針對您的需求，我們建議以下方案：\n\n方案內容：不買訂閱：提供官網全新機 SA 折扣\n設備：全新機\n購買連結：https://furbo.com/tw\nCode：FD3/FC3/M2: CSFRIEND (9折) / CSFAM (85折)\nM3: CSFRIEND3 (9折)\n\n若有任何問題，歡迎隨時與我們聯繫。\nFurbo 客服團隊 敬上"
          },
        },
      ],
    },
    options_single_none_no: {
      id: "options_single_none_no",
      question: "選擇方案 (只有一台 / 沒訂閱 / 沒整新)",
      options: [
        {
          label: "1. 提供 Faas 折扣連結 (月/年/兩年)",
          result: {
            plan: "提供 Faas 折扣連結",
            device: "全新機",
            deviceLinks: [
              { name: "FD3", url: "https://reurl.cc/ppnV0Q" },
              { name: "FC3", url: "https://reurl.cc/ppnVeZ" },
              { name: "M2", url: "https://reurl.cc/A9nzZ3" },
              { name: "M3", url: "https://reurl.cc/ppnVk8" },
            ],
            code: "月: FC1010, FC1020 | 年: FC2010, FC2020, FC3010, FC3020",
            notes: ["補充：\n數字前兩碼=訂閱費折數\n數字後兩碼=Device折數"],
            macro: "親愛的用戶您好，\n\n感謝您聯繫 Furbo 客服。\n針對您的需求，我們建議以下方案：\n\n方案內容：提供 Faas 折扣連結\n設備：全新機\nCode：月: FC1010, FC1020 | 年: FC2010, FC2020, FC3010, FC3020\n\n若有任何問題，歡迎隨時與我們聯繫。\nFurbo 客服團隊 敬上"
          },
        },
        {
          label: "2. 不買訂閱：提供官網全新機 SA 折扣",
          result: {
            plan: "不買訂閱：提供官網全新機 SA 折扣",
            device: "全新機",
            link: "https://furbo.com/tw",
            code: "FD3/FC3/M2: CSFRIEND (9折) / CSFAM (85折)\nM3: CSFRIEND3 (9折)",
            notes: ["📌 M3 Code: CSFRIEND3 (T3, T2) 設定底價 2399 (T1會用不了)"],
            macro: "親愛的用戶您好，\n\n感謝您聯繫 Furbo 客服。\n針對您的需求，我們建議以下方案：\n\n方案內容：不買訂閱：提供官網全新機 SA 折扣\n設備：全新機\n購買連結：https://furbo.com/tw\nCode：FD3/FC3/M2: CSFRIEND (9折) / CSFAM (85折)\nM3: CSFRIEND3 (9折)\n\n若有任何問題，歡迎隨時與我們聯繫。\nFurbo 客服團隊 敬上"
          },
        },
      ],
    },
    // FCP - Multi Cameras
    sub_status_multi: {
      id: "sub_status_multi",
      question: "用戶當前訂閱狀態 (兩台以上)",
      options: [
        { label: "月方案 (總月份 < 12個月)", nextId: "refurb_multi_monthly" },
        { label: "年 / 兩年方案 & 忠實用戶", nextId: "refurb_multi_loyal" },
        { label: "沒訂閱", nextId: "refurb_multi_none" },
      ],
    },
    refurb_multi_monthly: {
      id: "refurb_multi_monthly",
      question: "損壞品項是否有整新機? (兩台以上 / 月方案)",
      options: [
        { label: "🟢 損壞品項有整新", nextId: "options_multi_monthly_yes" },
        { label: "🔴 損壞品項沒整新", nextId: "options_multi_monthly_no" },
      ],
    },
    options_multi_monthly_yes: {
      id: "options_multi_monthly_yes",
      question: "選擇方案 (兩台以上 / 月方案 / 有整新)",
      options: [
        {
          label: "1. 客服幫買並調整一年訂閱、免費整新機",
          result: {
            plan: "客服幫買並調整一年訂閱、免費整新機",
            device: "整新機",
            code: "最多可給訂閱費 7 折",
            notes: ["＊SPF 開訂單／後台收款，避免 addon"],
          },
        },
        {
          label: "2. 客服幫買並調整一年訂閱、付費全新機",
          result: {
            plan: "客服幫買並調整一年訂閱、付費全新機",
            device: "全新機",
            code: "價格＝2102 + 攝影機品項",
            notes: [
              "💰 加購價：\n狗/貓: $899\nMini3: $799\nMini2: $429",
              "＊SPF 開訂單／後台收款，避免 addon"
            ],
          },
        },
        {
          label: "3. 不買訂閱、官網全新 SA 折扣",
          result: {
            plan: "不買訂閱、官網全新 SA 折扣",
            device: "全新機",
            link: "https://furbo.com/tw",
            code: "FD3/FC3/M2: CSFRIEND (9折) / CSFAM (85折)\nM3: CSFRIEND3 (9折)",
            notes: ["📌 M3 Code: CSFRIEND3 (T3, T2) 設定底價 2399 (T1會用不了)"],
          },
        },
      ],
    },
    options_multi_monthly_no: {
      id: "options_multi_monthly_no",
      question: "選擇方案 (兩台以上 / 月方案 / 沒整新)",
      options: [
        {
          label: "1. 客服幫買並調整一年訂閱、付費換全新機",
          result: {
            plan: "客服幫買並調整一年訂閱、付費換全新機",
            device: "全新機",
            code: "最多可給訂閱費 7 折 | 價格＝2102 + 攝影機品項",
            notes: [
              "💰 加購價：\n狗/貓: $899\nMini3: $799\nMini2: $429",
              "＊SPF 開訂單／後台收款，避免 addon"
            ],
          },
        },
        {
          label: "2. 不買訂閱：提供官網全新機 SA 折扣",
          result: {
            plan: "不買訂閱：提供官網全新機 SA 折扣",
            device: "全新機",
            link: "https://furbo.com/tw",
            code: "FD3/FC3/M2: CSFAM (85折)\nM3: CSINNER (88折)",
            notes: ["官網直接購買全新機"],
          },
        },
      ],
    },
    refurb_multi_loyal: {
      id: "refurb_multi_loyal",
      question: "損壞品項是否有整新機? (兩台以上 / 年或忠實)",
      options: [
        { label: "🟢 損壞品項有整新", nextId: "options_multi_loyal_yes" },
        { label: "🔴 損壞品項沒整新", nextId: "options_multi_loyal_no" },
      ],
    },
    options_multi_loyal_yes: {
      id: "options_multi_loyal_yes",
      question: "選擇方案 (兩台以上 / 年或忠實 / 有整新)",
      options: [
        {
          label: "1. 不用訂閱、免費換整新機",
          result: {
            plan: "不用訂閱、免費換整新機",
            device: "整新機",
            notes: [
              "忠實用戶/年方案優惠",
              "\n※ 2026 忠實用戶分級：",
              "【鑽石 VIP】訂閱 STD / Premium (含 OST Pro)，續約/總年資 > 2 次/年。",
              "【黃金老友】訂閱 BSC (含 OST-Basic)，續約 > 2 次/年 (或月費連續 24 個月)。",
              "【沉睡金礦】曾有訂閱，目前非訂閱，註冊 > 1.5 年且近期有登入。",
              "【鐵桿粉絲】從未/極少訂閱，註冊 > 3 年且目前活躍。",
              "【一般/潛力用戶】不符合上述條件者。"
            ],
            macro: "親愛的用戶您好，\n\n感謝您對 Furbo 的長期支持！經查詢您的帳號符合我們的專屬優惠資格。\n為了回饋您的愛護，我們特別為您提供以下方案：\n\n方案內容：不用訂閱、免費換整新機\n設備：整新機\n\n若有任何問題，歡迎隨時與我們聯繫。\nFurbo 客服團隊 敬上"
          },
        },
        {
          label: "2. 不買訂閱、官網全新 SA 折扣",
          result: {
            plan: "不買訂閱、官網全新 SA 折扣",
            device: "全新機",
            link: "https://furbo.com/tw",
            code: "FD3/FC3/M2: CSFRIEND (9折) / CSFAM (85折)\nM3: CSFRIEND3 (9折)",
            notes: [
              "📌 M3 Code: CSFRIEND3 (T3, T2) 設定底價 2399 (T1會用不了)",
              "\n※ 2026 忠實用戶分級：",
              "【鑽石 VIP】訂閱 STD / Premium (含 OST Pro)，續約/總年資 > 2 次/年。",
              "【黃金老友】訂閱 BSC (含 OST-Basic)，續約 > 2 次/年 (或月費連續 24 個月)。",
              "【沉睡金礦】曾有訂閱，目前非訂閱，註冊 > 1.5 年且近期有登入。",
              "【鐵桿粉絲】從未/極少訂閱，註冊 > 3 年且目前活躍。",
              "【一般/潛力用戶】不符合上述條件者。"
            ],
            macro: "親愛的用戶您好，\n\n感謝您對 Furbo 的長期支持！經查詢您的帳號符合我們的專屬優惠資格。\n為了回饋您的愛護，我們特別為您提供以下方案：\n\n方案內容：不買訂閱、官網全新 SA 折扣\n設備：全新機\n購買連結：https://furbo.com/tw\nCode：FD3/FC3/M2: CSFRIEND (9折) / CSFAM (85折)\nM3: CSFRIEND3 (9折)\n\n若有任何問題，歡迎隨時與我們聯繫。\nFurbo 客服團隊 敬上"
          },
        },
      ],
    },
    options_multi_loyal_no: {
      id: "options_multi_loyal_no",
      question: "選擇方案 (兩台以上 / 年或忠實 / 沒整新)",
      options: [
        {
          label: "1. 客部幫買並調整一年訂閱、付費換全新機",
          result: {
            plan: "客服幫買並調整一年訂閱、付費換全新機",
            device: "全新機",
            code: "最多可給訂閱費 7 折 | 價格＝2102 + 攝影機品項",
            notes: [
              "💰 加購價：\n狗/貓: $899\nMini3: $799\nMini2: $429",
              "＊SPF 開訂單／後台收款，避免 addon",
              "\n※ 2026 忠實用戶分級：",
              "【鑽石 VIP】訂閱 STD / Premium (含 OST Pro)，續約/總年資 > 2 次/年。",
              "【黃金老友】訂閱 BSC (含 OST-Basic)，續約 > 2 次/年 (或月費連續 24 個月)。",
              "【沉睡金礦】曾有訂閱，目前非訂閱，註冊 > 1.5 年且近期有登入。",
              "【鐵桿粉絲】從未/極少訂閱，註冊 > 3 年且目前活躍。",
              "【一般/潛力用戶】不符合上述條件者。"
            ],
            macro: "親愛的用戶您好，\n\n感謝您對 Furbo 的長期支持！經查詢您的帳號符合我們的專屬優惠資格。\n為了回饋您的愛護，我們特別為您提供以下方案：\n\n方案內容：客服幫買並調整一年訂閱、付費換全新機\n設備：全新機\n\n若有任何問題，歡迎隨時與我們聯繫。\nFurbo 客服團隊 敬上"
          },
        },
        {
          label: "2. 不買訂閱：提供官網全新機 SA 折扣",
          result: {
            plan: "不買訂閱：提供官網全新機 SA 折扣",
            device: "全新機",
            link: "https://furbo.com/tw",
            code: "FD3/FC3/M2: CSFAM (85折)\nM3: CSINNER (88折)",
            notes: [
              "官網直接購買全新機",
              "\n※ 2026 忠實用戶分級：",
              "【鑽石 VIP】訂閱 STD / Premium (含 OST Pro)，續約/總年資 > 2 次/年。",
              "【黃金老友】訂閱 BSC (含 OST-Basic)，續約 > 2 次/年 (或月費連續 24 個月)。",
              "【沉睡金礦】曾有訂閱，目前非訂閱，註冊 > 1.5 年且近期有登入。",
              "【鐵桿粉絲】從未/極少訂閱，註冊 > 3 年且目前活躍。",
              "【一般/潛力用戶】不符合上述條件者。"
            ],
            macro: "親愛的用戶您好，\n\n感謝您對 Furbo 的長期支持！經查詢您的帳號符合我們的專屬優惠資格。\n為了回饋您的愛護，我們特別為您提供以下方案：\n\n方案內容：不買訂閱、官網全新 SA 折扣\n設備：全新機\n購買連結：https://furbo.com/tw\nCode：FD3/FC3/M2: CSFAM (85折)\nM3: CSINNER (88折)\n\n若有任何問題，歡迎隨時與我們聯繫。\nFurbo 客服團隊 敬上"
          },
        },
      ],
    },
    refurb_multi_none: {
      id: "refurb_multi_none",
      question: "損壞品項是否有整新機? (兩台以上 / 沒訂閱)",
      options: [
        { label: "🟢 損壞品項有整新", nextId: "options_multi_none_yes" },
        { label: "🔴 損壞品項沒整新", nextId: "options_multi_none_no" },
      ],
    },
    options_multi_none_yes: {
      id: "options_multi_none_yes",
      question: "選擇方案 (兩台以上 / 沒訂閱 / 有整新)",
      options: [
        {
          label: "1. 客服幫買並調整一年訂閱、免費換整新機",
          result: {
            plan: "客服幫買並調整一年訂閱、免費換整新機",
            device: "整新機",
            code: "最多可給訂閱費 7 折",
            notes: ["＊SPF 開訂單／後台收款，避免 addon"],
          },
        },
        {
          label: "2. 客服幫買並調整一年訂閱、付費換全新機",
          result: {
            plan: "客服幫買並調整一年訂閱、付費換全新機",
            device: "全新機",
            code: "價格＝2102 + 攝影機品項",
            notes: [
              "💰 加購價：\n狗/貓: $899, Mini 360: $799, Mini: $429",
              "＊SPF 開訂單／後台收款，避免 addon"
            ],
          },
        },
        {
          label: "3. 不買訂閱、官網全新 SA 折扣",
          result: {
            plan: "不買訂閱、官網全新 SA 折扣",
            device: "全新機",
            link: "https://furbo.com/tw",
            code: "FD3/FC3/M2: CSFRIEND (9折) / CSFAM (85折)\nM3: CSFRIEND3 (9折)",
            notes: ["📌 M3 Code: CSFRIEND3 (T3, T2) 設定底價 2399 (T1會用不了)"],
          },
        },
      ],
    },
    options_multi_none_no: {
      id: "options_multi_none_no",
      question: "選擇方案 (兩台以上 / 沒訂閱 / 沒整新)",
      options: [
        {
          label: "1. 客服幫買並調整一年訂閱、付費換全新機",
          result: {
            plan: "客服幫買並調整一年訂閱、付費換全新機",
            device: "全新機",
            code: "最多可給訂閱費 7 折 | 價格＝2102 + 攝影機品項",
            notes: [
              "💰 加購價：狗/貓: $969, Mini3: $899, Mini2: $599",
              "＊SPF 開訂單／後台收款，避免 addon"
            ],
          },
        },
        {
          label: "2. 不買訂閱、官網全新 SA 折扣",
          result: {
            plan: "不買訂閱、官網全新 SA 折扣",
            device: "全新機",
            deviceLinks: [
              { name: "FD3", url: "https://reurl.cc/ppnV0Q" },
              { name: "FC3", url: "https://reurl.cc/ppnVeZ" },
              { name: "M2", url: "https://reurl.cc/A9nzZ3" },
              { name: "M3", url: "https://reurl.cc/ppnVk8" },
            ],
            code: "FC2010, FC2020, FC3010, FC3020",
            notes: [
              "補充：\n數字前兩碼=訂閱費折數\n數字後兩碼=Device折數"
            ],
          },
        },
      ],
    },
    // --- 純加購 Branch ---
    purchase_type: {
      id: "purchase_type",
      question: "用戶類型 (純加購)",
      options: [
        {
          label: "OST",
          result: {
            plan: "OST 加購方案",
            device: "全新機",
            link: "https://docs.google.com/spreadsheets/d/1onW1P-3VD5N_kILd31h5zcxuSVbKONo8lMWxlwAC5yY/edit?pli=1&gid=1187165946#gid=1187165946",
            notes: ["📌 根據 2026_NST_Price 加購"],
          },
        },
        {
          label: "忠實用戶 / 30 天內 NST",
          result: {
            plan: "忠實用戶 / 30 天內 NST 加購",
            device: "全新機",
            code: "以 Faas T1 價格加收 addon fee",
            notes: [
              "【FaaS T1 價格】",
              "• 狗／貓：$1099",
              "• Mini2：$539",
              "• Mini3：$939"
            ],
          },
        },
        { label: "30 天外 NST", nextId: "nst_outside_30" },
      ],
    },
    nst_outside_30: {
      id: "nst_outside_30",
      question: "選擇方案 (30 天外 NST)",
      options: [
        {
          label: "1. 不買訂閱全新 SA T1",
          result: {
            plan: "不買訂閱全新 SA T1",
            device: "全新機",
            notes: [
              "【SA T1 價格】",
              "• 狗／貓：$3799",
              "• Mini3：$2799",
              "• Mini2：$2199",
              "\n🎁 後續 30 天內有訂閱可以補 add on 等值的天數給他",
              "＊訂一年：給兩個月；訂兩年給四個月"
            ],
          },
        },
        {
          label: "2. 升級訂閱至 Faas T1 單機價 + addon",
          result: {
            plan: "升級訂閱至 Faas T1",
            device: "全新機",
            notes: [
              "【FaaS T1 價格】",
              "• 狗／貓：$1099",
              "• Mini3：$939",
              "• Mini2：$539",
              "\n📌 多花的 add on 後續可以用天數補"
            ],
          },
        },
      ],
    },
    // --- EOL Branch ---
    eol_options: {
      id: "eol_options",
      question: "選擇方案 (EOL)",
      options: [
        {
          label: "1. 給連結買 Faas 折扣 (月/年/兩年)",
          result: {
            plan: "Faas 折扣方案 (EOL)",
            device: "全新機",
            deviceLinks: [
              { name: "FD3", url: "https://reurl.cc/YD7R3x" },
              { name: "FC3", url: "https://reurl.cc/ppnVeZ" },
              { name: "M2", url: "https://reurl.cc/A9nzZ3" },
              { name: "M3", url: "https://reurl.cc/ppnVk8" },
            ],
            code: "月: FC1020 | 年: FC3020",
            notes: [
              "📌 \n數字前兩碼=訂閱費折數\n數字後兩碼=Device折數",
              "＊device+subscription",
            ],
          },
        },
        {
          label: "2. 不買訂閱：官網全新機 SA 折扣",
          result: {
            plan: "官網全新機 SA 折扣 (EOL)",
            device: "全新機",
            link: "https://furbo.com/tw",
            code: "thankufriends",
            notes: ["＊thankufriends＞全品項＋F2 整新（給連結）"],
          },
        },
        {
          label: "3. 抱怨後方案：不用訂閱、免費換整新機",
          result: {
            plan: "抱怨後方案 (EOL)",
            device: "整新機",
            notes: ["免費換整新機，優先 F2、特殊情況 F3"],
          },
        },
      ],
    },
  },
};
