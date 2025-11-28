import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'

// 从环境变量获取API密钥（安全地保存在后端）
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

interface ScriptConfig {
  developerName: string
  developerEmail: string
  targetData: string
}

interface GeneratedScript {
  code: string
  explanation: string
}

export async function POST(request: NextRequest) {
  try {
    // 检查API密钥是否配置
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: '服务器未配置Gemini API密钥' },
        { status: 500 }
      )
    }

    const config: ScriptConfig = await request.json()

    // 验证请求数据
    if (!config.developerName || !config.developerEmail || !config.targetData) {
      return NextResponse.json(
        { error: '缺少必需的字段' },
        { status: 400 }
      )
    }

    // 使用Gemini生成Python脚本
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            code: {
              type: SchemaType.STRING,
              description: "完整的Python脚本代码"
            },
            explanation: {
              type: SchemaType.STRING,
              description: "脚本工作原理的简要说明"
            }
          },
          required: ["code", "explanation"]
        }
      }
    })

    const prompt = `
你是一位专精于金融数据API的Python开发专家。
基于以下要求编写一个完整的、可执行的Python脚本，用于从美国SEC EDGAR API获取数据。

用户需求：
- 开发者姓名：${config.developerName}
- 开发者邮箱：${config.developerEmail}
- 数据目标：${config.targetData}

SEC API的严格规则：
1. 必须使用'requests'库。
2. 必须设置'User-Agent'头，格式为："开发者姓名 开发者邮箱"（例如："${config.developerName} ${config.developerEmail}"）。这是SEC的硬性要求。
3. 必须设置'Accept-Encoding'为'gzip, deflate'。
4. 根据用户目标处理特定端点（例如：使用'https://data.sec.gov/submissions/CIK...'获取公司事实，或使用'https://www.sec.gov/cgi-bin/browse-edgar'获取文件列表）。
5. 包含状态码错误处理（特别是403 Forbidden）。
6. 代码中的所有字符串使用单引号或正确转义双引号。

重要提示：
- 在JSON响应中，所有反斜杠(\)必须转义为双反斜杠(\\)
- 所有换行符使用\\n表示
- 确保Python代码字符串是有效的JSON字符串值
    `

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    if (!text) {
      return NextResponse.json(
        { error: 'Gemini未返回响应' },
        { status: 500 }
      )
    }

    // 尝试解析JSON，如果失败则提供更详细的错误信息
    let generatedScript: GeneratedScript
    try {
      // 清理可能的markdown代码块标记
      let cleanedText = text.trim()
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/^```json\n?/, '').replace(/\n?```$/, '')
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/^```\n?/, '').replace(/\n?```$/, '')
      }
      
      generatedScript = JSON.parse(cleanedText)
      
      // 验证返回的数据结构
      if (!generatedScript.code || !generatedScript.explanation) {
        throw new Error('返回的JSON缺少必需的字段')
      }
    } catch (parseError) {
      console.error('JSON解析错误:', parseError)
      console.error('原始响应:', text.substring(0, 500)) // 只打印前500个字符
      return NextResponse.json(
        { error: 'AI返回的数据格式有误，请重试' },
        { status: 500 }
      )
    }

    return NextResponse.json(generatedScript)

  } catch (error) {
    console.error('生成脚本时出错:', error)
    return NextResponse.json(
      { error: '生成脚本失败，请稍后重试' },
      { status: 500 }
    )
  }
}

