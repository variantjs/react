import theme from '../theme'
import TButton from '../theme/TButton'
import TSelect from '../theme/TSelect'
import TInput from '../theme/TInput'
it('export the complete theme', () => {
  expect(theme).toEqual({
    TButton: TButton,
    TInput: TInput,
    TSelect: TSelect,
  })
});

