type Props = {
  message: string
  kind?: 'success' | 'error'
  onClose: () => void
}

export function Toast({ message, kind = 'success', onClose }: Props) {
  return (
    <div className={`toast ${kind}`}>
      <div className="toast__msg">{message}</div>
      <button type="button" className="toast__btn" onClick={onClose} aria-label="Fechar toast">
        ✕
      </button>
    </div>
  )
}
