import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronRight, 
  RotateCcw, 
  Copy, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Info,
  ArrowLeft
} from "lucide-react";
import { furboDecisionTree } from "./data/decisionTree";
import { Node, Result } from "./types";

export default function App() {
  const [currentNodeId, setCurrentNodeId] = useState<string>(furboDecisionTree.startNodeId);
  const [history, setHistory] = useState<string[]>([]);
  const [finalResult, setFinalResult] = useState<Result | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const currentNode = furboDecisionTree.nodes[currentNodeId];

  const handleOptionSelect = useCallback((nextId?: string, result?: Result, label?: string) => {
    if (history.length === 0 && label) {
      setCategory(label);
    }
    
    if (result) {
      setFinalResult(result);
    } else if (nextId) {
      setHistory((prev) => [...prev, currentNodeId]);
      setCurrentNodeId(nextId);
    }
  }, [currentNodeId, history.length]);

  const handleBack = useCallback(() => {
    if (finalResult) {
      setFinalResult(null);
      return;
    }
    if (history.length > 0) {
      const prevHistory = [...history];
      const prevNodeId = prevHistory.pop()!;
      if (prevHistory.length === 0) setCategory(null);
      setHistory(prevHistory);
      setCurrentNodeId(prevNodeId);
    }
  }, [history, finalResult]);

  const handleReset = useCallback(() => {
    setCurrentNodeId(furboDecisionTree.startNodeId);
    setHistory([]);
    setFinalResult(null);
    setCategory(null);
  }, []);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const copyAll = () => {
    if (!finalResult) return;
    const summary = [
      `方案: ${finalResult.plan}`,
      `裝置: ${finalResult.device}`,
      finalResult.link ? `連結: ${finalResult.link}` : null,
      finalResult.code ? `代碼: ${finalResult.code}` : null,
      finalResult.deviceLinks ? `機型連結:\n${finalResult.deviceLinks.map(dl => `- ${dl.name}: ${dl.url}`).join('\n')}` : null,
      finalResult.notes ? `備註:\n${finalResult.notes.map(n => `• ${n}`).join('\n')}` : null
    ].filter(Boolean).join('\n');
    
    copyToClipboard(summary, 'all');
  };

  const getThemeColor = () => {
    if (category?.includes("FCP")) return "orange";
    if (category?.includes("加購")) return "green";
    if (category?.includes("EOL")) return "blue";
    return "orange";
  };

  const theme = getThemeColor();
  const themeClasses = {
    orange: {
      bg: "bg-orange-500",
      light: "bg-orange-50",
      border: "border-orange-100",
      text: "text-orange-600",
      hover: "hover:bg-orange-50 hover:border-orange-200",
      button: "bg-orange-500 hover:bg-orange-600 shadow-orange-200",
      progress: "bg-orange-400",
      progressBg: "bg-orange-200",
      accent: "bg-orange-100 text-orange-600"
    },
    green: {
      bg: "bg-emerald-500",
      light: "bg-emerald-50",
      border: "border-emerald-100",
      text: "text-emerald-600",
      hover: "hover:bg-emerald-50 hover:border-emerald-200",
      button: "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200",
      progress: "bg-emerald-400",
      progressBg: "bg-emerald-200",
      accent: "bg-emerald-100 text-emerald-600"
    },
    blue: {
      bg: "bg-sky-500",
      light: "bg-sky-50",
      border: "border-sky-100",
      text: "text-sky-600",
      hover: "hover:bg-sky-50 hover:border-sky-200",
      button: "bg-sky-500 hover:bg-sky-600 shadow-sky-200",
      progress: "bg-sky-400",
      progressBg: "bg-sky-200",
      accent: "bg-sky-100 text-sky-600"
    }
  }[theme];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
              🐾 Furbo 客服小幫手
              {category && (
                <span className={`text-xs px-2 py-1 rounded-full ${themeClasses.accent} font-bold uppercase`}>
                  {category.split(' ')[0]}
                </span>
              )}
            </h1>
            <p className="text-slate-500 text-sm">快速決策價格方案與代碼使用</p>
          </div>
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <RotateCcw size={16} />
            重置 (Reset)
          </button>
        </header>

        {/* Main Content */}
        <main className="relative">
          <AnimatePresence mode="wait">
            {!finalResult ? (
              <motion.div
                key={currentNodeId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8"
              >
                {/* Progress Indicator */}
                <div className="flex gap-1 mb-6">
                  {history.map((_, i) => (
                    <div key={i} className={`h-1.5 w-8 ${themeClasses.progress} rounded-full`} />
                  ))}
                  <div className={`h-1.5 w-8 ${themeClasses.progressBg} rounded-full animate-pulse`} />
                </div>

                <h2 className="text-xl font-semibold mb-8 text-slate-800 flex items-center gap-3">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full ${themeClasses.accent} text-sm font-bold`}>
                    {history.length + 1}
                  </span>
                  {currentNode.question}
                </h2>

                <div className="grid gap-3">
                  {currentNode.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(option.nextId, option.result, option.label)}
                      className={`group flex items-center justify-between p-4 rounded-xl border-2 border-slate-100 ${themeClasses.hover} transition-all text-left`}
                    >
                      <span className="font-medium text-slate-700 group-hover:text-slate-900">
                        {option.label}
                      </span>
                      <ChevronRight className={`text-slate-300 group-hover:${themeClasses.text} group-hover:translate-x-1 transition-transform`} />
                    </button>
                  ))}
                </div>

                {history.length > 0 && (
                  <button
                    onClick={handleBack}
                    className="mt-8 flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors text-sm font-medium"
                  >
                    <ArrowLeft size={16} />
                    返回上一步
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`bg-white rounded-2xl shadow-2xl border ${themeClasses.border} overflow-hidden`}
              >
                <div className={`${themeClasses.bg} p-6 text-white flex justify-between items-start`}>
                  <div>
                    <div className="flex items-center gap-2 mb-2 opacity-80 text-sm font-medium uppercase tracking-wider">
                      <CheckCircle2 size={16} />
                      決策結論
                    </div>
                    <h2 className="text-2xl font-bold">{finalResult.plan}</h2>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-8">
                  {/* Device Info */}
                  <div className={`flex items-start gap-4 p-4 ${themeClasses.light} rounded-xl border ${themeClasses.border}`}>
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <AlertCircle className={themeClasses.text} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">對應裝置 (Device)</h3>
                      <p className={`text-xl font-bold ${themeClasses.text}`}>{finalResult.device}</p>
                    </div>
                  </div>

                  {/* Device Specific Links Table */}
                  {finalResult.deviceLinks && (
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <ExternalLink size={14} className={themeClasses.text} />
                        各機型方案連結 (Device Links)
                      </label>
                      <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm">
                        <table className="w-full text-sm text-left border-collapse">
                          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                            <tr>
                              <th className="px-4 py-3 border-b border-slate-200">機型</th>
                              <th className="px-4 py-3 border-b border-slate-200">專屬連結</th>
                              <th className="px-4 py-3 border-b border-slate-200 text-right">操作</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {finalResult.deviceLinks.map((dl, i) => (
                              <tr key={i} className={`hover:${themeClasses.light}/30 transition-colors group`}>
                                <td className="px-4 py-3 font-bold text-slate-700">
                                  <span className={`inline-block px-2 py-0.5 bg-slate-100 rounded text-[10px] text-slate-500 mr-2 group-hover:${themeClasses.accent} transition-colors`}>MODEL</span>
                                  {dl.name}
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2 max-w-[180px]">
                                    <span className="text-slate-500 truncate font-mono text-xs">{dl.url}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-right space-x-1">
                                  <button 
                                    onClick={() => copyToClipboard(dl.url, `dl-${i}`)}
                                    className={`p-1.5 text-slate-400 hover:${themeClasses.text} hover:bg-white rounded-lg shadow-sm transition-all border border-transparent hover:${themeClasses.border}`}
                                    title="複製連結"
                                  >
                                    {copiedField === `dl-${i}` ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
                                  </button>
                                  <a 
                                    href={dl.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={`p-1.5 inline-block text-slate-400 hover:${themeClasses.text} hover:bg-white rounded-lg shadow-sm transition-all border border-transparent hover:${themeClasses.border}`}
                                    title="開啟連結"
                                  >
                                    <ExternalLink size={14} />
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className={`grid ${finalResult.link && finalResult.code ? 'md:grid-cols-2' : 'grid-cols-1'} gap-4`}>
                    {finalResult.link && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">連結</label>
                        <div className={`flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-lg group hover:${themeClasses.border} transition-colors`}>
                          <input 
                            readOnly 
                            value={finalResult.link} 
                            className="flex-1 text-sm text-slate-600 bg-transparent outline-none truncate"
                          />
                          <button 
                            onClick={() => copyToClipboard(finalResult.link!, 'link')}
                            className={`p-1.5 text-slate-400 hover:${themeClasses.text} hover:${themeClasses.light} rounded transition-all`}
                            title="複製連結"
                          >
                            {copiedField === 'link' ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} />}
                          </button>
                          <a 
                            href={finalResult.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`p-1.5 text-slate-400 hover:${themeClasses.text} hover:${themeClasses.light} rounded transition-all`}
                          >
                            <ExternalLink size={18} />
                          </a>
                        </div>
                      </div>
                    )}

                    {finalResult.code && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Code</label>
                        <div className={`flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-lg group hover:${themeClasses.border} transition-colors`}>
                          <textarea 
                            readOnly 
                            rows={finalResult.code.split('\n').length}
                            value={finalResult.code} 
                            className="flex-1 text-sm font-mono font-bold text-slate-800 bg-transparent outline-none resize-none"
                          />
                          <button 
                            onClick={() => copyToClipboard(finalResult.code!, 'code')}
                            className={`p-1.5 text-slate-400 hover:${themeClasses.text} hover:${themeClasses.light} rounded transition-all self-start`}
                            title="複製代碼"
                          >
                            {copiedField === 'code' ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  {finalResult.notes && finalResult.notes.length > 0 && (
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Info size={14} />
                        備註事項
                      </label>
                      <div className={`text-sm text-slate-600 ${themeClasses.light} p-4 rounded-lg border-l-4 ${themeClasses.progress} whitespace-pre-wrap leading-relaxed`}>
                        {finalResult.notes.join('\n')}
                      </div>
                    </div>
                  )}

                  <div className="pt-6 border-t border-slate-100 flex gap-4">
                    <button
                      onClick={handleBack}
                      className="flex-1 py-3 px-4 bg-white border border-slate-200 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <ArrowLeft size={18} />
                      返回修改
                    </button>
                    <button
                      onClick={handleReset}
                      className={`flex-1 py-3 px-4 ${themeClasses.button} text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2`}
                    >
                      <RotateCcw size={18} />
                      重新開始
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-400 text-xs">
          <p>© 2026 Furbo 客服小幫手</p>
          <p className="mt-1">僅供內部使用</p>
        </footer>
      </div>
    </div>
  );
}
