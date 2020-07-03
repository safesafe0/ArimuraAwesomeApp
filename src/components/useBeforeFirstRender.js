import { useState, useEffect } from 'react'

function useBeforeFirstRender(func){
  const [hasRendered, setHasRendered] = useState(false)
  useEffect(() => setHasRendered(true), [hasRendered])
  if (!hasRendered) {
    func()
  }
}

export default useBeforeFirstRender