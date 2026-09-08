import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "SmartRetail AI Platform" });
  });

  // AI Copilot for Retail Promotional Intelligence
  app.post("/api/copilot/recommend", async (req, res) => {
    try {
      const { sector, goal, budget, category } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback simulated intelligent response if key is missing or invalid
        return res.json({
          success: true,
          source: "simulated",
          recommendations: [
            {
              product: "Arroz Tipo 1 5kg (Marca Líder)",
              type: "Gerador de Tráfego (Chamariz)",
              regularPrice: "R$ 28,90",
              promoPrice: "R$ 21,90",
              margin: "12%",
              expectedVolumeBoost: "+185%",
              channel: "Capa do Encarte & Banner Digital",
              strategyReason: "Produto da cesta básica com alta elasticidade-preço para atração de fluxo no início do mês."
            },
            {
              product: "Cerveja Pilsen Lata 350ml (Pack com 12)",
              type: "Gerador de Margem e Volume",
              regularPrice: "R$ 41,88",
              promoPrice: "R$ 34,90",
              margin: "24%",
              expectedVolumeBoost: "+240%",
              channel: "WhatsApp & Cartaz de Oferta",
              strategyReason: "Item promocional de alto giro em fins de semana com excelente alavancagem de verba de fornecedor."
            },
            {
              product: "Azeite de Oliva Extra Virgem 500ml",
              type: "Aumento de Ticket Médio",
              regularPrice: "R$ 39,90",
              promoPrice: "R$ 29,90",
              margin: "28%",
              expectedVolumeBoost: "+120%",
              channel: "E-Commerce & Mídia In-Store",
              strategyReason: "Produto premium com alta percepção de valor e aporte negociado de trade marketing."
            }
          ],
          campaignTitle: `Campanha Estratégica: ${sector || "Supermercado"} - Foco em ${goal || "Aumento de Vendas"}`,
          estimatedROI: "+31.4% de margem líquida gerada com verba de trade"
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Você é o SmartRetail AI Copilot, especialista em inteligência de varejo, precificação promocional, gestão de encartes e trade marketing.
Gere recomendações de ofertas estratégicas para um varejista do setor "${sector || 'Supermercado'}" com o objetivo de "${goal || 'Aumentar margem e fluxo de clientes'}".
Categoria prioritária: "${category || 'Mercearia e Bebidas'}".

Responda ESTRITAMENTE em formato JSON válido contendo a estrutura:
{
  "campaignTitle": "Nome atraente da campanha",
  "estimatedROI": "Estimativa de retorno em % ou R$",
  "recommendations": [
    {
      "product": "Nome do produto",
      "type": "Chamariz ou Margem ou Ticket Médio",
      "regularPrice": "R$ XX,XX",
      "promoPrice": "R$ XX,XX",
      "margin": "XX%",
      "expectedVolumeBoost": "+XX%",
      "channel": "Canais recomendados (Encarte, WhatsApp, PDV, Instagram)",
      "strategyReason": "Explicação técnica de varejo e trade marketing"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      const responseText = response.text || "";
      let parsedData;
      try {
        parsedData = JSON.parse(responseText);
      } catch {
        parsedData = { campaignTitle: "Campanha Promocional Otimizada", recommendations: [] };
      }

      return res.json({
        success: true,
        source: "gemini",
        ...parsedData
      });

    } catch (err: any) {
      console.log("[Copilot API Notice]: Using fallback promotional recommendations.");
      // Fallback gracefully so UI remains fully functional
      const { sector, goal } = req.body;
      return res.json({
        success: true,
        source: "simulated-fallback",
        errorInfo: err.message,
        recommendations: [
          {
            product: "Arroz Tipo 1 5kg (Marca Líder)",
            type: "Gerador de Tráfego (Chamariz)",
            regularPrice: "R$ 28,90",
            promoPrice: "R$ 21,90",
            margin: "12%",
            expectedVolumeBoost: "+185%",
            channel: "Capa do Encarte & Banner Digital",
            strategyReason: "Produto da cesta básica com alta elasticidade-preço para atração de fluxo no início do mês."
          },
          {
            product: "Cerveja Pilsen Lata 350ml (Pack com 12)",
            type: "Gerador de Margem e Volume",
            regularPrice: "R$ 41,88",
            promoPrice: "R$ 34,90",
            margin: "24%",
            expectedVolumeBoost: "+240%",
            channel: "WhatsApp & Cartaz de Oferta",
            strategyReason: "Item promocional de alto giro em fins de semana com excelente alavancagem de verba de fornecedor."
          },
          {
            product: "Azeite de Oliva Extra Virgem 500ml",
            type: "Aumento de Ticket Médio",
            regularPrice: "R$ 39,90",
            promoPrice: "R$ 29,90",
            margin: "28%",
            expectedVolumeBoost: "+120%",
            channel: "E-Commerce & Mídia In-Store",
            strategyReason: "Produto premium com alta percepção de valor e aporte negociado de trade marketing."
          }
        ],
        campaignTitle: `Campanha Estratégica: ${sector || "Supermercado"} - Foco em ${goal || "Aumento de Vendas"}`,
        estimatedROI: "+31.4% de margem líquida gerada com verba de trade"
      });
    }
  });

  // Retail Insights with Google Search Grounding
  app.post("/api/retail-insights", async (req, res) => {
    try {
      const { topic, region } = req.body || {};
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.json({
          success: true,
          source: "simulated-fallback",
          summary: "O mercado varejista em 2026 está passando por uma aceleração sem precedentes com a integração de IA generativa para hiperpersonalização de encartes, precificação dinâmica e auditoria de trade marketing com inteligência de visão computacional.",
          lastUpdated: "Setembro de 2026",
          articles: [
            {
              title: "Hiperpersonalização e Encartes Dinâmicos via IA em Supermercados",
              snippet: "Redes supermercadistas no Brasil adotam modelos preditivos para gerar encartes customizados por loja e por cluster de clientes, reduzindo desperdício em mídia impressa e aumentando o ROI de mídia em até 35%.",
              category: "Encartes & Mídia",
              impactScore: "Alto Impacto",
              tag: "Tendência Varejo 2026",
              url: "https://www.google.com/search?q=IA+generativa+encartes+varejo+2026"
            },
            {
              title: "Digitalização do Trade Marketing e Validação Automática de Gôndola",
              snippet: "Aporte de indústrias de consumo (FMCG) em mídias de varejo (Retail Media Networks) cresce 42% impulsionado pela comprovação em tempo real de execução de loja com análise de fotos por inteligência artificial.",
              category: "Trade Marketing",
              impactScore: "Estratégico",
              tag: "Retail Media",
              url: "https://www.google.com/search?q=Retail+Media+Networks+Trade+Marketing+Brasil"
            },
            {
              title: "Precificação Preditiva e Proteção de Margem em Tempos de Inflação Flutuante",
              snippet: "Softwares de inteligência de preço com algoritmos de elasticidade alinhados ao monitoramento automático de concorrentes garantem margem média 2.8% superior para atacarejos e grandes redes.",
              category: "Inteligência de Preços",
              impactScore: "Alto Impacto",
              tag: "Pricing & Elasticidade",
              url: "https://www.google.com/search?q=Precificacao+dinamica+algoritmos+varejo"
            }
          ],
          keyTakeaways: [
            "Transição em massa de encartes em papel para encartes digitais via WhatsApp e telas de PDV.",
            "Retail Media como principal fonte de receita adicional para supermercados e atacarejos.",
            "Uso de IA para monitorar promoções dos concorrentes em tempo real."
          ],
          sources: [
            { title: "Tendências do Varejo 2026 - McKinsey & Retail Tech", uri: "https://www.mckinsey.com" },
            { title: "Pesquisa de Mercado Supermercadista - ABRAS", uri: "https://www.abras.com.br" }
          ]
        });
      }

      const ai = new GoogleGenAI({ 
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const searchQuery = topic 
        ? `notícias recentes e tendências 2025/2026 de tecnologia e inovação no varejo para: ${topic}` 
        : "principais tendências e notícias recentes 2025/2026 de tecnologia no varejo supermercados trade marketing precificação IA Brasil";

      const prompt = `Consulte dados atualizados da web via Google Search sobre as últimas notícias, pesquisas e tendências de tecnologia e inovação no varejo (${searchQuery}).
Região/foco de mercado: ${region || "Brasil e Global"}.

Retorne ESTRITAMENTE um objeto JSON válido (sem qualquer texto promocional antes ou depois) com esta estrutura exata:
{
  "summary": "Resumo analítico executivo dos principais movimentos tecnológicos no varejo recente em português (2 a 3 frases em tom corporativo de liderança de varejo)",
  "lastUpdated": "Mês e Ano (ex: Setembro de 2026)",
  "articles": [
    {
      "title": "Título informativo e claro da tendência ou notícia",
      "snippet": "Resumo detalhado com dados concretos ou insights operacionais (2 frases)",
      "category": "Encartes Digitais / Trade Marketing / IA & Preços / Automação / Retail Media",
      "impactScore": "Alto Impacto ou Estratégico",
      "tag": "Tendência 2026 ou Inovação Tec",
      "url": "Link para busca do tema no Google"
    }
  ],
  "keyTakeaways": [
    "Destaque estratégico 1 com dado de mercado",
    "Destaque estratégico 2 com dado de mercado",
    "Destaque estratégico 3 com dado de mercado"
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
        }
      });

      const responseText = response.text || "";
      let parsedData;
      try {
        parsedData = JSON.parse(responseText);
      } catch {
        parsedData = { 
          summary: "Panorama atual do setor de varejo focado em transformação digital e automação.",
          lastUpdated: "2026",
          articles: [],
          keyTakeaways: []
        };
      }

      // Extract search grounding metadata
      const candidate = response.candidates?.[0];
      const groundingMetadata = candidate?.groundingMetadata;
      const groundingChunks = groundingMetadata?.groundingChunks || [];
      const webQueries = groundingMetadata?.webSearchQueries || [];

      const sources = groundingChunks
        .filter((chunk: any) => chunk.web && chunk.web.uri)
        .map((chunk: any) => ({
          title: chunk.web.title || "Fonte do Google Search",
          uri: chunk.web.uri
        }));

      return res.json({
        success: true,
        source: "gemini-google-search-grounding",
        webSearchQueries: webQueries,
        sources: sources,
        ...parsedData
      });

    } catch (err: any) {
      console.log("[Retail Insights API Notice]: Using fallback trend analysis dataset.");
      return res.json({
        success: true,
        source: "simulated-fallback",
        errorInfo: err.message,
        summary: "Análise de mercado com foco em tendências de tecnologia no varejo, mídia de loja e precificação automatizada.",
        lastUpdated: "Setembro de 2026",
        articles: [
          {
            title: "Plataformas de Encartes Inteligentes em Tempo Real",
            snippet: "Com a redução contínua das tiragens físicas, mais de 68% dos supermercados migraram seus orçamentos de encartes para formatos digitais alimentados por IA.",
            category: "Encartes Digitais",
            impactScore: "Alto Impacto",
            tag: "Otimização de Custos",
            url: "https://www.google.com/search?q=encartes+digitais+inteligentes+supermercados"
          },
          {
            title: "Crescimento Exponencial de Retail Media em Atacarejos",
            snippet: "Grandes marcas negociam espaços patrocinados em encartes e telas digitais direto na plataforma de trade marketing, garantindo comprovação por foto e dados de sell-out.",
            category: "Trade Marketing",
            impactScore: "Estratégico",
            tag: "Receita Adicional",
            url: "https://www.google.com/search?q=retail+media+atacarejo+trade+marketing"
          },
          {
            title: "Algoritmos Preditivos de Elasticidade de Preço no Varejo",
            snippet: "Adoção de precificação dinâmica orientada por concorrência e dados de caixa eleva a margem líquida média do varejo alimentar em até 2,4 pontos percentuais.",
            category: "Precificação Dinâmica",
            impactScore: "Alto Impacto",
            tag: "Inteligência de Margem",
            url: "https://www.google.com/search?q=precificacao+dinamica+algoritmos+elasticidade+varejo"
          }
        ],
        keyTakeaways: [
          "Digitalização acelerada de campanhas promocionais de varejo e encartes de WhatsApp.",
          "Comprovação de execução de loja em tempo real para indústrias parceiras de trade.",
          "Automação do fluxo de aprovação de verbas JBP e cooperação comercial."
        ],
        sources: [
          { title: "Pesquisa do Setor de Varejo Alimentar - ABRAS", uri: "https://www.abras.com.br" },
          { title: "Relatório de Inovação em Varejo Tech - McKinsey", uri: "https://www.mckinsey.com" }
        ]
      });
    }
  });

  // Lead / Demo Booking request handler
  app.post("/api/demo-request", (req, res) => {
    const { name, company, email, phone, storeCount, sector } = req.body;
    
    res.json({
      success: true,
      message: `Solicitação recebida com sucesso para a empresa ${company || 'sua rede'}!`,
      details: {
        scheduledBy: name,
        estimatedTimeSaved: `${(Number(storeCount) || 5) * 45} horas/mês`,
        estimatedExtraMargin: `R$ ${((Number(storeCount) || 5) * 18500).toLocaleString('pt-BR')}`
      }
    });
  });

  // Vite Middleware for Dev vs Production
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SmartRetail AI] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
