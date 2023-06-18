"use client";

import Axios from 'axios'
import { useState } from 'react'

// For OpenAI API
const API_URL = "https://api.openai.com/v1/completions" // APIのリクエスト先のURL
const MODEL_NAME = "text-davinci-003" // モデルの設定
const MAX_TOKENS = 2048 // 生成する文章の最大文字数
const TEMPERATURE = 1 // 生成する文章のランダム性（0：完全に確定的、2：完全にランダム）

export default function Home() {
  const [profile, setProfile] = useState('')
  const [request, setRequest] = useState('')
  const [GPTres, setGPTres] = useState('')

  const handleChangeProfile = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfile(event.target.value);
  };

  const handleChangeRequest = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequest(event.target.value);
  };

  const handleOnClick = async () => {
    const prompt = `あなたは学校の先生です。\n以下の「先生のプロフィール」と「授業の依頼」をみて、指導案を作ってみてください。\n先生のプロフィール：\n${profile}\n授業の依頼：\n${request}`

    // ヘッダー設定
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    };

    // API リクエストデータ
    const data = {
      model: MODEL_NAME,
      prompt: prompt,
      max_tokens: MAX_TOKENS,
      n: 1,
      stop: null,
      temperature: TEMPERATURE,
    };

    const response = await Axios.post(API_URL, data, { headers: headers });
    console.log(response)
    setGPTres(response.data.choices[0].text)
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-y-6 p-24">
      <div className="w-full">
        <form className="w-full flex flex-col gap-y-6">
          <div className="w-full">
            <label htmlFor="profile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">プロフィール</label>
            <textarea id="profile" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="プロフィール" value={profile} onChange={handleChangeProfile}></textarea>
          </div>
          <div className="w-full">
            <label htmlFor="request" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">依頼内容</label>
            <textarea id="request" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="依頼内容" value={request} onChange={handleChangeRequest}></textarea>
          </div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleOnClick}
          >送信</button>
        </form>
      </div>
      <div className="w-full">
        <h3>出力結果</h3>
        <p className="text-gray-500 dark:text-gray-400 whitespace-pre-wrap">
          {GPTres || "出力がありません"}
        </p>
      </div>
    </main>
  )
}
