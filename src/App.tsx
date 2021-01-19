import React, { useState } from 'react';

import TInput from './components/TInput'

function App() {
  const [variant, setVariant] = useState<string | undefined>(undefined)

  return (
    <div className="container py-10 mx-auto">
      <TInput
        variant={variant}
      />

      <select name="" id="" onChange={(e) => setVariant(e.currentTarget.value)}>
        <option value={undefined}>Nop</option>
        <option value="test">Test</option>
        <option value="other">Other</option>
      </select>
    </div>
  )
}

export default App;
