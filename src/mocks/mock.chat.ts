
export const mockMessages = [
	{
		id: 'msg_001',
		role: 'user',
		content: 'Привіт! Розкажи мені коротко, що таке Next.js?',
		createdAt: '2026-08-18T15:00:00.000Z'
	},
	{
		id: 'msg_002',
		role: 'assistant',
		content: 'Привіт! Next.js — це популярний фреймворк на базі React, який дозволяє створювати швидкі веб-додатки завдяки серверному рендерингу (SSR) та генерації статичних сайтів (SSG).',
		createdAt: '2026-08-18T15:00:05.000Z'
	},
	{
		id: 'msg_003',
		role: 'user',
		content: 'А що означає директива \'use client\' на початку файлу?',
		createdAt: '2026-08-18T15:01:20.000Z'
	},
	{
		id: 'msg_004',
		role: 'assistant',
		content: 'Вона вказує, що цей компонент є Клієнтським (Client Component). Це означає, що він буде рендеритися та гідратуватися на стороні браузера. Це необхідно, якщо ви використовуєте хуки типу useEffect, useRef, useState або працюєте зі стором.',
		createdAt: '2026-08-18T15:01:30.000Z'
	}
];

export const mockMessagesForTypingTest = [
  {
    id: 'msg_001',
    role: 'user',
    content: 'Привіт! Розкажи мені коротко, що таке Next.js?',
  },
  {
    id: 'msg_002',
    role: 'assistant',
    content: 'Привіт! Next.js — це фреймворк на базі React...',
  },
  {
    id: 'msg_003',
    role: 'user',
    content: 'О, круто! А покажи індикатор загрузки бота.',
  }
];