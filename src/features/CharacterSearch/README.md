# CharacterSearch

Searching characters are core of this app.

The search includes:
- prompts
- result when a character is found
- action when a character is not found

## Architecture

To ensure maximum flexibility we use a [compound pattern](https://javascriptpatterns.vercel.app/patterns/react-patterns/compound-pattern). This allows us free decide where in the layout to put different elements of the character search scope.

## Example

```tsx
import { CharacterSearch } from "../features/CharacterSearch";

// ...

<CharacterSearch>
  <div>
    <CharacterSearch.SearchForm />
  </div>
  {/** ... */}
  <div>
    <CharacterSearch.SearchResult />
  </div>
<CharacterSearch>
```