import theme from '../theme'
import TButton from '../theme/TButton'
import TTextarea from '../theme/TTextarea'
import TSelect from '../theme/TSelect'
import TInput from '../theme/TInput'
import TCheckbox from '../theme/TCheckbox'
import TRadio from '../theme/TRadio'
import TWrappedCheckbox from '../theme/TWrappedCheckbox'

it('export the complete theme', () => {
  expect(theme).toEqual({
    TInput: TInput,
    TTextarea: TTextarea,
    TButton: TButton,
    TSelect: TSelect,
    TCheckbox: TCheckbox,
    TRadio: TRadio,
    TWrappedCheckbox: TWrappedCheckbox,
  })
});

