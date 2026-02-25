import type { PromptItem } from '../types'

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const ta = document.createElement('textarea')
  ta.value = text
  ta.style.position = 'fixed'
  ta.style.left = '-9999px'
  ta.style.top = '-9999px'
  document.body.appendChild(ta)
  ta.focus()
  ta.select()
  const ok = document.execCommand('copy')
  document.body.removeChild(ta)
  if (!ok) throw new Error('Falha ao copiar')
}

type Props = {
  item: PromptItem
  onCopy: (ok: boolean) => void
  onEdit: () => void
  onDelete: () => void
  copied?: boolean
}

export function PromptCard({ item, onCopy, onEdit, onDelete, copied }: Props) {
  const handleCopy = async () => {
    try {
      await copyText(item.content)
      onCopy(true)
    } catch {
      onCopy(false)
    }
  }

  return (
    <div className={`card ${copied ? 'card--copied' : ''}`}>
      <button className="card__imageBtn" onClick={handleCopy} aria-label={`Copiar prompt: ${item.title}`}>
        <img className="card__image" src={item.imageUrl} alt={item.title} loading="lazy" />
        <div className="card__imageOverlay">{copied ? '✓ Copiado' : 'Clique para copiar'}</div>
      </button>

      <div className="card__body">
        <div className="card__titleRow">
          <h3 className="card__title">{item.title}</h3>
        </div>

        {item.description ? <p className="card__desc">{item.description}</p> : null}

        <div className="card__tags">
          {item.tags.slice(0, 6).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        <div className="card__actions">
          <button className="btn" onClick={handleCopy}>
            Copiar
          </button>
          <button className="btn btn--ghost" onClick={onEdit}>
            Editar
          </button>
          <button className="btn btn--danger" onClick={onDelete}>
            Apagar
          </button>
        </div>
      </div>
    </div>
  )
}
