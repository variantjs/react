import theme from '../theme'
import TButton from '../theme/TButton'
import TInput from '../theme/TInput'
it('export the complete theme', () => {
  expect(theme).toEqual({
    TButton: TButton,
    TInput: TInput,
  })
});

