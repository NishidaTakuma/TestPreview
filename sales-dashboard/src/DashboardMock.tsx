import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { useState } from "react"
import { useNavigate } from "react-router-dom" // ←★追加

const kpiData = [
  { title: "売上", value: "¥12,340,000", delta: "+8%" },
  { title: "数量", value: "28,500", delta: "+5%" },
  { title: "達成率", value: "92%", delta: "-3%" },
  { title: "更新", value: "09:30", delta: "" },
]

const salesTrend = [
  { date: "7/1", amt: 320 },
  { date: "7/2", amt: 400 },
  { date: "7/3", amt: 350 },
  { date: "7/4", amt: 500 },
  { date: "7/5", amt: 480 },
  { date: "7/6", amt: 520 },
  { date: "7/7", amt: 610 },
]

const storeToday = [
  { store: "渋谷", qty: 1200, amt: 3000000, target: 2800000 },
  { store: "新宿", qty: 980, amt: 2500000, target: 2600000 },
  { store: "池袋", qty: 860, amt: 2100000, target: 2000000 },
  { store: "横浜", qty: 1100, amt: 2700000, target: 2700000 },
]

export default function DashboardMock() {
  const [tab, setTab] = useState<'today' | 'store' | 'person' | 'compare' | 'kpi'>('today')
  const now = new Date().toLocaleTimeString()
  const navigate = useNavigate() // ←★遷移用Hook

  const TabButton = ({ id, label }: { id: typeof tab; label: string }) => (
    <button
      onClick={() => setTab(id)}
      className={`px-4 py-2 text-sm md:text-base border-b-2 ${
        tab === id ? 'border-blue-600 font-semibold' : 'border-transparent text-gray-500'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6 text-gray-800">
      {/* ==== タブヘッダー ==== */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b">
        <TabButton id="today" label="当日総販" />
        <TabButton id="store" label="店舗別" />
        <TabButton id="person" label="人別" />
        <TabButton id="compare" label="比較" />
        <TabButton id="kpi" label="前月KPI" />
      </div>

      {/* ==== 当日総販タブ ==== */}
      {tab === 'today' && (
        <section className="space-y-6">
          {/* KPI */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {kpiData.map(kpi => (
              <div key={kpi.title} className="bg-white shadow rounded-2xl p-4">
                <p className="text-sm text-gray-500 mb-1">{kpi.title}</p>
                <p className="text-2xl font-semibold">{kpi.value}</p>
                {kpi.delta && <p className="text-xs text-green-600">{kpi.delta}</p>}
              </div>
            ))}
          </div>

          {/* Trend */}
          <div className="bg-white shadow rounded-2xl p-4">
            <p className="text-lg font-semibold mb-2">総販推移 (過去7日)</p>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={salesTrend} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amt" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* ==== 店舗別タブ ==== */}
      {tab === 'store' && (
        <section className="bg-white shadow rounded-2xl p-4 overflow-x-auto">
          <p className="text-lg font-semibold mb-2">店舗別 当日販売状況（{now} 更新）</p>
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="py-1 pr-4">店舗</th>
                <th className="py-1 px-4">数量</th>
                <th className="py-1 px-4">売上</th>
                <th className="py-1 px-4">目標</th>
              </tr>
            </thead>
            <tbody>
              {storeToday.map(r => (
                <tr key={r.store} className="border-b last:border-0">
                  <td className="py-2 pr-4 font-medium">{r.store}</td>
                  <td className="py-2 px-4">{r.qty.toLocaleString()}</td>
                  <td className="py-2 px-4">¥{(r.amt / 1000).toLocaleString()}k</td>
                  <td
                    className={`py-2 px-4 ${
                      r.amt >= r.target ? 'text-green-600 font-semibold' : 'text-red-600'
                    }`}
                  >
                    ¥{(r.target / 1000).toLocaleString()}k
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* ==== プレースホルダー ==== */}
      {tab === 'person' && (
        <div className="text-gray-500">※個人別集計は準備中です。</div>
      )}
      {tab === 'compare' && (
        <div className="text-gray-500">※店舗・リーダー・マネージャー比較ビューは準備中です。</div>
      )}
      {tab === 'kpi' && (
        <div className="text-gray-500">※前月 KPI ダッシュボードは準備中です。</div>
      )}

      {/* ==== トグルボタン（ページ切り替え） ==== */}
      <div className="pt-6 text-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          タイル表示に切り替え
        </button>
      </div>
    </div>
  )
}
