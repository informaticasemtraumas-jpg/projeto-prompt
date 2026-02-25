import { useNavigate } from 'react-router-dom'
import { PromptForm } from '../components/PromptForm'
import { createPrompt } from '../services/promptStore'
import type { PromptItem } from '../types'

export function New() {
  const nav = useNavigate()

  const onSubmit = (value: Omit<PromptItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    createPrompt(value)
    nav('/')
  }

  return (
    <div className="page">
      <header className="topbar">
        <h2 className="h2">Novo prompt</h2>
        <button className="btn btn--ghost" onClick={() => nav('/')}>
          Voltar
        </button>
      </header>

      <PromptForm submitLabel="Salvar" onSubmit={onSubmit} />
    </div>
  )
}

export default New
