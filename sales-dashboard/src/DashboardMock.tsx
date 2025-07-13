import { useState } from 'react'

export default function DashboardMock() {
  const [tab, setTab] = useState<'today' | 'store' | 'person' | 'compare' | 'kpi'>('today')
  const now = new Date().toLocaleTimeString()

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

      {/* ==== タブ内容 ==== */}

      {tab === 'today' && (
        <section className="space-y-6">
          {/* KPIセクション */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded shadow text-center">
              <div className="text-xl font-bold">売上</div>
              <div className="text-2xl text-blue-600">¥1,200,000</div>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <div className="text-xl font-bold">客数</div>
              <div className="text-2xl text-blue-600">300人</div>
            </div>
            {/* 追加OK */}
          </div>

          {/* Trendセクション */}
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600">※グラフ等のトレンド表示エリア</p>
            <p className="text-sm text-gray-400">最終更新: {now}</p>
          </div>
        </section>
      )}

      {tab === 'store' && (
        <section className="bg-white shadow rounded-2xl p-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="text-left px-4 py-2">店舗</th>
                <th className="text-right px-4 py-2">売上</th>
                <th className="text-right px-4 py-2">客数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">新宿店</td>
                <td className="text-right px-4 py-2">¥450,000</td>
                <td className="text-right px-4 py-2">120人</td>
              </tr>
              <tr>
                <td className="px-4 py-2">梅田店</td>
                <td className="text-right px-4 py-2">¥350,000</td>
                <td className="text-right px-4 py-2">90人</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}

      {tab === 'person' && (
        <div className="text-gray-500">※個人別集計は準備中です。</div>
      )}
      {tab === 'compare' && (
        <div className="text-gray-500">※店舗・リーダー・マネージャー比較ビューは準備中です。</div>
      )}
      {tab === 'kpi' && (
        <div className="text-gray-500">※前月 KPI ダッシュボードは準備中です。</div>
      )}
    </div>
  )
}
