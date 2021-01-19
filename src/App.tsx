import React, { useState } from 'react';

import TInput from './components/TInput'

function App() {
  const [variant, setVariant] = useState<string | undefined>(undefined)

  return (
    <div className="container py-10 mx-auto">
      <TInput
        variant={variant}
        variants={{
          test: {
            classes: 'bg-blue-500',
            type: 'password'
          },
          other: {
            className: 'bg-yellow-500',
          }
        }}
        classes={['bg-red-500', 'border-2']}
        placeholder="test"
        type="text"
        className="text-white"
        fixedClasses="border-red-200 border-2"
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
