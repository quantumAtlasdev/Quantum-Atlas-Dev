'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { StaticGlobeImage } from './Globe'

const GlobeDynamic = dynamic(() => import('./Globe'), {
  ssr: false,
  loading: () => <StaticGlobeImage />,
})

type ClientState = 'loading' | 'mobile' | 'desktop'

export function GlobeWrapper() {
  const [clientState, setClientState] = useState<ClientState>('loading')

  useEffect(() => {
    function update() {
      setClientState(window.innerWidth < 768 ? 'mobile' : 'desktop')
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  if (clientState === 'loading' || clientState === 'mobile') {
    return <StaticGlobeImage />
  }

  return <GlobeDynamic />
}
