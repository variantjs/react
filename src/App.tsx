import { useState } from 'react'
import { TInput } from './components/TInput'
import { TWrappedCheckbox } from './components/TWrappedCheckbox'
import { TSelect, TSelectValue } from './components/TSelect'
import { TRadio } from './components/TRadio'
import { TWrappedRadio } from './components/TWrappedRadio'

function App(): JSX.Element {
  const [variant, setVariant] = useState<TSelectValue>(undefined)
  const [variant2, setVariant2] = useState<string[]>([])
  const [text, setText] = useState<string>('')
  const [checked, setChecked] = useState<string>('true')

  const [checked2, setChecked2] = useState<string>('false')

  const [radioValue, setRadioValue] = useState<string>('2')

  return (
    <div className='container py-10 mx-auto'>
      <input
        type='radio'
        name='test'
        value='1'
        onChange={(e) => setRadioValue(e.currentTarget.value)}
        checked={radioValue === '1'}
      />
      <input
        type='radio'
        name='test'
        value='2'
        onChange={(e) => setRadioValue(e.currentTarget.value)}
        checked={radioValue === '2'}
      />
      <input
        type='radio'
        name='test'
        value='3'
        onChange={(e) => setRadioValue(e.currentTarget.value)}
        checked={radioValue === '3'}
      />
      <input
        type='radio'
        name='test'
        value='4'
        onChange={(e) => setRadioValue(e.currentTarget.value)}
        checked={radioValue === '4'}
      />

      <p>Radio value {radioValue}</p>

      {/* <input type="radio" name="test2" value="1" onChange={e => setRadioValue(e.currentTarget.value)} checked={radioValue === "1"} />
      <input type="radio" name="test2" value="2" onChange={e => setRadioValue(e.currentTarget.value)} checked={radioValue === "2"} />
      <input type="radio" name="test2" value="3" onChange={e => setRadioValue(e.currentTarget.value)} checked={radioValue === "3"} />
      <input type="radio" name="test2" value="4" onChange={e => setRadioValue(e.currentTarget.value)} checked={radioValue === "4"} /> */}

      <TWrappedRadio name='test2' variant='button' value='1' state={[radioValue, setRadioValue]}>
        Hola 1
      </TWrappedRadio>
      <TWrappedRadio name='test2' variant='button' value='2' state={[radioValue, setRadioValue]}>
        Hola 2
      </TWrappedRadio>
      <TWrappedRadio name='test2' variant='button' value='3' state={[radioValue, setRadioValue]}>
        Hola 3
      </TWrappedRadio>
      <TWrappedRadio name='test2' variant='button' value='4' state={[radioValue, setRadioValue]}>
        Hola 4
      </TWrappedRadio>

      {/* <TInput changeHandler={setText} value={text} onChange={(e) => console.info(e)} /> */}

      <input type='checkbox' />

      <TInput state={[text, setText]} />

      {/* <TCheckbox name="chexcked" value={"true"} uncheckedValue="false" state={[checked, setChecked]} /> */}

      <TWrappedCheckbox
        variant='button'
        value={'true'}
        uncheckedValue='false'
        state={[checked, setChecked]}
      >
        state is the same as the value
      </TWrappedCheckbox>

      <TWrappedCheckbox variant='button' value={'true'} uncheckedValue='false'>
        doesnt have state at all
      </TWrappedCheckbox>

      <TWrappedCheckbox
        variant='button'
        value={'true'}
        uncheckedValue='false'
        state={[checked2, setChecked2]}
      >
        state is the same as the unchecked value
      </TWrappedCheckbox>

      <TWrappedCheckbox
        value={'true'}
        uncheckedValue='false'
        state={[checked, setChecked]}
        checked={true}
      >
        state is the same as the checked value and has a checked attribute
      </TWrappedCheckbox>

      <TWrappedCheckbox
        value={'true'}
        uncheckedValue='false'
        state={[checked2, setChecked2]}
        checked={true}
      >
        state is the same as the uncheckedValue value and has achecked attribute
      </TWrappedCheckbox>

      <TWrappedCheckbox
        variant='error'
        autoFocus
        name='chexcked'
        value={'true'}
        uncheckedValue='false'
        state={[checked, setChecked]}
      >
        Select this
      </TWrappedCheckbox>

      <TWrappedCheckbox
        tabIndex={3}
        label='better select this'
        labelTag='strong'
        id='hola'
        name='chexcked'
        value={'true'}
        uncheckedValue='false'
        state={[checked, setChecked]}
      >
        Or Select this
      </TWrappedCheckbox>

      <p>Checked: {checked}</p>
      <p>Checked2: {checked2}</p>

      {text}

      <pre>{variant === undefined ? 'undefined' : variant === null ? 'null' : variant}</pre>

      {/* <TSelect
        options={['hellooou', '2', '3']}
        value={['hellooou', '3']}
        // onChange={(e) => console.log(e.currentTarget.selectedOptions)}
        multiple
      /> */}

      <TSelect
        value={variant}
        options={[
          { value: 'other', text: 'Other' },
          { value: '', text: 'Empty' },
          { value: 'test', text: 'Test' },
          { value: null, text: 'Null' },
          { value: undefined, text: 'Nop' },
        ]}
        changeHandler={setVariant}
      />

      <pre>{JSON.stringify(variant2)}</pre>

      <TSelect
        multiple
        value={variant2}
        options={[
          { value: undefined, text: 'Nop' },
          { value: null, text: 'Null' },
          { value: '', text: 'Empty' },
          { value: 'test', text: 'Test' },
          {
            text: 'Other',
            children: {
              1: 'Option 1',
              2: 'Option 1',
              3: 'Option 1',
              4: 'Option 1',
            },
          },
        ]}
        changeHandler={setVariant2}
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
//         changeHandler={(value) => this.setState({variant2: value})}
//       />
//       </div>
//     )
//   }
// }

export default App
