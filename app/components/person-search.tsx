import { Input } from './ui/input.tsx'

export const PersonSearch = () => {
  return (
    <Input
      type="text"
      placeholder="Search person"
      onInput={() => {
        console.log('search person')
      }}
    />
  )
}
