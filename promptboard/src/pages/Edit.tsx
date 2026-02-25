import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PromptForm } from '../components/PromptForm'
import { getPromptById, updatePrompt } from '../services/promptStore'
import type { PromptItem } from '../types'

export function Edit() {
  const nav = useNavigate()
  const { id } = useParams()

  const item = useMemo(() => (id ? getPromptById(id) : null), [id])

  if (!id || !item) {
    return (
      <div className="page">
        <header className="topbar">
          <h2 className="h2">Prompt não encontrado</h2>
          <button className="btn" onClick={() => nav('/')}>
            Voltar
          </button>
        </header>
      </div>
    )
  }

  const onSubmit = (value: Omit<PromptItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    updatePrompt(id, value)
    nav('/')
  }

  return (
    <div className="page">
      <header className="topbar">
        <h2 className="h2">Editar prompt</h2>
        <button className="btn btn--ghost" onClick={() => nav('/')}>
          Voltar
        </button>
      </header>

      <PromptForm initial={item} submitLabel="Atualizar" onSubmit={onSubmit} />
    </div>
  )
}

export default Edit
