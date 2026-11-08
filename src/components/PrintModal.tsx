import React, { useState, useEffect } from 'react';
import { X, Printer, Download, Copy, Check, FileText, AlertCircle } from 'lucide-react';
import { generateDossierHTML, generateDossierMarkdown, downloadFile } from '../utils/exportDossier';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintModal: React.FC<PrintModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [printError, setPrintError] = useState<string | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadHTML = () => {
    const htmlContent = generateDossierHTML();
    downloadFile('relatorio_investimentos_500k.html', htmlContent, 'text/html;charset=utf-8');
  };

  const handleDownloadMarkdown = () => {
    const mdContent = generateDossierMarkdown();
    downloadFile('relatorio_investimentos_500k.md', mdContent, 'text/markdown;charset=utf-8');
  };

  const handleCopyClipboard = async () => {
    const mdContent = generateDossierMarkdown();
    try {
      await navigator.clipboard.writeText(mdContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = mdContent;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleTryNativePrint = () => {
    try {
      window.print();
    } catch (err: any) {
      setPrintError('O navegador bloqueou a janela de impressão dentro da visualização (iframe). Utilize o botão verde "Baixar HTML / PDF" acima!');
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] my-auto flex flex-col shadow-2xl border border-slate-300 overflow-hidden relative animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Sticky Header with prominent, highly visible Close Button */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-200 bg-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Printer className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-tight">Imprimir ou Exportar Relatório</h3>
              <p className="text-[11px] text-slate-500">Dossiê oficial do investidor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-800 bg-white hover:bg-rose-600 hover:text-white border border-slate-300 hover:border-rose-600 rounded-lg transition-all shadow-xs cursor-pointer active:scale-95"
            title="Fechar janela (Esc)"
            aria-label="Fechar janela"
          >
            <span>Fechar</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 text-xs">
          {/* Explanation Alert */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-900 space-y-1">
            <div className="font-semibold flex items-center gap-1.5 text-amber-950">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Por que a impressão direta pode falhar no painel?</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Navegadores bloqueiam janelas modais de impressão (`window.print`) em painéis incorporados (iframes sandboxed). 
              Para imprimir em alta resolução ou salvar em PDF sem bloqueios, utilize as opções abaixo:
            </p>
          </div>

          {/* Action Options */}
          <div className="space-y-2.5">
            {/* Option 1: Download HTML (Best & Most Direct) */}
            <button
              onClick={handleDownloadHTML}
              className="w-full flex items-center justify-between p-3 rounded-xl border-2 border-emerald-500 bg-emerald-50/80 hover:bg-emerald-100/80 transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-950 block">1. Baixar Arquivo HTML para PDF (Recomendado)</span>
                  <span className="text-[11px] text-emerald-800">Baixa o arquivo formatado. Ao abrir, aperte Ctrl+P para salvar em PDF.</span>
                </div>
              </div>
            </button>

            {/* Option 2: Copy to Clipboard */}
            <button
              onClick={handleCopyClipboard}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0">
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    {copied ? 'Copiado para a Área de Transferência!' : '2. Copiar Texto Completo do Dossiê'}
                  </span>
                  <span className="text-[11px] text-slate-500">Cole no Microsoft Word, Google Docs ou WhatsApp.</span>
                </div>
              </div>
            </button>

            {/* Option 3: Download Markdown */}
            <button
              onClick={handleDownloadMarkdown}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">3. Baixar em Formato Markdown (.md)</span>
                  <span className="text-[11px] text-slate-500">Documento estruturado para Notion, Obsidian e editores.</span>
                </div>
              </div>
            </button>

            {/* Option 4: Try Native Print */}
            <button
              onClick={handleTryNativePrint}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <Printer className="w-4 h-4 text-slate-500 ml-1" />
                <span className="text-xs font-medium text-slate-600">Tentar impressão direta do navegador (se não estiver em iframe)</span>
              </div>
            </button>
          </div>

          {printError && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800">
              {printError}
            </div>
          )}
        </div>

        {/* Sticky Footer with Clear "Fechar" Button */}
        <div className="px-4 sm:px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">Ou pressione a tecla Esc / clique fora</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 rounded-xl transition-all shadow-md cursor-pointer"
          >
            Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
};
