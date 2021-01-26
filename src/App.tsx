import React, { useState } from 'react';

import TInput from './components/TInput'
import TSelect, { TSelectValue } from './components/TSelect';

function App() {
  const [variant, setVariant] = useState<TSelectValue>(undefined)
  const [variant2, setVariant2] = useState<string[]>([])
  const [text, setText] = useState<string | undefined>(undefined)

  return (
    <div className="container py-10 mx-auto">
      <TInput
        inputHandler={setText}
      />

      { text }

      <pre>
        { variant === undefined ? 'undefined' : (variant === null ? 'null' : variant) }
      </pre>

      <TSelect
        value={variant}
        options={[
          {value: 'other', text: 'Other'},
          {value: '', text: 'Empty'},
          {value: 'test', text: 'Test'},
          {value: null, text: 'Null'},
          {value: undefined, text: 'Nop'},
        ]}
        inputHandler={setVariant}
      />

      <pre>{ JSON.stringify(variant2) }</pre>

      <TSelect
        multiple
        value={variant2}
        options={[
          {value: undefined, text: 'Nop'},
          {value: null, text: 'Null'},
          {value: '', text: 'Empty'},
          {value: 'test', text: 'Test'},
          {text: 'Other', children: {
            1: 'Option 1',
            2: 'Option 1',
            3: 'Option 1',
            4: 'Option 1',
          }},
        ]}
        inputHandler={setVariant2}
      />
    </div>
  )
}

// class App extends React.Component {
//   state = {
//     variant2: [],
//   }

//   render()  {
//     return (
//       <div>
//       <pre>
//         { JSON.stringify(this.state.variant2) }
//       </pre>
      
//       <TSelect
//         multiple
//         value={this.state.variant2}
//         options={[
//           {value: undefined, text: 'Nop'},
//           {value: null, text: 'Null'},
//           {value: '', text: 'Empty'},
//           {value: 'test', text: 'Test'},
//           {text: 'Other', children: {
//             1: 'Option 1',
//             2: 'Option 1',
//             3: 'Option 1',
//             4: 'Option 1',
//           }},
//         ]}
//         inputHandler={(value) => this.setState({variant2: value})}
//       />
//       </div>
//     )
//   }
// }

export default App;
