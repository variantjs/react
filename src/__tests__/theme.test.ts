import theme from '../theme'
import { TButton } from '../theme/TButton'
import { TTextarea } from '../theme/TTextarea'
import { TSelect } from '../theme/TSelect'
import { TInput } from '../theme/TInput'
import { TCheckbox } from '../theme/TCheckbox'
import { TRadio } from '../theme/TRadio'
import { TWrappedCheckbox } from '../theme/TWrappedCheckbox'
import { TWrappedRadio } from '../theme/TWrappedRadio'

it('export the complete theme', () => {
  expect(theme).toEqual({
    TInput,
    TTextarea,
    TButton,
    TSelect,
    TCheckbox,
    TRadio,
    TWrappedCheckbox,
    TWrappedRadio,
  })
})
