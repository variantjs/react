import theme from '../theme'
import TButton from '../theme/TButton'
import TTextarea from '../theme/TTextarea'
import TSelect from '../theme/TSelect'
import TInput from '../theme/TInput'
it('export the complete theme', () => {
  expect(theme).toEqual({
    TInput: TInput,
    TTextarea: TTextarea,
    TButton: TButton,
    TSelect: TSelect,
  })
});

